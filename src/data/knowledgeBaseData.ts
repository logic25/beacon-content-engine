export interface KnowledgeDocument {
  id: number;
  title: string;
  category: string;
  type: "procedure" | "case_study" | "template" | "regulation" | "guide" | "correction";
  lastReferenced: string | null;
  referenceCount: number;
  addedAt: string;
  summary: string;
  tags: string[];
  fileName?: string; // for uploaded docs
  fileSize?: string;
  conversationRefs?: number[]; // IDs of conversations that referenced this doc
}

export const knowledgeCategories = [
  { name: "DOB Procedures", icon: "🏗️", color: "bg-primary/10 text-primary" },
  { name: "DHCR / Rent Stabilization", icon: "🏠", color: "bg-chart-4/10 text-chart-4" },
  { name: "Zoning", icon: "🗺️", color: "bg-info/10 text-info" },
  { name: "Case Studies", icon: "📋", color: "bg-success/10 text-success" },
  { name: "Communication Templates", icon: "✉️", color: "bg-warning/10 text-warning" },
  { name: "Violations", icon: "⚠️", color: "bg-destructive/10 text-destructive" },
  { name: "Building Code", icon: "📐", color: "bg-chart-2/10 text-chart-2" },
  { name: "Process Workflows", icon: "🔄", color: "bg-chart-3/10 text-chart-3" },
  { name: "Team Corrections", icon: "✏️", color: "bg-chart-5/10 text-chart-5" },
];

