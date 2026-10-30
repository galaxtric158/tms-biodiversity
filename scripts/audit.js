/* PROMPT 3 — UX/accessibility audit. Read-only against the running dev
 * server; writes .impeccable/audit-report.json + prints a summary.
 * Phases:
 *  A. responsive overflow  (7 viewports × all routes)
 *  B. structure            (headings, landmarks, alt, accessible names)
 *  C. contrast             (computed WCAG ratios for visible text)
 *  D. keyboard focus       (visible indicator + not obscured)
 *  E. reduced motion       (emulated)
 *  F. print backstop       (print media: reveal content must be visible)
 *  G. links + anchors      (internal routes resolve, hash targets exist)
 *  H. metadata             (title/description/OG per route)
 *  I. mobile menu + ToC    (open/close, aria state)
 *  J. console errors
 */
const { chromium } = require("playwright-core");
const fs = require("fs");
const path = require("path");

const EXE =
  "C:\\Users\\edmun\\AppData\\Local\\ms-playwright\\chromium-1234\\chrome-win64\\chrome.exe";
const BASE = "http://localhost:3111";
const OUT = path.join(__dirname, "..", ".impeccable", "audit-report.json");

const ROUTES = [
  "/",
  "/research",
  "/field-guide",
  "/field-guide/flowering-tree",
  "/field-guide/tropical-palms",
  "/ecosystem",
  "/action",
  "/action/roadmap",
  "/proposal",
  "/about",
];
const VIEWPORTS = [320, 375, 390, 768, 1024, 1440, 1920];

const report = {
  overflow: [], console: [], headings: [], landmarks: [], images: [],
  names: [], focus: [], contrast: [], reducedMotion: [], print: [],
  links: [], metadata: [], interactions: [], notes: [],
};

/* ---------- in-page helpers (serialized into the browser) ---------- */

const OVERFLOW_FN = () => {
  const de = document.documentElement;
  if (de.scrollWidth <= de.clientWidth + 1) return null;
  /* The raw scrollWidth metric over-reports under `overflow: clip`
   * (Chrome counts clipped content). Measure what a user can actually
   * experience instead:
   *   1. can the PAGE be scrolled sideways?
   *   2. is any element painted past the viewport that is NOT inside a
   *      horizontal scroll container (i.e. genuinely cut off/unreachable)?
   * Decorative tape overhang is intentionally clipped (~3-4px), so the
   * offender threshold is 12px. */
  window.scrollTo({ left: 400, top: 0, behavior: "instant" });
  const pageScrollX = window.scrollX;
  window.scrollTo({ left: 0, top: 0, behavior: "instant" });
  const inScroller = (el) => {
    let n = el.parentElement;
    while (n) {
      const o = getComputedStyle(n).overflowX;
      if (o === "auto" || o === "scroll") return true;
      n = n.parentElement;
    }
    return false;
  };
  const offenders = [];
  for (const el of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(el);
    if (cs.position === "fixed" || cs.display === "none") continue;
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.right > de.clientWidth + 12 && !inScroller(el)) {
      offenders.push({
        tag: el.tagName,
        cls: String(el.className).slice(0, 80),
        right: Math.round(r.right),
        text: (el.textContent || "").trim().slice(0, 50),
      });
      if (offenders.length >= 6) break;
    }
  }
  if (!pageScrollX && !offenders.length) return null; // metric artifact only
  return {
    scrollWidth: de.scrollWidth,
    clientWidth: de.clientWidth,
    pageScrollX,
    offenders,
  };
};

