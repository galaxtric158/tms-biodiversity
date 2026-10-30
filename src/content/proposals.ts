/**
 * The five proposed environmental improvements, structured from the
 * research report (§7). The implementation, dependency and evaluation
 * details are website-authored elaborations consistent with the report,
 * not wording the report assigns to each proposal. Statuses are
 * truthful: nothing has been approved or implemented.
 */

export type ProposalStatus =
  | "Proposed"
  | "Requires approval"
  | "In progress";

export type Proposal = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  status: ProposalStatus;
  opportunity: string;
  evidence: string[];
  intervention: string;
  implementation: string[];
  resources: string[];
  approval: string;
  benefits: string[];
  challenges: string[];
  evaluation: string[];
  relatedObservations: string[];
  reportSection: string;
};

export const proposals: Proposal[] = [
  {
    slug: "biodiversity-website",
    number: "01",
    title: "Create a School Biodiversity Website",
    shortTitle: "Biodiversity website",
    status: "In progress",
    opportunity:
      "The group\u2019s findings currently exist only inside a research report. An accessible digital resource would transform them into something students and teachers can return to, learn from, and help grow.",
    evidence: [
      "Four documented observations with photographic evidence (report §4).",
      "Unverified plant identities across the school grounds (report §6).",
      "Limited ecological data: only four photographs currently available (report §6).",
    ],
    intervention:
      "Develop an accessible website documenting the plants found within Tunas Muda School, including verified plant names, photographs, ecological roles, observation locations and practical conservation information.",
    implementation: [
      "Build the biodiversity database of observation records.",
      "Publish the complete research findings with their limitations.",
      "Provide educational explanations of ecological significance.",
      "Include the evidence photographs with consistent captions.",
      "Maintain scientific accuracy as records are updated.",
      "Expand the database as additional observations become available.",
    ],
    resources: [
      "Research group time for content and updates.",
      "A web address and hosting arranged through the school or the group.",
      "Photographs and verification contributed over time.",
    ],
    approval:
      "The website itself is the group\u2019s own work and does not require school approval to exist. School review is requested for publishing it as a recognized school resource and for any link between future plant labels and site records.",
    benefits: [
      "Improved access to environmental information for the whole school community.",
      "A standing invitation for students to appreciate school biodiversity.",
      "A foundation that plant labels, monitoring records and awareness activities can build on.",
    ],
    challenges: [
      "Keeping records accurate as new observations are added.",
      "Verifying species identification beyond what photographs can show.",
      "Continued updating after the founding group moves on.",
    ],
    evaluation: [
      "Number of verified observation records.",
      "Website usability feedback from students and staff.",
      "Student awareness survey results, if later collected.",
      "Frequency of content updates.",
    ],
    relatedObservations: ["flowering-tree", "ornamental-beds", "landscaped-pathway", "tropical-palms"],
    reportSection: "improvements",
  },
  {
    slug: "identification-labels",
    number: "02",
    title: "Introduce Plant Identification Labels",
    shortTitle: "Identification labels",
    status: "Requires approval",
    opportunity:
      "The group\u2019s starting concern (limited student awareness) was identified but never measured. Several plant identities in this research remain unverified, so any labeling scheme depends on first creating a verified identification inventory.",
    evidence: [
      "Unverified plant identities: multiple plant types visible (report §6).",
      "Observations 1, 2 and 4 carry only preliminary identifications (report §4).",
      "Vegetation is closely integrated with daily school routes (report §5.3).",
    ],
    intervention:
      "Install small, weather-resistant labels near selected plants, subject to school approval. Each label could display the plant\u2019s common name, scientific name and a QR code linking to its profile on the biodiversity website.",
    implementation: [
      "Verify selected plant identities through closer examination of leaves, flowers, fruits and stems.",
      "Design weather-resistant labels carrying common name, scientific name and a QR code.",
      "Link each QR code to the plant\u2019s record on this website.",
      "Request permission for placement and coordinate with relevant school staff.",
      "Plan material durability and long-term maintenance.",
    ],
    resources: [
      "Verification support from a knowledgeable teacher or botanist.",
      "Weather-resistant printing materials.",
      "School approval for placement.",
    ],
    approval:
      "School approval is required before any label is installed. Placement, materials and maintenance all need coordination with school staff.",
    benefits: [
      "Environmental education embedded directly in the school environment.",
      "Students recognize and appreciate the vegetation they encounter.",
      "A physical doorway from the school grounds into the research website.",
    ],
    challenges: [
      "Identification must be verified first; labels with wrong names would teach the wrong thing.",
      "Weather, wear and maintenance of physical labels.",
      "Agreement on which plants and locations are suitable.",
    ],
    evaluation: [
      "Number of approved labels installed.",
      "Student feedback on the labels.",
      "Accuracy of the linked information.",
    ],
    relatedObservations: ["flowering-tree", "ornamental-beds", "tropical-palms"],
    reportSection: "improvements",
  },
  {
    slug: "health-monitoring",
    number: "03",
    title: "Establish Regular Plant Health Monitoring",
    shortTitle: "Health monitoring",
    status: "Proposed",
    opportunity:
      "Visible leaf discoloration and damage appear in two of the four observations, and photographs alone cannot explain their causes. Repeated, consistent observation is the honest next step.",
    evidence: [
      "Leaf discoloration and damage visible in Images 1 and 2 (report §6).",
      "Limited ecological data: only four photographs currently available (report §6).",
      "The report states the causes of leaf discoloration cannot be determined from photographs alone (§4.1, §5.2).",
    ],
    intervention:
      "Create a student-led monitoring program that records changes in leaf condition, flowering, visible pests and environmental conditions, carried out consistently so that observations can be compared over time.",
    implementation: [
      "Establish a consistent observation schedule.",
      "Revisit selected plants and document leaf condition.",
      "Record flowering activity and visible damage or pests.",
      "Compare photographs taken over time.",
      "Communicate potential concerns to school maintenance staff rather than treating them independently.",
    ],
    resources: [
      "A small consistent student team.",
      "A camera or phone for documentation.",
      "A simple record template (this website\u2019s database is designed to accept monitoring entries).",
    ],
    approval:
      "The report states potential concerns should be communicated to school maintenance staff rather than treated through unapproved interventions. Students should not independently diagnose plant diseases or apply treatments without appropriate guidance.",
    benefits: [
      "Evidence-based environmental care instead of assumption.",
      "Changes in plant condition become visible early.",
      "A genuine long-term scientific practice for the school.",
    ],
    challenges: [
      "Consistency: monitoring only produces comparison if it continues.",
      "Avoiding treatment or diagnosis beyond the students\u2019 competence.",
      "Keeping records standardized enough to compare.",
    ],
    evaluation: [
      "Number of completed observation sessions.",
      "Consistency of records.",
      "Documented changes over time.",
      "Issues referred to school staff.",
    ],
    relatedObservations: ["flowering-tree", "ornamental-beds", "landscaped-pathway", "tropical-palms"],
    reportSection: "improvements",
  },
  {
    slug: "appropriate-planting",
    number: "04",
    title: "Encourage Ecologically Appropriate Planting",
    shortTitle: "Appropriate planting",
    status: "Proposed",
    opportunity:
      "Paved surfaces sit close to planting areas, and the report highlights the importance of investigating soil permeability, root space and water drainage. Suitable planting opportunities may exist, but they must be researched first.",
    evidence: [
      "Human infrastructure near plants: paths, walls and seating visible (report §6).",
      "The presence of paved surfaces near planting areas highlights the importance of investigating soil permeability, root space and water drainage (report §5.2).",
      "Existing landscaped areas integrated with school facilities (report §5.3).",
    ],
    intervention:
      "Work with school staff to evaluate whether suitable native or locally beneficial plants could be introduced into appropriate planting areas, selected for ecological value, compatibility with the local environment, maintenance requirements and available space.",
    implementation: [
      "Review existing planting spaces with school staff.",
      "Research native or locally beneficial species suited to the conditions.",
      "Consider maintenance requirements honestly.",
      "Obtain approval before any planting.",
    ],
    resources: [
      "Consultation with knowledgeable staff or local expertise.",
      "Species research using authoritative sources.",
      "Approval and maintenance planning.",
    ],
    approval:
      "This initiative depends entirely on school approval and staff consultation. No planting should occur without them. The report does not claim the existing landscape is ecologically inadequate; the question is opened for investigation, not decided.",
    benefits: [
      "Potential improvement of habitat resources and ecological diversity.",
      "Planting decisions grounded in evidence rather than decoration.",
      "A practical collaboration between students, staff and leadership.",
    ],
    challenges: [
      "Maintenance requirements must be realistic for the school.",
      "Space constraints where pavement and infrastructure dominate.",
      "Species suitability must be researched, not assumed.",
    ],
    evaluation: [
      "Approved planting recommendations.",
      "Plant survival and maintenance observations.",
      "Documented changes in vegetation composition.",
    ],
    relatedObservations: ["ornamental-beds", "tropical-palms", "landscaped-pathway"],
    reportSection: "improvements",
  },
  {
    slug: "awareness-activities",
    number: "05",
    title: "Organize Environmental Awareness Activities",
    shortTitle: "Awareness activities",
    status: "Proposed",
    opportunity:
      "The group\u2019s starting concern (limited student awareness) was identified but never measured. The report is explicit that student awareness and behavior should be investigated separately rather than assumed.",
    evidence: [
      "Limited student awareness, identified as the group\u2019s initial concern, not yet measured (report §6).",
      "Students encounter plants throughout their daily routines (report §5.3).",
      "This relationship creates opportunities for environmental education (report §5.3).",
    ],
    intervention:
      "Conduct short educational campaigns through school announcements, posters, digital media or student presentations, encouraging students to recognize plant species, respect landscaped areas and participate in non-invasive biodiversity observations.",
    implementation: [
      "Design educational posters and school announcements.",
      "Prepare student presentations.",
      "Organize biodiversity observation activities.",
      "Create digital awareness content linked to this website.",
      "Collect voluntary feedback through appropriate surveys.",
    ],
    resources: [
      "Student time for design and presentation.",
      "School channels for announcements.",
      "Optional: a voluntary feedback survey.",
    ],
    approval:
      "Coordination with teachers is required for announcements, presentations and any whole-school activity.",
    benefits: [
      "Increased environmental literacy and student participation.",
      "A measured baseline for awareness, replacing the group\u2019s initial assumption.",
      "More eyes noticing the school\u2019s living environment.",
    ],
    challenges: [
      "Awareness campaigns are easy to start and easy to forget.",
      "Measuring change requires before-and-after surveys done appropriately.",
      "Activities compete with many other school messages.",
    ],
    evaluation: [
      "Participation levels.",
      "Feedback responses.",
      "Changes in awareness, if measured through appropriate before-and-after surveys.",
    ],
    relatedObservations: ["landscaped-pathway", "flowering-tree"],
    reportSection: "improvements",
  },
];