export const mockKnowledgeDocuments: KnowledgeDocument[] = [
  // DOB Procedures
  { id: 1, title: "Alt-1 Filing Process Guide", category: "DOB Procedures", type: "procedure", lastReferenced: "2026-02-10", referenceCount: 47, addedAt: "2025-11-15", summary: "Step-by-step guide for Alt-1 applications including required documents, professional certifications, and DOB NOW submission process.", tags: ["alt-1", "filing", "DOB NOW"], fileName: "alt1_filing_guide.pdf", fileSize: "2.4 MB", conversationRefs: [1, 6] },
  { id: 2, title: "Alt-2 Application Requirements", category: "DOB Procedures", type: "procedure", lastReferenced: "2026-02-09", referenceCount: 38, addedAt: "2025-11-15", summary: "Complete requirements for Alt-2 filings covering construction work alterations, including 2026 updates.", tags: ["alt-2", "construction", "permits"], fileName: "alt2_requirements_2026.pdf", fileSize: "3.1 MB", conversationRefs: [3] },
  { id: 3, title: "TCO Application Process", category: "DOB Procedures", type: "procedure", lastReferenced: "2026-02-10", referenceCount: 31, addedAt: "2025-12-01", summary: "How to obtain a Temporary Certificate of Occupancy including prerequisites, fees, and renewal process.", tags: ["TCO", "certificate", "occupancy"], fileName: "tco_process.pdf", fileSize: "1.8 MB", conversationRefs: [4] },
  { id: 4, title: "DOB NOW Digital Filing Guide", category: "DOB Procedures", type: "guide", lastReferenced: "2026-02-08", referenceCount: 22, addedAt: "2025-12-10", summary: "Navigation guide for DOB NOW portal including account setup, document uploads, and status tracking.", tags: ["DOB NOW", "digital", "portal"], fileName: "dob_now_guide.pdf", fileSize: "4.2 MB" },
  { id: 5, title: "Permit Renewal Process", category: "DOB Procedures", type: "procedure", lastReferenced: "2026-02-09", referenceCount: 19, addedAt: "2025-12-15", summary: "Work permit renewal timeline, fees, and late renewal consequences.", tags: ["permit", "renewal", "expiration"], conversationRefs: [6] },
  { id: 25, title: "PAA Filing Procedures", category: "DOB Procedures", type: "procedure", lastReferenced: "2026-02-07", referenceCount: 16, addedAt: "2025-12-20", summary: "Professional Certification Application (PAA) filing process for licensed architects and engineers.", tags: ["PAA", "professional cert", "filing"], fileName: "paa_procedures.pdf", fileSize: "1.5 MB" },
  { id: 26, title: "DOB Inspection Types & Scheduling", category: "DOB Procedures", type: "guide", lastReferenced: "2026-02-10", referenceCount: 24, addedAt: "2025-11-20", summary: "Complete list of DOB inspection types, how to schedule through DOB NOW, and common inspection failures.", tags: ["inspection", "scheduling", "DOB NOW"] },
  { id: 27, title: "Elevator Filing Requirements", category: "DOB Procedures", type: "procedure", lastReferenced: "2026-01-28", referenceCount: 9, addedAt: "2026-01-15", summary: "Elevator installation and modernization filing requirements including Cat 1/5 testing schedules.", tags: ["elevator", "Cat 1", "Cat 5"] },

  // DHCR
  { id: 6, title: "HSTPA 2019 Complete Guide", category: "DHCR / Rent Stabilization", type: "regulation", lastReferenced: "2026-02-10", referenceCount: 52, addedAt: "2025-10-20", summary: "Comprehensive guide to the Housing Stability and Tenant Protection Act including deregulation elimination and preferential rent changes.", tags: ["HSTPA", "deregulation", "preferential rent", "DHCR"], fileName: "hstpa_complete.pdf", fileSize: "5.8 MB", conversationRefs: [1] },
  { id: 7, title: "2026 RGB Order Summary", category: "DHCR / Rent Stabilization", type: "regulation", lastReferenced: "2026-02-10", referenceCount: 44, addedAt: "2026-01-15", summary: "2026 Rent Guidelines Board order: 2.75% for 1-year, 5.25% for 2-year renewals.", tags: ["RGB", "rent increase", "2026", "DHCR"], conversationRefs: [1] },
  { id: 8, title: "Preferential Rent Calculations", category: "DHCR / Rent Stabilization", type: "guide", lastReferenced: "2026-02-07", referenceCount: 28, addedAt: "2025-11-01", summary: "How to calculate rent increases based on preferential vs legal regulated rent under HSTPA.", tags: ["preferential rent", "calculations", "DHCR"] },
  { id: 9, title: "IAI Cost Recovery Guide", category: "DHCR / Rent Stabilization", type: "procedure", lastReferenced: "2026-02-05", referenceCount: 15, addedAt: "2025-11-20", summary: "Individual Apartment Improvement cost recovery caps and calculation methods.", tags: ["IAI", "improvements", "cost recovery", "DHCR"] },
  { id: 28, title: "MCI Application Process", category: "DHCR / Rent Stabilization", type: "procedure", lastReferenced: "2026-02-04", referenceCount: 18, addedAt: "2025-12-05", summary: "Major Capital Improvement application process, eligible improvements, and rent increase calculations under HSTPA caps.", tags: ["MCI", "capital improvement", "DHCR"] },
  { id: 29, title: "DHCR Complaint Response Procedures", category: "DHCR / Rent Stabilization", type: "procedure", lastReferenced: "2026-02-08", referenceCount: 21, addedAt: "2025-11-10", summary: "How to respond to DHCR tenant complaints including overcharge claims and service reduction complaints.", tags: ["complaint", "overcharge", "DHCR", "tenant"] },
  { id: 30, title: "Vacancy Lease Rider Requirements", category: "DHCR / Rent Stabilization", type: "regulation", lastReferenced: "2026-01-30", referenceCount: 13, addedAt: "2026-01-05", summary: "Required vacancy lease rider provisions under rent stabilization including renewal rights notice.", tags: ["vacancy", "lease rider", "DHCR"] },

  // Zoning
  { id: 10, title: "NYC Zoning District Reference", category: "Zoning", type: "regulation", lastReferenced: "2026-02-10", referenceCount: 41, addedAt: "2025-10-15", summary: "Complete reference for all NYC zoning districts, permitted uses, and FAR calculations.", tags: ["zoning", "FAR", "districts"], fileName: "zoning_reference.pdf", fileSize: "8.3 MB", conversationRefs: [3] },
  { id: 11, title: "Medical Office Zoning Requirements", category: "Zoning", type: "guide", lastReferenced: "2026-02-10", referenceCount: 25, addedAt: "2025-12-01", summary: "Which zoning districts allow medical offices, special permit requirements, and parking regulations.", tags: ["medical", "zoning", "special permit"], conversationRefs: [3] },
  { id: 12, title: "Mixed-Use District Guide (2026)", category: "Zoning", type: "regulation", lastReferenced: "2026-02-08", referenceCount: 18, addedAt: "2026-01-20", summary: "New MX districts in Brooklyn including Gowanus, East New York, and Sunset Park.", tags: ["mixed-use", "Brooklyn", "MX"] },
  { id: 31, title: "Parking Requirements by District", category: "Zoning", type: "guide", lastReferenced: "2026-02-06", referenceCount: 14, addedAt: "2025-12-15", summary: "Required parking ratios for residential and commercial uses across all NYC zoning districts.", tags: ["parking", "zoning", "residential", "commercial"] },
  { id: 32, title: "BSA Variance Applications", category: "Zoning", type: "procedure", lastReferenced: "2026-02-03", referenceCount: 11, addedAt: "2025-11-25", summary: "Board of Standards and Appeals variance application process, required findings, and hearing procedures.", tags: ["BSA", "variance", "hearing"] },

  // Case Studies
  { id: 13, title: "215 38th Ave — Tax Exempt Objection", category: "Case Studies", type: "case_study", lastReferenced: "2026-02-06", referenceCount: 14, addedAt: "2025-11-10", summary: "How Natalia handled the 215 38th Ave objection — determination fees and MDL §277.16 variation filing.", tags: ["objection", "tax exempt", "MDL"], fileName: "215_38th_case.pdf", fileSize: "1.2 MB" },
  { id: 14, title: "927 Broadway — ALT-2 Conversion", category: "Case Studies", type: "case_study", lastReferenced: "2026-02-04", referenceCount: 11, addedAt: "2025-11-10", summary: "Manufacturing to commercial conversion using ALT-2 filing, including zoning analysis and DOB submission.", tags: ["ALT-2", "conversion", "manufacturing"], fileName: "927_broadway_case.pdf", fileSize: "2.1 MB" },
  { id: 15, title: "Client Permit Delay Communication", category: "Case Studies", type: "case_study", lastReferenced: "2026-02-09", referenceCount: 20, addedAt: "2025-12-05", summary: "Examples of how the team handles client communications about permit processing delays.", tags: ["communication", "delays", "client"] },
  { id: 33, title: "456 Atlantic Ave — C of O Conversion", category: "Case Studies", type: "case_study", lastReferenced: "2026-02-01", referenceCount: 8, addedAt: "2025-12-20", summary: "Commercial to residential C of O conversion in mixed-use district, including DOB and FDNY coordination.", tags: ["C of O", "conversion", "FDNY"] },
  { id: 34, title: "189 Bedford Ave — Landmark Facade", category: "Case Studies", type: "case_study", lastReferenced: "2026-01-28", referenceCount: 6, addedAt: "2026-01-10", summary: "LPC-designated landmark building facade restoration permit process and coordination with DOB.", tags: ["landmark", "LPC", "facade", "restoration"] },
  { id: 35, title: "1200 Flatbush — SRO Conversion Challenge", category: "Case Studies", type: "case_study", lastReferenced: "2026-02-05", referenceCount: 10, addedAt: "2025-11-25", summary: "Single Room Occupancy building conversion challenges, HPD certification requirements, and timeline.", tags: ["SRO", "conversion", "HPD"] },

  // Communication Templates
  { id: 16, title: "DOB Objection Response Template", category: "Communication Templates", type: "template", lastReferenced: "2026-02-08", referenceCount: 33, addedAt: "2025-11-01", summary: "Email template for responding to DOB objections with proper formatting and documentation references.", tags: ["objection", "email", "DOB"] },
  { id: 17, title: "Client Status Update Template", category: "Communication Templates", type: "template", lastReferenced: "2026-02-10", referenceCount: 45, addedAt: "2025-10-25", summary: "Standard client update email covering project status, timeline, and next steps.", tags: ["client", "update", "email"] },
  { id: 18, title: "Violation Notice Response", category: "Communication Templates", type: "template", lastReferenced: "2026-02-07", referenceCount: 21, addedAt: "2025-11-15", summary: "Template for responding to ECB/DOB violation notices including cure documentation.", tags: ["violation", "response", "ECB"] },
  { id: 36, title: "New Client Welcome Package", category: "Communication Templates", type: "template", lastReferenced: "2026-02-09", referenceCount: 30, addedAt: "2025-10-20", summary: "Welcome email template with onboarding checklist, required documents list, and fee schedule.", tags: ["onboarding", "welcome", "client"] },
  { id: 37, title: "Hearing Preparation Memo Template", category: "Communication Templates", type: "template", lastReferenced: "2026-02-03", referenceCount: 12, addedAt: "2025-12-10", summary: "Internal memo template for preparing ECB/OATH hearing documentation and arguments.", tags: ["hearing", "OATH", "preparation"] },

  // Violations
  { id: 19, title: "ECB Penalty Schedule 2026", category: "Violations", type: "regulation", lastReferenced: "2026-02-09", referenceCount: 36, addedAt: "2026-01-05", summary: "Updated ECB penalty amounts and tiered repeat offender structure effective January 2026.", tags: ["ECB", "penalties", "fines"], fileName: "ecb_penalties_2026.pdf", fileSize: "890 KB", conversationRefs: [2] },
  { id: 20, title: "HPD Violation Resolution Guide", category: "Violations", type: "procedure", lastReferenced: "2026-02-06", referenceCount: 17, addedAt: "2025-12-20", summary: "Step-by-step process for resolving HPD violations including lead paint, maintenance, and heat complaints.", tags: ["HPD", "resolution", "lead paint"] },
  { id: 38, title: "DOB Vacate Order Response Protocol", category: "Violations", type: "procedure", lastReferenced: "2026-02-07", referenceCount: 15, addedAt: "2025-12-15", summary: "Emergency response protocol when DOB issues a vacate order, including engineer requirements and restoration steps.", tags: ["vacate", "emergency", "DOB"] },
  { id: 39, title: "FDNY Violation Categories & Fines", category: "Violations", type: "regulation", lastReferenced: "2026-01-25", referenceCount: 8, addedAt: "2026-01-10", summary: "FDNY violation categories, fine amounts, and cure procedures for fire safety violations.", tags: ["FDNY", "fire safety", "fines"] },

  // Building Code
  { id: 21, title: "MDL Egress Requirements", category: "Building Code", type: "regulation", lastReferenced: "2026-02-09", referenceCount: 23, addedAt: "2025-11-05", summary: "Multiple Dwelling Law egress requirements including stairway widths, fire escapes, and travel distances.", tags: ["MDL", "egress", "fire escape"], conversationRefs: [5] },
  { id: 22, title: "Local Law 97 Compliance Guide", category: "Building Code", type: "guide", lastReferenced: "2026-02-03", referenceCount: 12, addedAt: "2026-01-10", summary: "Building emissions compliance requirements, reporting deadlines, and penalty calculations.", tags: ["LL97", "emissions", "compliance"] },
  { id: 40, title: "Local Law 11 Facade Inspection", category: "Building Code", type: "regulation", lastReferenced: "2026-02-08", referenceCount: 19, addedAt: "2025-11-15", summary: "FISP (Facade Inspection Safety Program) requirements, inspection cycles, and QEWI qualifications.", tags: ["LL11", "FISP", "facade", "inspection"] },
  { id: 41, title: "Sprinkler & Standpipe Requirements", category: "Building Code", type: "regulation", lastReferenced: "2026-02-02", referenceCount: 10, addedAt: "2025-12-20", summary: "When sprinkler and standpipe systems are required, retroactive requirements, and testing schedules.", tags: ["sprinkler", "standpipe", "fire protection"] },
  { id: 42, title: "ADA Accessibility Compliance", category: "Building Code", type: "guide", lastReferenced: "2026-02-06", referenceCount: 16, addedAt: "2025-11-25", summary: "ADA and NYC accessibility requirements for commercial and residential buildings, including path of travel.", tags: ["ADA", "accessibility", "compliance"] },

  // Process Workflows
  { id: 23, title: "New Project Intake Workflow", category: "Process Workflows", type: "guide", lastReferenced: "2026-02-10", referenceCount: 29, addedAt: "2025-10-30", summary: "Complete workflow from client inquiry to project setup including document collection and fee schedule.", tags: ["intake", "workflow", "onboarding"] },
  { id: 24, title: "DOB Objection Review Process", category: "Process Workflows", type: "procedure", lastReferenced: "2026-02-08", referenceCount: 26, addedAt: "2025-11-10", summary: "AI1 borough email monitoring, objection categorization, and response workflow.", tags: ["objection", "review", "AI1"] },
  { id: 43, title: "Weekly Team Sync Checklist", category: "Process Workflows", type: "guide", lastReferenced: "2026-02-10", referenceCount: 22, addedAt: "2025-11-01", summary: "Checklist for weekly team sync: open projects review, deadline tracking, and priority assignments.", tags: ["sync", "checklist", "weekly"] },
  { id: 44, title: "Client Billing & Invoice Workflow", category: "Process Workflows", type: "procedure", lastReferenced: "2026-02-09", referenceCount: 18, addedAt: "2025-12-01", summary: "End-to-end billing process from milestone tracking to invoice generation and payment follow-up.", tags: ["billing", "invoice", "payment"] },

  // Team Corrections (from approved feedback)
  { id: 45, title: "Correction: RGB Rent Increase Cap", category: "Team Corrections", type: "correction", lastReferenced: "2026-02-10", referenceCount: 8, addedAt: "2026-02-07", summary: "Previously stated 3.5% cap — corrected to 2026 RGB order: 2.75% for 1-year, 5.25% for 2-year renewals. Approved by Manny.", tags: ["correction", "RGB", "rent increase"] },
  { id: 46, title: "Correction: ECB Fine for Work w/o Permit", category: "Team Corrections", type: "correction", lastReferenced: "2026-02-09", referenceCount: 5, addedAt: "2026-02-05", summary: "Incorrect ECB fine amount corrected to $10,000 per 2026 penalty schedule. Approved by Manny.", tags: ["correction", "ECB", "penalty"] },
  { id: 47, title: "Correction: J-51 Tax Exemption Eligibility", category: "Team Corrections", type: "correction", lastReferenced: "2026-02-06", referenceCount: 3, addedAt: "2026-02-01", summary: "Added missing 2026 income limits and building requirements for J-51 tax exemption eligibility. Approved by Sarah M.", tags: ["correction", "J-51", "tax exemption"] },
];

