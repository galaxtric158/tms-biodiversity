"use client";

import { useEffect, useRef, useState } from "react";
import { PrintButton } from "@/components/notebook/PrintButton";
import { ReportBlocks } from "@/components/research/ReportBlocks";
import { Stamp } from "@/components/notebook/Marks";
import { reportMeta, reportSections } from "@/content/research";

export default function ResearchPage() {
  const [activeId, setActiveId] = useState(reportSections[0].id);
  const [stoppedId, setStoppedId] = useState<string | null>(null);
  const [tocOpen, setTocOpen] = useState(false);
  const restoreRef = useRef(false);

  // Load the reader's place (the notebook's folded stop-flag).
  useEffect(() => {
    const saved = window.localStorage.getItem("tm-last-section");
    if (saved && reportSections.some((s) => s.id === saved)) {
      setStoppedId(saved);
    }
    restoreRef.current = true;
  }, []);

  // Track the section being read; persist the place.
  useEffect(() => {
    const onScroll = () => {
      let current = reportSections[0].id;
      for (const s of reportSections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 140) current = s.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!restoreRef.current) return;
    window.localStorage.setItem("tm-last-section", activeId);
  }, [activeId]);

  const jump = (id: string) => {
    setTocOpen(false);
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: "smooth" });
    // Gentle emphasis on arrival — feedback, played once, then removed.
    if (target) {
      target.classList.remove("anchor-flash");
      void target.offsetWidth; // restart the animation if re-clicked
      target.classList.add("anchor-flash");
      target.addEventListener(
        "animationend",
        () => target.classList.remove("anchor-flash"),
        { once: true },
      );
    }
  };

  return (
    <div className="dot-grid">
      {/* masthead */}
      <section className="border-b border-stone bg-paper">
        <div className="mx-auto max-w-[1240px] px-5 pb-12 pt-14 sm:px-8">
          <Stamp>{reportMeta.date.toUpperCase()}</Stamp>
          <h1 className="display mt-6 max-w-[19ch] text-[clamp(2.5rem,6vw,4.6rem)] text-forest">
            {reportMeta.title}
          </h1>
          <p className="mt-4 text-[1.15rem] italic text-botanical">
            {reportMeta.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-stone pt-6">
            <div className="text-[0.9rem] leading-relaxed text-ink-soft">
              <p className="label text-brass-ink">Research group</p>
              <p className="mt-1.5 font-semibold text-ink">{reportMeta.authors}</p>
              <p className="mt-1">Tunas Muda School Grounds · IB MYP Service as Action</p>
            </div>
            <PrintButton label="Print this report" />
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[270px_1fr] lg:gap-16">
        {/* sticky contents */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <button
            type="button"
            onClick={() => setTocOpen((v) => !v)}
            aria-expanded={tocOpen}
            className="no-print label flex w-full items-center justify-between border border-sage px-4 py-3 text-forest lg:hidden"
          >
            Contents
            <span aria-hidden className="text-[1.1rem] leading-none">
              {tocOpen ? "−" : "+"}
            </span>
          </button>
          <nav
            aria-label="Report sections"
            className={`${tocOpen ? "block" : "hidden"} mt-3 lg:mt-0 lg:block`}
          >
            <p className="label border-b border-stone pb-3 text-brass-ink">
              Contents · 13 sections
            </p>
            <ol className="mt-3 space-y-0.5">
              {reportSections.map((s) => {
                const isActive = activeId === s.id;
                const isStopped = stoppedId === s.id;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => jump(s.id)}
                      className={`relative flex w-full items-baseline gap-2.5 py-[7px] pr-3 text-left text-[0.88rem] leading-snug transition-colors duration-(--dur-ui) ease-(--ease-journal) ${
                        isActive ? "font-bold text-forest" : "text-ink-soft hover:text-forest"
                      }`}
                    >
                      <span
                        className={`label tabular shrink-0 ${
                          isActive ? "text-brass-ink" : "text-sage-ink"
                        }`}
                      >
                        {s.number}
                      </span>
                      <span>{s.title}</span>
                      {isStopped && (
                        <span
                          aria-label="your last-read section"
                          className="absolute -right-1 top-1 h-3.5 w-3.5 rounded-bl-[2px] bg-brass/70 [clip-path:polygon(0_0,100%_0,100%_100%)]"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
            {stoppedId && (
              <button
                type="button"
                onClick={() => {
                  window.localStorage.removeItem("tm-last-section");
                  setStoppedId(null);
                }}
                className="no-print mt-4 text-[0.78rem] text-ink-soft underline-offset-4 hover:text-forest hover:underline"
              >
                Clear your folded corner
              </button>
            )}
          </nav>
        </aside>

        {/* the report itself */}
        <article className="min-w-0">
          {reportSections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              aria-labelledby={`${s.id}-heading`}
              className={`scroll-mt-24 ${
                s.id === "executive-summary" ? "" : "mt-20 border-t-2 border-forest/20 pt-14"
              }`}
            >
              <div className="mb-6 flex items-baseline gap-4">
                <span className="display tabular text-[2.6rem] leading-none text-sage-ink">
                  {s.number}
                </span>
                <h2
                  id={`${s.id}-heading`}
                  className="display text-[clamp(1.9rem,4vw,2.9rem)] text-forest"
                >
                  {s.title}
                </h2>
              </div>
              <ReportBlocks blocks={s.blocks} />
            </section>
          ))}

          <p className="mt-20 border-t-2 border-forest/20 pt-8 text-[0.9rem] italic text-ink-soft">
            End of report. This digital edition preserves the complete text of
            the original document, including its limitations. Photograph 4
            remains listed as primary evidence and will be added when its file
            is found.
          </p>
        </article>
      </div>
    </div>
  );
}
