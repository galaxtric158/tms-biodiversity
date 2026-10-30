import type { Metadata } from "next";
import { Instrument_Serif, Geist } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tunas Muda Biodiversity: Plant Records & Environmental Research",
    template: "%s · Tunas Muda Biodiversity",
  },
  description:
    "A student-led biodiversity record of Tunas Muda School: four photographic observations, the full research report and five proposed environmental improvements.",
  // The site's brass specimen diamond — declared so browsers use it
  // instead of falling back to a /favicon.ico request (a console 404).
  icons: {
    icon: "/icon.svg",
  },
  keywords: [
    "Tunas Muda School",
    "biodiversity",
    "Service as Action",
    "IB MYP",
    "plant observations",
    "school environment",
  ],
  openGraph: {
    title: "Tunas Muda Biodiversity: Plant Records & Environmental Research",
    description:
      "An exploration of plant biodiversity, ecological awareness, and environmental sustainability across Tunas Muda School.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/photos/obs-01-flowering-tree.jpg",
        width: 1200,
        height: 1600,
        alt: "Flowering tree observed near Tunas Muda School recreational facilities",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrument.variable} ${geist.variable}`}>
      <body className="antialiased">
        {/*
          THESIS: A school campus's overlooked vegetation deserves the care of a
          real research archive; every proposal visibly threads back to the
          photograph that justified it. Refuses the sustainability landing page
          (green hero + three eco-cards) arrangement.
          OWN-WORLD: Warm paper #F6F4ED with dot-grid ruling and taped-in
          photographic prints; forest-ink #203B32 sections; brass #B18B5D
          specimen stamps; Instrument Serif display + Geist grotesque; evidence
          state carried by line treatment — solid observed, dashed preliminary,
          dotted unrecorded.
          STORY: A visitor sees six students' real research, walks four
          observation records, understands exactly what photographs can and
          cannot prove, follows evidence into five improvement initiatives, and
          finds the environmental improvement plan.
          FIRST VIEWPORT: Dot-grid paper spread — oversized Instrument Serif
          "Discover the biodiversity growing around us." left; Photograph 1 taped in
          right with scientific leader-line annotations at the report's own
          recorded characteristics; brass stamp TUNAS MUDA / SERVICE AS ACTION /
          2026; CTAs Explore Our Research + Discover the Plants; scroll rule.
          FORM: The bound field notebook, position 3 of the grounded list,
          seed key 5d8f6363; raised by donor disciplines — RIBBON
          KNOWN/INFERRED (confidence as typography + the missing photograph as
          an unwoven gap), BENCH STOP-FLAG (folded corner marks last-read
          report section), RAIL LINE-STATE (evidence links carry state as line
          treatment), PLATE FIGURE NUMBERS (photographs numbered as plates),
          TABLE WEIGHT-RANK (dense tables rank by weight and case, not size).
          FINISH: unreviewed and undocumented is unfinished; this build ends
          with the finish review, the verdict, and DESIGN.md
        */}
        <Header />
        {/* The taped prints' tape strips overhang the page padding by a few
            pixels. Clipping here (not on body/html) contains that decorative
            overhang inside the content bounds, so the document reports its
            true width and full-page captures are not 3px wider than the
            viewport — while the tape still runs off the page edge, as tape
            does. `clip`, not `hidden`: no scroll container is created, so
            the sticky ToC and specimen columns keep sticking to the viewport. */}
        <main className="overflow-x-clip">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