// Cross-reference data: which conversations referenced which documents
export interface ConversationDocRef {
  conversationId: number;
  documentIds: number[];
  question: string;
  userName: string;
  timestamp: string;
}

export const conversationDocRefs: ConversationDocRef[] = [
  { conversationId: 1, documentIds: [6, 7], question: "What are the DHCR requirements for rent stabilized apartment deregulation in 2026?", userName: "Sarah M.", timestamp: "2026-02-10T14:32:00" },
  { conversationId: 2, documentIds: [19], question: "Can you look up violations for 123 Main St, Manhattan?", userName: "Mike T.", timestamp: "2026-02-10T13:15:00" },
  { conversationId: 3, documentIds: [2, 10, 11], question: "What zoning district allows medical offices in Brooklyn?", userName: "David L.", timestamp: "2026-02-10T11:45:00" },
  { conversationId: 4, documentIds: [3], question: "How do I file for a temporary certificate of occupancy?", userName: "Lisa K.", timestamp: "2026-02-09T16:20:00" },
  { conversationId: 5, documentIds: [21], question: "What's the egress requirement for a Class A multiple dwelling?", userName: "James R.", timestamp: "2026-02-09T14:00:00" },
  { conversationId: 6, documentIds: [1, 5], question: "Is there a penalty for late DOB permit renewal?", userName: "Sarah M.", timestamp: "2026-02-09T10:30:00" },
];

