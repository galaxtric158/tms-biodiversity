import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ConfidenceLegend, Stamp } from "@/components/notebook/Marks";
import { Reveal } from "@/components/notebook/Reveal";
import { observations } from "@/content/observations";

export const metadata: Metadata = {
  title: "Plant Database",
  description:
    "Four documented plant observations from the Tunas Muda School grounds, with photographic evidence, preliminary identifications and recommended actions.",
};

export default function FieldGuidePage() {
  const [featured, ...rest] = observations;

  return (
    <div>
      <section className="border-b border-stone bg-paper">
        <div className="mx-auto max-w-[1240px] px-5 pb-12 pt-14 sm:px-8">
          <Stamp>Plant Database · Records TM-001 – TM-004</Stamp>
          <h1 className="display mt-6 max-w-[16ch] text-[clamp(2.5rem,6vw,4.6rem)] text-forest">
            The plant database
          </h1>
          <p className="mt-6 max-w-[64ch] text-[1.1rem] leading-[1.72] text-ink-soft">
            Four observations, four records. Each one keeps its evidence, its
            identification confidence and its recommended action exactly as the
            report states them. The four photographs are not four confirmed
            species; they are four moments of attention.
          </p>
          <ConfidenceLegend className="mt-9 border-t border-stone pt-6" />
        </div>
      </section>

      {/* featured plate */}
      <section className="border-b border-stone">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:py-20">
          <div className="taped">
            <div className="relative aspect-[3/4] overflow-hidden border border-stone bg-stone shadow-[0_26px_52px_-32px_rgba(32,40,34,0.55)]">
              <Image
                src="/photos/obs-01-flowering-tree-640.jpg"
                alt={featured.photoAlt}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 38vw"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <p className="label tabular text-brass-ink">
              {featured.id} · {featured.plate}
            </p>
            <h2 className="display mt-3 text-[clamp(2rem,4.4vw,3.2rem)] text-forest">
              {featured.title}
            </h2>
            <p className="mt-4 max-w-[56ch] text-[1.05rem] leading-[1.72] text-ink">
              {featured.identifications[0].name} ({featured.identifications[0].commonName}).{" "}
              {featured.identifications[0].note}
            </p>
            <Link
              href={`/field-guide/${featured.slug}`}
              className="btn-press mt-8 inline-flex items-center gap-2.5 rounded-[3px] bg-forest px-5 py-3 text-[0.95rem] font-semibold text-paper transition-colors hover:bg-forest-deep"
            >
              Open record {featured.id} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* specimen index */}
      <section className="bg-paper-deep">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8">
          <p className="label border-b border-stone pb-4 text-brass-ink">
            Specimen index
          </p>
          <Reveal>
            <ul>
              {rest.map((o) => (
                <li key={o.id} className="reveal-child border-b border-stone">
                  <Link
                    href={`/field-guide/${o.slug}`}
                    className="group grid items-center gap-6 py-8 transition-colors duration-(--dur-ui) ease-(--ease-journal) hover:bg-moss/35 sm:grid-cols-[110px_1fr_auto] sm:gap-8"
                  >
                    <div className="relative aspect-[3/4] w-[110px] overflow-hidden border border-stone bg-stone">
                      {o.photo ? (
                        <Image
                          src={o.photo.replace(".jpg", "-640.jpg")}
                          alt=""
                          fill
                          sizes="110px"
                          className="object-cover transition-transform duration-(--dur-reveal) ease-(--ease-journal) motion-hover:group-hover:scale-[1.035]"
                        />
                      ) : (
                        <div
                          className="absolute inset-0 flex items-center justify-center bg-paper"
                          aria-hidden
                        >
                          <span className="label rotate-[-8deg] text-sage-ink">
                            No print
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="label tabular text-brass-ink">
                        {o.id} · {o.plate}
                      </p>
                      <h3 className="display mt-1.5 text-[1.7rem] text-forest">
                        {o.title}
                      </h3>
                      <p className="mt-2 max-w-[62ch] text-[0.95rem] leading-relaxed text-ink-soft">
                        {o.location} ·{" "}
                        {o.identifications.map((i) => i.name).join("; ")}
                      </p>
                    </div>
                    <span className="label hidden items-center gap-2 text-botanical sm:flex">
                      Open record
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
          <p className="mt-8 max-w-[70ch] text-[0.85rem] leading-relaxed text-ink-soft">
            Records will grow as the group collects more photographs and
            verifies identifications. Nothing in this guide claims
            species-level certainty the photographs cannot support.
          </p>
        </div>
      </section>
    </div>
  );
}
