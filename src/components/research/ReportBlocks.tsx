import Image from "next/image";
import Link from "next/link";
import type { Block } from "@/content/research";

const toneStyles: Record<string, { label: string; line: string; text: string }> = {
  evidence: {
    label: "Observed evidence",
    line: "line-observed",
    text: "text-ink",
  },
  identification: {
    label: "Preliminary identification",
    line: "line-preliminary",
    text: "text-ink",
  },
  interpretation: {
    label: "Ecological interpretation",
    line: "line-preliminary",
    text: "text-ink",
  },
  limitation: {
    label: "Research limitation",
    line: "line-unrecorded",
    text: "text-ink-soft",
  },
  action: {
    label: "Recommended action",
    line: "line-observed",
    text: "text-forest",
  },
};

export function ReportBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-journal">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "p":
            return (
              <p key={i} className="text-[1.0625rem] leading-[1.75] text-ink">
                {block.text}
              </p>
            );
          case "sub":
            return (
              <h3
                key={i}
                className="mt-10 mb-3 font-display text-[1.6rem] leading-tight text-forest"
              >
                {block.text}
              </h3>
            );
          case "list":
            return (
              <ul key={i} className="my-4 max-w-[68ch] space-y-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[1.02rem] leading-[1.7] text-ink">
                    <span
                      aria-hidden
                      className="mt-[0.62em] h-[5px] w-[5px] shrink-0 rotate-45 border border-botanical"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "numbered":
            return (
              <ol key={i} className="my-4 max-w-[68ch] space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-4 text-[1.02rem] leading-[1.7] text-ink">
                    <span className="label mt-[0.35em] shrink-0 text-brass-ink tabular">
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <div key={i} className="print-break-inside-avoid my-6 overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-left text-[0.95rem]">
                  <thead>
                    <tr className="border-y border-forest/30">
                      {block.head.map((h) => (
                        <th key={h} className="label px-3 py-3 align-bottom text-forest">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className="border-b border-stone align-top">
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className={`px-3 py-3.5 leading-relaxed ${
                              k === 0 ? "font-semibold text-forest" : "text-ink-soft tabular"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "note": {
            const t = toneStyles[block.tone];
            return (
              <aside
                key={i}
                className={`print-break-inside-avoid my-6 max-w-[70ch] border-l-2 pl-5 ${t.line} ${
                  block.tone === "limitation" ? "bg-paper-deep/60 py-4" : ""
                }`}
              >
                <p className="label mb-1.5 text-brass-ink">{t.label}</p>
                <p className={`text-[1rem] leading-[1.7] ${t.text}`}>{block.text}</p>
              </aside>
            );
          }
          case "quote":
            return (
              <blockquote
                key={i}
                className="print-break-inside-avoid my-8 border-y-2 border-forest/25 py-6"
              >
                <p className="display max-w-[30ch] text-[clamp(1.5rem,3.2vw,2.1rem)] leading-[1.15] text-forest">
                  {block.text}
                </p>
                {block.cite && (
                  <cite className="label mt-3 block not-italic text-ink-soft">{block.cite}</cite>
                )}
              </blockquote>
            );
          case "figure":
            return (
              <figure key={i} className="print-break-inside-avoid my-8 max-w-[430px]">
                {block.photo ? (
                  <div className="relative aspect-[3/4] overflow-hidden border border-stone bg-stone">
                    <Image
                      src={block.photo}
                      alt={block.alt}
                      fill
                      sizes="(max-width: 768px) 92vw, 430px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    role="img"
                    aria-label={block.alt}
                    className="relative aspect-[3/4] overflow-hidden border border-dashed border-sage bg-paper-deep"
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center">
                      <p className="label text-brass-ink">Evidence gap</p>
                      <p className="max-w-[32ch] text-[0.85rem] leading-relaxed text-ink-soft">
                        Listed as primary evidence; the image file was not
                        available when this site was built.
                      </p>
                    </div>
                  </div>
                )}
                <figcaption className="mt-3 flex items-start gap-3 border-t border-sage/50 pt-3">
                  <span className="mt-[3px] h-[7px] w-[7px] shrink-0 rotate-45 border border-brass" aria-hidden />
                  <span className="text-[0.85rem] leading-relaxed text-ink-soft">
                    {block.caption}
                    {block.href && (
                      <>
                        {" "}
                        <Link
                          href={block.href}
                          className="font-semibold text-botanical underline-offset-4 hover:underline"
                        >
                          Open record →
                        </Link>
                      </>
                    )}
                  </span>
                </figcaption>
              </figure>
            );
        }
      })}
    </div>
  );
}
