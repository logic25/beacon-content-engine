// Mock data for Beacon — a content intelligence platform for professional service firms

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
  { label: "Active Users", value: "23", sublabel: "Across 4 teams", trend: 8.3, icon: "Users" },
  { label: "API Cost", value: "$18.42", sublabel: "AI models $14.20 · Embeddings $4.22", trend: -3.2, icon: "DollarSign" },
  { label: "Avg Response", value: "2.3s", sublabel: "P95: 4.1s", trend: -8.5, icon: "Clock" },
  { label: "Pending Reviews", value: "7", sublabel: "3 corrections · 4 feedback", trend: 0, icon: "AlertCircle" },
];

export const mockConversations: Conversation[] = [
  { id: 1, timestamp: "2026-02-10T14:32:00", userName: "Sarah M.", question: "What are the new IRS guidelines for pass-through entity deductions in 2026?", responsePreview: "Under the updated IRS guidance for 2026, pass-through entity (PTE) deductions have been modified...", fullResponse: "Under the updated IRS guidance for 2026, **pass-through entity (PTE) deductions** have been modified to reflect new income thresholds and reporting requirements.\n\n### Key Points:\n\n1. **Qualified Business Income (QBI) deduction** — The Section 199A deduction remains at 20% but with updated income phase-out thresholds for 2026.\n\n2. **New reporting requirements** — PTEs must now file Form 8995-A with additional schedules for aggregated businesses.\n\n3. **SALT workaround updates** — Several states now allow PTE-level tax elections. The IRS has confirmed these are deductible at the entity level.\n\n4. **K-1 changes** — Updated Box 20 codes for QBI reporting take effect for 2026 tax year returns.\n\n### What This Means for Your Clients:\nClients with pass-through income should review their entity elections before the March 15 deadline. The SALT workaround can save significant taxes for high-income earners in high-tax states.\n\n**Sources:** IRS Notice 2026-12, Section 199A Final Regs, AICPA Tax Section Update", topic: "Tax Planning", hadSources: true, sources: ["IRS Notice 2026-12", "Section 199A Final Regulations", "AICPA Tax Section Update"], answered: true, responseTimeMs: 1820, confidence: 0.92 },
  { id: 2, timestamp: "2026-02-10T13:15:00", userName: "Mike T.", question: "Can you pull up the engagement letter template for new advisory clients?", responsePreview: "Here's the current engagement letter template for advisory services...", fullResponse: "Here's the current **engagement letter template** for advisory services:\n\n### Standard Advisory Engagement Letter\n\n| Section | Details |\n|---|---|\n| Scope | Advisory services as defined in the attached SOW |\n| Term | 12 months from execution date |\n| Fee Structure | Monthly retainer + hourly overage |\n| Liability Cap | 1x annual fees |\n\n### Key Clauses to Include:\n- **Scope limitation** — Clearly define what's included and excluded\n- **Fee schedule** — Monthly retainer with quarterly true-up\n- **Termination** — 30-day written notice by either party\n- **Confidentiality** — Standard NDA provisions\n- **Professional standards** — Reference to applicable professional standards\n\n### Tips:\n- Always customize the scope section for each client\n- Have the client initial each page\n- Send via DocuSign for tracking\n\n**Sources:** Firm Engagement Templates, Professional Standards Guide", topic: "Client Management", hadSources: true, sources: ["Firm Engagement Templates", "Professional Standards Guide"], answered: true, responseTimeMs: 3200, confidence: 0.88 },
  { id: 3, timestamp: "2026-02-10T11:45:00", userName: "David L.", question: "What marketing channels work best for B2B professional services?", responsePreview: "For B2B professional services firms, the highest-performing marketing channels include...", fullResponse: "For B2B professional services firms, the highest-performing marketing channels in 2026 include:\n\n### Top Channels by ROI:\n- **LinkedIn organic + ads** — Highest B2B conversion rates, especially for thought leadership\n- **Email newsletters** — 47% of decision-makers say they consume content via email first\n- **Webinars / virtual events** — Great for lead nurturing and establishing expertise\n- **SEO / blog content** — Long-term compounding traffic, especially for how-to guides\n\n### Channel Performance Benchmarks:\n\n| Channel | Avg Cost per Lead | Conversion Rate |\n|---|---|---|\n| LinkedIn Ads | $75-150 | 2.5-4% |\n| Email Marketing | $15-30 | 3-5% |\n| Google Ads (search) | $50-120 | 3-6% |\n| Content/SEO | $20-40 | 1-3% (but compounds) |\n\n### Key Considerations:\n1. Focus on 2-3 channels rather than spreading thin\n2. Content repurposing: one blog post → LinkedIn carousel → newsletter section → webinar topic\n3. Track pipeline attribution, not just MQLs\n\n**Sources:** HubSpot B2B Benchmarks 2026, LinkedIn Marketing Guide, Firm Marketing Playbook", topic: "Marketing Strategy", hadSources: true, sources: ["HubSpot B2B Benchmarks 2026", "LinkedIn Marketing Guide", "Firm Marketing Playbook"], answered: true, responseTimeMs: 2100, confidence: 0.85 },
  { id: 4, timestamp: "2026-02-09T16:20:00", userName: "Lisa K.", question: "How should we handle a client dispute over billing for out-of-scope work?", responsePreview: "When handling billing disputes for out-of-scope work, follow the firm's escalation procedure...", fullResponse: "When handling billing disputes for out-of-scope work, follow these steps:\n\n### Immediate Actions:\n1. **Review the engagement letter** — Check the exact scope definition\n2. **Pull the communication trail** — Emails or Slack messages where additional work was discussed\n3. **Document the timeline** — When was the work requested vs. when was the client notified about scope changes?\n\n### Escalation Procedure:\n\n1. **Level 1: Partner discussion** — Have the engagement partner call the client directly\n2. **Level 2: Scope memo** — Send a written scope clarification memo with:\n   - Original scope from engagement letter\n   - Additional work performed with dates\n   - Proposed resolution options\n3. **Level 3: Mediation** — If unresolved after 30 days, offer third-party mediation\n\n### Best Practices:\n- Never perform out-of-scope work without written approval (email suffices)\n- Send change order notifications within 48 hours\n- Build a 10% buffer into project estimates\n\n**Tip:** Document everything in your project management tool in real-time. Reconstructing a timeline after the fact is difficult.\n\n**Sources:** Client Dispute Resolution Policy, Engagement Management Guidelines", topic: "Client Management", hadSources: true, sources: ["Client Dispute Resolution Policy", "Engagement Management Guidelines"], answered: true, responseTimeMs: 1950, confidence: 0.91 },
  { id: 5, timestamp: "2026-02-09T14:00:00", userName: "James R.", question: "What's the best CRM setup for a 20-person consulting firm?", responsePreview: "For a 20-person consulting firm, I'd recommend a tiered CRM approach...", fullResponse: "For a 20-person consulting firm, here's the recommended CRM setup:\n\n### Recommended CRM Options:\n\n**Best Overall: HubSpot CRM (Professional)**\n- Free for basic, ~$800/mo for Professional\n- Built-in email tracking, deal pipeline, and reporting\n- Great integrations with LinkedIn, Gmail, and proposal tools\n\n**Runner-Up: Pipedrive**\n- ~$50/user/mo\n- Visual pipeline management\n- Best for firms focused on deal flow\n\n### Key Features to Prioritize:\n1. **Pipeline visibility** — See all prospects by stage\n2. **Email integration** — Auto-log emails with contacts\n3. **Activity reminders** — Follow-up task automation\n4. **Reporting** — Win rate, average deal size, sales cycle length\n\n### Implementation Timeline:\n- **Week 1-2:** Import contacts, configure pipeline stages\n- **Week 3-4:** Integrate email and calendar\n- **Week 5-6:** Train team, establish data entry standards\n- **Week 7-8:** First reporting cycle\n\n### Common Mistakes:\n- Over-customizing fields (keep it simple)\n- Not enforcing data entry habits\n- Skipping the training phase\n\n**Sources:** CRM Evaluation Guide, Firm Tech Stack Documentation", topic: "Technology", hadSources: true, sources: ["CRM Evaluation Guide", "Firm Tech Stack Documentation"], answered: true, responseTimeMs: 2400, confidence: 0.87 },
  { id: 6, timestamp: "2026-02-09T10:30:00", userName: "Sarah M.", question: "Are there updated continuing education requirements for CPAs this year?", responsePreview: "Yes, several state boards have updated CPE requirements for 2026...", fullResponse: "Yes, several state boards have updated CPE requirements for 2026:\n\n### National Changes:\n- **AICPA** — New ethics course requirement every 2 years (was every 3)\n- **Data analytics** — NASBA recommending 4 CPE hours in data analytics annually\n\n### State-Specific Updates:\n1. **New York** — 40 hours/year, now requires 2 hours in DEI-related topics\n2. **California** — 80 hours/2 years, added cybersecurity requirement (4 hours)\n3. **Texas** — 40 hours/year, ethics requirement increased to 4 hours\n4. **Florida** — 80 hours/2 years, no significant changes\n\n### Deadlines:\n- NY: December 31, 2026\n- CA: March 31, 2027\n- TX: June 30, 2026\n\n### How to Stay Compliant:\n- Set calendar reminders 90 days before deadlines\n- Use approved online platforms (AICPA, state societies)\n- Track hours in your CPE tracking spreadsheet\n\n**Note:** I wasn't able to verify the exact California cybersecurity requirement — recommend checking the CA Board of Accountancy website directly.\n\n**Sources:** AICPA CPE Standards, NASBA 2026 Updates", topic: "Compliance", hadSources: false, sources: [], answered: true, responseTimeMs: 1600, confidence: 0.79 },
];

