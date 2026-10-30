---
name: Tunas Muda Biodiversity — The Bound Field Notebook
description: A student research archive dressed as a bound field notebook — warm dot-grid paper, taped-in photographic prints, brass specimen stamps, and evidence state carried by line treatment.
colors:
  paper: "#F6F4ED"
  paper-deep: "#EFECE1"
  stone: "#E8E5DB"
  moss: "#DFE7D8"
  sage: "#A8B8A0"
  sage-ink: "#566D5E"
  botanical: "#516F57"
  forest: "#203B32"
  forest-deep: "#16281F"
  ink: "#202822"
  ink-soft: "#4A544C"
  brass: "#B18B5D"
  brass-light: "#BD9C75"
  brass-ink: "#755A35"
typography:
  display:
    fontFamily: "Instrument Serif, 'Iowan Old Style', Georgia, serif"
    fontSize: "clamp(2.9rem, 7.5vw, 5.9rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Instrument Serif, 'Iowan Old Style', Georgia, serif"
    fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)"
    fontWeight: 400
    lineHeight: 1.18
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Geist, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Geist, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.14em"
    fontFeature: "tabular-nums"
rounded:
  sm: "2px"
  md: "3px"
components:
  button-primary:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.forest-deep}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.forest}"
    rounded: "{rounded.md}"
    padding: "14px 24px"
  status-proposed:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
  status-requires-approval:
    backgroundColor: "rgba(177, 139, 93, 0.15)"
    textColor: "{colors.brass-ink}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
  status-in-progress:
    backgroundColor: "{colors.botanical}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
  specimen-stamp:
    backgroundColor: "rgba(246, 244, 237, 0.6)"
    textColor: "{colors.brass-ink}"
    rounded: "0px"
    padding: "7px 12px"
---

# Design System: Tunas Muda Biodiversity — The Bound Field Notebook

## Overview

**Creative North Star: "The Bound Field Notebook"**

This is a school campus's overlooked vegetation given the care of a real research
archive. The page object is a bound field notebook lying open: warm dot-grid paper
ground (`paper`), photographs taped in with overhanging tape strips, specimen
stamps pressed in brass, and dense specimen data set in tracked small caps. The
natural-history-museum register — plate numbers, leader-line annotations, archival
captions — supplies the precision; the notebook supplies the warmth. It explicitly
refuses the sustainability landing page (green hero + three eco-cards) and every
predictable eco-branding move: no neon greens, no saturated gradients, no blobs.

The system's second idea is that **evidence state is a visual material**. Solid
line means observed, dashed means preliminary, dotted means unrecorded — the same
three treatments mark list bullets, section borders, confidence marks, and the
missing photograph, which becomes a designed woven gap rather than a substitute
image. Motion extends the same temperament: one easing curve, one duration scale,
reveals that play once and never fight the reader.

Density is editorial and asymmetric: 1240px containers split into unequal columns
(1.06/0.94, 1.3/1, 0.9/1.1), hairline ledgers built from 1px gaps, long-form prose
capped at a 68ch measure. The site is predominantly light paper with dark forest
sections used as punctuation — the closing spread and footer.

**Key Characteristics:**

- Warm paper ground with 26px dot-grid ruling and fine SVG paper grain
- Photographs as physical objects: taped prints with overhanging tape, deep soft shadows, plate numbers
- Evidence state as line treatment: solid = observed, dashed = preliminary, dotted = unrecorded
- Brass reserved for stamps, plate numbers, and specimen labels — the only accent
- Instrument Serif display (with italic as a voice) over Geist grotesque small caps
- Near-square geometry (2–3px), hairline borders, tonal depth instead of card shadows
- Motion: one curve (`--ease-journal`), four durations, one-shot reveals, pointer-gated hovers

## Colors

A predominantly light palette of warm paper and desaturated botanical greens, with
brass as the single accent and deep forest-ink for meaning-bearing dark sections.

### Primary

