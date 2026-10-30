export const sdgs = [
  {
    number: "15",
    title: "Life on Land",
    color: "#56C02B",
    url: "https://sdgs.un.org/goals/goal15",
    official:
      "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss.",
    connection:
      "This project contributes to SDG 15 by encouraging the protection, observation and responsible management of terrestrial biodiversity. Through identifying plant species and investigating their ecological significance, students can develop a stronger understanding of the importance of healthy ecosystems.",
  },
  {
    number: "11",
    title: "Sustainable Cities and Communities",
    color: "#FD9D24",
    url: "https://sdgs.un.org/goals/goal11",
    official:
      "Make cities and human settlements inclusive, safe, resilient and sustainable.",
    connection:
      "School green spaces form part of the wider urban environment. Maintaining these spaces can support more sustainable, comfortable and environmentally responsible communities.",
  },
  {
    number: "4",
    title: "Quality Education",
    color: "#C5192D",
    url: "https://sdgs.un.org/goals/goal4",
    official:
      "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
    connection:
      "The proposed biodiversity website and awareness activities provide opportunities for environmental education, scientific inquiry and student-led learning.",
  },
];

export const sdgNote =
  "These connections describe how the project relates to the goals. The project does not claim to have achieved measurable outcomes against any SDG target.";

/**
 * Numeral colour for each SDG colour tile. White fails WCAG contrast on
 * two of the official goal colours used here — Goal 15 green (#56C02B,
 * 2.3:1) and Goal 11 orange (#FD9D24, 2.1:1), both below even the 3:1
 * large-text floor — so forest ink (5.2:1 / 5.8:1) is used on those two.
 * The deep Goal 4 red keeps white, which passes.
 */
export const sdgNumeralClass = (color: string) =>
  color === "#56C02B" || color === "#FD9D24" ? "text-forest" : "text-white";