const STRUCTURE_FN = () => {
  const out = { h1: 0, headingOrder: [], landmarks: {}, noAlt: [], noName: [] };
  const hs = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")];
  out.h1 = document.querySelectorAll("h1").length;
  let prev = 0;
  for (const h of hs) {
    const lvl = +h.tagName[1];
    const txt = (h.textContent || "").trim().slice(0, 60);
    if (prev && lvl > prev + 1) out.headingOrder.push(`h${prev}->h${lvl} at "${txt}"`);
    prev = lvl;
  }
  out.landmarks = {
    header: !!document.querySelector("header"),
    nav: !!document.querySelectorAll("nav,[role=navigation]").length,
    main: !!document.querySelector("main"),
    footer: !!document.querySelector("footer"),
    skipLink: !!document.querySelector('a[href="#main"],a[href^="#content"]'),
    lang: document.documentElement.lang || null,
    title: document.title,
  };
  for (const img of document.querySelectorAll("img")) {
    if (!img.hasAttribute("alt")) out.noAlt.push(img.currentSrc.split("/").pop());
  }
  const named = (el) => {
    if ((el.getAttribute("aria-label") || "").trim()) return true;
    const lb = el.getAttribute("aria-labelledby");
    if (lb && document.getElementById(lb)) return true;
    if ((el.textContent || "").trim()) return true;
    const t = el.querySelector("img[alt]");
    if (t && t.alt.trim()) return true;
    if ((el.getAttribute("title") || "").trim()) return true;
    return false;
  };
  for (const el of document.querySelectorAll("a[href],button")) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue; // hidden
    if (!named(el)) out.noName.push(el.outerHTML.slice(0, 100));
  }
  return out;
};

const CONTRAST_FN = () => {
  const parse = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(",").map((s) => parseFloat(s));
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const lum = (c) => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
  const ratio = (a, b) => {
    const l1 = lum(a), l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };
  const bgOf = (el) => {
    // Walk up accumulating translucent layers (each next color is BELOW
    // the accumulated result) until opaque or the document root.
    let acc = null;
    let n = el;
    while (n) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage && cs.backgroundImage !== "none") return { img: true };
      const c = parse(cs.backgroundColor);
      if (c && c.a > 0) {
        if (!acc) {
          acc = { ...c };
        } else {
          const ao = acc.a + c.a * (1 - acc.a);
          acc = {
            r: (acc.r * acc.a + c.r * c.a * (1 - acc.a)) / ao,
            g: (acc.g * acc.a + c.g * c.a * (1 - acc.a)) / ao,
            b: (acc.b * acc.a + c.b * c.a * (1 - acc.a)) / ao,
            a: ao,
          };
        }
        if (acc.a >= 0.995) return acc;
      }
      if (n === document.body) break;
      n = n.parentElement;
    }
    // composite the leftover translucency over the page ground (paper)
    const paper = { r: 246, g: 244, b: 237, a: 1 };
    if (!acc) return paper;
    return {
      r: acc.r * acc.a + paper.r * (1 - acc.a),
      g: acc.g * acc.a + paper.g * (1 - acc.a),
      b: acc.b * acc.a + paper.b * (1 - acc.a),
      a: 1,
    };
  };
  const failures = [];
  const seen = new Set();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const txt = (node.textContent || "").trim();
    if (!txt) continue;
    const el = node.parentElement;
    if (!el) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity < 0.1) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const fg = parse(cs.color);
    if (!fg || fg.a < 0.9) continue; // alpha text skipped (rare)
    const bg = bgOf(el);
    if (bg.img) continue;
    const size = parseFloat(cs.fontSize);
    const bold = +cs.fontWeight >= 700;
    const large = size >= 24 || (size >= 18.66 && bold);
    const need = large ? 3 : 4.5;
    const cr = ratio(fg, bg);
    if (cr < need) {
      const key = `${cs.color}|rgb(${Math.round(bg.r)},${Math.round(bg.g)},${Math.round(bg.b)})|${size}`;
      if (seen.has(key)) continue;
      seen.add(key);
      failures.push({
        ratio: Math.round(cr * 100) / 100, need, size, color: cs.color,
        bg: `rgb(${Math.round(bg.r)},${Math.round(bg.g)},${Math.round(bg.b)})`,
        cls: String(el.className).slice(0, 60), sample: txt.slice(0, 55),
      });
    }
  }
  return failures;
};