export const mockTopics: TopicBreakdown[] = [
  { topic: "Tax Planning", count: 312, percentage: 25, color: "hsl(280, 67%, 55%)" },
  { topic: "Client Management", count: 249, percentage: 20, color: "hsl(217, 91%, 60%)" },
  { topic: "Marketing Strategy", count: 199, percentage: 16, color: "hsl(36, 95%, 50%)" },
  { topic: "Compliance", count: 162, percentage: 13, color: "hsl(0, 72%, 51%)" },
  { topic: "Technology", count: 125, percentage: 10, color: "hsl(142, 71%, 45%)" },
  { topic: "Operations", count: 100, percentage: 8, color: "hsl(190, 70%, 50%)" },
  { topic: "HR & Talent", count: 62, percentage: 5, color: "hsl(320, 60%, 50%)" },
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
    title: "How to Structure Advisory Retainer Agreements That Actually Work",
    contentType: "blog_post",
    priority: "high",
    relevanceScore: 0.94,
    searchInterest: 87,
    affectsServices: ["Advisory Services", "Client Onboarding"],
    keyTopics: ["Engagement Letters", "Retainers", "Scope Management"],
    reasoning: "High search interest + affects core services. Team received 12 questions about engagement structures in the past week.",
    reviewQuestion: "Should we frame this as a how-to guide or a case study?",
    teamQuestionsCount: 12,
    teamQuestions: ["What should the retainer agreement include?", "How do we handle scope creep?"],
    mostCommonAngle: "Step-by-step guide with template download",
    sourceUrl: "",
    contentPreview: "",
    createdAt: "2026-02-09",
  },
  {
    id: 2,
    title: "2026 Tax Planning Strategies Every Small Business Should Know",
    contentType: "newsletter",
    priority: "high",
    relevanceScore: 0.91,
    searchInterest: 92,
    affectsServices: ["Tax Planning", "Advisory"],
    keyTopics: ["Tax Strategy", "Pass-Through Entities", "Deductions"],
    reasoning: "Extremely high search interest. Annual planning season drives significant client inquiries.",
    reviewQuestion: "Include comparison table with prior year strategies?",
    teamQuestionsCount: 18,
    teamQuestions: ["What changed for pass-through deductions?", "How does the SALT workaround apply?"],
    mostCommonAngle: "What business owners need to know before Q2",
    sourceUrl: "",
    contentPreview: "",
    createdAt: "2026-02-08",
  },
  {
    id: 3,
    title: "Client Onboarding Checklist: From First Call to Kickoff",
    contentType: "blog_post",
    priority: "medium",
    relevanceScore: 0.78,
    searchInterest: 54,
    affectsServices: ["Client Management", "Operations"],
    keyTopics: ["Onboarding", "Process", "Client Experience"],
    reasoning: "Moderate search interest but directly improves client retention.",
    reviewQuestion: "Include a downloadable checklist template?",
    teamQuestionsCount: 6,
    teamQuestions: ["What documents do we need from new clients?", "What's the ideal onboarding timeline?"],
    mostCommonAngle: "Reduce client churn with a repeatable onboarding process",
    sourceUrl: "",
    contentPreview: "",
    createdAt: "2026-02-07",
  },
  {
    id: 4,
    title: "How We Use AI to Answer 94% of Team Questions Instantly",
    contentType: "blog_post",
    priority: "medium",
    relevanceScore: 0.72,
    searchInterest: 45,
    affectsServices: ["Operations", "Technology"],
    keyTopics: ["AI", "Knowledge Management", "Productivity"],
    reasoning: "Great thought leadership angle. Shows how small firms can leverage AI for internal efficiency.",
    reviewQuestion: "Should we include real metrics from our usage?",
    teamQuestionsCount: 4,
    teamQuestions: ["How does the AI knowledge base work?", "Can we train it on our specific processes?"],
    mostCommonAngle: "Case study: AI-powered knowledge management for small firms",
    sourceUrl: "",
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
  { id: 1, user: "Sarah M.", when: "2026-02-10T09:30:00", wrongAnswer: "Advisory retainers require a 12-month commitment", correctAnswer: "Retainer agreements can be structured as month-to-month with 30-day notice", status: "pending" },
  { id: 2, user: "Mike T.", when: "2026-02-09T14:15:00", wrongAnswer: "The QBI deduction cap is $150,000", correctAnswer: "The QBI deduction phases out at $182,100 (single) / $364,200 (joint) for 2026", status: "pending" },
  { id: 3, user: "David L.", when: "2026-02-08T11:00:00", wrongAnswer: "LinkedIn ads convert at 1-2% for B2B", correctAnswer: "LinkedIn ads convert at 2.5-4% for B2B professional services when targeting decision-makers", status: "pending" },
];

