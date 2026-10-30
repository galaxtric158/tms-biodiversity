import Image from "next/image";

/**
 * A photograph taped into the notebook, with archival caption.
 * When evidence is missing, the print becomes an honest unwoven gap —
 * never a fake photograph.
 */
export function TapedPrint({
  src,
  alt,
  plate,
  caption,
  ratio = "aspect-[3/4]",
  priority = false,
  className = "",
}: {
  src: string | null;
  alt: string;
  plate: string;
  caption: string;
  ratio?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="taped relative">
        {src ? (
          <div
            className={`relative ${ratio} overflow-hidden border border-stone bg-stone shadow-[0_22px_44px_-30px_rgba(32,40,34,0.55)]`}
          >
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes="(max-width: 768px) 92vw, 44vw"
              className="object-cover"
            />
          </div>
        ) : (
          <MissingEvidence alt={alt} ratio={ratio} />
        )}
      </div>
      <figcaption className="mt-4 flex items-start gap-3 border-t border-sage/50 pt-3">
        <span className="label mt-[3px] shrink-0 text-brass-ink">{plate}</span>
        <span className="text-[0.85rem] leading-relaxed text-ink-soft">{caption}</span>
      </figcaption>
    </figure>
  );
}

/** The honest placeholder: unwoven thread where a photograph should be. */
export function MissingEvidence({
  alt,
  ratio = "aspect-[3/4]",
}: {
  alt: string;
  ratio?: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative ${ratio} overflow-hidden border border-dashed border-sage bg-paper-deep`}
    >
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <pattern id="weave" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 7 H14" stroke="var(--color-stone)" strokeWidth="1" />
            <path
              d="M7 0 V14 M0 0 V14"
              stroke="var(--color-stone)"
              strokeWidth="1"
              strokeDasharray="2 5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#weave)" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden>
          <rect
            x="2.5"
            y="5.5"
            width="29"
            height="23"
            stroke="var(--color-sage)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <path
            d="M2.5 28.5 L12 18 L19 24.5 L24 19.5 L31.5 27"
            stroke="var(--color-sage)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <circle
            cx="11"
            cy="12"
            r="2.5"
            stroke="var(--color-sage)"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
        </svg>
        <p className="label text-brass-ink">Evidence gap</p>
        <p className="max-w-[34ch] text-[0.82rem] leading-relaxed text-ink-soft">
          This photograph is listed in the report as primary evidence, but the
          file was not available when the site was built. The record stays open
          until it is found.
        </p>
      </div>
    </div>
  );
}