export const getProposal = (slug: string) => proposals.find((p) => p.slug === slug);

export const implementationPhases = [
  {
    phase: "1",
    name: "Documentation",
    action: "Collect additional photographs and verify plant identities",
    outcome: "Reliable biodiversity inventory",
    status: "Proposed" as const,
  },
  {
    phase: "2",
    name: "Research",
    action: "Investigate ecological roles and environmental conditions",
    outcome: "Stronger scientific understanding",
    status: "Proposed" as const,
  },
  {
    phase: "3",
    name: "Digital Awareness",
    action: "Publish the biodiversity research website",
    outcome: "Accessible student learning resource",
    status: "In progress" as const,
  },
  {
    phase: "4",
    name: "Coordination",
    action: "Share findings and recommendations with appropriate school staff",
    outcome: "Feedback and implementation guidance",
    status: "Proposed" as const,
  },
  {
    phase: "5",
    name: "Implementation",
    action: "Introduce approved labels, monitoring or awareness activities",
    outcome: "Greater student participation",
    status: "Proposed" as const,
  },
  {
    phase: "6",
    name: "Evaluation",
    action: "Compare observations and collect feedback",
    outcome: "Evidence of progress and areas for improvement",
    status: "Proposed" as const,
  },
];

export const statusNote =
  "The timeline should be finalized after consultation with the school (report §8). No initiative has been approved or implemented; \u201cIn progress\u201d is used only for this website, which is Recommendation 1 being built by the group itself.";