export const mockFailedQueries: FailedQuery[] = [
  { id: 1, timestamp: "2026-02-10T10:15:00", userName: "Lisa K.", question: "What's the latest guidance on revenue recognition for subscription services?", reason: "No relevant sources found in knowledge base" },
  { id: 2, timestamp: "2026-02-09T16:45:00", userName: "James R.", question: "Can you pull our utilization rates for January?", reason: "External API timeout — practice management system unavailable" },
];

export const mockMostAsked: MostAskedQuestion[] = [
  { rank: 1, question: "What are the 2026 tax planning strategies for pass-through entities?", timesAsked: 23 },
  { rank: 2, question: "How should we structure advisory retainer agreements?", timesAsked: 18 },
  { rank: 3, question: "What marketing channels work best for B2B services?", timesAsked: 15 },
  { rank: 4, question: "How do we handle client billing disputes?", timesAsked: 12 },
  { rank: 5, question: "What are the updated CPE requirements for 2026?", timesAsked: 9 },
];

export const mockRoadmap: RoadmapItem[] = [
  { id: 1, idea: "Auto-generate client proposal drafts", requestedBy: "Sarah M.", priority: "high", status: "in_progress", target: "Q1 2026", notes: "MVP ready for testing" },
  { id: 2, idea: "Integration with practice management software", requestedBy: "Mike T.", priority: "high", status: "planned", target: "Q2 2026", notes: "API access pending approval" },
  { id: 3, idea: "Multi-language support (Spanish)", requestedBy: "Lisa K.", priority: "medium", status: "backlog", target: "TBD", notes: "Requested by 3 users" },
  { id: 4, idea: "Slack thread summarization", requestedBy: "David L.", priority: "low", status: "backlog", target: "TBD", notes: "" },
  { id: 5, idea: "PDF document upload & parsing", requestedBy: "James R.", priority: "high", status: "shipped", target: "Q4 2025", notes: "Released v1.2" },
];

