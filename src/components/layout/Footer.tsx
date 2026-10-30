import Link from "next/link";
import { site, team } from "@/content/site";

const columns = [
  {
    title: "The Research",
    links: [
      { href: "/research", label: "Full research report" },
      { href: "/ecosystem", label: "Ecosystem insights" },
      { href: "/field-guide", label: "Plant database" },
    ],
  },
  {
    title: "Taking Action",
    links: [
      { href: "/action", label: "Improvements" },
      { href: "/action/roadmap", label: "Implementation roadmap" },
      { href: "/proposal", label: "Improvement plan" },
    ],
  },
  {
    title: "The Project",
    links: [
      { href: "/about", label: "About our Service as Action" },
      { href: "/about#sdg", label: "SDG connections" },
      { href: "/research#references", label: "Evidence & references" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="no-print relative overflow-hidden bg-forest text-paper">
      <div className="paper-grain absolute inset-0 opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-[1240px] px-5 pb-10 pt-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_2fr]">
          <div>
            <p className="display text-[1.9rem] leading-tight text-paper">
              {site.centralIdea}
            </p>
            <p className="mt-4 max-w-[42ch] text-[0.95rem] leading-relaxed text-moss">
              A student-led biodiversity record of Tunas Muda School, prepared as
              an IB MYP Service as Action project. Observations first; claims only
              as far as the evidence goes.
            </p>
            <p className="label mt-6 text-brass-light">{site.stamp}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="label text-sage">{col.title}</p>
                {/* py-1 lifts each link's hit area to ~27px tall — WCAG
                    2.5.8 target size; with space-y-0 the list keeps the
                    exact pitch it had before (19px line + 8px gap). */}
                <ul className="mt-3 space-y-0">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="inline-block py-1 text-[0.95rem] text-moss underline-offset-4 transition-colors hover:text-paper hover:underline"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-sage/25 pt-6 text-[0.8rem] text-sage sm:flex-row sm:items-center sm:justify-between">
          <p>
            Research by{" "}
            {team.map((m, i) => (
              <span key={m.name}>
                {m.name} ({m.className})
                {i < team.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
          <p>
            Report dated {site.reportDate} · Evidence: four photographs, October
            2026 · Photograph 4 currently unavailable
          </p>
        </div>
      </div>
    </footer>
  );
}