- **Forest** (`forest`): headings, primary buttons, active nav states, dark closing
  sections and footer. The ink of the notebook.
- **Botanical** (`botanical`): the observed-evidence green — solid confidence lines,
  active nav underline, "In progress" badges, inline links, the caret color. The
  living accent.
- **Forest Deep** (`forest-deep`): primary-button hover, dark photo-label chips,
  deepest section ground.

### Secondary

- **Brass** (`brass`): stamp frames, preliminary (dashed) confidence lines, "Requires
  approval" badge tint. Always thin or tinted — never a fill.
- **Brass Ink** (`brass-ink`): stamped label text — plate numbers, section labels,
  stamp copy, focus outline. Readable brass for small type.

### Neutral

- **Paper** (`paper`): the page ground and cell fill; text on forest sections.
- **Paper Deep** (`paper-deep`): alternating section band, evidence-gap ground,
  scrollbar track. Tonal depth without borders.
- **Stone** (`stone`): hairline borders, the hairline-ledger gap color, roadmap rail.
  The system's ruling color.
- **Moss** (`moss`): tape strips, secondary-button hover wash, selection background,
  the anchor-flash tint. A supportive wash, never type.
- **Sage** (`sage`): dotted (unrecorded) lines, dashed placeholder borders, dividers
  at 45–50% opacity, dot-grid dots, footer secondary text. The uncertainty color.
- **Ink** (`ink`): body text on paper.
- **Ink Soft** (`ink-soft`): captions, secondary prose, "Proposed" badge text,
  metadata. Never gray — it is a green-gray tinted from the hue.

### Named Rules

**The Line-State Rule.** Evidence state is carried by line treatment, not by color
alone: 2px solid `botanical` = observed directly, 2px dashed `brass` = preliminary,
2px dotted `sage` = not recorded. Every confidence display ships with the standing
legend. Never introduce a fourth treatment or reassign these three.

**The Brass-Rarity Rule.** Brass appears only as thin frames, small caps text, or
15%-opacity tints — stamps, plate numbers, section labels, focus rings. It never
becomes a large fill or a button background; its rarity is what makes it read as
pressed metal on paper.

**The Forest-as-Punctuation Rule.** Dark forest sections are events, used to close a
narrative (home closing spread, footer) — never alternating card backgrounds. On
forest, body copy uses `moss`/`sage` tints and headings use `paper`.

## Typography

**Display Font:** Instrument Serif (400, normal + italic; fallback "Iowan Old Style",
Georgia, serif)
**Body Font:** Geist (variable; fallback system-ui, -apple-system, "Segoe UI", sans-serif)

**Character:** A high-contrast old-style serif for display and a neutral grotesque for
everything functional — the natural-history-plate pairing. The serif carries voice
and italic emphasis; the grotesque carries specimen data in tracked, tabular small
caps. Both load via `next/font` with `display: swap`.

### Hierarchy

- **Display** (400, `clamp(2.9rem, 7.5vw, 5.9rem)`, lh 1.02, ls −0.015em, balanced
  wraps): hero headline only. Page titles step down to `clamp(2rem–2.5rem, ~5vw,
  3rem–4.6rem)` per page (proposal letter 3rem, record pages 4.2rem, research masthead
  4.6rem).
- **Headline** (400 serif, `clamp(1.8rem, 3.6vw, 2.6rem)`, lh 1.18): section headings.
  The closing spread uses up to `clamp(2.2rem, 5vw, 3.8rem)`.
- **Title** (Geist 700, 1.05–1.2rem): ledger and list item titles in `forest`.
- **Body** (Geist 400, 1.0625rem, lh 1.65): base copy; prose paragraphs capped at
  68ch with 1.1em paragraph spacing (`.prose-journal`). Lead paragraphs run
  1.02–1.13rem at lh 1.7–1.78.
- **Label** (Geist 600, 0.6875rem, ls 0.14em, uppercase, tabular figures): stamps,
  plate numbers, section labels, badges, table keys, breadcrumb links.
