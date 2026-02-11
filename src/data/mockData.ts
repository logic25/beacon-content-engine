// Mock data mirroring the Python analytics backend

export interface MetricData {
  label: string;
  value: string | number;
  sublabel?: string;
  trend?: number; // percentage change
  icon: string;
}

export interface Conversation {
  id: number;
  timestamp: string;
  userName: string;
  question: string;
  responsePreview: string;
  fullResponse: string;
  topic: string;
  hadSources: boolean;
  sources?: string[];
  answered: boolean;
  responseTimeMs: number;
  confidence: number;
}

export interface TopicBreakdown {
  topic: string;
  count: number;
  percentage: number;
  color: string;
}

export interface DailyUsage {
  date: string;
  queries: number;
  answered: number;
  cost: number;
}

export interface ContentCandidate {
  id: number;
  title: string;
  contentType: "blog_post" | "newsletter" | "social_post";
  priority: "high" | "medium" | "low";
  relevanceScore: number;
  searchInterest: number;
  affectsServices: string[];
  keyTopics: string[];
  reasoning: string;
  reviewQuestion: string;
  teamQuestionsCount: number;
  teamQuestions: string[];
  mostCommonAngle: string;
  sourceUrl: string;
  contentPreview: string;
  createdAt: string;
}

export interface TopUser {
  rank: number;
  name: string;
  questionsAsked: number;
}

export const mockMetrics: MetricData[] = [
  { label: "Total Questions", value: "1,247", sublabel: "Last 30 days", trend: 12.5, icon: "MessageSquare" },
  { label: "Success Rate", value: "94.2%", sublabel: "1,175 answered", trend: 2.1, icon: "CheckCircle" },
  { label: "Active Users", value: "23", sublabel: "Across 4 spaces", trend: 8.3, icon: "Users" },
  { label: "API Cost", value: "$18.42", sublabel: "Anthropic $14.20 · Voyage $4.22", trend: -3.2, icon: "DollarSign" },
  { label: "Avg Response", value: "2.3s", sublabel: "P95: 4.1s", trend: -8.5, icon: "Clock" },
  { label: "Pending Reviews", value: "7", sublabel: "3 corrections · 4 feedback", trend: 0, icon: "AlertCircle" },
];