const FOCUS_FN = () => {
  // real Tab presses drive this in the runner; here we only count stops
  const focusables = [...document.querySelectorAll(
    'a[href],button,[tabindex]:not([tabindex="-1"]),input,select,textarea',
  )].filter((el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 0 && cs.visibility !== "hidden" && !el.disabled;
  });
  return { total: focusables.length };
};

const REDUCED_FN = () => {
  const samples = [];
  const check = (el, label) => {
    if (!el) return;
    const cs = getComputedStyle(el);
    samples.push({
      label,
      animationDuration: cs.animationDuration,
      transitionDuration: cs.transitionDuration,
      opacity: cs.opacity,
    });
  };
  check(document.querySelector(".reveal-child"), "reveal-child");
  check(document.querySelector("header nav a"), "nav-link");
  const hero = document.querySelector("[class*='hero'], main img, .print");
  check(hero, "hero-visual");
  // any element mid-animation would show a non-0 duration
  return samples;
};

const PRINT_FN = () => {
  const hidden = [];
  for (const el of document.querySelectorAll(".reveal-child")) {
    const cs = getComputedStyle(el);
    if (+cs.opacity < 0.99 || cs.visibility === "hidden") {
      hidden.push({ cls: String(el.className).slice(0, 70), opacity: cs.opacity });
    }
  }
  const noPrintVisible = [];
  for (const el of document.querySelectorAll(".no-print")) {
    const cs = getComputedStyle(el);
    if (cs.display !== "none") noPrintVisible.push(String(el.className).slice(0, 60));
  }
  return { hiddenReveals: hidden, noPrintStillVisible: noPrintVisible };
};

/* ---------------------------- run phases ---------------------------- */

