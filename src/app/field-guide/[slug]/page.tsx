import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConfidenceMark, Stamp } from "@/components/notebook/Marks";
import { TapedPrint } from "@/components/notebook/TapedPrint";
import { Reveal } from "@/components/notebook/Reveal";
import { getObservation, observations } from "@/content/observations";
import { getProposal } from "@/content/proposals";
import { reportSections } from "@/content/research";

export function generateStaticParams() {
  return observations.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const o = getObservation(slug);
  if (!o) return {};
  return {
    title: o.title,
    description: `${o.location}. ${o.identifications.map((i) => i.name).join("; ")}. Preliminary identifications from the Tunas Muda School biodiversity records.`,
  };
}

export default async function ObservationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const o = getObservation(slug);
  if (!o) notFound();

  const relatedReports = o.reportSections
    .map((id) => reportSections.find((s) => s.id === id))
    .filter(Boolean);
  const relatedProposals = o.relatedProposals
    .map((s) => getProposal(s))
    .filter(Boolean);

  return (
    <article className="dot-grid">
      {/* specimen header */}
      <header className="border-b border-stone bg-paper">
        <div className="mx-auto max-w-[1240px] px-5 pb-12 pt-10 sm:px-8">
          <nav aria-label="Breadcrumb" className="no-print mb-8">
            <Link
              href="/field-guide"
              className="label inline-block py-1.5 -my-1.5 text-botanical underline-offset-4 hover:underline"
            >
              ← Plant Database
            </Link>
          </nav>
          <div className="flex flex-wrap items-center gap-4">
            <Stamp className="tabular">{o.id}</Stamp>
            <span className="label text-brass-ink">
              {o.plate} · {o.evidenceLabel}
            </span>
          </div>
          <h1 className="display mt-6 max-w-[18ch] text-[clamp(2.3rem,5.6vw,4.2rem)] text-forest">
            {o.title}
          </h1>
          <p className="mt-4 text-[1.05rem] text-ink-soft">{o.location}</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* evidence print */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <TapedPrint
              src={o.photo}
              alt={o.photoAlt}
              plate={o.plate}
              caption={o.caption}
            />
          </Reveal>
          <ConfidenceMark
            level={o.identifications[0].confidence}
            className="mt-7 border-t border-stone pt-6"
          />
        </div>

        {/* the record */}
        <div className="min-w-0">
          <section aria-labelledby="ident">
            <h2 id="ident" className="label border-b border-stone pb-3 text-brass-ink">
              Preliminary identification
            </h2>
            <ul className="mt-5 space-y-6">
              {o.identifications.map((i) => (
                <li key={i.name}>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <p className="font-display text-[1.55rem] italic leading-tight text-forest">
                      {i.name}
                    </p>
                    {i.commonName && (
                      <p className="text-[0.95rem] text-ink-soft">“{i.commonName}”</p>
                    )}
                  </div>
                  <p className="mt-2 max-w-[62ch] text-[0.97rem] leading-[1.7] text-ink">
                    {i.note}
                  </p>
                  <ConfidenceMark level={i.confidence} className="mt-3" />
                </li>
              ))}
            </ul>
          </section>

          {o.dossierReference && (
            <section
              aria-labelledby="dossier"
              className="print-break-inside-avoid mt-12 border border-forest/25 bg-forest/[0.04] p-6"
            >
              <h2 id="dossier" className="label text-brass-ink">
                From our identification dossier
              </h2>
              <p className="mt-3 font-display text-[1.5rem] leading-tight text-forest">
                {o.dossierReference.heading}
              </p>
              <dl className="mt-4 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
                {o.dossierReference.classification.map((c) => (
                  <div key={c.label} className="flex gap-3 border-b border-stone/80 py-1.5">
                    <dt className="label w-[76px] shrink-0 text-ink-soft">{c.label}</dt>
                    <dd className="text-[0.9rem] italic leading-snug text-ink">
                      {c.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 max-w-[64ch] text-[0.93rem] leading-[1.7] text-ink-soft">
                {o.dossierReference.body}
              </p>
              <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                {o.dossierReference.sources.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label inline-block py-1.5 -my-1.5 text-botanical underline-offset-4 hover:underline"
                  >
                    {s.label} ↗
                  </a>
                ))}
              </p>
            </section>
          )}

          <section aria-labelledby="chars" className="mt-12">
            <h2 id="chars" className="label border-b border-stone pb-3 text-brass-ink">
              Visible characteristics
            </h2>
            <ul className="mt-5 space-y-3">
              {o.characteristics.map((c) => (
                <li key={c} className="flex gap-3.5">
                  <span className="line-observed mt-[0.72em] w-7 shrink-0" aria-hidden />
                  <span className="text-[1rem] leading-[1.7] text-ink">{c}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="eco" className="mt-12">
            <h2 id="eco" className="label border-b border-stone pb-3 text-brass-ink">
              Ecological significance
            </h2>
            <ul className="mt-5 space-y-3">
              {o.ecologicalSignificance.map((e) => (
                <li key={e} className="flex gap-3.5">
                  <span
                    className="line-preliminary mt-[0.72em] w-7 shrink-0"
                    aria-hidden
                  />
                  <span className="text-[1rem] leading-[1.7] text-ink">{e}</span>
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="assess"
            className="print-break-inside-avoid mt-12 border-l-2 line-unrecorded bg-paper-deep/60 py-5 pl-5"
          >
            <h2 id="assess" className="label mb-2 text-brass-ink">
              Environmental assessment
            </h2>
            <p className="max-w-[64ch] text-[1rem] leading-[1.7] text-ink">
              {o.assessment}
            </p>
          </section>

          <section
            aria-labelledby="action"
            className="print-break-inside-avoid mt-8 border-l-2 line-observed py-5 pl-5"
          >
            <h2 id="action" className="label mb-2 text-brass-ink">
              Recommended monitoring
            </h2>
            <p className="max-w-[64ch] text-[1rem] leading-[1.7] text-forest">
              {o.recommendedAction}
            </p>
          </section>

          {/* traceability: where this record goes next */}
          <section aria-labelledby="trace" className="mt-12 border-t-2 border-forest/20 pt-8">
            <h2 id="trace" className="label text-brass-ink">
              Where this record leads
            </h2>
            <div className="mt-5 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="text-[0.85rem] font-semibold text-ink-soft">
                  In the research report
                </p>
                <ul className="mt-2.5 space-y-2">
                  {relatedReports?.map((s) => (
                    <li key={s!.id}>
                      <Link
                        href={`/research#${s!.id}`}
                        className="text-[0.95rem] text-botanical underline-offset-4 hover:underline"
                      >
                        §{s!.number} {s!.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[0.85rem] font-semibold text-ink-soft">
                  Supporting these initiatives
                </p>
                <ul className="mt-2.5 space-y-2">
                  {relatedProposals?.map((p) => (
                    <li key={p!.slug}>
                      <Link
                        href={`/action/${p!.slug}`}
                        className="text-[0.95rem] text-botanical underline-offset-4 hover:underline"
                      >
                        {p!.number} {p!.shortTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
