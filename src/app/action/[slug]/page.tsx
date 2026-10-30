import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/notebook/Marks";
import { getObservation } from "@/content/observations";
import { getProposal, proposals } from "@/content/proposals";

export function generateStaticParams() {
  return proposals.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProposal(slug);
  if (!p) return {};
  return { title: `${p.number} ${p.title}` };
}

export default async function ProposalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProposal(slug);
  if (!p) notFound();

  const related = p.relatedObservations
    .map((s) => getObservation(s))
    .filter(Boolean);

  return (
    <article className="dot-grid">
      <header className="border-b border-stone bg-paper">
        <div className="mx-auto max-w-[1240px] px-5 pb-12 pt-10 sm:px-8">
          <nav aria-label="Breadcrumb" className="no-print mb-8">
            <Link
              href="/action"
              className="label inline-block py-1.5 -my-1.5 text-botanical underline-offset-4 hover:underline"
            >
              ← Improvements
            </Link>
          </nav>
          <div className="flex flex-wrap items-center gap-4">
            <span className="label tabular text-brass-ink">
              Initiative {p.number} of 05
            </span>
            <StatusBadge status={p.status} />
          </div>
          <h1 className="display mt-6 max-w-[20ch] text-[clamp(2.3rem,5.6vw,4.2rem)] text-forest">
            {p.title}
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-[880px] px-5 py-14 sm:px-8">
        <section aria-labelledby="opp">
          <h2 id="opp" className="label border-b border-stone pb-3 text-brass-ink">
            The opportunity
          </h2>
          <p className="mt-5 max-w-[66ch] text-[1.08rem] leading-[1.75] text-ink">
            {p.opportunity}
          </p>
        </section>

        <section aria-labelledby="ev" className="mt-12">
          <h2 id="ev" className="label border-b border-stone pb-3 text-brass-ink">
            Supporting evidence
          </h2>
          <ul className="mt-5 space-y-3">
            {p.evidence.map((e) => (
              <li key={e} className="flex gap-3.5">
                <span className="line-observed mt-[0.72em] w-7 shrink-0" aria-hidden />
                <span className="text-[1rem] leading-[1.7] text-ink">{e}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="sol"
          className="print-break-inside-avoid mt-12 border-l-2 line-observed bg-paper-deep/60 py-6 pl-6"
        >
          <h2 id="sol" className="label mb-2 text-brass-ink">
            The proposed intervention
          </h2>
          <p className="max-w-[64ch] text-[1.05rem] leading-[1.75] text-forest">
            {p.intervention}
          </p>
        </section>

        <section aria-labelledby="impl" className="mt-12">
          <h2 id="impl" className="label border-b border-stone pb-3 text-brass-ink">
            Implementation steps
          </h2>
          <ol className="mt-5 space-y-3.5">
            {p.implementation.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="label tabular mt-[0.4em] shrink-0 text-brass-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[1rem] leading-[1.7] text-ink">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <section aria-labelledby="res">
            <h2 id="res" className="label border-b border-stone pb-3 text-brass-ink">
              Required resources
            </h2>
            <ul className="mt-4 space-y-2.5">
              {p.resources.map((r) => (
                <li key={r} className="text-[0.97rem] leading-[1.65] text-ink">
                  {r}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="benefits">
            <h2 id="benefits" className="label border-b border-stone pb-3 text-brass-ink">
              Expected benefits
            </h2>
            <ul className="mt-4 space-y-2.5">
              {p.benefits.map((b) => (
                <li key={b} className="text-[0.97rem] leading-[1.65] text-ink">
                  {b}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section
          aria-labelledby="approval"
          className="print-break-inside-avoid mt-12 border border-brass/45 bg-brass/10 p-6"
        >
          <h2 id="approval" className="label text-brass-ink">
            School approval &amp; coordination
          </h2>
          <p className="mt-3 max-w-[64ch] text-[1rem] leading-[1.7] text-ink">
            {p.approval}
          </p>
        </section>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <section aria-labelledby="chal">
            <h2 id="chal" className="label border-b border-stone pb-3 text-brass-ink">
              Potential challenges
            </h2>
            <ul className="mt-4 space-y-2.5">
              {p.challenges.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="line-unrecorded mt-[0.7em] w-6 shrink-0" aria-hidden />
                  <span className="text-[0.97rem] leading-[1.65] text-ink-soft">{c}</span>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="eval">
            <h2 id="eval" className="label border-b border-stone pb-3 text-brass-ink">
              How the school could evaluate it
            </h2>
            <ul className="mt-4 space-y-2.5">
              {p.evaluation.map((ev) => (
                <li key={ev} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-[0.55em] h-[9px] w-[9px] shrink-0 border border-botanical"
                  />
                  <span className="text-[0.97rem] leading-[1.65] text-ink">{ev}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section aria-labelledby="records" className="mt-12 border-t-2 border-forest/20 pt-8">
          <h2 id="records" className="label text-brass-ink">
            Observation records behind this proposal
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {related?.map((o) => (
              <li key={o!.id}>
                <Link
                  href={`/field-guide/${o!.slug}`}
                  className="group flex items-baseline justify-between gap-4 border border-stone bg-paper px-5 py-4 transition-colors hover:border-botanical/60 hover:bg-moss/35"
                >
                  <span>
                    <span className="label tabular block text-brass-ink">{o!.id}</span>
                    <span className="mt-1 block font-semibold text-forest">
                      {o!.title}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="text-botanical transition-transform duration-(--dur-ui) ease-(--ease-journal) motion-hover:group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="no-print mt-12 border-t border-stone pt-6">
          <Link
            href="/proposal"
            className="font-semibold text-botanical underline-offset-4 hover:underline"
          >
            See the complete improvement plan →
          </Link>
        </p>
      </div>
    </article>
  );
}
