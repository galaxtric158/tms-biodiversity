/**
 * The complete final research report, transcribed faithfully from
 * "Plant Biodiversity and Environmental Sustainability at Tunas Muda
 * School — Service as Action Final Research Report" (27 October 2026).
 * Report wording is preserved; layout structure and website
 * cross-references (plant-database links and the Improvements signpost)
 * were added by the site. Limitations travel with the findings and are
 * never removed.
 */

export type Block =
  | { kind: "p"; text: string }
  | { kind: "sub"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "numbered"; items: string[] }
  | { kind: "table"; head: string[]; rows: string[][] }
  | {
      kind: "note";
      tone: "evidence" | "identification" | "interpretation" | "limitation" | "action";
      text: string;
    }
  | { kind: "quote"; text: string; cite?: string }
  | {
      kind: "figure";
      photo: string | null;
      alt: string;
      caption: string;
      missing?: boolean;
      href?: string;
    };

export type ReportSection = {
  id: string;
  number: string;
  title: string;
  blocks: Block[];
};

export const reportSections: ReportSection[] = [
  {
    id: "executive-summary",
    number: "1",
    title: "Executive Summary",
    blocks: [
      {
        kind: "p",
        text: "This research investigates plant biodiversity and environmental conditions within Tunas Muda School\u2019s grounds, aiming to identify opportunities to improve ecosystem health and encourage environmental responsibility among students.",
      },
      {
        kind: "p",
        text: "Using photographic observations of trees, ornamental plants, landscaped areas and surrounding infrastructure, our group examined the visible diversity of plant life and its relationship with the school environment.",
      },
      {
        kind: "p",
        text: "Our initial findings indicate that the school supports several types of vegetation, including flowering trees, palms, broad-leaved tropical plants and ornamental shrubs. However, some plants exhibit visible signs of leaf discoloration and damage, while several planting areas are surrounded by paved surfaces and infrastructure.",
      },
      {
        kind: "note",
        tone: "limitation",
        text: "Although these observations do not necessarily indicate poor ecosystem health, they highlight opportunities for further investigation, improved plant maintenance, biodiversity conservation and environmental education.",
      },
      {
        kind: "p",
        text: "We propose developing a student-led biodiversity awareness website, introducing plant identification labels, conducting regular environmental monitoring and encouraging the school community to participate in conservation activities.",
      },
      {
        kind: "p",
        text: "Through this project, we hope to demonstrate that environmental sustainability begins with understanding and appreciating the ecosystems within our immediate surroundings.",
      },
    ],
  },
  {
    id: "introduction",
    number: "2",
    title: "Introduction and Background",
    blocks: [
      { kind: "sub", text: "2.1 Background" },
      {
        kind: "p",
        text: "Biodiversity refers to the variety of living organisms within an environment, including plants, animals, fungi and microorganisms. Plant biodiversity is particularly important because plants serve as primary producers, provide habitats, support food webs and contribute to environmental stability.",
      },
      {
        kind: "p",
        text: "Within a school environment, plants also provide shade, improve the appearance of outdoor spaces and create opportunities for students to learn about ecological relationships.",
      },
      {
        kind: "p",
        text: "At Tunas Muda School, we noticed that the surrounding vegetation is sometimes overlooked in everyday school activities. This observation inspired our group to investigate the school\u2019s plant biodiversity and explore how students could become more environmentally responsible.",
      },
      {
        kind: "p",
        text: "Rather than simply identifying plants, our project aims to understand their ecological significance, evaluate observable environmental conditions and recommend practical improvements.",
      },
      { kind: "sub", text: "2.2 Research Question" },
      {
        kind: "quote",
        text: "How does plant biodiversity contribute to the environmental health of Tunas Muda School, and what practical actions can the school community take to preserve and improve its ecosystem?",
      },
      { kind: "sub", text: "2.3 Research Objectives" },
      {
        kind: "numbered",
        items: [
          "Identify and document different types of plants found within the school grounds.",
          "Observe visible indicators of plant health and environmental conditions.",
          "Analyze the ecological importance of the observed vegetation.",
          "Identify potential environmental challenges and areas for improvement.",
          "Develop practical recommendations to increase environmental awareness and sustainability.",
          "Communicate our findings through an accessible biodiversity research website and a structured environmental improvement plan.",
        ],
      },
    ],
  },
  {
    id: "methodology",
    number: "3",
    title: "Research Methodology",
    blocks: [
      { kind: "sub", text: "3.1 Research Approach" },
      {
        kind: "p",
        text: "This project uses a qualitative observational approach, supported by photographic documentation.",
      },
      {
        kind: "p",
        text: "Four photographs were provided as initial evidence of the school\u2019s vegetation. These photographs represent several outdoor environments, including a flowering tree near recreational facilities, ornamental planting beds, landscaped pathways and an area containing palms.",
      },
      { kind: "sub", text: "3.2 Data Collection" },
      {
        kind: "p",
        text: "The photographic evidence was analyzed according to the following categories:",
      },
      {
        kind: "table",
        head: ["Observation Category", "Indicators"],
        rows: [
          ["Plant diversity", "Different plant forms, leaf structures and growth patterns"],
          ["Plant condition", "Leaf color, visible damage, flowering and general appearance"],
          ["Environmental conditions", "Soil exposure, shade, nearby pavement and infrastructure"],
          ["Ecological significance", "Potential habitat, shade provision and biodiversity support"],
          ["Human influence", "Landscaping, planting containers, recreational facilities and pathways"],
        ],
      },
      { kind: "sub", text: "3.3 Research Limitations" },
      {
        kind: "note",
        tone: "limitation",
        text: "The research is based on four photographs rather than a comprehensive ecological survey. Consequently, the findings cannot establish the total number of plant species, population sizes, soil quality, wildlife diversity or long-term ecosystem health.",
      },
      {
        kind: "note",
        tone: "limitation",
        text: "Plant identification is also preliminary, as accurate species identification may require closer photographs of leaves, flowers, fruits and stems.",
      },
      {
        kind: "note",
        tone: "limitation",
        text: "No soil tests, biodiversity indices, interviews or repeated monitoring results have been provided. These would strengthen the research if conducted in future sessions.",
      },
    ],
  },
  {
    id: "findings",
    number: "4",
    title: "Research Findings and Observations",
    blocks: [
      { kind: "sub", text: "4.1 Observation 1 \u2014 Flowering Tree Near Recreational Facilities" },
      {
        kind: "figure",
        photo: "/photos/obs-01-flowering-tree.jpg",
        alt: "A mature Bauhinia tree with rounded, bilobed green leaves and scattered pink-purple flowers, with surrounding recreational infrastructure including seating areas and paved surfaces.",
        caption: "Image 1 \u2014 Flowering tree near recreational facilities.",
        href: "/field-guide/flowering-tree",
      },
      {
        kind: "p",
        text: "The first photograph shows a mature, branching tree with numerous rounded, bilobed leaves and scattered pink-purple flowers. These characteristics suggest that the tree belongs to the genus Bauhinia, commonly known as the orchid tree.",
      },
      { kind: "note", tone: "identification", text: "Preliminary identification: the genus Bauhinia, suggested by visible characteristics. Species is not confirmed from the photograph." },
      {
        kind: "p",
        text: "Visible characteristics:",
      },
      {
        kind: "list",
        items: [
          "A relatively large canopy with multiple branches.",
          "Green, rounded leaves with a characteristic divided shape.",
          "Scattered pink-purple flowers.",
          "Some yellowing leaves among predominantly green foliage.",
          "Surrounding recreational infrastructure, including seating areas and paved surfaces.",
        ],
      },
      { kind: "p", text: "Ecological significance:" },
      {
        kind: "p",
        text: "Flowering trees can provide nectar and other resources for visiting insects, while their branches and foliage may offer shelter for small organisms. Their canopies also provide shade and can reduce the amount of direct sunlight reaching the ground.",
      },
      { kind: "p", text: "Environmental assessment:" },
      {
        kind: "note",
        tone: "interpretation",
        text: "The tree appears established and retains substantial foliage. However, some leaves are yellow, and the photograph does not provide sufficient evidence to determine whether this reflects normal leaf aging, seasonal changes or environmental stress.",
      },
      {
        kind: "note",
        tone: "action",
        text: "Recommended action: Monitor leaf condition over time, document flowering periods and investigate whether pollinating insects visit the flowers.",
      },
      { kind: "sub", text: "4.2 Observation 2 \u2014 Ornamental Planting Beds" },
      {
        kind: "figure",
        photo: "/photos/obs-02-planting-beds.jpg",
        alt: "Variegated ornamental plants in white planters against a block wall, with arrow-shaped and deeply lobed leaves behind them.",
        caption: "Image 2 \u2014 Ornamental tropical plants in planting beds.",
        href: "/field-guide/ornamental-beds",
      },
      {
        kind: "p",
        text: "The second photograph presents several cultivated tropical plants growing in rectangular white planters and a larger planting bed. The visible plants include variegated ornamental foliage, deeply lobed leaves and large arrow-shaped leaves.",
      },
      { kind: "p", text: "Preliminary plant identification:" },
      {
        kind: "list",
        items: [
          "Aglaonema species or cultivars \u2014 likely represented by the variegated plants with green, cream and pinkish leaf patterns.",
          "Alocasia or a related aroid genus \u2014 possibly represented by the large, upright, arrow-shaped leaves.",
          "Thaumatophyllum or a related genus \u2014 potentially represented by the deeply lobed foliage.",
        ],
      },
      { kind: "p", text: "Visible characteristics:" },
      {
        kind: "list",
        items: [
          "Several different leaf shapes, sizes and color patterns.",
          "Organized planting containers.",
          "Exposed soil surrounding plant bases.",
          "Some yellowing leaves, brown leaf edges and localized damage.",
          "Plants growing close together in a landscaped environment.",
        ],
      },
      { kind: "p", text: "Ecological significance:" },
      {
        kind: "p",
        text: "These ornamental plants increase the visible variety of vegetation within the school. Their foliage provides additional plant cover and contributes to the complexity of the landscaped environment. However, the presence of different leaf colors and shapes does not automatically indicate high species diversity, as some plants may be cultivars of the same species.",
      },
      { kind: "p", text: "Environmental assessment:" },
      {
        kind: "note",
        tone: "interpretation",
        text: "The planting beds contain mostly green foliage, suggesting that many plants remain actively growing. Some individual leaves show discoloration or damage, but their causes cannot be determined from photographs alone.",
      },
      {
        kind: "note",
        tone: "action",
        text: "Recommended action: Inspect irrigation and drainage, remove fully dead foliage when appropriate, and monitor whether leaf damage increases over time.",
      },
      { kind: "sub", text: "4.3 Observation 3 \u2014 Landscaped School Pathway" },
      {
        kind: "figure",
        photo: "/photos/obs-03-pathway.jpg",
        alt: "A landscaped pathway with a flowering tree, maintained shrubs, paved walkway, seating and recreational infrastructure.",
        caption: "Image 3 \u2014 Landscaped school pathway and vegetation.",
        href: "/field-guide/landscaped-pathway",
      },
      {
        kind: "p",
        text: "The third photograph shows a landscaped school environment containing a flowering tree, trimmed shrubs, a pedestrian pathway, outdoor seating and recreational infrastructure. The flowering tree appears similar to the one documented in Image 1 and may represent the same individual or species.",
      },
      { kind: "p", text: "Visible characteristics:" },
      {
        kind: "list",
        items: [
          "A flowering tree with an extensive canopy.",
          "Multiple maintained shrubs or small trees.",
          "Exposed soil surrounding some planted areas.",
          "Paved walkways and seating facilities.",
          "Vegetation distributed alongside human activity spaces.",
        ],
      },
      { kind: "p", text: "Ecological significance:" },
      {
        kind: "p",
        text: "The combination of trees and shrubs provides multiple vegetation layers. Different plant heights and structures can create a wider range of potential microhabitats than a landscape containing only grass. Trees also offer shade for students and help make outdoor spaces more comfortable.",
      },
      { kind: "p", text: "Environmental assessment:" },
      {
        kind: "note",
        tone: "interpretation",
        text: "The vegetation is visibly maintained and integrated into the school\u2019s outdoor infrastructure. However, the photograph alone cannot establish whether the landscaping supports substantial wildlife diversity or whether the existing species are predominantly native or introduced.",
      },
      {
        kind: "note",
        tone: "action",
        text: "Recommended action: Establish a biodiversity observation zone where students can record plant species, flowering activity and visible wildlife without disturbing the habitat.",
      },
      { kind: "sub", text: "4.4 Observation 4 \u2014 Tropical Palms Near a Wall" },
      {
        kind: "figure",
        photo: null,
        alt: "No photograph of the palms near the boundary wall is available in the project evidence.",
        caption:
          "Image 4 \u2014 Tropical palms near a school boundary wall. Listed as primary evidence in this report; the image file was not available when the website was built.",
        missing: true,
        href: "/field-guide/tropical-palms",
      },
      {
        kind: "p",
        text: "The fourth photograph shows several palms growing alongside a boundary wall, with additional vegetation nearby. The palms have elongated, feather-like leaves consisting of multiple narrow leaflets.",
      },
      { kind: "note", tone: "identification", text: "Preliminary identification: these plants belong to the palm family, Arecaceae. They resemble commonly cultivated ornamental palms, although the exact species cannot be confirmed from the photograph." },
      { kind: "p", text: "Visible characteristics:" },
      {
        kind: "list",
        items: [
          "Tall, slender stems.",
          "Long, arching, feather-like leaves.",
          "Dense foliage at different heights.",
          "Vegetation growing near a wall.",
          "Limited visible space between some plants.",
        ],
      },
      { kind: "p", text: "Ecological significance:" },
      {
        kind: "p",
        text: "Palms contribute to vegetation structure and may provide shelter or resources for small organisms, depending on their species and local ecological interactions. Their leaves can also contribute organic matter to the soil as they naturally age and decompose.",
      },
      { kind: "p", text: "Environmental assessment:" },
      {
        kind: "note",
        tone: "interpretation",
        text: "The palms appear predominantly green and upright. The photograph does not reveal sufficient information about soil conditions, root development or long-term plant health.",
      },
      {
        kind: "note",
        tone: "action",
        text: "Recommended action: Monitor plant growth, inspect the surrounding soil and ensure maintenance practices are appropriate for the identified palm species.",
      },
    ],
  },
  {
    id: "analysis",
    number: "5",
    title: "Overall Biodiversity Analysis",
    blocks: [
      { kind: "sub", text: "5.1 Diversity of Plant Forms" },
      {
        kind: "p",
        text: "The photographic evidence demonstrates that Tunas Muda School contains multiple forms of vegetation, including:",
      },
      {
        kind: "list",
        items: [
          "Mature flowering trees.",
          "Ornamental shrubs and small trees.",
          "Broad-leaved tropical plants.",
          "Variegated foliage plants.",
          "Palms and other landscaped vegetation.",
        ],
      },
      {
        kind: "note",
        tone: "limitation",
        text: "This suggests that the school possesses a visually varied planted environment. However, because the photographs cover only selected locations, they cannot be used to calculate total species richness or establish the overall biodiversity of the school.",
      },
      { kind: "sub", text: "5.2 Plant Health and Environmental Conditions" },
      {
        kind: "p",
        text: "Most photographed plants retain substantial green foliage, indicating the presence of living, established vegetation. Nevertheless, several ornamental plants show visible discoloration or leaf damage.",
      },
      {
        kind: "note",
        tone: "interpretation",
        text: "Possible explanations include natural aging, water imbalance, environmental exposure, nutrient availability or pests. Further examination would be required before identifying any particular cause.",
      },
      {
        kind: "p",
        text: "The presence of paved surfaces near planting areas also highlights the importance of investigating soil permeability, root space and water drainage.",
      },
      { kind: "sub", text: "5.3 Human Influence on the Ecosystem" },
      {
        kind: "p",
        text: "The photographs show that vegetation is closely integrated with school facilities, including pathways, seating areas, recreational spaces and walls. This relationship creates opportunities for environmental education because students encounter plants throughout their daily routines.",
      },
      {
        kind: "p",
        text: "However, landscaped ecosystems also require management. Plant selection, watering practices, pruning and waste management can influence their long-term ecological value.",
      },
      {
        kind: "note",
        tone: "limitation",
        text: "The available evidence does not establish that students have damaged or neglected the plants. Student awareness and behavior should therefore be investigated separately rather than assumed.",
      },
    ],
  },
  {
    id: "challenges",
    number: "6",
    title: "Environmental Challenges and Opportunities",
    blocks: [
      {
        kind: "table",
        head: ["Potential Challenge", "Supporting Observation", "Improvement Opportunity"],
        rows: [
          [
            "Limited student awareness",
            "Identified as the group\u2019s initial concern, not yet measured",
            "Conduct awareness surveys and educational campaigns",
          ],
          [
            "Leaf discoloration and damage",
            "Visible in Images 1 and 2",
            "Introduce regular plant health monitoring",
          ],
          [
            "Unverified plant identities",
            "Multiple plant types visible",
            "Create a verified plant identification inventory",
          ],
          [
            "Unknown wildlife diversity",
            "Wildlife not clearly documented in photographs",
            "Conduct non-invasive wildlife observations",
          ],
          [
            "Limited ecological data",
            "Only four photographs currently available",
            "Establish repeated monitoring and standardized records",
          ],
          [
            "Human infrastructure near plants",
            "Paths, walls and seating visible",
            "Review soil conditions, drainage and available planting space",
          ],
        ],
      },
      {
        kind: "note",
        tone: "limitation",
        text: "These are research priorities rather than confirmed cases of environmental damage.",
      },
    ],
  },
  {
    id: "improvements",
    number: "7",
    title: "Proposed Environmental Improvements",
    blocks: [
      {
        kind: "p",
        text: "Recommendation 1 \u2014 Create a School Biodiversity Website. Develop an accessible website documenting the plants found within Tunas Muda School. The website should include verified plant names, photographs, ecological roles, observation locations and practical conservation information. This would transform the group\u2019s findings into an educational resource available to students and teachers.",
      },
      {
        kind: "p",
        text: "Recommendation 2 \u2014 Introduce Plant Identification Labels. Install small, weather-resistant labels near selected plants, subject to school approval. Each label could display the plant\u2019s common name, scientific name and a QR code linking to its profile on the biodiversity website. This would encourage students to recognize and appreciate the vegetation they encounter.",
      },
      {
        kind: "p",
        text: "Recommendation 3 \u2014 Establish Regular Plant Health Monitoring. Create a student-led monitoring program that records changes in leaf condition, flowering, visible pests and environmental conditions. Monitoring should be carried out consistently so that observations can be compared over time. Potential concerns should be communicated to school maintenance staff rather than treated through unapproved interventions.",
      },
      {
        kind: "p",
        text: "Recommendation 4 \u2014 Encourage Ecologically Appropriate Planting. Work with school staff to evaluate whether suitable native or locally beneficial plants could be introduced into appropriate planting areas. Species should be selected based on their ecological value, compatibility with the local environment, maintenance requirements and available space. This could help support local biodiversity while preserving the functionality of school facilities.",
      },
      {
        kind: "p",
        text: "Recommendation 5 \u2014 Organize Environmental Awareness Activities. Conduct short educational campaigns through school announcements, posters, digital media or student presentations. Activities could encourage students to recognize plant species, respect landscaped areas and participate in non-invasive biodiversity observations.",
      },
      {
        kind: "note",
        tone: "action",
        text: "Each recommendation is expanded on this website with its evidence, implementation steps, dependencies and evaluation criteria: see Improvements.",
      },
    ],
  },
  {
    id: "plan",
    number: "8",
    title: "Proposed Implementation Plan",
    blocks: [
      {
        kind: "table",
        head: ["Phase", "Action", "Intended Outcome"],
        rows: [
          ["1 \u2014 Documentation", "Collect additional photographs and verify plant identities", "Reliable biodiversity inventory"],
          ["2 \u2014 Research", "Investigate ecological roles and environmental conditions", "Stronger scientific understanding"],
          ["3 \u2014 Digital Awareness", "Publish the biodiversity research website", "Accessible student learning resource"],
          ["4 \u2014 Coordination", "Share findings and recommendations with appropriate school staff", "Feedback and implementation guidance"],
          ["5 \u2014 Implementation", "Introduce approved labels, monitoring or awareness activities", "Greater student participation"],
          ["6 \u2014 Evaluation", "Compare observations and collect feedback", "Evidence of progress and areas for improvement"],
        ],
      },
      {
        kind: "note",
        tone: "limitation",
        text: "The timeline should be finalized after consultation with the school.",
      },
    ],
  },
  {
    id: "sdgs",
    number: "9",
    title: "Connection to the Sustainable Development Goals",
    blocks: [
      { kind: "sub", text: "SDG 15 \u2014 Life on Land" },
      {
        kind: "p",
        text: "This project contributes to SDG 15 by encouraging the protection, observation and responsible management of terrestrial biodiversity. Through identifying plant species and investigating their ecological significance, students can develop a stronger understanding of the importance of healthy ecosystems.",
      },
      { kind: "sub", text: "SDG 11 \u2014 Sustainable Cities and Communities" },
      {
        kind: "p",
        text: "School green spaces form part of the wider urban environment. Maintaining these spaces can support more sustainable, comfortable and environmentally responsible communities.",
      },
      { kind: "sub", text: "SDG 4 \u2014 Quality Education" },
      {
        kind: "p",
        text: "The proposed biodiversity website and awareness activities provide opportunities for environmental education, scientific inquiry and student-led learning.",
      },
      {
        kind: "note",
        tone: "limitation",
        text: "These connections describe how the project relates to the goals. The project does not claim to have achieved measurable outcomes against any SDG target.",
      },
    ],
  },
  {
    id: "reflection",
    number: "10",
    title: "Service as Action Reflection",
    blocks: [
      {
        kind: "p",
        text: "This project encourages us to recognize that environmental responsibility extends beyond large-scale issues such as climate change and deforestation. It also involves appreciating and protecting the living organisms within our immediate surroundings.",
      },
      {
        kind: "p",
        text: "By examining the vegetation at Tunas Muda School, we developed a clearer understanding of how plants contribute to the environment and how scientific observation can reveal opportunities for improvement.",
      },
      {
        kind: "p",
        text: "Our research also highlighted the importance of distinguishing evidence from assumptions. Although photographs can reveal visible plant characteristics, they cannot independently explain the causes of plant damage or establish the overall health of an ecosystem.",
      },
      {
        kind: "p",
        text: "As a group, we aim to apply our research through environmental education, collaborative planning and realistic recommendations to school leadership.",
      },
      {
        kind: "p",
        text: "Our intended contribution is not simply to produce a report, but to encourage a lasting sense of responsibility toward the school\u2019s natural environment.",
      },
    ],
  },
  {
    id: "conclusion",
    number: "11",
    title: "Conclusion",
    blocks: [
      {
        kind: "p",
        text: "The photographic observations reveal a range of trees, palms and ornamental plants across Tunas Muda School\u2019s outdoor environment. These plants contribute to the school\u2019s vegetation structure, provide shade and offer potential ecological resources for other organisms.",
      },
      {
        kind: "p",
        text: "Although some plants display visible leaf discoloration or damage, the available evidence is insufficient to determine whether these observations indicate significant environmental problems.",
      },
      {
        kind: "p",
        text: "Our findings therefore emphasize the need for continued investigation, verified plant identification and regular environmental monitoring.",
      },
      {
        kind: "p",
        text: "By developing a biodiversity website, promoting environmental awareness and proposing practical conservation measures, our group hopes to encourage students to recognize the ecological importance of their surroundings.",
      },
      {
        kind: "p",
        text: "Ultimately, a more sustainable school environment depends not only on the presence of plants, but also on the knowledge, cooperation and responsibility of the community that shares the space.",
      },
    ],
  },
  {
    id: "improvement-plan",
    number: "12",
    title: "Environmental Improvement Recommendations and Action Plan",
    blocks: [
      { kind: "sub", text: "12.1 Overview" },
      {
        kind: "p",
        text: "Through our Service as Action research, we have documented several forms of vegetation within the school\u2019s grounds and identified opportunities to strengthen environmental awareness and biodiversity monitoring. This section gathers those opportunities into a practical set of environmental improvement recommendations for the school community.",
      },
      { kind: "sub", text: "12.2 Supporting Research Observations" },
      {
        kind: "p",
        text: "The recommendations below rest on the four photographic observations documented in this report: a flowering tree near the recreational facilities, ornamental planting beds, a landscaped pathway and tropical palms near a boundary wall. Visible leaf discoloration in Observations 1 and 2, unverified plant identities across the grounds and limited ecological data frame both the opportunities and the limitations of what is proposed.",
      },
      { kind: "sub", text: "12.3 Proposed Interventions" },
      {
        kind: "list",
        items: [
          "Digital biodiversity documentation \u2014 an accessible website recording observed plants, their characteristics and ecological significance.",
          "Plant identification and education \u2014 verified identification labels, potentially supported by QR codes linking to individual database entries.",
          "Plant health monitoring \u2014 regular observations of plant condition, flowering activity and visible environmental changes.",
          "Biodiversity-friendly planting \u2014 investigation of suitable native or locally beneficial plants that could enhance appropriate school areas.",
          "Environmental awareness \u2014 activities that encourage students to recognize, appreciate and responsibly interact with the school\u2019s vegetation.",
        ],
      },
      { kind: "sub", text: "12.4 Implementation Requirements" },
      {
        kind: "p",
        text: "Implementation depends on coordination with appropriate school staff. Placement of identification labels, changes to planting areas and scheduled monitoring activities should be agreed with the school before any physical changes are made. Potential plant health concerns should be communicated to school maintenance staff rather than treated through unapproved interventions.",
      },
      { kind: "sub", text: "12.5 Expected Educational and Ecological Benefits" },
      {
        kind: "p",
        text: "These measures could help students better understand the importance of the school\u2019s natural environment while encouraging responsible behavior and long-term sustainability. Environmental education would be embedded in students\u2019 daily routes, and evidence-based care would replace assumption with observation.",
      },
      { kind: "sub", text: "12.6 Monitoring and Evaluation" },
      {
        kind: "p",
        text: "Progress could be evaluated through the number of verified observation records maintained on the website, the consistency of completed monitoring sessions, the number of identification labels installed where permitted, participation in awareness activities and documented changes in vegetation composition over time.",
      },
      { kind: "sub", text: "12.7 Long-Term Sustainability" },
      {
        kind: "p",
        text: "The initiative is designed to be maintained by students, with this website serving as a durable record that future groups can extend. Long-term success depends not only on the presence of plants, but on the knowledge, cooperation and responsibility of the community that shares the space.",
      },
      { kind: "p", text: "Prepared by: Edmund (8M), Nicholas (8T), Austin (8T), Samuel (8Y), Akhtara (8T), Archie (8M)" },
      {
        kind: "note",
        tone: "action",
        text: "A dedicated, printable version of this action plan is available on the Improvement Plan page.",
      },
    ],
  },
  {
    id: "references",
    number: "13",
    title: "Evidence and References",
    blocks: [
      { kind: "sub", text: "Primary Evidence" },
      {
        kind: "list",
        items: [
          "Photograph 1 \u2014 Flowering tree near school recreational facilities.",
          "Photograph 2 \u2014 Ornamental tropical plants in school planting beds.",
          "Photograph 3 \u2014 Landscaped school pathway and vegetation.",
          "Photograph 4 \u2014 Tropical palms near a school boundary wall.",
        ],
      },
      {
        kind: "note",
        tone: "evidence",
        text: "Evidence source: Photographs supplied by the research group, October 2026 (exact capture dates not specified). Photograph 4 was listed as evidence in this report but its file was not available when the website was built; its record is kept open until it is found.",
      },
      { kind: "sub", text: "Plant Identification Dossier Sources" },
      {
        kind: "p",
        text: "The group\u2019s supplementary plant dossier cites the following sources, consulted for the Bauhinia and Araceae reference profiles: Flona Jakarta (flona.jakarta.go.id); Droen Solo Baru (droensolobaru.com); UConn Home & Garden Education Center (homegarden.cahnr.uconn.edu).",
      },
      { kind: "sub", text: "Suggested Authoritative Reference Sources" },
      {
        kind: "list",
        items: [
          "Convention on Biological Diversity \u2014 https://www.cbd.int/",
          "Royal Botanic Gardens, Kew: Plants of the World Online \u2014 https://powo.science.kew.org/",
          "United Nations \u2014 Sustainable Development Goal 15: https://sdgs.un.org/goals/goal15",
          "United Nations \u2014 Sustainable Development Goal 11: https://sdgs.un.org/goals/goal11",
          "United Nations \u2014 Sustainable Development Goal 4: https://sdgs.un.org/goals/goal4",
        ],
      },
      {
        kind: "note",
        tone: "limitation",
        text: "These are starting points for verifying scientific information and preparing a complete Harvard-style reference list. They have not been presented as sources already consulted by the group.",
      },
    ],
  },
];

export const reportMeta = {
  title: "Plant Biodiversity and Environmental Sustainability at Tunas Muda School",
  subtitle: "Service as Action \u2014 Final Research Report",
  date: "27 October 2026",
  authors: "Edmund (8M), Nicholas (8T), Austin (8T), Samuel (8Y), Akhtara (8T), Archie (8M)",
};