- **Captions** (Geist 400, 0.82–0.9rem, `ink-soft`): figure captions, footnotes,
  caveats.
- **Numeral display** (serif 400, 2.6rem, tabular): ledger indicator values in
  `brass-ink`; roadmap phase numbers in `botanical` (live) or `sage-ink` (proposed).

### Named Rules

**The Label Rule.** Anything a museum would stamp or index — stamps, plate numbers,
badges, table keys, breadcrumbs, and dense section headings set in the specimen
register — is Geist label style (11px/600/0.14em uppercase, tabular). Everything a
human reads in sentences is sentence case. Scientific binomials and pull-quote
emphasis use the serif italic (`font-display italic`) — never bold the display
face. (Record headers *are* the label — a heading in label style; the build's
occasional brass label-line above a display heading is a carried defect, not a
pattern to repeat; see Do's and Don'ts.)

**The Measure Rule.** Long-form prose never exceeds ~68ch (`.prose-journal p`);
supporting copy blocks cap at 46–64ch via `max-w-*`. Headlines use `text-wrap:
balance` and explicit `max-w-[Nch]` to control line count.

## Layout

- **Container:** 1240px max, page gutters `px-5` → `sm:px-8`. The proposal letter
  page is a single 920px sheet centered on a `paper-deep` desk.
- **Section rhythm:** `py-16` → `lg:py-24` between bands; bands separated by 1px
  `stone` borders and alternate `paper` / `paper-deep` grounds.
- **Grids:** asymmetric two-column spreads (`lg:grid-cols-[1.06fr_0.94fr]` hero,
  `[1.3fr_1fr]` question, `[0.9fr_1.1fr]` record pages) with `gap-12`→`lg:gap-16/20`.
  Ledger grids are hairline: `grid gap-px` over a `stone` background with `paper`
  cells — the 1px gap becomes the rule.
- **Sticky:** research ToC (270px column) and field-guide evidence print stick at
  `lg:top-24`; released below `lg` where the grid collapses to one column. The
  sticky header sits at `top-0 z-50`.
- **Header:** compacts on scroll past 24px — height `4.75rem` → `3.5rem`, a shadow
  appears, `--dur-ui` transitions. `bg-paper/92` with 6px backdrop blur and a
  `sage/45` bottom border.
- **Anchors:** `scroll-padding-top: 6.5rem` clears the sticky header; `html` scrolls
  smoothly (disabled under reduced motion and during scripted capture).
- **Overflow containment:** `main` carries `overflow-x-clip` (and `html` a belt-
  and-braces `overflow-x: clip`) so taped-print tape strips can overhang the page
  padding and run off the page edge — as tape does — without inflating the
  document width or breaking sticky positioning. Use `clip`, never `hidden`: `hidden`
  would create a scroll container and kill sticky.
- **Responsive:** below `lg`, all spreads collapse to one column and sticky
  releases; below `md`, the primary nav becomes a disclosure menu (lucide Menu/X,
  `aria-expanded`, `menu-in` animation); the research ToC becomes a collapsible
  "Contents" disclosure below `lg`.

## Elevation & Depth

Flat by default. Depth is made the notebook's way — tonal steps (`paper` →
`paper-deep`), hairline `stone` borders, and the hairline-ledger gap — not by
floating cards. Shadows appear only where something is pretending to be a physical
object resting on the page, always tinted to `ink` with heavy negative spread so
they read as soft lift, not drop-shadow chrome.

### Shadow Vocabulary

- **Taped print lift** (`0 22px 44px -30px rgba(32,40,34,0.55)`): photographs taped
  into the notebook (field-guide prints).
- **Hero print lift** (`0 30px 60px -34px rgba(32,40,34,0.6)`): the annotated hero
  photograph, slightly stronger.
- **Sheet lift** (`0 30px 60px -40px rgba(32,40,34,0.45)`): the proposal letter
  sheet floating on the `paper-deep` desk.
