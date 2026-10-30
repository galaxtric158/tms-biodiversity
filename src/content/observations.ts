/**
 * Field-guide observation records.
 *
 * Every field below is transcribed or directly derived from the group's
 * final research report (evaluation.pdf, §4.1–4.4) and the plant
 * identification dossier (SA RESEARCH REPORT.pdf). Confidence is stated
 * in words. Nothing here is inferred beyond what the sources state, and
 * unknown information is marked as unknown.
 */

export type Confidence =
  | "Preliminary — genus level"
  | "Preliminary — family level"
  | "Observed directly"
  | "Not recorded";

export type Observation = {
  id: string;
  plate: string;
  slug: string;
  title: string;
  location: string;
  evidenceLabel: string;
  photo: string | null;
  photoAlt: string;
  caption: string;
  identifications: {
    name: string;
    commonName: string | null;
    confidence: Confidence;
    note: string;
  }[];
  dossierReference?: {
    heading: string;
    classification: { label: string; value: string }[];
    body: string;
    sources: { label: string; href: string }[];
  };
  characteristics: string[];
  ecologicalSignificance: string[];
  assessment: string;
  recommendedAction: string;
  reportSections: string[];
  relatedProposals: string[];
  evidenceFlags: {
    flowering: boolean;
    discoloration: boolean;
    pavedSurroundings: boolean;
    palms: boolean;
    seatingInfrastructure: boolean;
    exposedSoil: boolean;
  };
};