export const mockConversations: Conversation[] = [
  { id: 1, timestamp: "2026-02-10T14:32:00", userName: "Sarah M.", question: "What are the DHCR requirements for rent stabilized apartment deregulation in 2026?", responsePreview: "Under the Housing Stability and Tenant Protection Act (HSTPA), high-rent vacancy deregulation has been eliminated...", fullResponse: "Under the Housing Stability and Tenant Protection Act (HSTPA), **high-rent vacancy deregulation has been eliminated**. This means landlords can no longer deregulate rent-stabilized apartments based on reaching a rent threshold.\n\n### Key Points:\n\n1. **No more high-rent deregulation** — Previously, apartments reaching $2,774/month could be deregulated upon vacancy. HSTPA eliminated this.\n\n2. **Vacancy increases are limited** — The RGB sets allowable vacancy increases, which are significantly lower than pre-HSTPA levels.\n\n3. **Preferential rent protections** — Landlords can no longer revoke preferential rents upon renewal. The preferential rent becomes the base for future increases.\n\n4. **Individual Apartment Improvements (IAIs)** — Still allowed but capped at $15,000 over 15 years, and increases are limited to 1/168th of the cost for buildings with 35+ units.\n\n### What This Means for Your Practice:\nClients asking about deregulation strategies should be advised that the primary legal path is through the luxury decontrol provisions that remain (for units above $2,774 AND tenant income above $200,000 for two consecutive years).\n\n**Sources:** HSTPA 2019, DHCR Operational Bulletin 2026-1, RGB Order #58", topic: "DHCR", hadSources: true, sources: ["HSTPA 2019 Full Text", "DHCR Operational Bulletin 2026-1", "RGB Order #58"], answered: true, responseTimeMs: 1820, confidence: 0.92 },
  { id: 2, timestamp: "2026-02-10T13:15:00", userName: "Mike T.", question: "Can you look up violations for 123 Main St, Manhattan?", responsePreview: "I found 3 active violations for 123 Main Street, Manhattan (BIN: 1234567)...", fullResponse: "I found **3 active violations** for 123 Main Street, Manhattan (BIN: 1234567):\n\n### Active Violations:\n\n| # | Type | Description | Issued | Status |\n|---|------|-------------|--------|--------|\n| 1 | DOB | Work without permit — 2nd floor renovation | Jan 15, 2026 | Open |\n| 2 | ECB | Failure to maintain — facade deterioration | Dec 8, 2025 | Hearing scheduled |\n| 3 | HPD | Lead paint — apartment 3B, peeling paint in child's bedroom | Nov 22, 2025 | Open |\n\n### Recommended Actions:\n- **Violation 1:** File for an after-the-fact permit (Alt-2) immediately to mitigate penalties\n- **Violation 2:** Schedule facade inspection with licensed engineer; hearing is Feb 20, 2026\n- **Violation 3:** Urgent — hire licensed lead abatement contractor within 21 days per Local Law 1\n\n**Total potential penalties:** $15,000-$35,000 depending on hearing outcomes.\n\n**Sources:** DOB BIS, ECB Portal, HPD Violations Database", topic: "Violations", hadSources: true, sources: ["DOB BIS Database", "ECB Portal", "HPD Violations Database"], answered: true, responseTimeMs: 3200, confidence: 0.88 },
  { id: 3, timestamp: "2026-02-10T11:45:00", userName: "David L.", question: "What zoning district allows medical offices in Brooklyn?", responsePreview: "Medical offices are permitted in several zoning districts. In Brooklyn, C1-C6 commercial districts...", fullResponse: "Medical offices are permitted in several zoning districts in Brooklyn. Here's a breakdown:\n\n### As-of-Right (No Special Permit Needed):\n- **C1-1 through C1-5** — Medical offices under 10,000 sqft\n- **C2-1 through C2-5** — Medical offices of any size\n- **C4, C5, C6 districts** — Medical offices permitted\n- **C8 districts** — Limited to ground floor\n\n### Special Permit Required:\n- **C1 zones** — Medical offices over 10,000 sqft need BSA special permit\n- **M1 zones** — Medical offices allowed with CPC special permit under ZR 42-10\n\n### Mixed-Use Districts (New 2026):\n- **MX districts** in Gowanus, East New York — Medical offices permitted as community facility use\n\n### Key Considerations:\n1. Check if the specific lot has any restrictive declarations\n2. Ambulatory surgery centers may have different requirements\n3. Parking requirements vary by district (typically 1 space per 400 sqft)\n\n**Sources:** NYC Zoning Resolution, ZR 22-14, ZR 32-15, DCP Zoning Handbook", topic: "Zoning", hadSources: true, sources: ["NYC Zoning Resolution", "ZR 22-14", "ZR 32-15", "DCP Zoning Handbook"], answered: true, responseTimeMs: 2100, confidence: 0.85 },
  { id: 4, timestamp: "2026-02-09T16:20:00", userName: "Lisa K.", question: "How do I file for a temporary certificate of occupancy?", responsePreview: "To obtain a Temporary Certificate of Occupancy (TCO), you'll need to submit through DOB NOW...", fullResponse: "To obtain a Temporary Certificate of Occupancy (TCO), follow these steps:\n\n### Prerequisites:\n- All life-safety items must be completed and signed off\n- Partial inspection sign-offs for completed portions\n- Outstanding items must not affect occupant safety\n\n### Filing Process:\n\n1. **Log into DOB NOW** → Select your job filing → Request TCO\n2. **Submit required documents:**\n   - Signed-off partial inspections\n   - Letter from architect/engineer certifying safety\n   - List of outstanding items with completion timeline\n   - Fire Department letter of approval (if applicable)\n3. **Pay the fee:** $100 for initial TCO + $100/month renewal\n4. **Schedule TCO inspection** with DOB\n5. **TCO is valid for 90 days** and can be renewed\n\n### Important Notes:\n- TCO allows occupancy while minor work continues\n- Cannot have open DOB violations on the premises\n- Maximum 4 renewals before DOB requires final C of O\n- Insurance must be current\n\n**Tip:** Submit the TCO request at least 2 weeks before you need occupancy.\n\n**Sources:** DOB TCO Guidelines, 28-118.3.2, Buildings Bulletin 2025-006", topic: "Certificate of Occupancy", hadSources: true, sources: ["DOB TCO Guidelines", "Admin Code 28-118.3.2", "Buildings Bulletin 2025-006"], answered: true, responseTimeMs: 1950, confidence: 0.91 },
  { id: 5, timestamp: "2026-02-09T14:00:00", userName: "James R.", question: "What's the egress requirement for a Class A multiple dwelling?", responsePreview: "For Class A multiple dwellings under the MDL, egress requirements depend on the number of units...", fullResponse: "For Class A multiple dwellings under the Multiple Dwelling Law (MDL), egress requirements depend on several factors:\n\n### Minimum Egress Requirements:\n\n**Buildings with 3+ stories or 4+ units:**\n- Minimum **2 means of egress** from each floor\n- At least **1 enclosed stairway** (fire-rated)\n- Stairs must be minimum **44 inches wide** (36 inches for buildings under 4 stories with fewer than 22 units per floor)\n\n**Fire Escape Requirements:**\n- Buildings erected before 1968 may use fire escapes as second means of egress\n- New buildings must have enclosed stairs — fire escapes not permitted\n- Fire escapes must extend to ground level or have approved drop ladder\n\n### Additional Requirements:\n- **Exit signs** at all egress points (illuminated)\n- **Emergency lighting** in all corridors and stairways\n- **Self-closing doors** on all apartment entrance doors (Local Law 10/1999)\n- **Maximum travel distance** to exit: 100 feet (200 feet with sprinklers)\n\n### Common Violations:\n- Blocked egress paths\n- Missing self-closing devices\n- Inadequate emergency lighting\n- Locked exit doors during occupied hours\n\n**Sources:** MDL §53, Building Code §1027, Local Law 10/1999", topic: "MDL", hadSources: true, sources: ["MDL §53", "Building Code §1027", "Local Law 10/1999"], answered: true, responseTimeMs: 2400, confidence: 0.87 },
  { id: 6, timestamp: "2026-02-09T10:30:00", userName: "Sarah M.", question: "Is there a penalty for late DOB permit renewal?", responsePreview: "Yes, if a DOB work permit expires and work continues without renewal, penalties can include...", fullResponse: "Yes, if a DOB work permit expires and work continues without renewal, there are several consequences:\n\n### Penalties for Expired Permits:\n\n1. **Stop Work Order (SWO)** — DOB can issue an immediate SWO if work is found in progress with an expired permit\n2. **ECB violation** — Fine of **$2,500-$10,000** for work without a valid permit\n3. **Permit reinstatement fee** — Additional fees to reactivate the expired permit\n4. **Possible re-inspection** — DOB may require re-inspection of work done during lapsed period\n\n### Renewal Timeline:\n- Permits are valid for **1 year** from issuance\n- Renewal must be filed **before expiration**\n- If expired less than 1 year: can renew with late fee\n- If expired more than 1 year: may need to refile the entire application\n\n### How to Avoid Issues:\n- Set calendar reminders 60 and 30 days before expiration\n- File renewal through DOB NOW — processing takes 5-10 business days\n- Ensure insurance and workers' comp are current before renewing\n\n**Note:** I wasn't able to find the exact 2026 late fee schedule — this may have been updated recently. I recommend checking DOB NOW directly or calling 311 for current fees.\n\n**Sources:** Admin Code 28-105.9, DOB Rules", topic: "DOB", hadSources: false, sources: [], answered: true, responseTimeMs: 1600, confidence: 0.79 },
];

