import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "@/components/notebook/PrintButton";
import { Stamp } from "@/components/notebook/Marks";
import { Reveal } from "@/components/notebook/Reveal";
import { proposals } from "@/content/proposals";
import { site, team } from "@/content/site";

export const metadata: Metadata = {
  title: "Environmental Improvement Plan",
  description:
    "A student-led environmental improvement plan for Tunas Muda School: evidence-based recommendations for plant documentation, monitoring and awareness.",
};

/** Evidence → recommendation links, exactly as the report supports them. */
const links = [
  {
    observed: "Visible leaf discoloration in Observations 1 and 2",
    proposal: "health-monitoring",
    recommendation: "Further plant health monitoring",
  },
  {
    observed: "Unverified plant identities across the grounds",
    proposal: "identification-labels",
    recommendation: "Plant inventory verification and educational labeling",
  },
  {
    observed: "Limited ecological data (four photographs so far)",
    proposal: "health-monitoring",
    recommendation: "Repeated, standardized observations",
  },
  {
    observed: "Existing landscaped areas beside paths, walls and seating",
    proposal: "appropriate-planting",
    recommendation: "Investigation of suitable biodiversity improvements",
  },
  {
    observed: "Concern about environmental awareness (identified, not measured)",
    proposal: "awareness-activities",
    recommendation: "Awareness research and educational activities",
  },
];