// AI-generated content ideas from cross-referencing
export interface ContentIdea {
  id: number;
  title: string;
  type: "blog_post" | "newsletter" | "training_material";
  confidence: number;
  sources: { type: "conversation" | "document" | "correction" | "trend"; label: string; id?: number }[];
  reasoning: string;
  suggestedOutline: string[];
  estimatedImpact: "high" | "medium" | "low";
  createdAt: string;
}

export const mockContentIdeas: ContentIdea[] = [
  {
    id: 1,
    title: "TCO vs. Final C of O: What NYC Building Owners Need to Know",
    type: "blog_post",
    confidence: 0.94,
    sources: [
      { type: "conversation", label: "Lisa K. asked about TCO process", id: 4 },
      { type: "document", label: "TCO Application Process", id: 3 },
      { type: "trend", label: "18 team questions about TCO in 30 days" },
      { type: "correction", label: "TCO can be issued with partial inspection" },
    ],
    reasoning: "TCO is the 2nd most-asked question (18x), and a recent correction shows the team was confused about inspection requirements. High-value blog post that could rank for 'NYC TCO process'.",
    suggestedOutline: ["What is a TCO vs. final C of O?", "When you need a TCO", "Step-by-step filing process", "Common mistakes (including partial inspection myth)", "Costs and timeline"],
    estimatedImpact: "high",
    createdAt: "2026-02-11",
  },
  {
    id: 2,
    title: "2026 RGB Rent Increases: What Landlords Must Know Before Renewals",
    type: "newsletter",
    confidence: 0.92,
    sources: [
      { type: "conversation", label: "Sarah M. asked about DHCR deregulation", id: 1 },
      { type: "document", label: "2026 RGB Order Summary", id: 7 },
      { type: "document", label: "HSTPA 2019 Complete Guide", id: 6 },
      { type: "correction", label: "RGB rate corrected from 3.5% to 2.75%/5.25%" },
    ],
    reasoning: "Most-asked topic (23 questions), recent correction means even the team was confused. Timely for renewal season. Could drive newsletter signups.",
    suggestedOutline: ["2026 RGB order breakdown", "Impact on preferential rents", "HSTPA changes that still confuse people", "Renewal timeline checklist"],
    estimatedImpact: "high",
    createdAt: "2026-02-11",
  },
  {
    id: 3,
    title: "Medical Office Zoning in Brooklyn: Complete 2026 Guide",
    type: "blog_post",
    confidence: 0.87,
    sources: [
      { type: "conversation", label: "David L. asked about medical office zoning", id: 3 },
      { type: "document", label: "Medical Office Zoning Requirements", id: 11 },
      { type: "document", label: "Mixed-Use District Guide (2026)", id: 12 },
      { type: "correction", label: "C1 zones need special permit over 10k sqft" },
    ],
    reasoning: "15 team questions about medical office zoning. New MX districts in Brooklyn create an SEO opportunity. Correction shows common misconception worth addressing.",
    suggestedOutline: ["Which Brooklyn zones allow medical offices", "As-of-right vs. special permit", "New MX district opportunities", "Parking and accessibility requirements"],
    estimatedImpact: "medium",
    createdAt: "2026-02-11",
  },
  {
    id: 4,
    title: "How GLE Handles DOB Objections: An Inside Look",
    type: "blog_post",
    confidence: 0.81,
    sources: [
      { type: "document", label: "DOB Objection Review Process", id: 24 },
      { type: "document", label: "DOB Objection Response Template", id: 16 },
      { type: "document", label: "215 38th Ave Case Study", id: 13 },
      { type: "trend", label: "Objection-related queries up 30% in Feb" },
    ],
    reasoning: "Combines process workflow, template, and real case study. Shows expertise. Could attract potential clients searching for DOB objection help.",
    suggestedOutline: ["What triggers a DOB objection", "Our review process (AI1 monitoring)", "Real case study: 215 38th Ave", "How to respond effectively"],
    estimatedImpact: "medium",
    createdAt: "2026-02-11",
  },
  {
    id: 5,
    title: "New Employee Onboarding: DOB Filing Essentials",
    type: "training_material",
    confidence: 0.78,
    sources: [
      { type: "document", label: "Alt-1 Filing Process Guide", id: 1 },
      { type: "document", label: "Alt-2 Application Requirements", id: 2 },
      { type: "document", label: "DOB NOW Digital Filing Guide", id: 4 },
      { type: "trend", label: "New hire Don Speaker starting Q2" },
    ],
    reasoning: "Combines the 3 most-referenced DOB documents into a structured training module. With Don starting soon, this directly supports the onboarding goal.",
    suggestedOutline: ["Alt-1 vs Alt-2: When to use each", "DOB NOW walkthrough", "Required documents checklist", "Common filing mistakes to avoid", "Practice exercise: File a mock Alt-2"],
    estimatedImpact: "high",
    createdAt: "2026-02-11",
  },
];