export const mockTopics: TopicBreakdown[] = [
  { topic: "DHCR / Rent Stabilization", count: 312, percentage: 25, color: "hsl(280, 67%, 55%)" },
  { topic: "Zoning", count: 249, percentage: 20, color: "hsl(217, 91%, 60%)" },
  { topic: "DOB Permits", count: 199, percentage: 16, color: "hsl(36, 95%, 50%)" },
  { topic: "Violations", count: 162, percentage: 13, color: "hsl(0, 72%, 51%)" },
  { topic: "Certificate of Occupancy", count: 125, percentage: 10, color: "hsl(142, 71%, 45%)" },
  { topic: "Building Code", count: 100, percentage: 8, color: "hsl(190, 70%, 50%)" },
  { topic: "MDL", count: 62, percentage: 5, color: "hsl(320, 60%, 50%)" },
  { topic: "General", count: 38, percentage: 3, color: "hsl(220, 10%, 55%)" },
];

export const mockDailyUsage: DailyUsage[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  const queries = Math.floor(Math.random() * 40) + 20;
  return {
    date: date.toISOString().split("T")[0],
    queries,
    answered: Math.floor(queries * (0.88 + Math.random() * 0.1)),
    cost: +(Math.random() * 0.8 + 0.3).toFixed(2),
  };
});