export const mockApprovedCorrections: ApprovedCorrection[] = [
  { id: 1, dateApproved: "2026-02-07", approvedBy: "Managing Partner", whatWasWrong: "Stated QBI deduction threshold was $150,000", correctionApplied: "Updated to reflect 2026 thresholds: $182,100 (single) / $364,200 (MFJ)" },
  { id: 2, dateApproved: "2026-02-05", approvedBy: "Managing Partner", whatWasWrong: "Incorrect LinkedIn ad conversion rate for B2B", correctionApplied: "Updated to 2.5-4% based on 2026 industry benchmarks" },
  { id: 3, dateApproved: "2026-02-01", approvedBy: "Sarah M.", whatWasWrong: "Missing info on SALT workaround states", correctionApplied: "Added list of 36 states with PTE-level tax elections and deductibility confirmation" },
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
  openRate?: number;
  clickRate?: number;
  subscribers?: number;
  avgTimeOnPage?: string;
  bounceRate?: number;
  seoScore: number;
  topKeyword: string;
  generatedFrom: string;
  body: string;
}

export const mockPublishedContent: PublishedContent[] = [
  {
    id: 1,
    title: "How to Structure Advisory Retainer Agreements That Work",
    contentType: "blog_post",
    publishedAt: "2026-01-28",
    author: "Managing Partner",
    status: "published",
    url: "/blog/advisory-retainer-agreements",
    views: 1243,
    clicks: 187,
    shares: 34,
    avgTimeOnPage: "4m 12s",
    bounceRate: 32,
    seoScore: 87,
    topKeyword: "advisory retainer agreement template",
    generatedFrom: "AI-identified from team questions",
    body: "# How to Structure Advisory Retainer Agreements That Work\n\nRetainer agreements are the backbone of advisory practices. Done right, they create predictable revenue and clear client expectations. Done wrong, they lead to scope creep and billing disputes.\n\n## Key Components\n\n1. **Define the scope clearly** — List specific deliverables and explicitly note what's excluded.\n2. **Set the fee structure** — Monthly retainer with quarterly true-ups works best for most firms.\n3. **Include change order provisions** — How additional work gets approved and billed.\n4. **Termination clauses** — 30-day notice is standard; include transition support.\n\n## Common Pitfalls\n\n- Vague scope definitions that lead to scope creep\n- Not tracking hours even on retainer engagements\n- Failing to document verbal scope changes\n\n## Template Download\n\nDownload our free advisory retainer template to get started.",
  },
  {
    id: 2,
    title: "January 2026 Professional Services Industry Roundup",
    contentType: "newsletter",
    publishedAt: "2026-01-31",
    author: "Marketing Team",
    status: "published",
    url: "/newsletter/jan-2026-roundup",
    views: 892,
    clicks: 156,
    shares: 22,
    openRate: 47.3,
    clickRate: 12.8,
    subscribers: 1240,
    seoScore: 72,
    topKeyword: "professional services trends 2026",
    generatedFrom: "Monthly industry digest",
    body: "# January 2026 Professional Services Industry Roundup\n\nHere's what changed in the professional services landscape this month.\n\n## Tax & Compliance\n- IRS released updated guidance on pass-through entity deductions\n- New CPE requirements announced by NASBA\n- SALT workaround expanded to 36 states\n\n## Industry Trends\n- AI adoption in professional services grew 45% YoY\n- Average utilization rates increased to 72% across mid-size firms\n- Client demand for advisory services outpacing compliance work\n\n## What's Coming in February\n- Estimated tax deadlines\n- State-level regulatory updates\n- Annual firm benchmarking reports",
  },
  {
    id: 3,
    title: "2026 Tax Planning Strategies for Small Business Owners",
    contentType: "blog_post",
    publishedAt: "2026-02-03",
    author: "Sarah M.",
    status: "published",
    url: "/blog/tax-planning-2026",
    views: 2156,
    clicks: 312,
    shares: 67,
    avgTimeOnPage: "5m 48s",
    bounceRate: 24,
    seoScore: 94,
    topKeyword: "small business tax planning 2026",
    generatedFrom: "Tax planning candidate",
    body: "# 2026 Tax Planning Strategies for Small Business Owners\n\nTax planning season is here. Whether you're an LLC, S-Corp, or sole proprietor, these strategies can help minimize your tax burden.\n\n## Key Strategies\n\n### 1. Maximize the QBI Deduction\nThe Section 199A deduction allows up to 20% off qualified business income. For 2026, phase-out thresholds are $182,100 (single) and $364,200 (MFJ).\n\n### 2. SALT Workaround\n36 states now allow PTE-level tax elections. This effectively circumvents the $10,000 SALT deduction cap.\n\n### 3. Retirement Plan Contributions\n- Solo 401(k): Up to $69,000 for 2026\n- SEP IRA: Up to 25% of net self-employment income\n- Defined Benefit Plans: Best for high-income owners (contributions can exceed $200k)\n\n## Timeline\n- **March 15**: S-Corp and Partnership return deadlines\n- **April 15**: Individual and C-Corp deadlines\n- **Q2**: Mid-year tax planning review\n\n## Common Mistakes\n- Not taking the QBI deduction when eligible\n- Missing state-level PTE election deadlines\n- Under-contributing to retirement plans",
  },
  {
    id: 4,
    title: "February 2026 Industry Update",
    contentType: "newsletter",
    publishedAt: "2026-02-07",
    author: "Marketing Team",
    status: "published",
    url: "/newsletter/feb-2026-update",
    views: 445,
    clicks: 78,
    shares: 11,
    openRate: 51.2,
    clickRate: 14.1,
    subscribers: 1258,
    seoScore: 68,
    topKeyword: "professional services February 2026",
    generatedFrom: "Monthly industry digest",
    body: "# February 2026 Industry Update\n\nYour monthly briefing on professional services trends.\n\n## Highlights\n- IRS pass-through entity guidance now in effect\n- AI-powered knowledge management seeing rapid adoption\n- Client advisory demand continues to outpace compliance\n\n## Action Items\n1. Review updated tax planning strategies for Q1 clients\n2. Evaluate AI tools for internal knowledge management\n3. Prepare mid-year advisory review proposals",
  },
  {
    id: 5,
    title: "Client Billing Dispute Resolution Guide",
    contentType: "blog_post",
    publishedAt: "2026-02-05",
    author: "Lisa K.",
    status: "draft",
    url: "",
    views: 0,
    clicks: 0,
    shares: 0,
    avgTimeOnPage: "0s",
    bounceRate: 0,
    seoScore: 81,
    topKeyword: "professional services billing disputes",
    generatedFrom: "Client management candidate",
    body: "# Client Billing Dispute Resolution Guide\n\n*DRAFT — Ready for review*\n\nThis guide covers how to handle billing disputes professionally while maintaining client relationships.\n\n## Prevention First\n- Clear engagement letters with specific scope\n- Regular status updates with hours tracking\n- Change order process for out-of-scope work\n\n## Resolution Steps\n\n| Step | Action | Timeline |\n|---|---|---|\n| 1 | Partner discussion with client | Within 48 hours |\n| 2 | Written scope clarification memo | Within 1 week |\n| 3 | Negotiated resolution | Within 2 weeks |\n| 4 | Mediation if needed | Within 30 days |",
  },
];

