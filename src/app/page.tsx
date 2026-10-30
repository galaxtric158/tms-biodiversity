import Link from "next/link";
import { AnnotatedPhoto } from "@/components/notebook/AnnotatedPhoto";
import { Stamp } from "@/components/notebook/Marks";
import { Reveal } from "@/components/notebook/Reveal";
import { TapedPrint } from "@/components/notebook/TapedPrint";
import { indicators, site } from "@/content/site";

const chain = [
  { label: "Observation", note: "Four photographs of school vegetation", href: "/field-guide" },
  { label: "Evidence", note: "Characteristics recorded, not assumed", href: "/field-guide" },
  { label: "Analysis", note: "What the evidence supports, and what it cannot", href: "/ecosystem" },
  { label: "Improvements", note: "Five initiatives, each traced to evidence", href: "/action" },
  { label: "Action plan", note: "One plan, ready for school coordination", href: "/proposal" },
];

export default function Home() {
  return (
    <>
      {/* ————— HERO: the notebook's opening spread ————— */}
      <section className="dot-grid paper-grain relative overflow-hidden border-b border-stone">
        <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[1.06fr_0.94fr] lg:gap-16 lg:pb-28 lg:pt-20">
          <div className="hero-seq">
            <div className="hero-stamp">
              <Stamp className="no-print">{site.stamp}</Stamp>
            </div>

            <h1 className="display mt-7 text-[clamp(2.3rem,5vw,4rem)] text-forest">
              Discover the biodiversity
              <br />
              growing{" "}
              <span className="italic text-botanical">around us.</span>
            </h1>

            <p className="mt-7 max-w-[54ch] text-[1.13rem] leading-[1.72] text-ink-soft">
              An ongoing exploration of the plants, ecological relationships,
              and environmental conditions within Tunas Muda School.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/field-guide"
                className="btn-press group inline-flex items-center gap-3 rounded-[3px] bg-forest px-6 py-3.5 text-[0.98rem] font-semibold text-paper transition-colors duration-(--dur-ui) ease-(--ease-journal) hover:bg-forest-deep"
              >
                Browse the plant database
                <span
                  aria-hidden
                  className="transition-transform duration-(--dur-ui) ease-(--ease-journal) motion-hover:group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Link
                href="/research"
                className="btn-press inline-flex items-center gap-2 rounded-[3px] border border-forest/50 px-6 py-3.5 text-[0.98rem] font-semibold text-forest transition-colors duration-(--dur-ui) ease-(--ease-journal) hover:border-forest hover:bg-moss/60"
              >
                Read the research report
              </Link>
            </div>

            <p className="mt-10 max-w-[46ch] border-l-2 line-preliminary pl-4 text-[0.85rem] leading-relaxed text-ink-soft">
              {site.centralIdea} Our evidence is four photographs: enough to
              notice, not enough to conclude. Everything here is marked with
              that difference.
            </p>
          </div>

          <div className="hero-print lg:pl-4">
            <AnnotatedPhoto />
          </div>
        </div>

      </section>

      {/* ————— THE QUESTION ————— */}
      <section className="border-b border-stone bg-paper-deep">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
            <div>
              <p className="label text-brass-ink">Our research question</p>
              <p className="display mt-4 text-[clamp(1.7rem,3.6vw,2.65rem)] leading-[1.18] text-forest">
                {site.researchQuestion}
              </p>
            </div>
            <div className="prose-journal self-end">
              <p className="text-[1.02rem] leading-[1.75] text-ink">
                {site.motivation} Rather than simply identifying plants, the
                project aims to understand their ecological significance,
                evaluate observable environmental conditions and recommend
                practical improvements.
              </p>
              <Link
                href="/research"
                className="mt-5 inline-flex items-center gap-2 font-semibold text-botanical underline-offset-4 hover:underline"
              >
                Read the research report
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* ledger of project facts — facts about the project, never biodiversity measurements */}
          <Reveal className="mt-14">
            <dl className="grid gap-px border border-stone bg-stone sm:grid-cols-3">
              {indicators.map((ind) => (
                <div key={ind.label} className="reveal-child bg-paper px-6 py-7">
                  <dt className="label text-ink-soft">{ind.label}</dt>
                  <dd className="mt-2 flex items-baseline gap-3">
                    <span className="display tabular text-[2.6rem] leading-none text-brass-ink">
                      {ind.value}
                    </span>
                    <span className="text-[0.9rem] leading-snug text-ink-soft">
                      {ind.note}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <p className="mt-3 text-[0.8rem] italic text-ink-soft">
            Counts describe this project and its evidence; they are not
            measurements of the school&rsquo;s biodiversity.
          </p>
        </div>
      </section>

      {/* ————— FEATURED RECORD ————— */}
      <section className="border-b border-stone">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20 lg:py-24">
          <TapedPrint
            src="/photos/obs-02-planting-beds-640.jpg"
            alt="Variegated ornamental plants in white planters against a block wall, with arrow-shaped and deeply lobed leaves behind."
            plate="Plate 2"
            caption="Photograph 2 — Ornamental planting beds. Aglaonema, Alocasia or related aroids, and deeply lobed foliage in organized planters."
          />
          <div>
            <h2 className="display text-[clamp(2rem,4.2vw,3.1rem)] text-forest">
              Three plant forms, one planting bed, and honest uncertainty about
              all of them.
            </h2>
            <p className="mt-6 max-w-[58ch] text-[1.05rem] leading-[1.75] text-ink">
              Variegated foliage, large arrow-shaped leaves and deeply lobed
              leaves share these planters. Our report identifies each only to
              genus level (Aglaonema, Alocasia or a related aroid, and
              Thaumatophyllum or a related genus), because different leaf
              colors do not automatically mean different species.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/field-guide/ornamental-beds"
                className="btn-press inline-flex items-center gap-2 rounded-[3px] bg-forest px-5 py-3 text-[0.95rem] font-semibold text-paper transition-colors hover:bg-forest-deep"
              >
                Open this record <span aria-hidden>→</span>
              </Link>
              <Link
                href="/field-guide"
                className="btn-press inline-flex items-center rounded-[3px] border border-forest/40 px-5 py-3 text-[0.95rem] font-semibold text-forest transition-colors hover:bg-moss/60"
              >
                Open the plant database
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ————— THE HONEST SPREAD ————— */}
      <section className="border-b border-stone bg-paper-deep">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="display text-[clamp(1.8rem,3.4vw,2.5rem)] text-forest">
                What the photographs show
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  "Several vegetation forms: flowering trees, ornamental shrubs, broad-leaved tropical plants, variegated foliage and palms.",
                  "Some leaves yellowing or damaged in two of the four observations.",
                  "Planting areas bordered by pavement, paths, walls and seating.",
                  "Plants woven through the daily routes students already walk.",
                ].map((t) => (
                  <li key={t} className="flex gap-3.5">
                    <span className="line-observed mt-[0.75em] w-7 shrink-0" aria-hidden />
                    <span className="text-[1rem] leading-[1.7] text-ink">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="display text-[clamp(1.8rem,3.4vw,2.5rem)] text-ink-soft">
                What they cannot show
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  "Total species richness or any biodiversity score: four photographs are not a survey.",
                  "Why leaves are discolored: aging, water, nutrients or pests all remain possible.",
                  "Soil quality, wildlife diversity or long-term plant health.",
                  "Whether students have helped or harmed their environment: that must be investigated, not assumed.",
                ].map((t) => (
                  <li key={t} className="flex gap-3.5">
                    <span className="line-unrecorded mt-[0.75em] w-7 shrink-0" aria-hidden />
                    <span className="text-[1rem] leading-[1.7] text-ink-soft">{t}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/ecosystem"
                className="mt-7 inline-flex items-center gap-2 font-semibold text-botanical underline-offset-4 hover:underline"
              >
                See the full ecosystem analysis <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ————— THE TRACEABILITY CHAIN ————— */}
      <section className="border-b border-stone">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
          <h2 className="display max-w-[24ch] text-[clamp(1.8rem,3.6vw,2.6rem)] text-forest">
            Every recommendation on this site traces back to a photograph or a
            concern our report raises.
          </h2>
          <ol className="mt-12 grid gap-px border border-stone bg-stone md:grid-cols-5">
            {chain.map((step, i) => (
              <li key={step.label} className="reveal-child group relative bg-paper">
                <Link
                  href={step.href}
                  className="block h-full px-5 py-7 transition-colors duration-(--dur-ui) ease-(--ease-journal) hover:bg-moss/45"
                >
                  <span className="label tabular text-brass-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-[1.05rem] font-bold text-forest">{step.label}</p>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-soft">
                    {step.note}
                  </p>
                  <span
                    aria-hidden
                    className="absolute -right-px top-1/2 hidden h-5 w-5 -translate-y-1/2 rotate-45 border-r border-t border-stone bg-paper transition-transform duration-(--dur-ui) ease-(--ease-journal) motion-hover:group-hover:translate-x-1 md:block"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ————— CLOSE ————— */}
      <section className="relative overflow-hidden bg-forest text-paper">
        <div className="dot-grid absolute inset-0 opacity-[0.07]" aria-hidden />
        <div className="relative mx-auto max-w-[1240px] px-5 py-20 text-center sm:px-8 lg:py-28">
          <h2 className="display mx-auto max-w-[20ch] text-[clamp(2.2rem,5vw,3.8rem)]">
            A more sustainable school starts with noticing.
          </h2>
          <p className="mx-auto mt-6 max-w-[58ch] text-[1.05rem] leading-relaxed text-moss">
            Read the full report, walk the four observation records, then see
            how each becomes an environmental improvement initiative for{" "}
            {site.school}.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/proposal"
              className="btn-press rounded-[3px] bg-paper px-6 py-3.5 text-[0.98rem] font-semibold text-forest transition-colors hover:bg-moss"
            >
              Read the improvement plan
            </Link>
            <Link
              href="/research"
              className="btn-press rounded-[3px] border border-sage/70 px-6 py-3.5 text-[0.98rem] font-semibold text-paper transition-colors hover:bg-forest-deep"
            >
              Read the research report
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
