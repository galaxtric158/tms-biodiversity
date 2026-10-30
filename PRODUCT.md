# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: The user answered "no constraints — choose for me" when offered the stack choice, and PROMPT 1 §5 names Next.js (App Router) + TypeScript + Tailwind CSS as the preferred starting stack. Static structured content (typed modules), no database, no authentication, no analytics, no CMS — mandated by PROMPT 1 §5. Deploy target also delegated: the build is Vercel-ready, but no domain, repository, or hosting service has been confirmed by the user, so none is assumed.

## Users

Primary: the Tunas Muda School community — students (the main readers, browsing plants and learning about their campus ecosystem), teachers, and the Vice Principal, Ms. Gia, who reviews the formal proposals. Also: IB MYP assessors evaluating the Service as Action project, and parents visiting the school. Situation: reading at school or at home, sometimes during a live on-screen presentation.

## Product Purpose

A digital biodiversity research platform for a Year 8 IB MYP Service as Action project. It preserves the group's complete 13-section research report, documents four plant observations as a structured field guide, presents an ecosystem analysis, details five proposed environmental improvements, and delivers a formal proposal to school leadership. Success means: the full research report is faithfully represented; observations are browsable and traceable to evidence; every proposal visibly connects to observations; uncertainties and limitations are honestly displayed; and the site is distinctive and presentation-ready.

## Positioning

A student-built research archive where evidence and action are visibly linked: every environmental proposal traces back to a specific photographic observation, and every unknown is labeled as unknown. What a generic sustainability site could not copy is the genuine provenance — six named student researchers, four real school photographs, and an honest account of what photographs cannot prove.

## Operating Context

- IB MYP Service as Action project, Tunas Muda School, Indonesia; research report dated 27 October 2026.
- Six student researchers: Edmund (8M), Nicholas (8T), Austin (8T), Samuel (8Y), Akhtara (8T), Archie (8M). Stakeholder: Ms. Gia, Vice Principal.
- The website itself is Recommendation 1 of the group's own five proposed improvements — the site documents a project that includes making the site.
- Intended to be shown during a school presentation (on-screen, projector) and read individually.
- Future expansion (more observations, verified identifications, monitoring records) is expected; the architecture must accept new records without redesign, but future functionality must never be presented as existing research.

## Capabilities and Constraints

- Static multi-route website: Home, Research (full 13-section publication), Field Guide (4 observation records with detail pages), Ecosystem analysis, Our Impact (5 proposals + roadmap + SDG connections), formal School Proposal, About.
- Print-friendly research and proposal layouts (§5).
- Strict research-integrity rules from the brief override aesthetic convenience: no invented species, counts, measurements, wildlife, approvals, outcomes, or photographs.
- Observation 4 (palms near a boundary wall) has NO photograph on hand — a designed placeholder clearly labeling missing evidence is required (§6); inventing or substituting a photo is forbidden.
- "School-community only" access with a live database was an earlier planning-stage preference; PROMPT 1 §5 supersedes it for this build: static content, no database, no authentication. (Recorded, not silently dropped — a future stage may revisit restriction.)
- No user accounts, no visitor data collection.
- Deadline: not specified by the user despite being offered; treated as none.

## Brand Commitments

- Governing concept, pinned by the brief: **"A Living Field Journal"** — botanical editorial design + natural-history-museum precision + physical-notebook warmth + modern scientific-publication clarity.
- Central idea, pinned: "A healthier ecosystem begins with noticing what already grows around us."
- Palette, pinned as an initial palette to be adjusted intelligently for contrast/harmony: paper `#F6F4ED`, deep forest `#203B32`, botanical green `#54745B`, sage `#A8B8A0`, light moss `#DFE7D8`, warm stone `#E8E5DB`, ink `#202822`, brass accent `#B18B5D`. Predominantly light with meaningful dark forest sections. No neon greens, saturated gradients, or predictable sustainability branding.
- Typography: choose ONE coherent pairing from the pinned options — Instrument Serif + Geist, Fraunces + Inter, or Newsreader + Manrope. Fluid type, strong hierarchy, controlled line lengths.
- Pinned visual motifs (selective use only): fine botanical illustration, scientific annotation lines, specimen numbers, archival captions, thin editorial dividers, botanical silhouettes, notebook labels, subtle paper texture. Excessive cards, blobs, gradients, and arbitrary decoration are banned.
- Avoid: generic sustainability landing templates, stock nature photography passed off as school evidence, corporate marketing language, fabricated metrics, meaningless animations, dead links.

## Evidence on Hand

- `evaluation.pdf` — the complete 13-section "Service as Action Final Research Report" (authoritative research source; full text extracted to `_report_extract.txt`).
- `SA RESEARCH REPORT.pdf` — the group's plant-identification dossier: Bauhinia purpurea L. profile (taxonomy, synonyms, common names; sources flona.jakarta.go.id, droensolobaru.com) and Dieffenbachia/Araceae profile with raphides safety note (source homegarden.cahnr.uconn.edu). Supplementary reference material, not observation evidence.
- `assets/extracted/` — authentic photographs extracted from the dossier PDF: `dossier_p1_img1.png` (flowering Bauhinia at recreational area, ~Observation 1), `dossier_p2_img1.png` (= p5 duplicate; ornamental planting beds, ~Observation 2), `dossier_p4_img1.png` (landscaped pathway with seating/walkway/shrubs, ~Observation 3). All 1200×1600.
- ABSENT and never fabricable: the Observation 4 palm photograph; capture dates (report states "exact capture dates not specified"); any soil/wildlife/survey data; school approvals; species-level identifications confirmed in the field; the full Harvard-style reference list (report offers suggested authoritative sources only).

## Product Principles

1. Evidence over decoration — every visual flourish must serve the research, never substitute for it.
2. Traceability — a visitor can walk from any claim to its supporting observation, photograph, or cited source.
3. Honest uncertainty — confidence levels are stated in words; unknowns stay unknown; limitations stay visible.
4. Student voice — the site reads as six students' careful work, not an institution's marketing.
5. Built to grow — content lives in structured data, separate from presentation, so new observations slot in without redesign.

## Accessibility & Inclusion

Required by the brief (§5): accessible semantic HTML, keyboard navigation, meaningful alt text, appropriate focus indicators, clear heading hierarchy, responsive layouts. Audience includes students and school leadership viewing on projectors, so typography must hold at presentation distance and in print.