- **Header lift** (`0 1px 0 0 stone, 0 10px 24px -18px rgba(32,40,34,0.35)`): applied
  only while scrolled — state indication, not decoration.
- **Stamp inset** (`inset 0 0 0 3.5px paper, inset 0 0 0 4.5px brass/55%` inside a
  1.5px brass border): the double-ring specimen stamp.

### Named Rules

**The Physical-Object Rule.** A shadow means an object resting on the page — a
photograph, a sheet of paper, a header that has changed state. Ordinary containers,
list items, and links are flat. If a new element isn't pretending to be a physical
thing, it gets a hairline border and a tonal step, not a shadow.

## Shapes

Near-square throughout: buttons, nav links, and the mobile toggle use 3px radius;
badges, focus rings, and photo-label chips use 2px; stamps and ledger cells are
sharp. Borders are 1px hairlines (`stone`, or `sage` at 45–50% for softer rules);
dashed and dotted borders are reserved for meaning — dashed `sage` marks the missing-
evidence frame, dashed `botanical/35%` edges mark tape strips, dotted `sage` marks
unrecorded state. Recurring silhouettes: the 96×26px tape strip rotated −4°/−3°
overhanging the print corners; the 45°-rotated folded-corner chevron that ends each
traceability-chain cell; the SVG weave (14px solid+dotted grid) inside the evidence
gap. No pills, no circles except the annotation leader-line anchor dots.

## Components

### Buttons

- **Primary:** `forest` fill, `paper` text, 3px radius, 14px 24px padding, Geist
  600 ~0.98rem. Hover → `forest-deep` (`--dur-ui`). Optional trailing arrow
  translates +4px on group hover, gated behind `motion-hover`.
- **Secondary:** transparent, 1px `forest/50` border, `forest` text, same metrics.
  Hover → border `forest`, wash `moss/60`.
- **Inverse (on forest):** `paper` fill with `forest` text, or `sage/70` border with
  `paper` text; hover fills `forest-deep`.
- **Inline text link:** `botanical`, semibold, `underline-offset-4`, underline on
  hover; trailing `→`.
- **Focus everywhere:** 2px solid `brass-ink` outline, 3px offset, 2px radius
  (`:focus-visible`).

### Chips (Status Badges)

Truthful states only — the vocabulary is closed: **Proposed** (`sage` border, `paper`
fill, `ink-soft` text), **Requires approval** (`brass/15` fill, `brass-ink/70` border,
`brass-ink` text), **In progress** (`botanical` fill, `paper` text). Label type, 2px
radius, 4px 10px padding. "In progress" belongs to the website itself — the one
initiative the group is executing — and to nothing else.

### Cards / Containers

No floating cards. Ledger cells, chain steps, and lists sit on `paper` inside a 1px
`stone` hairline grid (`gap-px` over `stone`); hover washes are `moss/45` at
`--dur-ui`. The dossier panel is a `forest/25`-bordered inset on `forest/4%`; the
"what we are careful to say" honesty block is a 2px dotted `sage` left border on
`paper-deep`. The proposal is a single bordered `paper` sheet with 2px `forest/25`
header/footer rules.

### Navigation

Header links: Geist 500 0.9rem, `ink-soft` → `forest` on hover/active, with a 2px
`botanical` underline indicator that scales in from the left (`scale-x-0`→`100%`,
origin-left) — state indication, `--dur-ui`. The inline nav row (≈790px with the
logo and CTA) renders from `lg` (1024px); below that the menu button and panel
take over, so tablets never overflow. The Proposal CTA is a bordered link
that fills `forest` when active or hovered. Logo mark: a 10px brass-bordered diamond
that rotates 45°→135° on hover (pointer-gated). Mobile menu drops from under the
header edge (`menu-in`, −6px, no scale or bounce) and closes on route change
or Escape (focus returns to the toggle button). The evidence-matrix scroller uses
`contain: layout paint` so its 760px table cannot widen the document (Chrome leaks
nested-scroller overflow to the viewport; `overflow-x: clip` on `html` does not
stop it) — the wrapper keeps its own horizontal scroll.
The research ToC tracks the active section via a scroll listener, persists the last
section to `localStorage` (`tm-last-section`), and flashes the target moss→transparent
(`anchor-flash`, 900ms, removed on `animationend`) after an in-page jump — which
works because report sections are transparent.

