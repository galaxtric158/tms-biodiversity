import type { Metadata } from "next";
import Link from "next/link";
import { Stamp } from "@/components/notebook/Marks";
import { Reveal } from "@/components/notebook/Reveal";
import { site, team } from "@/content/site";
import { sdgNumeralClass, sdgs } from "@/content/sdgs";

export const metadata: Metadata = {
  title: "About the Project",
  description:
    "Six Year 8 students at Tunas Muda School on why they started a Service as Action biodiversity project, what they investigated, and what they learned.",
};

const reflection = [
  "This project encourages us to recognize that environmental responsibility extends beyond large-scale issues such as climate change and deforestation. It also involves appreciating and protecting the living organisms within our immediate surroundings.",
  "By examining the vegetation at Tunas Muda School, we developed a clearer understanding of how plants contribute to the environment and how scientific observation can reveal opportunities for improvement.",
  "Our research also highlighted the importance of distinguishing evidence from assumptions. Although photographs can reveal visible plant characteristics, they cannot independently explain the causes of plant damage or establish the overall health of an ecosystem.",
  "As a group, we aim to apply our research through environmental education, collaborative planning and realistic recommendations to school leadership.",
  "Our intended contribution is not simply to produce a report, but to encourage a lasting sense of responsibility toward the school’s natural environment.",
];

const workDone = [
  "Photographed four locations on the school grounds.",
  "Analyzed the photographs by plant diversity, plant condition, environmental conditions, ecological significance and human influence.",
  "Wrote a complete thirteen-section research report.",
  "Prepared an identification dossier for the flowering tree and aroids.",
  "Designed and built this website (Recommendation 1 of our own proposal).",
];

const workIntended = [
  "Verify plant identifications beyond what photographs allow.",
  "Collect further photographs, including the missing Photograph 4 of the palms.",
  "Establish regular, comparable plant health monitoring.",
  "Conduct awareness research instead of assuming what students know.",
  "Share these recommendations with the school community and act on its guidance.",
];