export const mockContentCandidates: ContentCandidate[] = [
  {
    id: 1,
    title: "NYC DOB Updates Filing Requirements for Alt-2 Applications",
    contentType: "blog_post",
    priority: "high",
    relevanceScore: 0.94,
    searchInterest: 87,
    affectsServices: ["Permit Filing", "Zoning Analysis"],
    keyTopics: ["DOB", "Alt-2", "Filing Requirements"],
    reasoning: "High search interest + affects core services. Team received 12 questions about this in the past week.",
    reviewQuestion: "Should we frame this as a how-to guide or a regulatory update?",
    teamQuestionsCount: 12,
    teamQuestions: ["What changed in the Alt-2 filing?", "Do existing applications need to be refiled?"],
    mostCommonAngle: "Step-by-step guide for the new process",
    sourceUrl: "https://www1.nyc.gov/site/buildings/",
    contentPreview: "",
    createdAt: "2026-02-09",
  },
  {
    id: 2,
    title: "DHCR Releases 2026 Rent Guidelines Board Order Summary",
    contentType: "newsletter",
    priority: "high",
    relevanceScore: 0.91,
    searchInterest: 92,
    affectsServices: ["Rent Stabilization Consulting"],
    keyTopics: ["DHCR", "RGB", "Rent Increases"],
    reasoning: "Extremely high search interest. Annual event that all clients need to know about.",
    reviewQuestion: "Include comparison table with previous years?",
    teamQuestionsCount: 18,
    teamQuestions: ["What are the new allowable increases?", "Does this affect preferential rents?"],
    mostCommonAngle: "What landlords need to know for 2026 renewals",
    sourceUrl: "https://rentguidelinesboard.cityofnewyork.us/",
    contentPreview: "",
    createdAt: "2026-02-08",
  },
  {
    id: 3,
    title: "Understanding the New ECB Penalty Schedule for Construction Sites",
    contentType: "blog_post",
    priority: "medium",
    relevanceScore: 0.78,
    searchInterest: 54,
    affectsServices: ["Violation Resolution", "Construction Management"],
    keyTopics: ["ECB", "Violations", "Penalties"],
    reasoning: "Moderate search interest but directly impacts violation resolution clients.",
    reviewQuestion: "Include a downloadable penalty reference sheet?",
    teamQuestionsCount: 6,
    teamQuestions: ["How much are the new fines?", "Which violations are affected?"],
    mostCommonAngle: "Common violations and how to avoid them",
    sourceUrl: "https://www1.nyc.gov/site/buildings/",
    contentPreview: "",
    createdAt: "2026-02-07",
  },
  {
    id: 4,
    title: "Zoning Text Amendment: New Mixed-Use Districts in Brooklyn",
    contentType: "blog_post",
    priority: "medium",
    relevanceScore: 0.72,
    searchInterest: 45,
    affectsServices: ["Zoning Analysis", "Land Use"],
    keyTopics: ["Zoning", "Mixed-Use", "Brooklyn"],
    reasoning: "Relevant to Brooklyn-focused clients. Good SEO opportunity for local zoning queries.",
    reviewQuestion: "Should we include an interactive zoning map?",
    teamQuestionsCount: 4,
    teamQuestions: ["Which neighborhoods are affected?", "What uses are now permitted?"],
    mostCommonAngle: "Opportunities for property owners in affected areas",
    sourceUrl: "https://zap.planning.nyc.gov/",
    contentPreview: "",
    createdAt: "2026-02-06",
  },
];

export const mockTopUsers: TopUser[] = [
  { rank: 1, name: "Sarah M.", questionsAsked: 89 },
  { rank: 2, name: "Mike T.", questionsAsked: 76 },
  { rank: 3, name: "David L.", questionsAsked: 64 },
  { rank: 4, name: "Lisa K.", questionsAsked: 52 },
  { rank: 5, name: "James R.", questionsAsked: 41 },
];

export interface SlashCommandUsage {
  command: string;
  uses: number;
}

export interface Suggestion {
  id: number;
  user: string;
  when: string;
  wrongAnswer: string;
  correctAnswer: string;
  status: "pending" | "approved" | "rejected";
}