### Signature Components

- **Stamp** (`Stamp`): label type inside the brass double-ring frame, `paper/60`
  fill. Used for the masthead stamp ("TUNAS MUDA / SERVICE AS ACTION / 2026"),
  record IDs, section stamps, and "Proposed · Awaiting review".
- **Taped Print** (`TapedPrint`): `aspect-[3/4]` photo on `stone`, hairline border,
  print-lift shadow, two 96×26px `moss/68%` tape strips rotated −4°/−3° and
  overhanging the corners; figcaption pairs a `brass-ink` plate label with a 0.85rem
  caption. `src={null}` renders the honest alternative —
- **Evidence Gap** (`MissingEvidence`): a designed placeholder, never a substitute
  photo — dashed `sage` frame, `paper-deep` ground, SVG weave pattern, dashed camera
  icon, "Evidence gap" label, and plain-language copy that the record stays open.
  Carries `role="img"` with the would-be alt text. Observation 4 (palms by the
  boundary wall) ships this way because no photograph exists.
- **Annotated Photo** (`AnnotatedPhoto`): hero print with SVG leader lines (paper-
  colored, dashed at rest, solid + enlarged anchor dot when active) and HTML label
  buttons at the report's own recorded characteristics. Hover *and* keyboard focus
  activate a label; transitions are 220ms `--ease-journal`. Labels sit on
  `forest-deep/55` chips with 2px backdrop blur, flipping to `paper`/`forest` when
  active.
- **Confidence Mark / Legend** (`ConfidenceMark`, `ConfidenceLegend`): a 40px line
  sample in the state's treatment above its label — "Observed directly" (solid),
  "Preliminary — genus/family level" (dashed), "Not recorded" (dotted). The legend
  ships wherever confidence appears.
- **Print furniture:** `PrintButton`, `.no-print`, `.print-plain`, `.print-break-
  inside-avoid`, `.print-break-before`; `@media print` forces white ground, 11pt,
  18mm/16mm margins, hides header/footer/nav, expands external link hrefs, and —
  critically — forces every reveal state visible (`opacity: 1; transform: none`).

### Motion — "The Quiet Rhythm of Nature"

One easing curve extended, never forked: `--ease-journal: cubic-bezier(0.22, 1,
0.36, 1)`. Four durations: `--dur-micro: 160ms` (press/toggles), `--dur-ui: 220ms`
(hover, nav, disclosure), `--dur-reveal: 520ms` (content entrances), `--dur-hero:
720ms` (the hero print). Keyframes: `journal-in` (rise 14px + fade),
`stamp-settle` (scale 0.94, rotate −1.2°), `print-lay` (rise 20px, rotate −0.7°),
`rule-draw` (scaleX from left), `anchor-flash` (moss→transparent), `menu-in`.

- **Hero sequence:** stamp settles first (480ms), headline rises at 120ms/640ms,
  support and CTAs stagger at 240/340/440ms, the print is laid in at 260ms/720ms.
  The headline is readable throughout; nothing waits longer than 460ms to appear.
- **Scroll reveal** (`Reveal`): the only client reveal mechanism. Server HTML is
  always visible — the hiding state `[data-motion-pending] .reveal-child` is applied
  only after JS mounts, skips elements already ≥92% in viewport, is skipped entirely
  under `prefers-reduced-motion`, and plays once via IntersectionObserver
  (`rootMargin: 0 0 -12% 0`, `threshold: 0.05`), then disconnects. Children stagger
  by `:nth-child` (60–360ms) — no stagger prop; add `reveal-child` to direct children.
  Without JS, nothing is ever hidden.
