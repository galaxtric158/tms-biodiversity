/* Batched screenshot capture for review — desktop + mobile in one pass.
 *
 * Two capture defects fixed here (finish-reviewer check 0):
 *  1. Lazy-loaded figures below the fold never enter the viewport, so
 *     fullPage shots showed empty boxes. Now every page is scrolled
 *     top-to-bottom first, which triggers every lazy image.
 *  2. Chromium's single-shot fullPage stitching breaks on very tall
 *     pages (the /research mobile shot appeared to "restart" the
 *     report mid-document). Pages over ~15000px are captured in
 *     viewport-sized segments and stitched with Pillow instead.
 */
const { chromium } = require("playwright-core");
const path = require("path");
const { spawnSync } = require("child_process");

const EXE =
  "C:\\Users\\edmun\\AppData\\Local\\ms-playwright\\chromium-1234\\chrome-win64\\chrome.exe";
const BASE = "http://localhost:3111";
const OUT = path.join(__dirname, "..", ".impeccable", "review");
const STITCH_THRESHOLD = 15000; // px; taller than this -> segment capture

const routes = [
  ["d-home", "/", 1440, 900],
  ["d-research", "/research", 1440, 900],
  ["d-fieldguide", "/field-guide", 1440, 900],
  ["d-record-1", "/field-guide/flowering-tree", 1440, 900],
  ["d-record-4-gap", "/field-guide/tropical-palms", 1440, 900],
  ["d-ecosystem", "/ecosystem", 1440, 900],
  ["d-action", "/action", 1440, 900],
  ["d-roadmap", "/action/roadmap", 1440, 900],
  ["d-proposal", "/proposal", 1440, 900],
  ["d-about", "/about", 1440, 900],
  ["m-home", "/", 390, 844],
  ["m-research", "/research", 390, 844],
  ["m-record-1", "/field-guide/flowering-tree", 390, 844],
  ["m-proposal", "/proposal", 390, 844],
  ["m-action", "/action", 390, 844],
];

async function scrollThrough(page, height) {
  // Dev chrome only (Next devtools portal) — never site content. Force
  // instant scrolling BEFORE the walk: the walk's final return-to-top
  // must not be a smooth animation (an in-flight smooth scroll when we
  // screenshot paints the sticky header mid-document — that is exactly
  // what malformed m-home/m-proposal). And disable scroll anchoring,
  // which silently nudges scrollY when content above the viewport
  // settles — that drift duplicated the footer seam.
  await page.addStyleTag({
    content:
      "nextjs-portal{display:none!important}" +
      "html{scroll-behavior:auto!important;overflow-anchor:none!important}",
  });
  // Walk the whole document so every lazy image and every scroll
  // reveal fires before we capture. Reveal plays once and stays.
  await page.evaluate(async (h) => {
    const step = Math.floor(window.innerHeight * 0.8);
    for (let y = 0; y < h; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, h);
    await new Promise((r) => setTimeout(r, 250));
    window.scrollTo(0, 0);
  }, height);
  // Let any in-flight image decode finish.
  await page.evaluate(() =>
    Promise.all(
      Array.from(document.images)
        .filter((i) => !i.complete)
        .map((i) => new Promise((r) => { i.onload = i.onerror = r; })),
    ),
  );
  // Hard guarantee: never capture with residual scroll — the sticky
  // header paints wherever scrollY happens to be at screenshot time.
  await page.evaluate(async () => {
    for (let i = 0; i < 40 && window.scrollY !== 0; i++) {
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 50));
    }
  });
  await page.waitForTimeout(300);
}

function stitch(parts, outPath, width, total) {
  // parts: [{ path, y }] — pasted at the ACTUAL scroll position each
  // segment was captured at, never an assumed offset.
  const script =
    "from PIL import Image\n" +
    `parts = ${JSON.stringify(parts)}\n` +
    `out = r"${outPath}"\n` +
    `canvas = Image.new('RGB', (${width}, ${total}), (246, 244, 237))\n` +
    "for p in parts:\n" +
    "    im = Image.open(p['path']).convert('RGB')\n" +
    "    canvas.paste(im, (0, p['y']))\n" +
    "canvas.save(out)\n";
  const res = spawnSync("python", ["-c", script], { encoding: "utf8" });
  if (res.status !== 0) throw new Error("stitch failed: " + res.stderr);
}

(async () => {
  const browser = await chromium.launch({ executablePath: EXE });
  for (const [name, route, w, h] of routes) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);

    const fullHeight = await page.evaluate(
      () => document.documentElement.scrollHeight,
    );
    await scrollThrough(page, fullHeight);

    const outPath = path.join(OUT, name + ".png");
    const isMobile = name.startsWith("m-");

    if (isMobile) {
      // Re-measure AFTER scrollThrough: lazy images and late layout
      // can change height, and a stale measure put the stitch offsets
      // wrong (footer seam duplication).
      const total = await page.evaluate(
        () => document.documentElement.scrollHeight,
      );
      if (total > STITCH_THRESHOLD) {
        // Segment capture + stitch: each segment is a real viewport
        // paint, so no single-shot stitching artifact, and lazy images
        // are loaded. The sticky header repaints in every viewport —
        // hide it after the first segment so the stitched image shows
        // it once at the top, as a single-shot full-page capture would.
        // Each segment is pasted at its ACTUAL scroll position: near
        // the document end scrollTo clamps to maxScroll, and pasting
        // at assumed offsets duplicated content there.
        const parts = [];
        let idx = 0;
        let hideStyle = null;
        let prevY = -1;
        while (true) {
          if (idx === 1) {
            hideStyle = await page.addStyleTag({
              content: "header{visibility:hidden!important}",
            });
          }
          const requested = idx * h;
          await page.evaluate((yy) => window.scrollTo(0, yy), requested);
          await page.waitForTimeout(160);
          const actual = await page.evaluate(() => Math.round(window.scrollY));
          if (actual <= prevY && idx > 0) break; // clamped — end reached
          const partPath = path.join(OUT, `.seg-${name}-${idx}.png`);
          await page.screenshot({ path: partPath }); // viewport, not fullPage
          parts.push({ path: partPath, y: actual });
          prevY = actual;
          idx++;
          if (actual + h >= total) break; // final segment covers the end
        }
        if (hideStyle) await page.evaluate((el) => el.remove(), hideStyle);
        stitch(parts, outPath, w, total);
        for (const p of parts) {
          require("fs").unlinkSync(p.path);
        }
        console.log("shot", name, `(stitched ${parts.length} segments)`);
      } else {
        await page.screenshot({ path: outPath, fullPage: true });
        console.log("shot", name);
      }
    } else {
      await page.screenshot({ path: outPath });
      console.log("shot", name);
    }
    await page.close();
  }
  await browser.close();
})();
