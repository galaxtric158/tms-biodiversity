import type { Metadata } from "next";
import Link from "next/link";
import { Stamp, StatusBadge } from "@/components/notebook/Marks";
import { Reveal } from "@/components/notebook/Reveal";
import { implementationPhases, statusNote } from "@/content/proposals";

export const metadata: Metadata = {
  title: "Implementation Roadmap",
  description:
    "The six-phase implementation plan proposed in the research report, from documentation through evaluation.",
};

export default function RoadmapPage() {
  return (
    <div className="dot-grid">
      <section className="border-b border-stone bg-paper">
        <div className="mx-auto max-w-[1240px] px-5 pb-12 pt-14 sm:px-8">
          <nav aria-label="Breadcrumb" className="no-print mb-8">
            <Link
              href="/action"
              className="label inline-block py-1.5 -my-1.5 text-botanical underline-offset-4 hover:underline"
            >
              ← Improvements
            </Link>
          </nav>
          <Stamp>Report §8 · Proposed Implementation Plan</Stamp>
          <h1 className="display mt-6 max-w-[16ch] text-[clamp(2.4rem,5.6vw,4.2rem)] text-forest">
            The implementation roadmap
          </h1>
          <p className="mt-6 max-w-[64ch] text-[1.08rem] leading-[1.72] text-ink-soft">
            Six phases as our report proposes them. Only one is under way:
            this website. Everything else waits for what the school decides.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8">
        <Reveal>
          <ol className="border-t border-stone">
            {implementationPhases.map((ph) => {
              const live = ph.status === "In progress";
              return (
                <li
                  key={ph.phase}
                  className="reveal-child relative grid gap-4 py-8 lg:grid-cols-[110px_1fr_1fr_auto] lg:items-center lg:gap-10"
                >
                  {/* The connector draws in intended order — a sequence,
                      never a progress bar; the status badge carries truth. */}
                  <span
                    aria-hidden
                    className="rail-seg absolute bottom-0 left-0 h-px w-full bg-stone"
                  />
                  <span
                    className={`display tabular text-[2.6rem] leading-none ${
                      live ? "text-botanical" : "text-sage-ink"
                    }`}
                  >
                    {ph.phase}
                  </span>
                  <div>
                    <p className="text-[1.2rem] font-bold text-forest">
                      {ph.name}
                    </p>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-ink">
                      {ph.action}
                    </p>
                  </div>
                  <p className="text-[0.95rem] leading-relaxed text-ink-soft">
                    <span className="label block text-brass-ink">
                      Intended outcome
                    </span>
                    <span className="mt-1 block">{ph.outcome}</span>
                  </p>
                  <StatusBadge status={live ? "In progress" : "Proposed"} />
                </li>
              );
            })}
          </ol>
        </Reveal>
        <p className="mt-8 max-w-[76ch] text-[0.9rem] leading-relaxed text-ink-soft">
          {statusNote}
        </p>
      </section>
    </div>
  );
}