- **Where it's used:** hero entrance; header compaction and nav underline (state
  indication); pointer-gated arrow shifts and the field-guide image hover
  (`scale-[1.035]`, `--dur-reveal`); one-shot reveals on the home project-facts
  ledger, action/proposal ledgers, ecosystem plant-forms list, about team grid,
  field-guide detail evidence print, roadmap phases; the roadmap `rail-seg`
  connectors that draw in order — neutral `stone`, a sequence, **never a progress
  bar** (status badges carry the truth; nothing may imply proposed phases are
  complete); the research ToC anchor-flash; the mobile menu.
- **Where it's deliberately absent:** the 13-section research report prose (calm
  reading, no scroll reveals), the proposal letter body (it gets exactly one reveal
  — the five-initiatives list — because it is a formal letter). `@media print`
  forces everything visible.
- **Refused patterns (decisions, not omissions):** pointer parallax on specimen
  photos, floating leaves/particles/cursor trails, per-word or per-letter animation,
  scroll-jacking, arbitrary parallax, bounce/scale entrances, scroll-triggered
  re-animation.
- **Accessibility & performance:** `@media (prefers-reduced-motion: reduce)` kills
  smooth scroll, clamps every animation/transition to 0.001s, and CSS backstops the
  armed reveal state to visible; `Reveal` re-checks reduced motion in JS. The
  `motion-hover` custom variant (`hover: hover and pointer: fine`) gates every
  hover-driven *movement* — touch devices get none. Semantic HTML, focus styles,
  and ARIA state are untouched by motion. No animation libraries ship: transform/
  opacity only, one small client component; shared first-load JS ≈103kB.

## Do's and Don'ts

### Do:

- **Do** carry evidence state with the three line treatments (solid/dashed/dotted)
  and always pair confidence marks with the standing legend.
- **Do** ship `MissingEvidence` whenever a photograph is absent — dashed frame, weave,
  plain-language copy — and keep the record open around it.
- **Do** keep the closed status vocabulary (Proposed / Requires approval / In
  progress); "In progress" means the website, and nothing may imply that
  anything has been approved — the plan page states "Improvement plan · Proposed".
- **Do** gate hover-driven movement behind `motion-hover` and time every transition
  on the shared curve and duration scale.
- **Do** use `Reveal` one-shot for major lists and ledgers; keep report prose and the
  letter body static.
- **Do** clip tape overhang with `overflow-x-clip` on `main` (never `hidden`), and
  keep the print backstops working when adding any animated element.
- **Do** build ledgers from `gap-px` over `stone` and separate bands with hairline
  borders and tonal steps.
- **Do** set labels, stamps, and specimen data in tracked uppercase small caps with
  tabular figures, and cap prose at ~68ch.

### Don't:

- **Don't** invent species, counts, wildlife, measurements, approvals, outcomes, or
  photographs. Observed, preliminary, interpretive, and unknown must stay
  distinguishable; limitations stay visible (the dotted line-unrecorded treatment
  and the "what we are careful to say" blocks are load-bearing, not apologetic).
- **Don't** substitute any image, illustration, or stock photo for the missing
  Observation 4 photograph — the evidence gap is the honest answer.
- **Don't** treat site dates as build dates: "27 October 2026" is the report's own
  content truth.
- **Don't** add parallax, particles, floating leaves, cursor trails, per-word
  animation, scroll-jacking, or re-firing scroll animations.
- **Don't** turn the roadmap rail into a progress bar or color it by completion; it
  is neutral sequence, and the badges carry status.
- **Don't** let brass become a fill, add neon greens or gradients, or reach for
  stock sustainability-template layouts, pill shapes, or generic card grids.
- **Don't** add a fourth confidence treatment, a new status value, or a second
  easing curve or duration outside the recorded scale.
- **Don't** add a small-caps label line directly above a display heading (a
  kicker/eyebrow). The heading carries its own weight; use the label style for the
  heading itself or for genuine specimen data, not for a redundant line above it.

