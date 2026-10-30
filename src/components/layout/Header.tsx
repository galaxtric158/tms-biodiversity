"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { href: "/", label: "Overview" },
  { href: "/field-guide", label: "Plant Database" },
  { href: "/research", label: "Research" },
  { href: "/ecosystem", label: "Ecosystem" },
  { href: "/action", label: "Improvements" },
  { href: "/about", label: "About" },
];

/**
 * Panel states: closed (unmounted) → entering (mounted hidden, flips
 * to open on the next frame so the transition has somewhere to travel
 * from) → open → exiting (mirror path back) → closed. Every step is
 * reversible: clicking during an exit reverses it in place from the
 * current on-screen value, so rapid toggling never jumps or locks.
 */
type MenuState = "closed" | "entering" | "open" | "exiting";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<MenuState>("closed");
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const isOpen = menu === "entering" || menu === "open";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A route change dismisses the panel immediately — no stale menu
  // floating over the page the reader has just navigated to.
  useEffect(() => setMenu("closed"), [pathname]);

  // Entering: the hidden render is committed and painted first; the
  // first frame then flips it to "open" so the transition runs from
  // opacity 0 instead of appearing without motion.
  useEffect(() => {
    if (menu !== "entering") return;
    const id = requestAnimationFrame(() => setMenu("open"));
    return () => cancelAnimationFrame(id);
  }, [menu]);

  // Exiting: unmount the moment the mirror transition lands. The timer
  // is a backstop for the rare case no transition runs (exit started
  // from still-hidden), so a panel can never be stranded half-closed.
  useEffect(() => {
    if (menu !== "exiting") return;
    const t = setTimeout(() => setMenu("closed"), 320);
    return () => clearTimeout(t);
  }, [menu]);

  const toggleMenu = () => {
    if (menu === "closed") setMenu("entering");
    // Interrupting an exit reverses from the current value — no jump.
    else if (menu === "exiting") setMenu("open");
    else setMenu("exiting");
  };

  // Escape closes the panel and returns focus to its toggle button
  // (WCAG 2.1.2 No Keyboard Trap / 2.4.3 Focus Order), so keyboard users
  // are never stranded in an open menu with no way back.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu((m) => (m === "entering" || m === "open" ? "exiting" : m));
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`no-print sticky top-0 z-50 border-b border-sage/45 bg-paper/92 backdrop-blur-[6px] transition-[box-shadow] duration-(--dur-ui) ease-(--ease-journal) ${
        scrolled ? "shadow-[0_1px_0_0_var(--color-stone),0_10px_24px_-18px_rgba(32,40,34,0.35)]" : ""
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1240px] items-center justify-between px-5 transition-[height] duration-(--dur-ui) ease-(--ease-journal) sm:px-8 ${
          scrolled ? "h-14" : "h-[4.75rem]"
        }`}
      >
        <Link href="/" className="group flex items-baseline gap-2.5">
          <span
            aria-hidden
            className="inline-block h-2.5 w-2.5 translate-y-[-1px] rotate-45 border border-brass-ink bg-brass/30 transition-transform duration-(--dur-ui) ease-(--ease-journal) motion-hover:hover:rotate-[135deg]"
          />
          <span className="font-display text-[1.35rem] leading-none tracking-tight text-forest">
            Tunas Muda
          </span>
          <span className="label hidden text-botanical sm:inline">
            Biodiversity Records
          </span>
        </Link>

        {/* The inline nav needs ~790px with the logo and CTA, so it renders
            from lg (1024px). 768px tablets use the menu button below. */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative rounded-[3px] px-3 py-2 text-[0.9rem] font-medium transition-colors duration-(--dur-ui) ease-(--ease-journal) ${
                isActive(item.href)
                  ? "text-forest"
                  : "text-ink-soft hover:text-forest"
              }`}
            >
              {item.label}
              <span
                aria-hidden
                className={`absolute inset-x-3 -bottom-[1px] h-[2px] origin-left bg-botanical transition-transform duration-(--dur-ui) ease-(--ease-journal) ${
                  isActive(item.href) ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          ))}
          <Link
            href="/proposal"
            className={`btn-press ml-2 rounded-[3px] border px-3.5 py-[7px] text-[0.875rem] font-semibold transition-colors duration-(--dur-ui) ease-(--ease-journal) ${
              isActive("/proposal")
                ? "border-forest bg-forest text-paper"
                : "border-forest/60 text-forest hover:bg-forest hover:text-paper"
            }`}
          >
            Improvement plan
          </Link>
        </nav>

        <button
          type="button"
          ref={menuButtonRef}
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-sage text-forest lg:hidden"
        >
          {isOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {menu !== "closed" && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          data-state={menu}
          onTransitionEnd={(e) => {
            // Land the unmount exactly when the mirror exit finishes;
            // the header's timer above is only the backstop.
            if (
              e.propertyName === "opacity" &&
              menu === "exiting"
            ) {
              setMenu("closed");
            }
          }}
          className={`menu-panel border-t border-sage/45 bg-paper px-5 pb-6 pt-3 lg:hidden ${
            // A panel on its way out no longer takes taps: dismissing
            // must not end in a mis-tap on a half-faded link. The
            // toggle and Escape stay live, so input is never trapped.
            menu === "exiting" ? "pointer-events-none" : ""
          }`}
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block border-b border-stone py-3 text-[1.05rem] ${
                isActive(item.href) ? "font-semibold text-forest" : "text-ink-soft"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/proposal"
            className="btn-press mt-4 inline-block rounded-[3px] bg-forest px-4 py-2.5 text-[0.95rem] font-semibold text-paper"
          >
            Improvement plan
          </Link>
        </nav>
      )}
    </header>
  );
}
