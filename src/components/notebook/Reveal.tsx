"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A one-shot scroll reveal for major sections.
 *
 * The honest contract: content is fully visible in the server HTML and
 * stays visible if JavaScript never runs. The armed state exists only
 * between mount and intersection, is skipped entirely when the reader
 * prefers reduced motion, and plays once — an interface should never
 * fight its reader by re-animating on every scroll-by.
 *
 * To stagger a list instead of the whole block, add the `reveal-child`
 * class to each direct child; they inherit the reveal when this block
 * is revealed.
 */
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // "idle" in SSR HTML — never "hidden". Motion is armed after mount.
  const [state, setState] = useState<"idle" | "pending" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return; // no motion, no arming, no hiding

    // Already on screen at mount: nothing to bridge.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      setState("shown");
      return;
    }

    setState("pending");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState("shown");
            io.disconnect(); // once, never again
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const dataAttr =
    state === "pending"
      ? { "data-motion-pending": "" }
      : state === "shown"
        ? { "data-revealed": "" }
        : {};

  return (
    <div ref={ref} {...dataAttr} className={className}>
      {children}
    </div>
  );
}