### Design-taste audit — deliberate deviations (PROMPT 4)

The design-taste-frontend skill's generic-pattern bans were applied
contextually. These overrides are deliberate and reasoned; they are not
oversights.

- **Instrument Serif for display.** The skill discourages trendy editorial
  serifs, but this one is a *named brand* typeface already carrying the
  site's manuscript identity (DESIGN.md frontmatter, PROMPT 1 seed). It is
  genuinely editorial and reads as a printed field journal, not as a
  luxury-brand imitation. Replacing it would break the recorded botanical
  identity for a rule aimed at untethered AI defaults.
- **Light-only theme.** The skill treats "no dark mode" as a tell, but this
  publication emulates *paper*. A dark variant would contradict the
  dot-grid-paper concept and the print stylesheet. Documented as a
  print-emulating editorial exception, not an unfinished theming layer.
- **Em-dashes retained only where protected.** Site-authored prose
  (hero, about, ecosystem, action, proposal, proposals.ts) was restructured
  to colons, semicolons and parentheses. Em-dashes remain only in verbatim
  report text, the identification dossier quotes, documentary captions
  ("Photograph N — Title"), the scientific confidence taxonomy
  ("Preliminary — genus/family level"), and the EvidenceMatrix "—" empty
  cell. All three are content conventions with meaning, not style
  flourishes.
- **Scroll cue removed.** The banned "scroll down" affordance ("Turn the
  page" + gradient rule) was cut from the hero; the dot-grid spread and
  hero sequence carry the entry on their own.
- **CTA labels unified and sentence-cased.** Title-Case buttons
  ("Explore Our Research", "Read the Research") and duplicate intents were
  consolidated to three canonical labels: "Read the research report",
  "Open the field guide", "Read the proposal to Ms. Gia". The proposal is
  the culminating primary CTA in the closing band.
- **PROMPT 5 renamed the proposal-facing labels (content refactor).** With
  the named-teacher framing removed, the canonical labels are now "Browse
  the plant database" / "Read the research report" (hero) and "Read the
  improvement plan" (closing band; header and footer CTA "Improvement
  plan"). Nav labels: Overview / Plant Database / Research / Ecosystem /
  Improvements / About. Routes are unchanged (/field-guide, /action,
  /proposal), so no redirects are needed.
- **Eyebrow budget enforced.** The generic "From the field guide" label
  above the featured record was removed; the section masthead (Stamp) and
  h2 carry the entry instead.
- **Menu/X icons from lucide-react.** An existing dependency, kept rather
  than hand-drawing glyphs; the skill's icon guidance targets *importing
  new icon packs*, not reusing one already in the bundle.
- **Real metric counters (6 / 4 / 5)** are kept: they are honest project
  facts (six researchers, four observations, five proposals), not
  decorative statistics, and each carries the "not a measurement"
  disclaimer.
- **Annotated-photo label overlays** are scientific callouts (report-recorded
  characteristics with leader lines), not decorative tag chips.

## Recorded limitations (content truth, carried knowingly)

- Observation 4's palm photograph is absent → designed evidence gap; the footer also
  discloses "Photograph 4 currently unavailable".
- The report states exact capture dates were not specified; no Harvard-style
  reference list exists — the report keeps its own suggested sources with their own
  caveat.
- Project PDFs are misnamed: `evaluation.pdf` is the research report;
  `SA RESEARCH REPORT.pdf` is the plant dossier (whose initiative slug is
  `health-monitoring`).
- Finish review disposition: "ship" — two scored fixes (research mobile capture
  integrity, 3px mobile overflow from tape overhang) and two capture regressions
  (sticky header in single-shot captures) verified closed; review evidence lives in
  `.impeccable/review/` (15 captures plus legacy `d-home-full`), produced by
  `scripts/screenshot.js`, which scrolls to fire lazy images and reveals, stitches
  tall pages at true scroll offsets, forces `scrollY === 0`, and hides the devtools
  portal.
