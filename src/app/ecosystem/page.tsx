import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceMatrix } from "@/components/fieldguide/EvidenceMatrix";
import { Stamp } from "@/components/notebook/Marks";
import { Reveal } from "@/components/notebook/Reveal";

export const metadata: Metadata = {
  title: "Ecosystem Insights",
  description:
    "What the four observations support (plant form diversity, leaf condition, vegetation structure, human influence) and what photographic evidence cannot establish.",
};

const plantForms = [
  { form: "Mature flowering trees", note: "Observations 1 & 3", observed: true },
  { form: "Ornamental shrubs and small trees", note: "Observation 3", observed: true },
  { form: "Broad-leaved tropical plants", note: "Observation 2", observed: true },
  { form: "Variegated foliage plants", note: "Observation 2", observed: true },
  { form: "Palms and other landscaped vegetation", note: "Observation 4", observed: true },
];

const conditions = [
  {
    finding: "Most photographed plants retain substantial green foliage",
    reading: "Indicates living, established vegetation.",
    kind: "observed" as const,
  },
  {
    finding: "Several ornamental plants show discoloration or leaf damage",
    reading: "Possible explanations include natural aging, water imbalance, environmental exposure, nutrient availability or pests. Further examination would be required before identifying any particular cause.",
    kind: "observed" as const,
  },
  {
    finding: "Paved surfaces sit near planting areas",
    reading: "Highlights the importance of investigating soil permeability, root space and water drainage.",
    kind: "observed" as const,
  },
];

export default function EcosystemPage() {
  return (
    <div className="dot-grid">
      <section className="border-b border-stone bg-paper">
        <div className="mx-auto max-w-[1240px] px-5 pb-12 pt-14 sm:px-8">
          <Stamp>Analysis · Report §5–§6</Stamp>
          <h1 className="display mt-6 max-w-[17ch] text-[clamp(2.5rem,6vw,4.6rem)] text-forest">
            Ecosystem insights
          </h1>
          <p className="mt-6 max-w-[66ch] text-[1.1rem] leading-[1.72] text-ink-soft">
            This page is the analysis layer between the photographs and the
            proposals: what the four observations support, what they only
            suggest, and what four photographs simply cannot decide.
          </p>
        </div>
      </section>

      {/* plant form diversity */}
      <section className="border-b border-stone">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:py-20">
          <div>
            <h2 className="display text-[clamp(1.9rem,4vw,2.8rem)] text-forest">
              A visually varied planted environment
            </h2>
            <p className="mt-5 max-w-[52ch] text-[1.02rem] leading-[1.72] text-ink">
              The photographic evidence demonstrates that Tunas Muda School
              contains multiple forms of vegetation.
            </p>
            <p className="mt-5 max-w-[54ch] border-l-2 line-unrecorded pl-4 text-[0.93rem] leading-relaxed text-ink-soft">
              Because the photographs cover only selected locations, they
              cannot be used to calculate total species richness or establish
              the overall biodiversity of the school.
            </p>
          </div>
          <Reveal>
            <ul className="border-t border-stone">
              {plantForms.map((p) => (
                <li
                  key={p.form}
                  className="reveal-child flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-stone py-4"
                >
                  <span className="text-[1.02rem] font-semibold text-forest">
                    {p.form}
                  </span>
                  <span className="label text-brass-ink">{p.note}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* evidence matrix */}
      <section className="border-b border-stone bg-paper-deep">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 lg:py-20">
          <h2 className="display text-[clamp(1.9rem,4vw,2.8rem)] text-forest">
            The evidence matrix
          </h2>
          <p className="mt-4 max-w-[64ch] text-[1rem] leading-[1.72] text-ink-soft">
            Which visible features each photograph actually records: the
            factual base beneath every claim on this site.
          </p>
          <div className="mt-10 border border-stone bg-paper p-4 sm:p-6">
            <EvidenceMatrix />
          </div>
        </div>
      </section>

      {/* plant health */}
      <section className="border-b border-stone">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 lg:py-20">
          <h2 className="display text-[clamp(1.9rem,4vw,2.8rem)] text-forest">
            Plant health &amp; environmental conditions
          </h2>
          <div className="mt-10 space-y-px border border-stone bg-stone">
            {conditions.map((c) => (
              <div
                key={c.finding}
                className="grid gap-4 bg-paper px-6 py-7 lg:grid-cols-[1fr_1.2fr]"
              >
                <div className="flex gap-3.5">
                  <span className="line-observed mt-[0.72em] w-7 shrink-0" aria-hidden />
                  <p className="text-[1.02rem] font-semibold leading-snug text-forest">
                    {c.finding}
                  </p>
                </div>
                <p className="text-[0.97rem] leading-[1.7] text-ink-soft">
                  {c.reading}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* human influence + limits */}
      <section className="border-b border-stone bg-paper-deep">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-20">
          <div>
            <h2 className="display text-[clamp(1.8rem,3.6vw,2.5rem)] text-forest">
              Human influence on the ecosystem
            </h2>
            <div className="prose-journal mt-6">
              <p className="text-[1.02rem] leading-[1.72] text-ink">
                The photographs show that vegetation is closely integrated with
                school facilities, including pathways, seating areas,
                recreational spaces and walls. This relationship creates
                opportunities for environmental education because students
                encounter plants throughout their daily routines.
              </p>
              <p className="text-[1.02rem] leading-[1.72] text-ink">
                However, landscaped ecosystems also require management. Plant
                selection, watering practices, pruning and waste management can
                influence their long-term ecological value.
              </p>
            </div>
          </div>
          <div>
            <h2 className="display text-[clamp(1.8rem,3.6vw,2.5rem)] text-ink-soft">
              The limits of photographic evidence
            </h2>
            <ul className="mt-6 space-y-4">
              {[
                "The available evidence does not establish that students have damaged or neglected the plants.",
                "Student awareness and behavior should be investigated separately rather than assumed.",
                "Wildlife diversity, soil quality and long-term health remain unmeasured.",
                "Leaf discoloration is visible in the photographs, but its causes cannot be confirmed from photographs alone.",
              ].map((t) => (
                <li key={t} className="flex gap-3.5">
                  <span className="line-unrecorded mt-[0.72em] w-7 shrink-0" aria-hidden />
                  <span className="text-[1rem] leading-[1.7] text-ink">{t}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/action"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-botanical underline-offset-4 hover:underline"
            >
              See what we propose next <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