export const mockGeneratedContent: Record<number, string> = {
  1: "# How to Structure Advisory Retainer Agreements That Actually Work\n\nRetainer agreements are the backbone of professional advisory practices. When structured properly, they create predictable revenue for your firm and clear expectations for your clients.\n\n## Why Retainers Work\n\nFor professional service firms, retainers solve three critical problems:\n\n1. **Revenue predictability** — Monthly recurring revenue smooths cash flow\n2. **Scope clarity** — Both parties know exactly what's included\n3. **Client loyalty** — Retainer clients stick around 3x longer than project-based clients\n\n## Key Components\n\n### Scope Definition\nBe specific. 'Advisory services' is too vague. Instead:\n- Monthly financial review meeting (1 hour)\n- Quarterly strategic planning session (2 hours)\n- Up to 5 ad-hoc email/phone consultations per month\n- Excluded: tax preparation, audit, litigation support\n\n### Fee Structure\nThree proven models:\n1. **Flat monthly fee** — Simple, predictable. Best for well-defined scopes.\n2. **Retainer + hourly overage** — Base fee covers X hours; additional hours billed at a rate.\n3. **Value-based retainer** — Priced on outcomes, not hours. Highest margins.\n\n### Change Order Process\nThis is where most retainers fail. Include a simple process:\n1. Client requests additional work\n2. Firm sends a scope change notice within 48 hours\n3. Client approves in writing (email counts)\n4. Work proceeds and is billed separately\n\n## Template\n\nDownload our free retainer agreement template at the link below.",
  2: "# 2026 Tax Planning Strategies Every Small Business Should Know\n\n**What Business Owners Need to Act On Before Q2**\n\nThe 2026 tax landscape brings meaningful changes for small business owners, especially those with pass-through entities.\n\n## Key Changes\n\n### QBI Deduction Updates\n| Detail | 2025 | 2026 |\n|---|---|---|\n| Deduction Rate | 20% | 20% |\n| Phase-out (Single) | $177,500 | $182,100 |\n| Phase-out (MFJ) | $355,000 | $364,200 |\n\n### SALT Workaround Expansion\n36 states now allow PTE-level tax elections. If your clients are in high-tax states, this is a game-changer — effectively bypassing the $10,000 SALT cap.\n\n## Top 5 Strategies\n\n1. **Maximize retirement contributions** — Solo 401(k) limits at $69,000 for 2026\n2. **Elect PTE taxation** — Where available, this can save $10,000+ annually\n3. **Accelerate deductions** — Prepay expenses, maximize Section 179\n4. **Entity structure review** — S-Corp election can reduce self-employment tax\n5. **Charitable giving** — Donor-advised funds for bunching strategy\n\n## Action Items for Clients\n\n1. Review entity structure before March 15 deadlines\n2. Check state PTE election deadlines\n3. Schedule mid-year tax projection meetings\n4. Update estimated tax payments",
  3: "# Client Onboarding Checklist: From First Call to Kickoff\n\n**A Repeatable Process for Professional Service Firms**\n\nOnboarding sets the tone for the entire client relationship. A structured process reduces churn and improves satisfaction.\n\n## Phase 1: Pre-Engagement (Week 1)\n\n- [ ] Discovery call completed\n- [ ] Needs assessment documented\n- [ ] Fee quote prepared\n- [ ] Engagement letter drafted and sent\n- [ ] Engagement letter signed and returned\n\n## Phase 2: Setup (Week 2)\n\n- [ ] Client record created in CRM\n- [ ] Welcome email sent with document checklist\n- [ ] Client portal access set up\n- [ ] Billing preferences confirmed\n- [ ] Primary contact and escalation contacts identified\n\n## Phase 3: Kickoff (Week 3)\n\n- [ ] Kickoff meeting scheduled\n- [ ] Team introductions completed\n- [ ] Communication cadence agreed upon\n- [ ] First deliverable timeline confirmed\n- [ ] 30-day check-in scheduled\n\n## Common Mistakes\n\n1. ❌ Starting work before the engagement letter is signed\n2. ❌ Not introducing the full team\n3. ❌ Skipping the 30-day check-in\n4. ❌ Failing to set communication expectations",
  4: "# How We Use AI to Answer 94% of Team Questions Instantly\n\n**A Case Study in Knowledge Management for Small Firms**\n\nOur 23-person firm handles over 1,200 internal questions per month. Here's how we built an AI knowledge base that answers 94% of them correctly.\n\n## The Problem\n\nTeam members spent an average of 15 minutes per question hunting through shared drives, Slack threads, and asking colleagues. That's 300+ hours per month of lost productivity.\n\n## The Solution\n\nWe built an internal AI assistant that:\n- Ingests our process documents, templates, and past answers\n- Responds to team questions in 2.3 seconds on average\n- Includes source citations for verification\n- Learns from team corrections\n\n## Results\n\n| Metric | Before | After |\n|---|---|---|\n| Avg time to answer | 15 minutes | 2.3 seconds |\n| Questions answered correctly | ~60% (self-serve) | 94.2% |\n| Monthly productivity saved | 0 | 280+ hours |\n| Cost | Senior staff time | $18/month |",
};