export default function AboutPage() {
  return (
    <div>
      {/* masthead */}
      <section className="border-b border-stone bg-paper">
        <div className="mx-auto max-w-[1240px] px-5 pb-12 pt-14 sm:px-8">
          <Stamp>About · IB MYP Service as Action</Stamp>
          <h1 className="display mt-6 max-w-[17ch] text-[clamp(2.5rem,6vw,4.6rem)] text-forest">
            Six students who decided to look closer.
          </h1>
          <p className="mt-6 max-w-[64ch] text-[1.1rem] leading-[1.72] text-ink-soft">
            {site.motivation} This website is what came of it: a record of what
            we noticed, what we concluded, and what we honestly could not.
          </p>
        </div>
      </section>

      {/* the research group — an editorial ledger, not profile cards */}
      <section className="border-b border-stone bg-paper-deep">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 lg:py-20">
          <p className="label border-b border-stone pb-4 text-brass-ink">
            The research group · Year 8
          </p>
          <Reveal>
            <ul className="grid gap-px bg-stone sm:grid-cols-2 lg:grid-cols-3">
              {team.map((m, i) => (
                <li key={m.name} className="reveal-child bg-paper px-6 py-7">
                  <div className="flex items-baseline gap-4">
                    <span className="label tabular text-sage-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-display text-[1.75rem] leading-tight text-forest">
                        {m.name}
                      </p>
                      <p className="label mt-1.5 text-brass-ink">
                        Class {m.className}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          <p className="mt-5 max-w-[70ch] text-[0.85rem] italic leading-relaxed text-ink-soft">
            All six researchers share this work equally; the report credits no
            individual responsibilities, so none are invented here.
          </p>
        </div>
      </section>

      {/* why, what, what we learned */}
      <section className="border-b border-stone">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-20">
          <div className="prose-journal">
            <h2 className="display text-[clamp(1.9rem,4vw,2.8rem)] text-forest">
              Why the project began
            </h2>
            <p className="text-[1.02rem] leading-[1.75] text-ink">
              At Tunas Muda School, we noticed that the surrounding vegetation
              is sometimes overlooked in everyday school activities. Plants
              provide shade, improve outdoor spaces and create chances to learn
              about ecological relationships. This observation inspired our
              group to investigate the school&rsquo;s plant biodiversity and
              explore how students could become more environmentally
              responsible.
            </p>
            <p className="text-[1.02rem] leading-[1.75] text-ink">
              Rather than simply identifying plants, our project aims to
              understand their ecological significance, evaluate observable
              environmental conditions and recommend practical improvements.
            </p>
            <h2 className="display mt-12 text-[clamp(1.9rem,4vw,2.8rem)] text-forest">
              What we investigated
            </h2>
            <p className="text-[1.02rem] leading-[1.75] text-ink">
              {site.researchQuestion} We approached it qualitatively, through
              four photographs representing several outdoor environments: a
              flowering tree near recreational facilities, ornamental planting
              beds, landscaped pathways and an area containing palms.
            </p>
          </div>

          <div>
            <h2 className="display text-[clamp(1.9rem,4vw,2.8rem)] text-forest">
              What we learned
            </h2>
            <p className="mt-5 max-w-[58ch] border-l-2 line-preliminary pl-4 text-[0.97rem] leading-relaxed text-ink-soft">
              Our research highlighted the importance of distinguishing
              evidence from assumptions. Photographs reveal visible plant
              characteristics, but they cannot independently explain the causes
              of plant damage or establish the overall health of an ecosystem.
            </p>
            <p className="mt-5 max-w-[58ch] text-[1rem] leading-[1.72] text-ink">
              That lesson shaped this entire website: every claim here is
              labeled as observed, preliminary, interpretive or simply unknown.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/research#reflection"
                className="btn-press inline-flex items-center gap-2 rounded-[3px] bg-forest px-5 py-3 text-[0.95rem] font-semibold text-paper transition-colors hover:bg-forest-deep"
              >
                Our full reflection <span aria-hidden>→</span>
              </Link>
              <Link
                href="/proposal"
                className="btn-press inline-flex items-center rounded-[3px] border border-forest/40 px-5 py-3 text-[0.95rem] font-semibold text-forest transition-colors hover:bg-moss/60"
              >
                The improvement plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* completed vs intended — never blur the line */}
      <section className="border-b border-stone bg-paper-deep">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="display text-[clamp(1.8rem,3.6vw,2.5rem)] text-forest">
                What is done
              </h2>
              <ul className="mt-6 space-y-4">
                {workDone.map((t) => (
                  <li key={t} className="flex gap-3.5">
                    <span className="line-observed mt-[0.75em] w-7 shrink-0" aria-hidden />
                    <span className="text-[1rem] leading-[1.7] text-ink">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="display text-[clamp(1.8rem,3.6vw,2.5rem)] text-ink-soft">
                What we intend
              </h2>
              <ul className="mt-6 space-y-4">
                {workIntended.map((t) => (
                  <li key={t} className="flex gap-3.5">
                    <span className="line-preliminary mt-[0.75em] w-7 shrink-0" aria-hidden />
                    <span className="text-[1rem] leading-[1.7] text-ink-soft">{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[0.85rem] italic leading-relaxed text-ink-soft">
                Nothing on the right has been approved or implemented. The
                website is the only initiative already under way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service as Action reflection, in the group's own words */}
      <section className="border-b border-stone">
        <div className="mx-auto max-w-[920px] px-5 py-14 sm:px-8 lg:py-20">
          <p className="label text-brass-ink">
            Service as Action reflection · Report §10
          </p>
          <div className="prose-journal mt-6 border-t-2 border-forest/25 pt-8">
            {reflection.map((p, i) => (
              <p key={i} className="text-[1.1rem] leading-[1.78] text-ink">
                {p}
              </p>
            ))}
          </div>
          <p className="mt-8 text-[0.88rem] italic text-ink-soft">
            Written by the research group and preserved here exactly as it
            appears in the final report.
          </p>
        </div>
      </section>

      {/* SDG connections */}
      <section id="sdg" className="border-b border-stone bg-paper-deep scroll-mt-24">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 lg:py-20">
          <h2 className="display text-[clamp(1.9rem,4vw,2.8rem)] text-forest">
            Why environmental awareness matters
          </h2>
          <p className="mt-5 max-w-[66ch] text-[1.02rem] leading-[1.72] text-ink">
            A more sustainable school environment depends not only on the
            presence of plants, but on the knowledge, cooperation and
            responsibility of the community that shares the space. Our project
            connects to three of the United Nations Sustainable Development
            Goals, as relationships to learn from rather than targets already
            met.
          </p>
          <div className="mt-10 space-y-px border border-stone bg-stone">
            {sdgs.map((s) => (
              <div key={s.number} className="grid gap-5 bg-paper px-6 py-8 lg:grid-cols-[200px_1fr] lg:gap-10">
                <div className="flex items-start gap-4">
                  <span
                    className={`flex h-14 w-14 shrink-0 items-center justify-center text-[1.45rem] font-bold ${sdgNumeralClass(s.color)}`}
                    style={{ backgroundColor: s.color }}
                    aria-hidden
                  >
                    {s.number}
                  </span>
                  <div>
                    <p className="label text-ink-soft">SDG {s.number}</p>
                    <p className="mt-1 text-[1.02rem] font-bold leading-snug text-forest">
                      {s.title}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="max-w-[70ch] text-[0.9rem] italic leading-relaxed text-ink-soft">
                    “{s.official}”
                  </p>
                  <p className="mt-3 max-w-[70ch] text-[1rem] leading-[1.7] text-ink">
                    {s.connection}
                  </p>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label mt-3 inline-block text-botanical underline-offset-4 hover:underline"
                  >
                    United Nations · SDG {s.number} ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[0.85rem] italic text-ink-soft">
            The project does not claim to have achieved measurable outcomes
            against any SDG target.
          </p>
          <p className="mt-8">
            <Link
              href="/action"
              className="inline-flex items-center gap-2 font-semibold text-botanical underline-offset-4 hover:underline"
            >
              See the initiatives these goals inform <span aria-hidden>→</span>
            </Link>
          </p>
        </div>
      </section>

      {/* close */}
      <section className="relative overflow-hidden bg-forest text-paper">
        <div className="dot-grid absolute inset-0 opacity-[0.07]" aria-hidden />
        <div className="relative mx-auto max-w-[920px] px-5 py-16 text-center sm:px-8 lg:py-20">
          <h2 className="display mx-auto max-w-[22ch] text-[clamp(1.9rem,4.2vw,3rem)]">
            The improvement plan is ready.
          </h2>
          <p className="mx-auto mt-5 max-w-[56ch] text-[1.02rem] leading-relaxed text-moss">
            All five initiatives are gathered into a single environmental
            improvement plan, with evidence, school coordination requirements
            and evaluation criteria.
          </p>
          <Link
            href="/proposal"
            className="btn-press mt-9 inline-flex items-center gap-2.5 rounded-[3px] bg-paper px-6 py-3.5 text-[0.98rem] font-semibold text-forest transition-colors hover:bg-moss"
          >
            Read the improvement plan <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
