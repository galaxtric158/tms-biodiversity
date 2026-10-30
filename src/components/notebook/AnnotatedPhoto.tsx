"use client";

import Image from "next/image";
import { useState } from "react";

type Annotation = {
  id: string;
  label: string;
  /** Anchor point on the photo, in percent of width/height. */
  x: number;
  y: number;
  /** Where the label sits, in percent. */
  lx: number;
  ly: number;
  side: "left" | "right";
};

const annotations: Annotation[] = [
  { id: "flowers", label: "Scattered pink-purple flowers", x: 22, y: 18, lx: 4, ly: 9, side: "left" },
  { id: "bilobed", label: "Rounded, bilobed leaves", x: 63, y: 38, lx: 66, ly: 30, side: "right" },
  { id: "yellowing", label: "Some yellowing leaves", x: 30, y: 58, lx: 4, ly: 66, side: "left" },
  { id: "infrastructure", label: "Seating and paved surfaces below", x: 52, y: 84, lx: 55, ly: 92, side: "right" },
];

/**
 * The hero print: the group's Photograph 1 with scientific annotation
 * lines pointing at the characteristics the report itself records.
 * Hover or focus a label to light its marker; the annotations are the
 * report's own observed characteristics, nothing invented.
 */
export function AnnotatedPhoto() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="taped relative select-none">
      <div className="relative aspect-[3/4] overflow-hidden border border-stone bg-stone shadow-[0_30px_60px_-34px_rgba(32,40,34,0.6)]">
        <Image
          src="/photos/obs-01-flowering-tree-640.jpg"
          alt="A mature Bauhinia tree with rounded, bilobed green leaves and scattered pink-purple flowers, with surrounding recreational infrastructure including seating areas and paved surfaces."
          fill
          priority
          sizes="(max-width: 1024px) 92vw, 44vw"
          className="object-cover"
        />

        <svg
          viewBox="0 0 100 133"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden
        >
          {annotations.map((a) => {
            const on = active === a.id;
            const x1 = a.side === "left" ? a.lx + 13 : a.lx - 1;
            const x2 = a.x;
            // leader line: label edge -> anchor, with a short elbow
            return (
              <g key={a.id} opacity={on ? 1 : 0.72}>
                <path
                  d={`M ${x1} ${a.ly} L ${x2 + (a.side === "left" ? -3 : 3)} ${a.ly} L ${x2} ${y(a)}`}
                  fill="none"
                  stroke={on ? "#F6F4ED" : "rgba(246,244,237,0.85)"}
                  strokeWidth="0.32"
                  strokeDasharray={on ? "0" : "1.6 1.2"}
                  style={{ transition: "stroke-width 220ms var(--ease-journal)" }}
                />
                <circle
                  cx={x2}
                  cy={y(a)}
                  r={on ? 1.15 : 0.8}
                  fill="none"
                  stroke="#F6F4ED"
                  strokeWidth="0.32"
                  style={{ transition: "r 220ms var(--ease-journal)" }}
                />
                <circle cx={x2} cy={y(a)} r="0.28" fill="#F6F4ED" />
              </g>
            );
          })}
        </svg>

        {/* HTML labels over the svg so type stays crisp */}
        <div className="absolute inset-0">
          {annotations.map((a) => (
            <button
              key={a.id}
              type="button"
              onMouseEnter={() => setActive(a.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(a.id)}
              onBlur={() => setActive(null)}
              className={`pointer-events-auto absolute max-w-[38%] rounded-[2px] px-1.5 py-1.5 text-left text-[0.62rem] font-semibold leading-snug tracking-[0.04em] uppercase transition-colors duration-(--dur-ui) ease-(--ease-journal) sm:text-[0.7rem] ${
                active === a.id
                  ? "bg-paper text-forest"
                  // anno-rest: frosts to solid forest when the reader
                  // prefers reduced transparency (see globals.css).
                  : "anno-rest bg-forest-deep/55 text-paper/90 backdrop-blur-[2px]"
              }`}
              style={{ left: `${a.lx}%`, top: `${a.ly}%` }}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <figcaption className="mt-4 flex items-start gap-3 border-t border-sage/50 pt-3">
        <span className="label mt-[3px] shrink-0 text-brass-ink">Plate 1</span>
        <span className="text-[0.85rem] leading-relaxed text-ink-soft">
          Photograph 1 — Flowering tree near school recreational facilities.
          Annotations mark the characteristics the report records in this image.
          Supplied by the research group, October 2026.
        </span>
      </figcaption>
    </div>
  );
}

// keep the elbow gentle: anchor y, pulled slightly toward the label row
function y(a: Annotation) {
  return a.y;
}