export interface FailedQuery {
  id: number;
  timestamp: string;
  userName: string;
  question: string;
  reason: string;
}

export interface MostAskedQuestion {
  rank: number;
  question: string;
  timesAsked: number;
}

export interface RoadmapItem {
  id: number;
  idea: string;
  requestedBy: string;
  priority: "high" | "medium" | "low";
  status: "shipped" | "in_progress" | "planned" | "backlog";
  target: string;
  notes: string;
}

export interface ApprovedCorrection {
  id: number;
  dateApproved: string;
  approvedBy: string;
  whatWasWrong: string;
  correctionApplied: string;
}

export const mockSlashCommands: SlashCommandUsage[] = [
  { command: "/suggest", uses: 34 },
  { command: "/help", uses: 28 },
  { command: "/stats", uses: 19 },
  { command: "/feedback", uses: 15 },
  { command: "/report", uses: 8 },
];

export const mockSuggestions: Suggestion[] = [
  { id: 1, user: "Sarah M.", when: "2026-02-10T09:30:00", wrongAnswer: "TCO requires full DOB inspection", correctAnswer: "TCO can be issued with partial inspection sign-off", status: "pending" },
  { id: 2, user: "Mike T.", when: "2026-02-09T14:15:00", wrongAnswer: "Rent stabilization threshold is $2,700", correctAnswer: "High-rent deregulation was eliminated under HSTPA", status: "pending" },
  { id: 3, user: "David L.", when: "2026-02-08T11:00:00", wrongAnswer: "C1 zones allow medical offices by right", correctAnswer: "C1 zones require special permit for medical offices over 10,000 sqft", status: "pending" },
];

export const mockFailedQueries: FailedQuery[] = [
  { id: 1, timestamp: "2026-02-10T10:15:00", userName: "Lisa K.", question: "What's the current LIHTC allocation for NYC?", reason: "No relevant sources found in knowledge base" },
  { id: 2, timestamp: "2026-02-09T16:45:00", userName: "James R.", question: "Can you pull the latest HPD litigation data?", reason: "External API timeout" },
];

export const mockMostAsked: MostAskedQuestion[] = [
  { rank: 1, question: "What are the DHCR rent stabilization requirements?", timesAsked: 23 },
  { rank: 2, question: "How do I file for a TCO?", timesAsked: 18 },
  { rank: 3, question: "What zoning allows medical offices?", timesAsked: 15 },
  { rank: 4, question: "ECB violation penalty amounts?", timesAsked: 12 },
  { rank: 5, question: "DOB permit renewal process?", timesAsked: 9 },
];

export const mockRoadmap: RoadmapItem[] = [
  { id: 1, idea: "Auto-generate violation response letters", requestedBy: "Sarah M.", priority: "high", status: "in_progress", target: "Q1 2026", notes: "MVP ready for testing" },
  { id: 2, idea: "Integration with DOB NOW API", requestedBy: "Mike T.", priority: "high", status: "planned", target: "Q2 2026", notes: "API access pending approval" },
  { id: 3, idea: "Multi-language support (Spanish)", requestedBy: "Lisa K.", priority: "medium", status: "backlog", target: "TBD", notes: "Requested by 3 users" },
  { id: 4, idea: "Slack thread summarization", requestedBy: "David L.", priority: "low", status: "backlog", target: "TBD", notes: "" },
  { id: 5, idea: "PDF document upload & parsing", requestedBy: "James R.", priority: "high", status: "shipped", target: "Q4 2025", notes: "Released v1.2" },
];

export const mockApprovedCorrections: ApprovedCorrection[] = [
  { id: 1, dateApproved: "2026-02-07", approvedBy: "Manny", whatWasWrong: "Stated rent increase cap was 3.5%", correctionApplied: "Updated to reflect 2026 RGB order: 2.75% for 1-year, 5.25% for 2-year" },
  { id: 2, dateApproved: "2026-02-05", approvedBy: "Manny", whatWasWrong: "Incorrect ECB fine amount for work without permit", correctionApplied: "Updated penalty to $10,000 per the 2026 schedule" },
  { id: 3, dateApproved: "2026-02-01", approvedBy: "Sarah M.", whatWasWrong: "Missing info on J-51 tax exemption eligibility", correctionApplied: "Added 2026 income limits and building requirements" },
];

