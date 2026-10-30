import { observations, evidenceFlagLabels } from "@/content/observations";

/**
 * The evidence matrix: which observations record which visible features.
 * Built only from statements the report makes about each photograph.
 * "Not recorded" means the report does not state it — not that it is absent.
 */
export function EvidenceMatrix() {
  /* contain: layout paint keeps the 760px table's overflow inside this
     scroller — without it, Chrome leaks the table width to the document
     (html{overflow-x:clip} does not stop it) and the whole page pans
     sideways on phones. The scroller keeps its own horizontal scroll. */
  return (
    <div className="overflow-x-auto contain-[layout_paint]">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <caption className="sr-only">
          Visible features recorded in each of the four observation photographs
        </caption>
        <thead>
          <tr className="border-y border-forest/30">
            <th scope="col" className="label px-3 py-3.5 text-forest">
              Observation
            </th>
            {evidenceFlagLabels.map((f) => (
              <th
                key={f.key}
                scope="col"
                className="label w-[86px] px-2 py-3.5 text-center leading-tight text-forest"
              >
                {f.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {observations.map((o) => (
            <tr key={o.id} className="border-b border-stone">
              <th scope="row" className="px-3 py-4 text-left align-top">
                <span className="label block text-brass-ink">{o.plate}</span>
                <span className="mt-0.5 block text-[0.95rem] font-semibold leading-snug text-forest">
                  {o.title}
                </span>
              </th>
              {evidenceFlagLabels.map((f) => {
                const present = o.evidenceFlags[f.key];
                return (
                  <td key={f.key} className="px-2 py-4 text-center align-middle">
                    {present ? (
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-botanical bg-botanical/12">
                        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                          <path
                            d="M2 6.4 L4.8 9 L10 3"
                            fill="none"
                            stroke="var(--color-botanical)"
                            strokeWidth="1.8"
                          />
                        </svg>
                        <span className="sr-only">Recorded</span>
                      </span>
                    ) : (
                      <span className="label text-sage-ink">—</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 max-w-[72ch] text-[0.85rem] leading-relaxed text-ink-soft">
        A dash means the report does not record that feature for this
        photograph — not that the feature is absent. The matrix reflects only
        what four photographs can show; it is not a biodiversity score.
      </p>
    </div>
  );
}
