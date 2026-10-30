"use client";

import { Printer } from "lucide-react";

/** A real client print trigger — accessible by keyboard and pointer alike. */
export function PrintButton({
  label = "Print / save as PDF",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`no-print inline-flex items-center gap-2.5 rounded-[3px] border border-forest/50 px-4 py-2.5 text-[0.9rem] font-semibold text-forest transition-colors duration-(--dur-ui) ease-(--ease-journal) hover:bg-forest hover:text-paper ${className}`}
    >
      <Printer size={16} aria-hidden />
      {label}
    </button>
  );
}