export interface PublishedContent {
  id: number;
  title: string;
  contentType: "blog_post" | "newsletter";
  publishedAt: string;
  author: string;
  status: "published" | "draft" | "scheduled";
  url: string;
  views: number;
  clicks: number;
  shares: number;
  openRate?: number; // newsletter only
  clickRate?: number; // newsletter only
  subscribers?: number; // newsletter only
  avgTimeOnPage?: string; // blog only
  bounceRate?: number; // blog only
  seoScore: number;
  topKeyword: string;
  generatedFrom: string; // which candidate it came from
  body: string;
}

export const mockPublishedContent: PublishedContent[] = [
  {
    id: 1,
    title: "How to Navigate the New Alt-1 Filing Process in NYC",
    contentType: "blog_post",
    publishedAt: "2026-01-28",
    author: "Manny",
    status: "published",
    url: "https://greenlightexpediting.com/blog/alt-1-filing-process",
    views: 1243,
    clicks: 187,
    shares: 34,
    avgTimeOnPage: "4m 12s",
    bounceRate: 32,
    seoScore: 87,
    topKeyword: "alt-1 filing NYC",
    generatedFrom: "AI-identified from team questions",
    body: "# How to Navigate the New Alt-1 Filing Process in NYC\n\nThe NYC Department of Buildings has recently updated its filing procedures for Alt-1 applications. This guide walks you through the key changes and what you need to know.\n\n## What Changed?\n\nAs of January 2026, Alt-1 applications now require additional documentation including updated energy compliance forms and structural peer review for buildings over 6 stories.\n\n## Step-by-Step Guide\n\n1. **Prepare your documents** — Gather all required plans, energy code compliance forms (ECC-1), and structural calculations.\n2. **Submit through DOB NOW** — Log into DOB NOW and select Alt-1 under the work type.\n3. **Schedule professional certification** — Arrange for a registered design professional to certify the application.\n4. **Track your application** — Monitor status through DOB NOW portal.\n\n## Common Pitfalls\n\n- Missing energy compliance documentation\n- Incorrect zoning district classification\n- Outdated structural calculations\n\n## Need Help?\n\nContact Greenlight Expediting for assistance with your Alt-1 filing.",
  },
  {
    id: 2,
    title: "January 2026 NYC Real Estate Regulatory Roundup",
    contentType: "newsletter",
    publishedAt: "2026-01-31",
    author: "Manny",
    status: "published",
    url: "https://greenlightexpediting.com/newsletter/jan-2026-roundup",
    views: 892,
    clicks: 156,
    shares: 22,
    openRate: 47.3,
    clickRate: 12.8,
    subscribers: 1240,
    seoScore: 72,
    topKeyword: "NYC real estate regulations 2026",
    generatedFrom: "Monthly regulatory digest",
    body: "# January 2026 NYC Real Estate Regulatory Roundup\n\nHere's what changed in NYC real estate regulations this month.\n\n## DOB Updates\n- New Alt-1 filing requirements effective January 15\n- Updated penalty schedule for ECB violations\n- Digital plan submission now mandatory for all filings\n\n## DHCR Updates\n- 2026 Rent Guidelines Board preliminary findings released\n- New guidance on preferential rent calculations\n\n## Zoning\n- City Planning Commission approved text amendments for mixed-use districts in Brooklyn\n- New FAR calculations for qualifying housing developments\n\n## What's Coming in February\n- Expected RGB final order for 2026 rent increases\n- HPD lead paint compliance deadline\n- Updated Local Law 97 reporting requirements",
  },
  {
    id: 3,
    title: "Understanding Rent Stabilization Changes for 2026",
    contentType: "blog_post",
    publishedAt: "2026-02-03",
    author: "Sarah M.",
    status: "published",
    url: "https://greenlightexpediting.com/blog/rent-stabilization-2026",
    views: 2156,
    clicks: 312,
    shares: 67,
    avgTimeOnPage: "5m 48s",
    bounceRate: 24,
    seoScore: 94,
    topKeyword: "rent stabilization NYC 2026",
    generatedFrom: "DHCR Rent Guidelines candidate",
    body: "# Understanding Rent Stabilization Changes for 2026\n\nThe 2026 Rent Guidelines Board order brings significant changes for landlords and tenants in NYC rent-stabilized apartments.\n\n## Key Changes\n\n### Allowable Increases\n- **1-year lease renewals**: 2.75% increase\n- **2-year lease renewals**: 5.25% increase\n\n### What This Means for Landlords\nThe increases are slightly below last year's rates but still represent meaningful adjustments. Landlords should update their renewal offers to reflect the new rates.\n\n### Impact on Preferential Rents\nUnder HSTPA, preferential rents are now the base for calculating increases, not the legal regulated rent. This significantly impacts how increases are calculated.\n\n## Compliance Deadlines\n- Renewal offers must reflect new rates by March 1, 2026\n- DHCR registration updates due by April 1, 2026\n\n## Common Questions\n\n**Q: Can I still deregulate apartments?**\nA: No. High-rent vacancy deregulation was eliminated under HSTPA.\n\n**Q: How do I calculate the increase on a preferential rent?**\nA: Apply the percentage to the current preferential rent, not the legal regulated rent.",
  },
  {
    id: 4,
    title: "February 2026 Regulatory Update",
    contentType: "newsletter",
    publishedAt: "2026-02-07",
    author: "Manny",
    status: "published",
    url: "https://greenlightexpediting.com/newsletter/feb-2026-update",
    views: 445,
    clicks: 78,
    shares: 11,
    openRate: 51.2,
    clickRate: 14.1,
    subscribers: 1258,
    seoScore: 68,
    topKeyword: "NYC building regulations February 2026",
    generatedFrom: "Monthly regulatory digest",
    body: "# February 2026 Regulatory Update\n\nYour monthly briefing on NYC regulatory changes.\n\n## Highlights\n- ECB penalty schedule updates now in effect\n- New mixed-use zoning districts approved for Brooklyn\n- DHCR 2026 RGB final order expected this month\n\n## Action Items\n1. Review updated ECB penalty amounts for your active projects\n2. Check if Brooklyn properties fall within new mixed-use districts\n3. Prepare rent stabilization renewal offers with 2026 rates",
  },
  {
    id: 5,
    title: "ECB Violation Penalty Guide: 2026 Edition",
    contentType: "blog_post",
    publishedAt: "2026-02-05",
    author: "Manny",
    status: "draft",
    url: "",
    views: 0,
    clicks: 0,
    shares: 0,
    avgTimeOnPage: "0s",
    bounceRate: 0,
    seoScore: 81,
    topKeyword: "ECB violation penalties NYC",
    generatedFrom: "ECB Penalty Schedule candidate",
    body: "# ECB Violation Penalty Guide: 2026 Edition\n\n*DRAFT — Ready for review*\n\nThis comprehensive guide covers the updated ECB penalty schedule effective January 2026.\n\n## Major Changes\n- Work without permit penalties increased to $10,000 (up from $8,000)\n- Failure to maintain penalties doubled for repeat offenders\n- New tiered penalty structure for environmental violations\n\n## Penalty Quick Reference\n\n| Violation Type | First Offense | Repeat |\n|---|---|---|\n| Work w/o Permit | $10,000 | $25,000 |\n| Failure to Maintain | $5,000 | $10,000 |\n| Unsafe Conditions | $15,000 | $25,000 |\n| After Hours Work | $2,500 | $5,000 |",
  },
];