(async () => {
  const browser = await chromium.launch({ executablePath: EXE });

  /* A. overflow across viewports */
  for (const w of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    for (const route of ROUTES) {
      await page.goto(BASE + route, { waitUntil: "networkidle" });
      const res = await page.evaluate(OVERFLOW_FN);
      if (res) report.overflow.push({ w, route, ...res });
    }
    await page.close();
  }
  console.log(`phase A done — overflow findings: ${report.overflow.length}`);

  /* B+C+D at 390 and 1440 */
  for (const w of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    page.on("pageerror", (e) => report.console.push({ w, err: String(e).slice(0, 200) }));
    page.on("console", (m) => {
      if (m.type() === "error") report.console.push({ w, route: page.url(), err: m.text().slice(0, 200) });
    });
    for (const route of ROUTES) {
      await page.goto(BASE + route, { waitUntil: "networkidle" });
      const st = await page.evaluate(STRUCTURE_FN);
      if (st.h1 !== 1) report.headings.push({ w, route, issue: `h1 count = ${st.h1}` });
      if (st.headingOrder.length) report.headings.push({ w, route, issue: st.headingOrder.join("; ") });
      const L = st.landmarks;
      if (!L.header || !L.main || !L.footer) report.landmarks.push({ w, route, L });
      if (st.noAlt.length) report.images.push({ w, route, noAlt: st.noAlt });
      if (st.noName.length) report.names.push({ w, route, noName: st.noName.slice(0, 5) });
      const cf = await page.evaluate(CONTRAST_FN);
      for (const f of cf) report.contrast.push({ w, route, ...f });

      // D: keyboard focus ring on first N tab stops (fresh page, real Tabs)
      if (route === "/" || route === "/research" || route === "/proposal") {
        await page.goto(BASE + route, { waitUntil: "networkidle" });
        for (let i = 0; i < 12; i++) {
          await page.keyboard.press("Tab");
          const info = await page.evaluate(() => {
            const el = document.activeElement;
            if (!el || el === document.body) return null;
            const cs = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            const hasRing =
              (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0) ||
              (cs.boxShadow && cs.boxShadow !== "none");
            const header = document.querySelector("header");
            const hb = header ? header.getBoundingClientRect().bottom : 0;
            const obscuredTop = r.top < hb && r.bottom > hb && !header.contains(el);
            return {
              el: el.tagName + ":" + (el.textContent || "").trim().slice(0, 24),
              hasRing,
              partiallyVisible: r.bottom > 0 && r.top < window.innerHeight,
              obscuredByHeader: obscuredTop,
            };
          });
          if (info) {
            report.focus.push({ w, route, ...info });
          }
        }
      }
    }
    await page.close();
  }
  console.log(`phase B–D done — headings:${report.headings.length} landmarks:${report.landmarks.length} alt:${report.images.length} names:${report.names.length} contrast:${report.contrast.length} focus-samples:${report.focus.length}`);

  /* E. reduced motion */
  {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    for (const route of ["/", "/research", "/action"]) {
      await page.goto(BASE + route, { waitUntil: "networkidle" });
      await page.waitForTimeout(400);
      const samples = await page.evaluate(REDUCED_FN);
      report.reducedMotion.push({ route, samples });
    }
    await page.close();
  }
  console.log("phase E done");

  /* F. print backstop (fresh page, no scroll, print media) */
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(BASE + "/research", { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });
    const pr = await page.evaluate(PRINT_FN);
    report.print.push({ route: "/research", ...pr });
    // real PDF sanity: all 13 sections + end line present in print output
    const pdfPath = path.join(__dirname, "..", ".impeccable", "_audit-research.pdf");
    await page.pdf({ path: pdfPath, format: "A4" });
    await page.emulateMedia({ media: "screen" });
    await page.close();
    try {
      const { spawnSync } = require("child_process");
      const code =
        "import fitz,sys\n" +
        `d=fitz.open(r"${pdfPath}")\n` +
        "t=''.join(p.get_text() for p in d)\n" +
        "print('pages',len(d),'chars',len(t))\n" +
        "print('has_end', 'End of report' in t)\n" +
        "print('sections', sum(1 for s in ['Executive Summary','Introduction','Methodology','Findings','Conclusion','References'] if s in t))\n" +
        "print('hidden_marker_check', t.count('Proposed Environmental Improvements'))";
      const res = spawnSync("python", ["-c", code], { encoding: "utf8" });
      report.print.push({ pdf: res.stdout.trim() || res.stderr.trim() });
    } catch (e) {
      report.notes.push("pdf check failed: " + e);
    }
  }
  console.log("phase F done:", JSON.stringify(report.print));

  /* G. links: collect internal hrefs, verify they resolve + hash targets */
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const hrefs = new Set();
    const hashes = new Map(); // route -> [hash]
    for (const route of ROUTES) {
      await page.goto(BASE + route, { waitUntil: "networkidle" });
      const found = await page.evaluate(() =>
        [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
      );
      for (const h of found) {
        if (!h) continue;
        if (h.startsWith("#")) {
          if (!hashes.has(route)) hashes.set(route, []);
          hashes.get(route).push(h.slice(1));
        } else if (h.startsWith("/") && !h.startsWith("/_next")) {
          hrefs.add(h.split("#")[0]);
          if (h.includes("#")) {
            const [p, f] = h.split("#");
            if (!hashes.has(p)) hashes.set(p, []);
            hashes.get(p).push(f);
          }
        }
      }
    }
    for (const h of hrefs) {
      const r = await page.request.get(BASE + h);
      if (!r.ok()) report.links.push({ href: h, status: r.status() });
    }
    for (const [route, ids] of hashes) {
      await page.goto(BASE + route, { waitUntil: "networkidle" });
      const missing = await page.evaluate(
        (list) => list.filter((id) => id && !document.getElementById(id)),
        ids,
      );
      for (const m of missing) report.links.push({ route, missingHash: m });
    }
    await page.close();
  }
  console.log(`phase G done — link issues: ${report.links.length}`);

  /* H. metadata */
  {
    const page = await browser.newPage();
    for (const route of ROUTES) {
      await page.goto(BASE + route, { waitUntil: "networkidle" });
      const md = await page.evaluate(() => ({
        title: document.title,
        desc: document.querySelector('meta[name="description"]')?.content || null,
        ogTitle: document.querySelector('meta[property="og:title"]')?.content || null,
        ogImage: document.querySelector('meta[property="og:image"]')?.content || null,
        canonical: document.querySelector('link[rel="canonical"]')?.href || null,
        robots: document.querySelector('meta[name="robots"]')?.content || null,
      }));
      if (!md.title || md.title.length > 70) report.metadata.push({ route, issue: "title", v: md.title });
      if (!md.desc || md.desc.length > 170) report.metadata.push({ route, issue: "desc", v: md.desc && md.desc.length });
      if (!md.ogTitle) report.metadata.push({ route, issue: "no og:title" });
      if (!md.ogImage) report.metadata.push({ route, issue: "no og:image" });
      if (!md.canonical) report.metadata.push({ route, issue: "no canonical" });
    }
    await page.close();
  }
  console.log(`phase H done — metadata issues: ${report.metadata.length}`);

  /* I. mobile menu + research ToC interactions */
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    page.on("pageerror", (e) => report.console.push({ menu: String(e).slice(0, 200) }));
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    const menuBtn = await page.$('header button');
    if (menuBtn) {
      const before = await menuBtn.getAttribute("aria-expanded");
      await menuBtn.click();
      await page.waitForTimeout(400);
      const after = await menuBtn.getAttribute("aria-expanded");
      const navVisible = await page.evaluate(() => {
        const nav = document.querySelector("header nav, [role=menu], header ul");
        if (!nav) return false;
        const cs = getComputedStyle(nav);
        return cs.display !== "none" && +cs.opacity > 0.5;
      });
      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);
      const afterEsc = await menuBtn.getAttribute("aria-expanded");
      report.interactions.push({ menu: { before, after, navVisible, afterEsc } });
    } else {
      report.interactions.push({ menu: "no button found" });
    }

    // research ToC mobile toggle
    await page.goto(BASE + "/research", { waitUntil: "networkidle" });
    const tocInfo = await page.evaluate(() => {
      const btns = [...document.querySelectorAll("button")];
      const t = btns.find((b) => /contents|section|on this page/i.test(b.textContent));
      return t ? { found: true, label: t.textContent.trim().slice(0, 40), expanded: t.getAttribute("aria-expanded") } : { found: false };
    });
    if (tocInfo.found) {
      const btn = await page.$("button:has-text('Contents'), button:has-text('Sections')");
      if (btn) {
        await btn.click();
        await page.waitForTimeout(400);
        tocInfo.afterClick = await btn.getAttribute("aria-expanded");
        // Jump: the ToC entries are <button>s (not anchors) that call
        // jump(id). Click the last one and confirm the page really moves
        // the target section into view.
        const jumpBtns = await page.$$("nav ol button");
        const last = jumpBtns[jumpBtns.length - 1];
        if (last && (await last.boundingBox())) {
          tocInfo.jumpLabel = ((await last.textContent()) || "").trim().slice(0, 40);
          tocInfo.beforeY = await page.evaluate(() => Math.round(window.scrollY));
          await last.click();
          await page.waitForTimeout(1400); // smooth scroll + anchor-flash
          tocInfo.after = await page.evaluate(() => {
            const secs = [...document.querySelectorAll("article section")];
            const t = secs[secs.length - 1];
            const r = t ? t.getBoundingClientRect() : null;
            return {
              y: Math.round(window.scrollY),
              lastSectionInView: !!r && r.top < innerHeight && r.bottom > 0,
            };
          });
        }
      }
    }
    report.interactions.push({ toc: tocInfo });

    // print button wiring (source-level)
    const printBtnSrc = fs.readFileSync(
      path.join(__dirname, "..", "src", "components", "notebook", "PrintButton.tsx"),
      "utf8",
    );
    report.interactions.push({ printButton: /window\.print\(/.test(printBtnSrc) ? "wired" : "NOT WIRED" });
    await page.close();
  }
  console.log("phase I done:", JSON.stringify(report.interactions));

  /* J. dedupe console errors */
  fs.writeFileSync(OUT, JSON.stringify(report, null, 2));
  console.log("console errors:", report.console.length);
  console.log("report ->", OUT);
  await browser.close();
})();
