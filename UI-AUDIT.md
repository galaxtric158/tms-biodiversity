# UI/UX Audit & Repair — Final Report (PROMPT 3)

**Project:** Tunas Muda Biodiversity — A Living Field Notebook
**Date:** 29 October 2026
**Build under test:** production build (`npm run build` → `next start`, port 3111), 20 static pages
**Method:** automated Chromium audit (`scripts/audit.js`, kept in the repo) + targeted behavioral probes + a line-by-line content-integrity comparison against the source research report (`evaluation.pdf`) by a dedicated review agent, with every wording fix reviewed before it was applied.

---

## 1. Audit summary

The audit covered all 10 routes, seven viewport widths (320 / 375 / 390 / 768 / 1024 / 1440 / 1920), WCAG 2.2 AA, content fidelity to the research report, navigation and information architecture, interaction behaviour (keyboard, mobile menu, in-page navigation, reduced motion), print output, and metadata hygiene.

**Scope note:** this was an audit-and-repair pass, not a redesign. The "bound field notebook" visual identity, palette, typography, motion design and content structure from PROMPT 1/2 were preserved; repairs were surgical.

**Starting condition → final condition:**

| Area | Before | After |
|---|---|---|
| WCAG AA contrast failures | 57 | **0** |
| Horizontal-overflow findings | 4 (1 real bug + 1 real bug hiding in "all routes") | **0** |
| Metadata issues | 26 | **10** (all "no canonical" — deployment-time only) |
| Mobile menu: Escape close + focus return | missing | **implemented** |
| Content-integrity failures vs report | 13 | **0** |
| Headings / landmarks / alt / names / links | 0 issues | 0 issues |
| Focus rings | 72/72 pass | 72/72 pass |
| Console errors | 0 | 0 |
| `npm run typecheck` / `npm run build` | green | green |

Two overflow defects turned out to be **real user-facing bugs** that the original metric (`documentElement.scrollWidth`) had buried inside four "acceptable artifact" findings. Both were reproduced behaviorally, fixed, and re-verified at every width.

---

## 2. Prioritized issue list

Severity: **Critical** = broken for users or compromises research integrity · **High** = accessibility/AA or truthfulness violation · **Medium** = quality/SEO/maintainability · **Low** = polish.

### Critical

| # | Location | Problem | User impact | Correction | Status |
|---|---|---|---|---|---|
| C-1 | `/ecosystem`, evidence-matrix table (all phone widths) | The 760px-wide table's width leaked *through* its own `overflow-x-auto` wrapper and widened the document (`scrollWidth` 753 at a 390px viewport). `html { overflow-x: clip }` did not stop it — Chrome propagates the root's clip to the viewport unreliably; neither `overflow-x: hidden` on `html` nor on `body` helped (verified experimentally). | The **entire page panned sideways 363–400px** on phones (confirmed by full-viewport screenshot pixel-diff). Content shifted out of view; a disorienting, broken-looking layout. | Added `contain-[layout_paint]` (`contain: layout paint`) to the scroller wrapper in `EvidenceMatrix.tsx`, containing the table's overflow at the scroller while it keeps its own horizontal scroll. | ✅ Fixed — `pageScrollX: 0`, `docScrollWidth == viewport` at 320/375/390/768; wrapper still scrolls the full 760px table |
| C-2 | Header, **all 10 routes at 768px** | The inline nav (6 links, 588px) + logo + Proposal CTA needs ≈790px but rendered from `md:` (768px) → nav's right edge at 786px, 18px past the viewport. | Every page panned sideways 18px on tablets/small laptops; last nav item clipped. | Inline nav now renders from `lg:` (1024px); 768–1023px uses the existing menu button/panel (`lg:hidden` on both). | ✅ Fixed — `scrollX: 0`, `sw == cw` at 768; nav visible at 1024, menu button below |
| C-3 | `about/page.tsx` ("Why the project began") | Invented claim: "— yet few of us could name what grows along the paths we walk every day." The report (§5.3, §6) explicitly states student awareness was **identified but never measured** and must not be assumed. | Fabricated finding presented as observation — a research-integrity violation on a Service as Action site. | Deleted the clause; restored the report's own next sentence (§2.1): "This observation inspired our group to investigate the school's plant biodiversity and explore how students could become more environmentally responsible." | ✅ Fixed |
| C-4 | `proposal/page.tsx` (formal letter footer) | Invented sentence: "We would be grateful for the opportunity to present our findings and discuss next steps at the school's convenience." Absent from the report's letter (§12). | A formal letter to the Vice Principal contained wording the group never wrote. | Sentence deleted; letter now ends "Respectfully prepared by:" + names, matching the report. | ✅ Fixed |
| C-4b | Photo alt texts — `observations.ts`, `research.ts`, `AnnotatedPhoto.tsx` | Alt text invented details not attested by the report: "green umbrellas", "brick path", "fenced sports court", "grey block wall", a specific front/behind/above plant arrangement, and the common name "Chinese evergreen" (report says only "Aglaonema species or cultivars"). | Screen-reader users received fabricated scene descriptions; site diverged from its evidence base. | Rewritten to report-attested wording ("…surrounding recreational infrastructure including seating areas and paved surfaces"; "…in rectangular white planters and a larger planting bed…"); `commonName: null` for the Aglaonema entry. Applied consistently in all three files. | ✅ Fixed |

