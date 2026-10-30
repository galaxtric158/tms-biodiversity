import type { ReactNode } from "react";

/** Brass specimen stamp — the archival label of the notebook world. */
export function Stamp({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`label stamp inline-flex items-center gap-2 bg-paper/60 px-3 py-[7px] text-brass-ink ${className}`}
    >
      {children}
    </span>
  );
}

/** Status labels — truthful states only. */
export function StatusBadge({
  status,
  className = "",
}: {
  status: "Proposed" | "Requires approval" | "In progress";
  className?: string;
}) {
  const style =
    status === "In progress"
      ? "border-botanical bg-botanical text-paper"
      : status === "Requires approval"
        ? "border-brass-ink/70 bg-brass/15 text-brass-ink"
        : "border-sage bg-paper text-ink-soft";
  return (
    <span className={`label inline-flex items-center rounded-[2px] border px-2.5 py-1 ${style} ${className}`}>
      {status}
    </span>
  );
}

/**
 * Confidence mark — the evidence state language of the site.
 * Solid = observed directly. Dashed = preliminary identification.
 * Dotted = not recorded.
 */
export function ConfidenceMark({
  level,
  className = "",
}: {
  level: "Observed directly" | "Preliminary — genus level" | "Preliminary — family level" | "Not recorded";
  className?: string;
}) {
  const line =
    level === "Observed directly"
      ? "line-observed"
      : level === "Not recorded"
        ? "line-unrecorded"
        : "line-preliminary";
  return (
    <span className={`inline-flex flex-col gap-1.5 ${className}`}>
      <span className={`w-10 ${line}`} aria-hidden />
      <span className="label text-ink-soft">{level}</span>
    </span>
  );
}

/** The standing legend, shown wherever confidence appears. */
export function ConfidenceLegend({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${className}`}>
      <span className="flex items-center gap-2.5">
        <span className="line-observed w-8" aria-hidden />
        <span className="label text-ink-soft">Observed</span>
      </span>
      <span className="flex items-center gap-2.5">
        <span className="line-preliminary w-8" aria-hidden />
        <span className="label text-ink-soft">Preliminary</span>
      </span>
      <span className="flex items-center gap-2.5">
        <span className="line-unrecorded w-8" aria-hidden />
        <span className="label text-ink-soft">Not recorded</span>
      </span>
    </div>
  );
}