export const mockGeneratedContent: Record<number, string> = {
  1: "# NYC DOB Updates Filing Requirements for Alt-2 Applications\n\nThe NYC Department of Buildings has announced significant changes to Alt-2 application filing requirements, effective February 2026.\n\n## What's Changing?\n\nAlt-2 applications—used for alterations that don't change use, egress, or occupancy—now require:\n\n1. **Digital-only submission** through DOB NOW (paper applications no longer accepted)\n2. **Updated energy compliance forms** (ECC-2R)\n3. **Asbestos investigation reports** for pre-1985 buildings\n4. **Construction superintendent designation** for projects over $1M\n\n## Impact on Current Applications\n\nApplications submitted before February 1, 2026 are grandfathered under the previous requirements. However, any amendments filed after that date must comply with the new standards.\n\n## Key Deadlines\n\n- **February 1, 2026**: New requirements take effect\n- **March 15, 2026**: Grace period ends for transitioning applications\n- **April 1, 2026**: Mandatory digital plan submission\n\n## What You Need to Do\n\n1. Review your pending Alt-2 applications for compliance\n2. Update your filing templates and checklists\n3. Ensure all design professionals are registered on DOB NOW\n4. Schedule asbestos investigations for pre-1985 buildings\n\n## Need Assistance?\n\nGreenlight Expediting can help you navigate these changes. Contact us for a filing review.",
  2: "# DHCR 2026 Rent Guidelines Board Order Summary\n\n**What Landlords and Tenants Need to Know**\n\nThe NYC Rent Guidelines Board has issued its 2026 order, setting the allowable rent increases for the city's approximately 1 million rent-stabilized apartments.\n\n## 2026 Approved Increases\n\n| Lease Type | Increase |\n|---|---|\n| 1-Year Renewal | 2.75% |\n| 2-Year Renewal | 5.25% |\n\n## Comparison with Previous Years\n\n| Year | 1-Year | 2-Year |\n|---|---|---|\n| 2026 | 2.75% | 5.25% |\n| 2025 | 3.00% | 5.50% |\n| 2024 | 3.00% | 2.75% |\n| 2023 | 3.25% | 5.00% |\n\n## Key Considerations\n\n### Preferential Rents\nUnder HSTPA, preferential rent is now the base for calculating increases. Landlords cannot revert to the legal regulated rent upon renewal.\n\n### Vacancy Increases\nHigh-rent vacancy deregulation remains eliminated. Vacancy increases are limited to the guidelines set by the RGB.\n\n## Action Items for Landlords\n\n1. Update lease renewal templates with 2026 rates\n2. File updated registrations with DHCR by April 1\n3. Review preferential rent calculations\n4. Train staff on the new guidelines\n\n## For Tenants\n\n- Your landlord must offer a renewal at or below these rates\n- Report any overcharges to DHCR\n- Keep copies of all lease documents",
  3: "# Understanding the New ECB Penalty Schedule for Construction Sites\n\n**A Guide for Property Owners and Contractors**\n\nThe Environmental Control Board has updated its penalty schedule for construction-related violations, effective January 2026.\n\n## What Changed\n\nThe new schedule increases penalties across several categories and introduces a tiered system for repeat offenders.\n\n## Updated Penalty Amounts\n\n| Violation | Previous | New (2026) |\n|---|---|---|\n| Work Without Permit | $8,000 | $10,000 |\n| Failure to Maintain | $2,500 | $5,000 |\n| Unsafe Conditions | $10,000 | $15,000 |\n| After Hours Work | $1,600 | $2,500 |\n| No Safety Netting | $5,000 | $10,000 |\n\n## Repeat Offender Tiers\n\n- **Tier 1** (2nd offense within 18 months): 2x base penalty\n- **Tier 2** (3rd+ offense within 18 months): 2.5x base penalty + mandatory compliance plan\n\n## How to Avoid Common Violations\n\n1. Always obtain permits before starting work\n2. Post permits visibly at the job site\n3. Adhere to approved work hours\n4. Maintain required safety equipment\n5. Schedule regular site safety audits\n\n## Contesting a Violation\n\nIf you receive an ECB violation, you have 60 days to respond. Options include:\n- Paying the penalty\n- Requesting a hearing at OATH\n- Submitting a cure notice (for curable violations)\n\n## Need Help?\n\nGreenlight Expediting specializes in violation resolution. Contact us for a case review.",
  4: "# Zoning Text Amendment: New Mixed-Use Districts in Brooklyn\n\n**What Property Owners Need to Know**\n\nThe City Planning Commission has approved zoning text amendments creating new mixed-use districts in several Brooklyn neighborhoods.\n\n## Affected Neighborhoods\n\n- Gowanus\n- East New York (selected blocks)\n- Flatbush (along Flatbush Avenue corridor)\n- Sunset Park (industrial waterfront)\n\n## Key Changes\n\n### New MX Districts\nThe new MX (Mixed-Use) districts replace previous M1 and C4 designations, allowing:\n- Residential development alongside commercial and light industrial\n- Ground-floor retail requirements on designated commercial streets\n- Community facility uses as-of-right\n\n### FAR Changes\n- **Residential FAR**: Up to 4.6 (with affordable housing bonus up to 6.0)\n- **Commercial FAR**: Up to 2.0\n- **Community Facility FAR**: Up to 3.0\n\n## Opportunities for Property Owners\n\n1. Properties in former M1 zones can now include residential units\n2. Affordable housing bonuses provide significant additional FAR\n3. Ground-floor retail spaces in high-demand corridors\n\n## Timeline\n\n- **February 2026**: Text amendment effective\n- **March 2026**: DOB begins accepting applications under new zoning\n- **June 2026**: First environmental review determinations expected",
};