### High

| # | Location | Problem | User impact | Correction | Status |
|---|---|---|---|---|---|
| H-1 | Global palette (57 failures) | Pale tokens used as text on light grounds: `sage` text 1.9:1, `brass` on forest 3.88:1, `brass-ink` 4.22:1, `botanical` on paper-deep 4.41:1, `text-botanical/80` 3.40:1, white SDG numerals on Goal 15 green 2.34:1 and Goal 11 orange 2.09:1 (below even the 3:1 large-text floor). | Low-vision users could not read stamps, plate numbers, table placeholders, roadmap numerals, footer stamp, or SDG tiles. | Token **split**, not blanket change: added `sage-ink #566D5E` and `brass-light #BD9C75`; darkened `botanical → #516F57` and `brass-ink → #755A35` in place (both improve every usage). Swapped to text-safe inks in 7 exact spots; Footer stamp → `brass-light`; Header eyebrow `botanical/80` → full `botanical`; action hover `brass` → `brass-ink`; `sdgNumeralClass()` helper uses forest ink on Goals 15/11 (white kept on Goal 4 red, 5.91:1 — passes). Footer `text-sage` on forest **kept** (5.79:1 passes). | ✅ Fixed — 0 contrast findings |
| H-2 | Header mobile menu | Escape did not close the menu; focus was not returned to the toggle. | Keyboard/screen-reader users trapped in an open panel with no documented exit (WCAG 2.1.2 / 2.4.3). | `keydown` handler: Escape closes and returns focus to the toggle button (`menuButtonRef`). | ✅ Fixed — audited: `afterEsc: "false"` (closed), focus returned |
| H-3 | Nav label "Our Impact" (`/action`) | Label claimed *impact*; nothing has been approved or implemented (report §8 is a future plan). | Overclaims outcomes to teachers/leadership — the exact failure mode the report warns against. | Renamed **"Our Proposals"** everywhere (Header, Footer, Stamp, both back-links, research signpost §9). `/action` title → "Proposed Environmental Improvements" (the report's own §7 heading — also fixes the 76-char title). `/proposal` remains "Proposal to Ms. Gia" — clearly distinct. | ✅ Fixed |
| H-4 | `proposals.ts` (Identification labels) | Opportunity text asserted students "pass the same plants every day without knowing what they are" as fact — the unmeasured assumption §5.3 forbids. | Misrepresents an assumption as a finding. | Hedged to the report's framing: "The group's starting concern — limited student awareness — was identified but never measured…" | ✅ Fixed |
| H-5 | `ecosystem/page.tsx`, `page.tsx`, `action/page.tsx` | Three overclaims: "Leaf discoloration has visible causes" (unconfirmable from photos); "Every recommendation … traces back to a photograph" and "born from something we actually photographed" (Awareness Activities derives from the report's §6 concern, not a photo). | Blur of observed vs interpretive; the site's own traceability promise broke for one proposal. | "…is visible in the photographs, but its causes cannot be confirmed from photographs alone."; traceability chain and `/action` intro now say "…photographed **or from a concern our report raises**". | ✅ Fixed |

### Medium

| # | Location | Problem | Correction | Status |
|---|---|---|---|---|
| M-1 | All routes | No `og:image` — shared links rendered bare. | Added `openGraph.images` to root layout (obs-01 photo, 1200×1600, alt text) → inherited by all 10 routes. | ✅ Fixed — verified present in all 10 production pages |
| M-2 | `/`, `/research`, `/action`, `/proposal` | Descriptions 176–182 chars (>160 guidance). | Trimmed to ≤170 (verified: 105–165 chars). | ✅ Fixed |
| M-3 | `/action`, `/field-guide/[slug]` | Titles 76 and 69 chars (>65). | `/action` retitled (see H-3); slug title drops the `— TM-00x` suffix (ID is on-page and in the breadcrumb). | ✅ Fixed |
| M-4 | `research.ts` / `proposals.ts` header comments | Provenance comments overstated fidelity ("only layout structure was added" / "details the report assigns to each") — the site adds field-guide links, a nav signpost, and authored elaborations. | Comments now state exactly what the site added vs the report. | ✅ Fixed |
| M-5 | `about/page.tsx` | "photographic observation of four locations" — the report counts four **photographs** representing "several outdoor environments", never four locations. | Reworded to the report's own phrasing. | ✅ Fixed |

### Low / reclassified

| # | Location | Finding | Resolution |
|---|---|---|---|
| L-1 | 4 "overflow" findings (dev run) | `scrollWidth`-based metric flagged phone widths. Behavioral testing (forced instant page-scroll + rect scans outside scrollers) proved **no user-visible overflow**: page could not scroll sideways, the wrapper scrolled the full table, nothing was painted past the edge. | **Reclassified as metric artifacts** of `overflow: clip`; `audit.js` rewritten to measure user-visible overflow (page scrollability + offenders outside scroll containers, 12px threshold for intentional tape overhang). The real bugs C-1/C-2 were then found by the upgraded check. |
| L-2 | `field-guide/page.tsx:59` | `commonName` rendered unguarded. | Verified `featured = observations[0]`, which always has a non-null common name — no change made (no speculative edit). |
| L-3 | Research ToC, roadmap states | Verified **not** color-only: active ToC item adds `font-bold` + stop-flag `aria-label`; roadmap state is carried by explicit `StatusBadge` text. | No fix needed — confirmed compliant. |

---

## 3. Implemented fixes (files touched)

**Layout / components**
- `src/components/fieldguide/EvidenceMatrix.tsx` — `contain-[layout_paint]` on the table scroller (C-1)
- `src/components/layout/Header.tsx` — nav `md:flex→lg:flex`, toggle + panel `md:hidden→lg:hidden` (C-2); Escape close + focus return (H-2); label "Our Proposals" (H-3); eyebrow `text-botanical/80→text-botanical` (H-1)
- `src/components/layout/Footer.tsx` — "Our impact" → "Our Proposals"; stamp `text-brass→text-brass-light` (H-1/H-3)
- `src/components/notebook/AnnotatedPhoto.tsx` — report-aligned alt (C-4b)
- `src/components/research/…`, `src/components/fieldguide/EvidenceMatrix.tsx` — `text-sage→text-sage-ink` where on light grounds (H-1)

**Content / pages**
- `src/content/observations.ts` — alt texts (C-4b), `commonName: null`
- `src/content/research.ts` — figure alt (C-4b), signpost "Our Proposals" (H-3), provenance comment (M-4)
- `src/content/proposals.ts` — provenance comment (M-4), identification-labels opportunity hedge (H-4)
- `src/content/sdgs.ts` — `sdgNumeralClass()` helper with rationale comment (H-1)
- `src/app/about/page.tsx` — invented clause → report wording (C-3); "four locations" rewording (M-5); SDG numerals (H-1); sage-ink swap
- `src/app/proposal/page.tsx` — invented letter sentence deleted (C-4); description trimmed (M-2)
- `src/app/ecosystem/page.tsx` — leaf-discoloration wording (H-5)
- `src/app/page.tsx`, `src/app/action/page.tsx` — traceability claims (H-5); titles/descriptions (M-2/M-3); Stamp + back-links (H-3); SDG numerals (H-1); sage-ink hover swap
- `src/app/research/page.tsx`, `src/app/field-guide/page.tsx`, `src/app/action/roadmap/page.tsx`, `src/app/action/[slug]/page.tsx` — sage-ink swaps (H-1), back-link labels (H-3)
- `src/app/layout.tsx` — `openGraph.images` (M-1), description trimmed (M-2)
- `src/app/field-guide/[slug]/page.tsx` — title fix (M-3)

**Tokens / docs / tooling**
- `src/app/globals.css` — `sage-ink`, `brass-light` added; `botanical`, `brass-ink` darkened; rationale comment
- `DESIGN.md` — colors frontmatter updated; nav breakpoint, Escape behaviour, and the table-containment rule documented
- `scripts/audit.js` — user-visible overflow check, ToC jump verification, title/desc thresholds (kept in repo for re-runs)

---

## 4. Remaining limitations (honest list)

1. **No canonical URLs and no `metadataBase`.** No deployment domain exists yet, so canonical tags cannot be written and the OG image resolves against `http://localhost:3000` (Next.js build warning). **Action at deploy:** set `metadataBase` to the real domain; add `alternates.canonical` per route. This is the only remaining audit finding (10 × "no canonical").
2. **`og:image` is portrait (1200×1600)** — the source photograph's aspect, not the 1200×630 most social platforms prefer. Consider a landscape crop before launch.
3. **Contrast over photographs could not be verified statically:** the `AnnotatedPhoto` caption chip (`bg-forest-deep/55 text-paper/90`, blurred) and `Marks.tsx` stamps (`bg-paper/60`) composite over photo pixels whose brightness varies by image. The blurred dark chip is a defensible mitigation, but exact ratios depend on the underlying pixels — re-check visually against each photo after any image swap.
4. **Development-server flakiness under OneDrive** (intermittent 404s, webpack cache rename errors) made early dev-server readings unreliable; every number in this report comes from the **production build**, which was immune.
5. **No `lint` script exists** in this project; `npm run build` runs ESLint + type checks, and `npm run typecheck` (`tsc --noEmit`) was run separately. Both green.

---

## 5. Test results — what was actually tested vs not

### Tested (this session, production build, `localhost:3111`)

- **Browser:** headless Chromium (Playwright `chromium-1234`) on Windows 11 — **the only browser tested**.
- **Routes:** all 10 (`/`, `/research`, `/field-guide`, 2 field-guide records, `/ecosystem`, `/action`, 5 action proposals, `/action/roadmap`, `/proposal`, `/about`).
- **Viewports:** 320, 375, 390, 768, 1024, 1440, 1920 (overflow sweep); interactions at 390; structure/print at 1440.
- **Overflow (behavioral, not just metrics):** forced instant page-scroll at each width → `scrollX: 0` everywhere after repair; evidence-matrix wrapper scrolls the full 760px table internally (246/301/316/654px clients at 320/375/390/768); nothing painted beyond the viewport outside scroll containers; screenshot pixel-diff before/after scroll attempt = identical.
- **Accessibility (automated):** headings, landmarks, image alts, accessible names, links — 0 issues; 72/72 tab stops show a visible focus ring; contrast sweep — 0 failures (57 before).
- **Interaction:** mobile menu opens/closes, Escape closes it and returns focus; research ToC jump lands the last section in view (`lastSectionInView: true`, scrollY 25879); print button wired.
- **Reduced motion:** reveal animations fully disabled; all content visible.
- **Print:** `/proposal` → 23-page PDF, 6 sections, "End of report" marker present, hidden-print elements absent from the PDF.
- **Metadata:** titles ≤70 chars, descriptions 105–165 chars, `og:image` present on all 10 pages.
- **Console:** 0 errors across all routes/widths.
- **Build:** `npm run typecheck` ✓ · `npm run build` ✓ (20 static pages; lint + types pass inside build).

### Not tested — no claims made

- **No real devices** (phones, tablets, or monitors) and no physical touch gestures.
- **No other browsers:** Firefox, Safari, Edge, iOS Safari, and Chrome/Android were **not** run. All results are Chromium-only.
- **No screen readers** (NVDA, JAWS, VoiceOver) were used; accessible names/roles were checked via the accessibility tree only.
- **No browser zoom / OS magnification** (200% / 400% reflow, WCAG 1.4.10) was tested.
- **No color-blindness simulation** (deuteranopia/protanopia/tritanopia) was run.
- **No performance testing** (Lighthouse, Core Web Vitals, network throttling, cold-cache timing).
- **No live-deployment checks:** canonical behavior, OG scrapers (Twitter/LinkedIn/WhatsApp previews), and sitemap/robots were not exercised — there is no deployment yet.
- **No automated spell-check or grammar pass.**
- **Contrast over photographs** (caption chips/stamps) was not pixel-verified — see limitation 3.

---

*Re-run the audit any time: start the production build, then `node scripts/audit.js`. Machine-readable evidence: `.impeccable/audit-report.json`.*