export default function ImprovementPlanPage() {
  return (
    <div className="bg-paper-deep">
      <div className="mx-auto max-w-[920px] px-5 py-12 sm:px-8 lg:py-16">
        {/* the document itself, as a sheet of paper */}
        <article className="print-plain border border-stone bg-paper px-6 py-12 shadow-[0_30px_60px_-40px_rgba(32,40,34,0.45)] sm:px-14 sm:py-16">
          <header className="border-b-2 border-forest/25 pb-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <p className="label text-brass-ink">{site.stamp}</p>
                <h1 className="display mt-4 max-w-[22ch] text-[clamp(2rem,4.6vw,3rem)] text-forest">
                  Environmental Improvement Recommendations and Action Plan
                </h1>
              </div>
              <Stamp className="no-print shrink-0">Improvement plan · Proposed</Stamp>
            </div>
            <dl className="mt-8 grid gap-x-10 gap-y-2 text-[0.92rem] sm:grid-cols-2">
              <div className="flex gap-3">
                <dt className="label w-[92px] shrink-0 pt-[3px] text-ink-soft">Prepared by</dt>
                <dd className="font-semibold text-ink">
                  {team.map((m, i) => (
                    <span key={m.name}>
                      {m.name} ({m.className})
                      {i < team.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="label w-[92px] shrink-0 pt-[3px] text-ink-soft">Date</dt>
                <dd className="text-ink">{site.reportDate}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="label w-[92px] shrink-0 pt-[3px] text-ink-soft">Subject</dt>
                <dd className="text-ink">Plant biodiversity and environmental sustainability</dd>
              </div>
            </dl>
          </header>

          <div className="prose-journal mt-10">
            <p className="text-[1.05rem] leading-[1.78] text-ink">
              Through our Service as Action research, we have documented several
              forms of vegetation within the school&rsquo;s grounds and
              identified opportunities to strengthen environmental awareness and
              biodiversity monitoring.
            </p>
            <p className="text-[1.05rem] leading-[1.78] text-ink">
              This plan gathers those opportunities into a practical set of
              recommendations: a digital plant inventory, educational
              identification labels and periodic environmental observations.
            </p>
            <p className="text-[1.05rem] leading-[1.78] text-ink">
              Each recommendation is tied to specific observations from the
              report, so readers can see exactly what evidence supports it and
              where the evidence remains limited.
            </p>
            <p className="text-[1.05rem] leading-[1.78] text-ink">
              These measures could help students better understand the
              importance of the school&rsquo;s natural environment while
              encouraging responsible behavior and long-term sustainability.
            </p>
            <p className="text-[1.05rem] leading-[1.78] text-ink">
              Implementation depends on coordination with appropriate school
              staff, particularly regarding the placement of identification
              labels and the organization of environmental monitoring
              activities.
            </p>
          </div>

          {/* evidence-linked recommendations */}
          <section aria-labelledby="rec" className="print-break-inside-avoid mt-12">
            <h2 id="rec" className="label border-b border-stone pb-3 text-brass-ink">
              Recommendations, and the observations behind them
            </h2>
            <ul className="mt-5 space-y-px bg-stone">
              {links.map((l) => {
                const p = proposals.find((x) => x.slug === l.proposal)!;
                return (
                  <li key={l.recommendation} className="bg-paper px-4 py-4">
                    <p className="text-[0.85rem] italic text-ink-soft">
                      Observed: {l.observed}
                    </p>
                    <p className="mt-1.5 text-[1rem] font-semibold text-forest">
                      → {l.recommendation}
                      <span className="ml-2 font-normal text-ink-soft">
                        (Initiative {p.number})
                      </span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* summary of the five initiatives */}
          <section aria-labelledby="five" className="print-break-before mt-12">
            <h2 id="five" className="label border-b border-stone pb-3 text-brass-ink">
              The five initiatives at a glance
            </h2>
            <Reveal>
              <ol className="mt-5 space-y-5">
                {proposals.map((p) => (
                  <li key={p.slug} className="reveal-child print-break-inside-avoid">
                    <p className="text-[1.02rem] font-bold text-forest">
                      {p.number}. {p.title}
                      <span className="ml-3 text-[0.8rem] font-semibold uppercase tracking-wider text-brass-ink">
                        {p.status}
                      </span>
                    </p>
                    <p className="mt-1 max-w-[68ch] text-[0.96rem] leading-[1.7] text-ink-soft">
                      {p.intervention}
                    </p>
                    <p className="mt-1.5 text-[0.85rem] text-ink-soft">
                      <span className="font-semibold">School coordination:</span>{" "}
                      {p.approval}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </section>

          {/* benefits, evaluation, request */}
          <section aria-labelledby="benefit" className="mt-12">
            <h2 id="benefit" className="label border-b border-stone pb-3 text-brass-ink">
              Educational and environmental benefits
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Environmental education embedded in students' daily routes.",
                "A digital inventory that grows with the school's own observations.",
                "Evidence-based care for plants, replacing assumption with observation.",
                "Student-led participation in the school's environmental responsibility.",
              ].map((b) => (
                <li key={b} className="flex gap-3 text-[0.97rem] leading-[1.65] text-ink">
                  <span className="line-observed mt-[0.7em] w-6 shrink-0" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="eval2" className="mt-12">
            <h2 id="eval2" className="label border-b border-stone pb-3 text-brass-ink">
              Monitoring and evaluation
            </h2>
            <ul className="mt-5 space-y-2.5">
              {[
                "Number of verified observation records maintained on the website.",
                "Number of approved identification labels installed.",
                "Consistency of completed monitoring sessions.",
                "Participation and feedback from awareness activities.",
                "Documented changes in vegetation composition over time.",
              ].map((e) => (
                <li key={e} className="flex gap-3 text-[0.97rem] leading-[1.65] text-ink">
                  <span
                    aria-hidden
                    className="mt-[0.55em] h-[9px] w-[9px] shrink-0 border border-botanical"
                  />
                  {e}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="sustain" className="mt-12">
            <h2 id="sustain" className="label border-b border-stone pb-3 text-brass-ink">
              Long-term sustainability
            </h2>
            <p className="mt-5 max-w-[66ch] text-[0.97rem] leading-[1.7] text-ink">
              The initiative is designed to be maintained by students, with this
              website serving as a durable record that future groups can extend.
              Long-term success depends not only on the presence of plants, but
              on the knowledge, cooperation and responsibility of the community
              that shares the space.
            </p>
          </section>

          <section
            aria-labelledby="honest"
            className="print-break-inside-avoid mt-12 border-l-2 line-unrecorded bg-paper-deep/70 py-5 pl-5"
          >
            <h2 id="honest" className="label mb-2 text-brass-ink">
              What we are careful to say
            </h2>
            <p className="max-w-[66ch] text-[0.97rem] leading-[1.7] text-ink">
              Our evidence consists of four photographs, not a full ecological
              survey. We do not claim to have measured the school&rsquo;s
              biodiversity, diagnosed any plant, or established that students
              have harmed the environment. We have identified questions worth
              investigating, and this plan is offered as a starting point for
              responsible investigation with appropriate school coordination.
            </p>
          </section>

          <footer className="mt-12 border-t-2 border-forest/25 pt-8">
            <p className="text-[0.95rem] text-ink-soft">Prepared by the research group:</p>
            <p className="mt-2 font-display text-[1.4rem] text-forest">
              {team.map((m, i) => (
                <span key={m.name}>
                  {m.name}
                  {i < team.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>
            <p className="mt-1 text-[0.88rem] text-ink-soft">
              Year 8, Tunas Muda School · IB MYP Service as Action · {site.reportDate}
            </p>
          </footer>
        </article>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/research"
            className="no-print font-semibold text-botanical underline-offset-4 hover:underline"
          >
            ← Back to the full research report
          </Link>
          <PrintButton />
        </div>
      </div>
    </div>
  );
}
