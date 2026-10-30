import type { Metadata } from "next";
import Link from "next/link";
import { StatusBadge, Stamp } from "@/components/notebook/Marks";
import { Reveal } from "@/components/notebook/Reveal";
import { implementationPhases, proposals, statusNote } from "@/content/proposals";
import { sdgNote, sdgNumeralClass, sdgs } from "@/content/sdgs";

export const metadata: Metadata = {
  title: "Proposed Environmental Improvements",
  description:
    "Five evidence-based proposals for Tunas Muda School: a biodiversity website, identification labels, health monitoring, appropriate planting and awareness activities.",
};

export default function ActionPage() {
  return (
    <div>
      <section className="border-b border-stone bg-paper">
        <div className="mx-auto max-w-[1240px] px-5 pb-12 pt-14 sm:px-8">
          <Stamp>Improvements · Report §7–§9</Stamp>
          <h1 className="display mt-6 max-w-[18ch] text-[clamp(2.5rem,6vw,4.6rem)] text-forest">
            From observation to action
          </h1>
          <p className="mt-6 max-w-[66ch] text-[1.1rem] leading-[1.72] text-ink-soft">
            Five initiatives, each born from something we photographed or from
            a concern our report raises. None of them has been approved yet;
            they are written here so the school can review exactly what we
            propose, and why.
          </p>
        </div>
      </section>

      {/* the proposal ledger */}
      <section className="border-b border-stone">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <Reveal>
            <ul>
              {proposals.map((p) => (
                <li
                  key={p.slug}
                  className="reveal-child border-b border-stone last:border-b-0"
                >
                  <Link
                    href={`/action/${p.slug}`}
                    className="group grid gap-4 py-9 transition-colors duration-(--dur-ui) ease-(--ease-journal) hover:bg-moss/35 lg:grid-cols-[auto_1fr_auto] lg:items-start lg:gap-10"
                  >
                    <span className="display tabular text-[2.4rem] leading-none text-sage-ink transition-colors duration-(--dur-ui) ease-(--ease-journal) group-hover:text-brass-ink lg:w-16">
                      {p.number}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                        <h2 className="display text-[clamp(1.6rem,3vw,2.2rem)] text-forest">
                          {p.title}
                        </h2>
                        <StatusBadge status={p.status} />
                      </div>
                      <p className="mt-3 max-w-[68ch] text-[1rem] leading-[1.7] text-ink-soft">
                        {p.opportunity}
                      </p>
                      <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                        {p.relatedObservations.slice(0, 4).map((slug) => (
                          <span key={slug} className="label text-botanical">
                            evidence · {slug.replace("-", " ")}
                          </span>
                        ))}
                      </p>
                    </div>
                    <span className="label hidden items-center gap-2 self-center text-botanical lg:flex">
                      Details
                      <span
                        aria-hidden
                        className="transition-transform duration-(--dur-ui) ease-(--ease-journal) motion-hover:group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* roadmap rail */}
      <section className="border-b border-stone bg-paper-deep">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display text-[clamp(1.9rem,4vw,2.8rem)] text-forest">
              The implementation roadmap
            </h2>
            <Link
              href="/action/roadmap"
              className="font-semibold text-botanical underline-offset-4 hover:underline"
            >
              Full plan →
            </Link>
          </div>
          <ol className="mt-12 grid gap-px border border-stone bg-stone md:grid-cols-6">
            {implementationPhases.map((ph) => {
              const live = ph.status === "In progress";
              return (
                <li key={ph.phase} className="bg-paper px-5 py-6">
                  <span className="label tabular text-brass-ink">Phase {ph.phase}</span>
                  <p className="mt-2 text-[1rem] font-bold leading-snug text-forest">
                    {ph.name}
                  </p>
                  <span
                    className={`mt-3 block ${live ? "line-observed" : "line-preliminary"}`}
                    aria-hidden
                  />
                  <p className="mt-3 text-[0.93rem] leading-snug text-ink-soft">
                    {ph.outcome}
                  </p>
                  {live && (
                    <p className="label mt-3 text-botanical">You are here</p>
                  )}
                </li>
              );
            })}
          </ol>
          <p className="mt-5 max-w-[76ch] text-[0.85rem] leading-relaxed text-ink-soft">
            {statusNote}
          </p>
        </div>
      </section>

      {/* SDGs */}
      <section className="border-b border-stone">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 lg:py-20">
          <h2 className="display text-[clamp(1.9rem,4vw,2.8rem)] text-forest">
            Connection to the Sustainable Development Goals
          </h2>
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
          <p className="mt-5 text-[0.85rem] italic text-ink-soft">{sdgNote}</p>
        </div>
      </section>

      {/* improvement plan */}
      <section className="relative overflow-hidden bg-forest text-paper">
        <div className="dot-grid absolute inset-0 opacity-[0.07]" aria-hidden />
        <div className="relative mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="display text-[clamp(1.9rem,4vw,2.9rem)]">
                All five initiatives, gathered into one improvement plan.
              </h2>
              <p className="mt-5 max-w-[58ch] text-[1.02rem] leading-relaxed text-moss">
                The improvement plan gathers the evidence, the school
                coordination requirements and the evaluation criteria into one
                document for the school community.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <Link
                href="/proposal"
                className="btn-press inline-flex items-center gap-2.5 rounded-[3px] bg-paper px-6 py-3.5 text-[0.98rem] font-semibold text-forest transition-colors hover:bg-moss"
              >
                Read the improvement plan <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