export const observations: Observation[] = [
  {
    id: "TM-001",
    plate: "Plate 1",
    slug: "flowering-tree",
    title: "Flowering Tree Near Recreational Facilities",
    location: "Recreational area, near seating and paved surfaces",
    evidenceLabel: "Photograph 1",
    photo: "/photos/obs-01-flowering-tree.jpg",
    photoAlt:
      "A mature Bauhinia tree with rounded, bilobed green leaves and scattered pink-purple flowers, with surrounding recreational infrastructure including seating areas and paved surfaces.",
    caption:
      "Photograph 1 — Flowering tree near school recreational facilities. Supplied by the research group, October 2026 (exact capture date not specified).",
    identifications: [
      {
        name: "Bauhinia",
        commonName: "Orchid tree",
        confidence: "Preliminary — genus level",
        note: "The report states that the rounded, bilobed leaves and scattered pink-purple flowers suggest the tree belongs to the genus Bauhinia. Species-level identification is not confirmed from the photograph.",
      },
    ],
    dossierReference: {
      heading: "Bauhinia purpurea L. — reference profile",
      classification: [
        { label: "Kingdom", value: "Plantae" },
        { label: "Division", value: "Tracheophyta" },
        { label: "Class", value: "Magnoliopsida" },
        { label: "Order", value: "Fabales" },
        { label: "Family", value: "Fabaceae" },
        { label: "Genus", value: "Bauhinia" },
        { label: "Species", value: "Bauhinia purpurea L." },
      ],
      body:
        "Our identification dossier records that Butterfly Flower — what this plant is often called in Indonesia — is from the Fabaceae family and is frequently found in Indonesia as a shade tree and a hedge plant. The name \u201cButterfly Flower\u201d is a common name for various plants of the genus Bauhinia sp., with up to 300 or so species, but the best known is Bauhinia purpurea. The leaves resemble a butterfly at a glance, and the flowers look almost like an orchid. In English the plant is also called Butterfly Tree, Orchid Tree, Purple Bauhinia and Purple Camel\u2019s Foot. This profile is reference material for the genus; it does not confirm the species of our tree.",
      sources: [
        {
          label: "Flona Jakarta",
          href: "https://flona.jakarta.go.id/v140/t602/3c6b11d4a1648d2627a04e4f03a02ec9",
        },
        {
          label: "Droen Solo Baru",
          href: "https://droensolobaru.com/garden/bunga-kupu-kupu-bauhinia-purpurea-l/",
        },
      ],
    },
    characteristics: [
      "A relatively large canopy with multiple branches.",
      "Green, rounded leaves with a characteristic divided shape.",
      "Scattered pink-purple flowers.",
      "Some yellowing leaves among predominantly green foliage.",
      "Surrounding recreational infrastructure, including seating areas and paved surfaces.",
    ],
    ecologicalSignificance: [
      "Flowering trees can provide nectar and other resources for visiting insects.",
      "Branches and foliage may offer shelter for small organisms.",
      "Canopies provide shade and can reduce the amount of direct sunlight reaching the ground.",
    ],
    assessment:
      "The tree appears established and retains substantial foliage. However, some leaves are yellow, and the photograph does not provide sufficient evidence to determine whether this reflects normal leaf aging, seasonal changes or environmental stress.",
    recommendedAction:
      "Monitor leaf condition over time, document flowering periods and investigate whether pollinating insects visit the flowers.",
    reportSections: ["findings", "challenges", "analysis"],
    relatedProposals: ["health-monitoring", "identification-labels"],
    evidenceFlags: {
      flowering: true,
      discoloration: true,
      pavedSurroundings: true,
      palms: false,
      seatingInfrastructure: true,
      exposedSoil: false,
    },
  },
  {
    id: "TM-002",
    plate: "Plate 2",
    slug: "ornamental-beds",
    title: "Ornamental Planting Beds",
    location: "School planting beds and rectangular white planters",
    evidenceLabel: "Photograph 2",
    photo: "/photos/obs-02-planting-beds.jpg",
    photoAlt:
      "Cultivated tropical plants in rectangular white planters and a larger planting bed: variegated foliage with green, cream and pinkish leaf patterns, deeply lobed leaves and large arrow-shaped leaves.",
    caption:
      "Photograph 2 — Ornamental tropical plants in school planting beds. Supplied by the research group, October 2026 (exact capture date not specified).",
    identifications: [
      {
        name: "Aglaonema species or cultivars",
        commonName: null,
        confidence: "Preliminary — genus level",
        note: "Likely represented by the variegated plants with green, cream and pinkish leaf patterns.",
      },
      {
        name: "Alocasia or a related aroid genus",
        commonName: null,
        confidence: "Preliminary — genus level",
        note: "Possibly represented by the large, upright, arrow-shaped leaves.",
      },
      {
        name: "Thaumatophyllum or a related genus",
        commonName: null,
        confidence: "Preliminary — genus level",
        note: "Potentially represented by the deeply lobed foliage.",
      },
    ],
    dossierReference: {
      heading: "Araceae family — reference note from our dossier",
      classification: [
        { label: "Family", value: "Araceae" },
        { label: "Example genus", value: "Dieffenbachia, with about 60 species" },
        { label: "Common types", value: "D. seguine, D. amoena; cultivars such as \u2018Camille\u2019 and \u2018Tropic Snow\u2019" },
      ],
      body:
        "Our dossier records that Aglaonema and Alocasia belong to the same family as Dieffenbachia (Araceae). Dieffenbachia\u2019s common name, Dumbcane, comes from the fact that all plant parts contain raphides — crystalline, needle-like structures which are ejected when cell walls are damaged. Ingestion causes stinging and burning to the mouth and throat, and exposure to the eyes is particularly painful. The dossier advises handling the plant with care when trimming, and keeping small children and pets away. This profile is included as family reference material and a reminder to observe unfamiliar aroids without handling them.",
      sources: [
        {
          label: "UConn Home & Garden",
          href: "https://homegarden.cahnr.uconn.edu/factsheets/dieffenbachia/",
        },
      ],
    },
    characteristics: [
      "Several different leaf shapes, sizes and color patterns.",
      "Organized planting containers.",
      "Exposed soil surrounding plant bases.",
      "Some yellowing leaves, brown leaf edges and localized damage.",
      "Plants growing close together in a landscaped environment.",
    ],
    ecologicalSignificance: [
      "These ornamental plants increase the visible variety of vegetation within the school.",
      "Their foliage provides additional plant cover and contributes to the complexity of the landscaped environment.",
      "The presence of different leaf colors and shapes does not automatically indicate high species diversity, as some plants may be cultivars of the same species.",
    ],
    assessment:
      "The planting beds contain mostly green foliage, suggesting that many plants remain actively growing. Some individual leaves show discoloration or damage, but their causes cannot be determined from photographs alone.",
    recommendedAction:
      "Inspect irrigation and drainage, remove fully dead foliage when appropriate, and monitor whether leaf damage increases over time.",
    reportSections: ["findings", "challenges", "analysis"],
    relatedProposals: ["health-monitoring", "identification-labels", "appropriate-planting"],
    evidenceFlags: {
      flowering: false,
      discoloration: true,
      pavedSurroundings: false,
      palms: false,
      seatingInfrastructure: false,
      exposedSoil: true,
    },
  },
  {
    id: "TM-003",
    plate: "Plate 3",
    slug: "landscaped-pathway",
    title: "Landscaped School Pathway",
    location: "Landscaped pathway with seating, walkways and maintained shrubs",
    evidenceLabel: "Photograph 3",
    photo: "/photos/obs-03-pathway.jpg",
    photoAlt:
      "A landscaped school walkway: a flowering tree with pink-purple flowers overhanging picnic tables and a green umbrella on the left, a row of maintained dark-green shrubs along a covered corridor on the right, a brick path and a stone boundary wall.",
    caption:
      "Photograph 3 — Landscaped school pathway and vegetation. Supplied by the research group, October 2026 (exact capture date not specified).",
    identifications: [
      {
        name: "Flowering tree, similar to Observation 1",
        commonName: null,
        confidence: "Not recorded",
        note: "The report states this tree appears similar to the one documented in Image 1 and may represent the same individual or species. This has not been verified.",
      },
      {
        name: "Maintained shrubs or small trees",
        commonName: null,
        confidence: "Not recorded",
        note: "Multiple maintained shrubs or small trees are visible; no identification was attempted from the photograph.",
      },
    ],
    characteristics: [
      "A flowering tree with an extensive canopy.",
      "Multiple maintained shrubs or small trees.",
      "Exposed soil surrounding some planted areas.",
      "Paved walkways and seating facilities.",
      "Vegetation distributed alongside human activity spaces.",
    ],
    ecologicalSignificance: [
      "The combination of trees and shrubs provides multiple vegetation layers.",
      "Different plant heights and structures can create a wider range of potential microhabitats than a landscape containing only grass.",
      "Trees also offer shade for students and help make outdoor spaces more comfortable.",
    ],
    assessment:
      "The vegetation is visibly maintained and integrated into the school\u2019s outdoor infrastructure. However, the photograph alone cannot establish whether the landscaping supports substantial wildlife diversity or whether the existing species are predominantly native or introduced.",
    recommendedAction:
      "Establish a biodiversity observation zone where students can record plant species, flowering activity and visible wildlife without disturbing the habitat.",
    reportSections: ["findings", "analysis"],
    relatedProposals: ["health-monitoring", "awareness-activities"],
    evidenceFlags: {
      flowering: true,
      discoloration: false,
      pavedSurroundings: true,
      palms: false,
      seatingInfrastructure: true,
      exposedSoil: true,
    },
  },
  {
    id: "TM-004",
    plate: "Plate 4",
    slug: "tropical-palms",
    title: "Tropical Palms Near a Wall",
    location: "Along a school boundary wall, with additional vegetation nearby",
    evidenceLabel: "Photograph 4",
    photo: null,
    photoAlt:
      "Placeholder: no photograph of the tropical palms near the boundary wall is available in the project evidence.",
    caption:
      "Photograph 4 — Tropical palms near a school boundary wall. Listed as primary evidence in the research report, but the image file was not available when this site was built. The record is kept open so the photograph can be inserted when it is found.",
    identifications: [
      {
        name: "Palm family, Arecaceae",
        commonName: null,
        confidence: "Preliminary — family level",
        note: "The plants resemble commonly cultivated ornamental palms, although the exact species cannot be confirmed from the photograph.",
      },
    ],
    characteristics: [
      "Tall, slender stems.",
      "Long, arching, feather-like leaves.",
      "Multiple narrow leaflets.",
      "Dense foliage at different heights.",
      "Vegetation growing near a wall.",
      "Limited visible space between some plants.",
    ],
    ecologicalSignificance: [
      "Palms contribute to vegetation structure and may provide shelter or resources for small organisms, depending on their species and local ecological interactions.",
      "Their leaves can also contribute organic matter to the soil as they naturally age and decompose.",
    ],
    assessment:
      "The palms appear predominantly green and upright. The photograph does not reveal sufficient information about soil conditions, root development or long-term plant health.",
    recommendedAction:
      "Monitor plant growth, inspect the surrounding soil and ensure maintenance practices are appropriate for the identified palm species.",
    reportSections: ["findings", "challenges"],
    relatedProposals: ["health-monitoring", "appropriate-planting"],
    evidenceFlags: {
      flowering: false,
      discoloration: false,
      pavedSurroundings: false,
      palms: true,
      seatingInfrastructure: false,
      exposedSoil: false,
    },
  },
];

export const getObservation = (slug: string) =>
  observations.find((o) => o.slug === slug);

export const evidenceFlagLabels: { key: keyof Observation["evidenceFlags"]; label: string }[] = [
  { key: "flowering", label: "Flowering visible" },
  { key: "discoloration", label: "Leaf discoloration or damage visible" },
  { key: "pavedSurroundings", label: "Paved surroundings" },
  { key: "palms", label: "Palms present" },
  { key: "seatingInfrastructure", label: "Seating or recreational infrastructure" },
  { key: "exposedSoil", label: "Exposed soil recorded" },
];
