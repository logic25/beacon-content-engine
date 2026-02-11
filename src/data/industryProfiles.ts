// Industry-specific mock data profiles
// Each industry group gets tailored topics, conversations, questions, insights, etc.

import type {
  TopicBreakdown,
  Conversation,
  MostAskedQuestion,
  ContentCandidate,
  Suggestion,
  FailedQuery,
  ApprovedCorrection,
  PublishedContent,
} from "./mockData";

export type IndustryKey = "accounting" | "legal" | "technology" | "realestate" | "recruiting" | "generic";

export function mapIndustryToKey(industry: string): IndustryKey {
  const lower = industry.toLowerCase();
  if (lower.includes("account") || lower.includes("tax") || lower.includes("financial")) return "accounting";
  if (lower.includes("law")) return "legal";
  if (lower.includes("it ") || lower.includes("market") || lower.includes("consult") || lower.includes("architect") || lower.includes("engineer")) return "technology";
  if (lower.includes("real estate") || lower.includes("insurance")) return "realestate";
  if (lower.includes("recruit") || lower.includes("staffing")) return "recruiting";
  return "generic";
}

export interface IndustryProfile {
  topics: TopicBreakdown[];
  conversations: Conversation[];
  mostAsked: MostAskedQuestion[];
  contentCandidates: ContentCandidate[];
  suggestions: Suggestion[];
  failedQueries: FailedQuery[];
  approvedCorrections: ApprovedCorrection[];
  publishedContent: PublishedContent[];
  insights: InsightData[];
}

export interface InsightData {
  id: number;
  title: string;
  description: string;
  type: "warning" | "trend" | "info" | "success";
  iconName: "AlertTriangle" | "Calendar" | "Clock" | "TrendingDown" | "TrendingUp";
}

// ─── LEGAL ──────────────────────────────────────────────

const legalProfile: IndustryProfile = {
  topics: [
    { topic: "Case Law Research", count: 298, percentage: 24, color: "hsl(280, 67%, 55%)" },
    { topic: "Client Intake", count: 237, percentage: 19, color: "hsl(217, 91%, 60%)" },
    { topic: "Contract Drafting", count: 199, percentage: 16, color: "hsl(36, 95%, 50%)" },
    { topic: "Litigation Strategy", count: 162, percentage: 13, color: "hsl(0, 72%, 51%)" },
    { topic: "Compliance & Ethics", count: 125, percentage: 10, color: "hsl(142, 71%, 45%)" },
    { topic: "Billing & Timekeeping", count: 100, percentage: 8, color: "hsl(190, 70%, 50%)" },
    { topic: "Discovery", count: 62, percentage: 5, color: "hsl(320, 60%, 50%)" },
    { topic: "General", count: 38, percentage: 3, color: "hsl(220, 10%, 55%)" },
  ],
  conversations: [
    { id: 1, timestamp: "2026-02-10T14:32:00", userName: "Partner A.", question: "What are the latest amendments to the Federal Rules of Civil Procedure?", responsePreview: "The 2026 amendments to the FRCP include changes to discovery timelines...", fullResponse: "The 2026 amendments to the **Federal Rules of Civil Procedure** include significant changes...\n\n### Key Changes:\n1. **Rule 26(b)** — Proportionality factors updated\n2. **Rule 37(e)** — ESI preservation clarified\n3. **Rule 30(b)(6)** — Meet-and-confer requirements expanded\n\n**Sources:** FRCP 2026 Amendments, ABA Practice Update", topic: "Case Law Research", hadSources: true, sources: ["FRCP 2026 Amendments", "ABA Practice Update"], answered: true, responseTimeMs: 1900, confidence: 0.91 },
    { id: 2, timestamp: "2026-02-10T13:15:00", userName: "Associate B.", question: "What's the standard conflict check procedure for new matters?", responsePreview: "Our conflict check procedure involves three steps...", fullResponse: "Our **conflict check procedure** for new matters:\n\n1. **Initial screen** — Run all parties through the conflicts database\n2. **Partner review** — Engagement partner reviews potential conflicts\n3. **Ethics committee** — Escalate if any matches found\n\n**Sources:** Firm Conflicts Policy, Ethics Handbook", topic: "Client Intake", hadSources: true, sources: ["Firm Conflicts Policy", "Ethics Handbook"], answered: true, responseTimeMs: 2100, confidence: 0.89 },
    { id: 3, timestamp: "2026-02-10T11:45:00", userName: "Paralegal C.", question: "What are the best practices for organizing discovery documents in large litigation?", responsePreview: "For large-scale discovery, we recommend a structured approach...", fullResponse: "For large-scale discovery document management:\n\n### Best Practices:\n- **Use Relativity or similar platform** for document review\n- **Coding protocols** — Establish consistent issue codes\n- **Privilege logs** — Maintain in real-time\n- **Quality control** — Sample 10% of coded documents\n\n**Sources:** Discovery Management Guide, Litigation Support Playbook", topic: "Discovery", hadSources: true, sources: ["Discovery Management Guide", "Litigation Support Playbook"], answered: true, responseTimeMs: 2300, confidence: 0.86 },
    { id: 4, timestamp: "2026-02-09T16:20:00", userName: "Associate D.", question: "How should we draft a force majeure clause for commercial contracts?", responsePreview: "Force majeure clauses should be tailored to the specific deal...", fullResponse: "**Force majeure clause drafting** best practices:\n\n1. **Enumerate specific events** — Don't rely on catch-all language\n2. **Include pandemics, cyber attacks** — Modern force majeure events\n3. **Define notice requirements** — 48-hour notice period is standard\n4. **Mitigation obligations** — Both parties must mitigate\n\n**Sources:** Contract Drafting Templates, ABA Commercial Law Guide", topic: "Contract Drafting", hadSources: true, sources: ["Contract Drafting Templates", "ABA Commercial Law Guide"], answered: true, responseTimeMs: 1800, confidence: 0.93 },
    { id: 5, timestamp: "2026-02-09T14:00:00", userName: "Partner E.", question: "What's the most effective approach to client intake for personal injury cases?", responsePreview: "Personal injury intake should follow a structured process...", fullResponse: "Effective PI intake process:\n\n1. **Initial call screening** — 10-minute qualification checklist\n2. **Document collection** — Medical records, police reports, insurance info\n3. **Statute of limitations check** — Critical first step\n4. **Fee agreement** — Contingency fee structure and costs\n\n**Sources:** PI Practice Guide, Client Intake Procedures", topic: "Client Intake", hadSources: true, sources: ["PI Practice Guide", "Client Intake Procedures"], answered: true, responseTimeMs: 2400, confidence: 0.88 },
    { id: 6, timestamp: "2026-02-09T10:30:00", userName: "Partner A.", question: "Are there new CLE requirements for our state this year?", responsePreview: "Yes, several state bars have updated CLE requirements for 2026...", fullResponse: "Updated CLE requirements for 2026:\n\n- **New York** — 24 CLE credits/year, 2 hours in DEI\n- **California** — 25 hours/3 years, new tech competence requirement\n- **Texas** — 15 hours/year, ethics increased to 3 hours\n\n**Sources:** State Bar CLE Updates 2026", topic: "Compliance & Ethics", hadSources: false, sources: [], answered: true, responseTimeMs: 1700, confidence: 0.80 },
  ],
  mostAsked: [
    { rank: 1, question: "What are the latest changes to civil procedure rules?", timesAsked: 21 },
    { rank: 2, question: "How should we structure engagement letters for litigation?", timesAsked: 17 },
    { rank: 3, question: "What's our conflict check process for new matters?", timesAsked: 14 },
    { rank: 4, question: "How do we handle client trust account compliance?", timesAsked: 11 },
    { rank: 5, question: "What are the current CLE requirements?", timesAsked: 9 },
  ],
  contentCandidates: [
    { id: 1, title: "How to Streamline Client Intake for Law Firms", contentType: "blog_post", priority: "high", relevanceScore: 0.93, searchInterest: 85, affectsServices: ["Client Intake", "Practice Management"], keyTopics: ["Intake", "Screening", "Onboarding"], reasoning: "High search interest + 14 team questions about intake processes.", reviewQuestion: "Focus on litigation or general practice intake?", teamQuestionsCount: 14, teamQuestions: ["What documents do we need for new clients?", "How do we run conflict checks?"], mostCommonAngle: "Step-by-step guide with downloadable checklist", sourceUrl: "", contentPreview: "", createdAt: "2026-02-09" },
    { id: 2, title: "2026 Discovery Management Best Practices", contentType: "newsletter", priority: "high", relevanceScore: 0.90, searchInterest: 78, affectsServices: ["Litigation", "Discovery"], keyTopics: ["ESI", "Relativity", "Privilege Logs"], reasoning: "Discovery questions spike before major trials. Team had 12 related queries.", reviewQuestion: "Include technology comparison section?", teamQuestionsCount: 12, teamQuestions: ["How do we organize large document productions?", "What coding protocols should we use?"], mostCommonAngle: "Practical guide for associates and paralegals", sourceUrl: "", contentPreview: "", createdAt: "2026-02-08" },
    { id: 3, title: "Force Majeure Clauses: What to Include in 2026", contentType: "blog_post", priority: "medium", relevanceScore: 0.78, searchInterest: 62, affectsServices: ["Contract Drafting", "Commercial Law"], keyTopics: ["Force Majeure", "Contracts", "Risk Allocation"], reasoning: "Moderate search interest but clients frequently ask about contract provisions.", reviewQuestion: "Include sample clause language?", teamQuestionsCount: 8, teamQuestions: ["What events should force majeure cover?", "How do notice requirements work?"], mostCommonAngle: "Template with customizable provisions", sourceUrl: "", contentPreview: "", createdAt: "2026-02-07" },
    { id: 4, title: "Building a Referral Network for Small Law Firms", contentType: "blog_post", priority: "medium", relevanceScore: 0.72, searchInterest: 48, affectsServices: ["Business Development", "Marketing"], keyTopics: ["Referrals", "Networking", "Growth"], reasoning: "Growing interest in business development among partners.", reviewQuestion: "Include case studies from similar firms?", teamQuestionsCount: 5, teamQuestions: ["How do we track referral sources?", "What's the best CRM for law firms?"], mostCommonAngle: "Practical networking strategies with ROI tracking", sourceUrl: "", contentPreview: "", createdAt: "2026-02-06" },
  ],
  suggestions: [
    { id: 1, user: "Partner A.", when: "2026-02-10T09:30:00", wrongAnswer: "Statute of limitations for breach of contract is 4 years in all states", correctAnswer: "Statute of limitations varies by state: 4 years (CA), 6 years (NY), 5 years (TX)", status: "pending" },
    { id: 2, user: "Associate B.", when: "2026-02-09T14:15:00", wrongAnswer: "CLE credits can be earned retroactively", correctAnswer: "CLE credits must be earned within the reporting period — no retroactive credit", status: "pending" },
    { id: 3, user: "Paralegal C.", when: "2026-02-08T11:00:00", wrongAnswer: "Privilege logs are optional in federal discovery", correctAnswer: "Rule 26(b)(5) requires a privilege log for all withheld documents", status: "pending" },
  ],
  failedQueries: [
    { id: 1, timestamp: "2026-02-10T10:15:00", userName: "Associate D.", question: "What's the latest ruling on arbitration clauses in employment contracts?", reason: "No relevant sources found in knowledge base" },
    { id: 2, timestamp: "2026-02-09T16:45:00", userName: "Partner E.", question: "Can you pull our matter profitability report for Q4?", reason: "External API timeout — practice management system unavailable" },
  ],
  approvedCorrections: [
    { id: 1, dateApproved: "2026-02-07", approvedBy: "Managing Partner", whatWasWrong: "Stated all states have a 4-year breach of contract SOL", correctionApplied: "Updated with state-specific statute of limitations table" },
    { id: 2, dateApproved: "2026-02-05", approvedBy: "Ethics Committee", whatWasWrong: "Missing privilege log requirement under Rule 26(b)(5)", correctionApplied: "Added mandatory privilege log guidance with template" },
    { id: 3, dateApproved: "2026-02-01", approvedBy: "Partner A.", whatWasWrong: "Outdated CLE requirements for California", correctionApplied: "Updated CA CLE to 25 hours/3 years with tech competence requirement" },
  ],
  publishedContent: [
    { id: 1, title: "How to Streamline Client Intake for Your Law Firm", contentType: "blog_post", publishedAt: "2026-01-28", author: "Managing Partner", status: "published", url: "/blog/law-firm-client-intake", views: 1156, clicks: 167, shares: 29, avgTimeOnPage: "4m 45s", bounceRate: 30, seoScore: 88, topKeyword: "law firm client intake process", generatedFrom: "AI-identified from team questions", body: "# How to Streamline Client Intake for Your Law Firm\n\nA structured intake process reduces onboarding time and improves client satisfaction.\n\n## Key Steps\n1. Initial phone screening\n2. Conflict check\n3. Document collection\n4. Engagement letter\n\n## Common Pitfalls\n- Starting work before conflicts are cleared\n- Incomplete document collection" },
    { id: 2, title: "January 2026 Legal Industry Roundup", contentType: "newsletter", publishedAt: "2026-01-31", author: "Marketing Team", status: "published", url: "/newsletter/jan-2026-legal", views: 834, clicks: 142, shares: 18, openRate: 45.8, clickRate: 11.9, subscribers: 1180, seoScore: 71, topKeyword: "legal industry trends 2026", generatedFrom: "Monthly industry digest", body: "# January 2026 Legal Industry Roundup\n\n## Highlights\n- FRCP amendments take effect\n- AI adoption in legal research grows 50%\n- New CLE tech competence requirements" },
    { id: 3, title: "2026 Guide to Force Majeure Clauses", contentType: "blog_post", publishedAt: "2026-02-03", author: "Partner A.", status: "published", url: "/blog/force-majeure-2026", views: 1890, clicks: 278, shares: 52, avgTimeOnPage: "5m 12s", bounceRate: 26, seoScore: 92, topKeyword: "force majeure clause template 2026", generatedFrom: "Contract drafting candidate", body: "# 2026 Guide to Force Majeure Clauses\n\nForce majeure clauses are essential in modern commercial contracts.\n\n## What to Include\n1. Specific enumerated events\n2. Pandemic and cyber provisions\n3. Notice requirements\n4. Mitigation obligations" },
    { id: 4, title: "February 2026 Legal Update", contentType: "newsletter", publishedAt: "2026-02-07", author: "Marketing Team", status: "published", url: "/newsletter/feb-2026-legal", views: 412, clicks: 68, shares: 9, openRate: 49.5, clickRate: 13.2, subscribers: 1195, seoScore: 67, topKeyword: "legal news February 2026", generatedFrom: "Monthly industry digest", body: "# February 2026 Legal Update\n\n## Highlights\n- FRCP discovery amendments now in effect\n- State bar CLE updates\n- AI-powered document review trends" },
    { id: 5, title: "Discovery Management Best Practices Guide", contentType: "blog_post", publishedAt: "2026-02-05", author: "Paralegal C.", status: "draft", url: "", views: 0, clicks: 0, shares: 0, avgTimeOnPage: "0s", bounceRate: 0, seoScore: 79, topKeyword: "legal discovery management", generatedFrom: "Litigation support candidate", body: "# Discovery Management Best Practices Guide\n\n*DRAFT — Ready for review*\n\nOrganizing discovery documents efficiently is critical for large litigation matters." },
  ],
  insights: [
    { id: 1, title: "Discovery questions up 35% this week", description: "Teams preparing for upcoming trials are driving more discovery-related queries.", type: "warning", iconName: "AlertTriangle" },
    { id: 2, title: "Contract drafting peaks on Tuesdays", description: "58% of contract questions come in on Tuesdays. Consider scheduling template updates accordingly.", type: "trend", iconName: "Calendar" },
    { id: 3, title: "2 conflict checks pending for 4+ days", description: "New matter conflict checks from Partner A. and Associate B. are waiting for ethics review.", type: "warning", iconName: "Clock" },
    { id: 4, title: "Research time improved 12%", description: "Average case law research time dropped to 1.8s from 2.1s last month.", type: "success", iconName: "TrendingDown" },
    { id: 5, title: "Client Intake is your #1 topic", description: "19% of all queries are intake-related. Your intake guide has 1,156 views — consider a follow-up.", type: "info", iconName: "TrendingUp" },
  ],
};

// ─── TECHNOLOGY / CONSULTING / MARKETING ─────────────────

const technologyProfile: IndustryProfile = {
  topics: [
    { topic: "Project Delivery", count: 305, percentage: 24, color: "hsl(280, 67%, 55%)" },
    { topic: "Client Solutions", count: 243, percentage: 19, color: "hsl(217, 91%, 60%)" },
    { topic: "Architecture & Design", count: 199, percentage: 16, color: "hsl(36, 95%, 50%)" },
    { topic: "DevOps & Cloud", count: 162, percentage: 13, color: "hsl(0, 72%, 51%)" },
    { topic: "Sales & Proposals", count: 125, percentage: 10, color: "hsl(142, 71%, 45%)" },
    { topic: "Talent & Hiring", count: 100, percentage: 8, color: "hsl(190, 70%, 50%)" },
    { topic: "Security", count: 62, percentage: 5, color: "hsl(320, 60%, 50%)" },
    { topic: "General", count: 38, percentage: 3, color: "hsl(220, 10%, 55%)" },
  ],
  conversations: [
    { id: 1, timestamp: "2026-02-10T14:32:00", userName: "Lead Dev A.", question: "What's the best approach to migrating a legacy monolith to microservices?", responsePreview: "For legacy monolith migration, we recommend the Strangler Fig pattern...", fullResponse: "For migrating a legacy monolith, use the **Strangler Fig pattern**:\n\n1. **Identify bounded contexts** — Map the monolith's domain boundaries\n2. **Start with low-risk services** — Extract auth or notifications first\n3. **API gateway** — Route traffic between old and new services\n4. **Data migration** — Use event sourcing for gradual data transfer\n\n**Sources:** Architecture Decision Records, Migration Playbook", topic: "Architecture & Design", hadSources: true, sources: ["Architecture Decision Records", "Migration Playbook"], answered: true, responseTimeMs: 2100, confidence: 0.90 },
    { id: 2, timestamp: "2026-02-10T13:15:00", userName: "PM B.", question: "What's our standard SOW template for fixed-price engagements?", responsePreview: "Here's our standard SOW template for fixed-price projects...", fullResponse: "Our **SOW template** for fixed-price engagements includes:\n\n| Section | Details |\n|---|---|\n| Scope | Detailed deliverables with acceptance criteria |\n| Timeline | Milestone-based with go/no-go gates |\n| Pricing | Fixed fee with change order provisions |\n| Assumptions | Listed and signed off by client |\n\n**Sources:** SOW Templates, Project Governance Guide", topic: "Client Solutions", hadSources: true, sources: ["SOW Templates", "Project Governance Guide"], answered: true, responseTimeMs: 1800, confidence: 0.92 },
    { id: 3, timestamp: "2026-02-10T11:45:00", userName: "Consultant C.", question: "What Kubernetes best practices should we follow for client deployments?", responsePreview: "For production Kubernetes deployments, follow these best practices...", fullResponse: "### Kubernetes Best Practices:\n- **Namespaces** — Isolate environments and teams\n- **Resource limits** — Set CPU/memory requests and limits\n- **Health checks** — Liveness and readiness probes on all services\n- **Secrets management** — Use external secrets operator\n- **Monitoring** — Prometheus + Grafana stack\n\n**Sources:** K8s Standards Guide, DevOps Playbook", topic: "DevOps & Cloud", hadSources: true, sources: ["K8s Standards Guide", "DevOps Playbook"], answered: true, responseTimeMs: 2300, confidence: 0.87 },
    { id: 4, timestamp: "2026-02-09T16:20:00", userName: "Sales D.", question: "How should we price a 6-month digital transformation engagement?", responsePreview: "For digital transformation pricing, consider a hybrid approach...", fullResponse: "**Pricing a digital transformation engagement:**\n\n### Models:\n1. **T&M with cap** — Best for uncertain scope\n2. **Fixed-price phases** — Discovery fixed, delivery T&M\n3. **Value-based** — Tied to business outcomes\n\n### Benchmarks:\n- Discovery: $50-80K (4-6 weeks)\n- Implementation: $150-300K (3-5 months)\n- Support: 15-20% of implementation annually\n\n**Sources:** Pricing Calculator, Sales Playbook", topic: "Sales & Proposals", hadSources: true, sources: ["Pricing Calculator", "Sales Playbook"], answered: true, responseTimeMs: 2000, confidence: 0.88 },
    { id: 5, timestamp: "2026-02-09T14:00:00", userName: "Lead Dev A.", question: "What's the best CI/CD pipeline setup for a multi-repo project?", responsePreview: "For multi-repo CI/CD, we recommend a trunk-based development approach...", fullResponse: "**Multi-repo CI/CD best practices:**\n\n1. **Trunk-based development** — Short-lived feature branches\n2. **GitHub Actions / GitLab CI** — Per-repo pipelines\n3. **Shared libraries** — Versioned CI templates\n4. **Artifact management** — Central container registry\n\n**Sources:** CI/CD Standards, DevOps Playbook", topic: "DevOps & Cloud", hadSources: true, sources: ["CI/CD Standards", "DevOps Playbook"], answered: true, responseTimeMs: 1900, confidence: 0.91 },
    { id: 6, timestamp: "2026-02-09T10:30:00", userName: "PM B.", question: "What project management methodology should we recommend for agile-resistant clients?", responsePreview: "For clients resistant to full agile, we recommend a hybrid approach...", fullResponse: "**Hybrid methodology for agile-resistant clients:**\n\n- **Phase-gated + sprints** — Waterfall milestones with agile execution\n- **Bi-weekly demos** — Show progress without full scrum ceremonies\n- **Fixed scope, flexible timeline** — Compromise that clients accept\n\n**Sources:** PM Methodology Guide, Client Engagement Playbook", topic: "Project Delivery", hadSources: true, sources: ["PM Methodology Guide", "Client Engagement Playbook"], answered: true, responseTimeMs: 1700, confidence: 0.85 },
  ],
  mostAsked: [
    { rank: 1, question: "What's the best architecture for our client's use case?", timesAsked: 22 },
    { rank: 2, question: "How should we price this engagement?", timesAsked: 19 },
    { rank: 3, question: "What's our standard CI/CD pipeline setup?", timesAsked: 16 },
    { rank: 4, question: "How do we handle scope changes on fixed-price projects?", timesAsked: 13 },
    { rank: 5, question: "What certifications should our team pursue?", timesAsked: 8 },
  ],
  contentCandidates: [
    { id: 1, title: "Microservices Migration: A Step-by-Step Guide for Enterprise Clients", contentType: "blog_post", priority: "high", relevanceScore: 0.94, searchInterest: 89, affectsServices: ["Architecture Consulting", "Development"], keyTopics: ["Microservices", "Migration", "Strangler Fig"], reasoning: "High search interest + 15 team questions about architecture decisions.", reviewQuestion: "Include code examples or keep it strategy-level?", teamQuestionsCount: 15, teamQuestions: ["When should we recommend microservices?", "How do we handle data migration?"], mostCommonAngle: "Decision framework with real project examples", sourceUrl: "", contentPreview: "", createdAt: "2026-02-09" },
    { id: 2, title: "How to Price IT Consulting Engagements in 2026", contentType: "newsletter", priority: "high", relevanceScore: 0.91, searchInterest: 82, affectsServices: ["Sales", "Account Management"], keyTopics: ["Pricing", "T&M", "Fixed-Price"], reasoning: "Pricing questions are the #2 most asked topic. Critical for sales enablement.", reviewQuestion: "Include competitor benchmarking data?", teamQuestionsCount: 19, teamQuestions: ["What's the right rate for senior consultants?", "How do we handle scope creep billing?"], mostCommonAngle: "Pricing model comparison with calculator template", sourceUrl: "", contentPreview: "", createdAt: "2026-02-08" },
    { id: 3, title: "Kubernetes in Production: Lessons from 50 Client Deployments", contentType: "blog_post", priority: "medium", relevanceScore: 0.79, searchInterest: 67, affectsServices: ["DevOps", "Cloud Infrastructure"], keyTopics: ["Kubernetes", "Cloud", "DevOps"], reasoning: "Moderate search interest but strong thought leadership angle.", reviewQuestion: "Include client case studies?", teamQuestionsCount: 8, teamQuestions: ["What's the minimum cluster size?", "How do we handle secrets?"], mostCommonAngle: "Lessons learned with real metrics", sourceUrl: "", contentPreview: "", createdAt: "2026-02-07" },
    { id: 4, title: "Agile for Non-Tech Clients: A Practical Framework", contentType: "blog_post", priority: "medium", relevanceScore: 0.73, searchInterest: 51, affectsServices: ["Project Management", "Client Education"], keyTopics: ["Agile", "Methodology", "Client Management"], reasoning: "PM team frequently adapts agile for traditional clients.", reviewQuestion: "Include comparison chart with waterfall?", teamQuestionsCount: 6, teamQuestions: ["How do we sell agile to resistant clients?", "What ceremonies do we keep?"], mostCommonAngle: "Hybrid framework with client communication templates", sourceUrl: "", contentPreview: "", createdAt: "2026-02-06" },
  ],
  suggestions: [
    { id: 1, user: "Lead Dev A.", when: "2026-02-10T09:30:00", wrongAnswer: "Kubernetes pods restart automatically on failure by default", correctAnswer: "Pods require a restart policy — default for deployments is 'Always' but standalone pods default to 'Never'", status: "pending" },
    { id: 2, user: "PM B.", when: "2026-02-09T14:15:00", wrongAnswer: "Fixed-price projects should include unlimited revision rounds", correctAnswer: "Standard is 2 revision rounds per deliverable; additional rounds billed at change order rates", status: "pending" },
    { id: 3, user: "Consultant C.", when: "2026-02-08T11:00:00", wrongAnswer: "AWS Reserved Instances save 30% over on-demand", correctAnswer: "AWS RIs save 40-60% with 1-year commitment and up to 72% with 3-year commitment", status: "pending" },
  ],
  failedQueries: [
    { id: 1, timestamp: "2026-02-10T10:15:00", userName: "Sales D.", question: "What's the latest Gartner Magic Quadrant positioning for our technology partners?", reason: "No relevant sources found in knowledge base" },
    { id: 2, timestamp: "2026-02-09T16:45:00", userName: "PM B.", question: "Can you pull our project utilization rates for January?", reason: "External API timeout — project management system unavailable" },
  ],
  approvedCorrections: [
    { id: 1, dateApproved: "2026-02-07", approvedBy: "CTO", whatWasWrong: "Stated Kubernetes pods auto-restart by default in all cases", correctionApplied: "Clarified restart policy behavior differs between deployments and standalone pods" },
    { id: 2, dateApproved: "2026-02-05", approvedBy: "Sales Lead", whatWasWrong: "AWS Reserved Instance savings stated as 30%", correctionApplied: "Updated to 40-60% (1-year) and up to 72% (3-year) based on 2026 pricing" },
    { id: 3, dateApproved: "2026-02-01", approvedBy: "PM Lead", whatWasWrong: "Missing change order process for fixed-price projects", correctionApplied: "Added standard 2-revision limit and change order billing procedure" },
  ],
  publishedContent: [
    { id: 1, title: "Microservices Migration: A Practical Guide", contentType: "blog_post", publishedAt: "2026-01-28", author: "CTO", status: "published", url: "/blog/microservices-migration", views: 1340, clicks: 198, shares: 41, avgTimeOnPage: "5m 02s", bounceRate: 28, seoScore: 90, topKeyword: "microservices migration guide", generatedFrom: "AI-identified from team questions", body: "# Microservices Migration: A Practical Guide\n\nMigrating from a monolith requires careful planning and incremental execution." },
    { id: 2, title: "January 2026 Tech Consulting Roundup", contentType: "newsletter", publishedAt: "2026-01-31", author: "Marketing Team", status: "published", url: "/newsletter/jan-2026-tech", views: 920, clicks: 163, shares: 24, openRate: 48.1, clickRate: 13.5, subscribers: 1320, seoScore: 73, topKeyword: "IT consulting trends 2026", generatedFrom: "Monthly industry digest", body: "# January 2026 Tech Consulting Roundup\n\n## Highlights\n- AI adoption in consulting grows 55%\n- Cloud migration demand at all-time high\n- Talent market stabilizing" },
    { id: 3, title: "How to Price IT Consulting Engagements", contentType: "blog_post", publishedAt: "2026-02-03", author: "Sales Lead", status: "published", url: "/blog/pricing-consulting", views: 2280, clicks: 334, shares: 72, avgTimeOnPage: "6m 15s", bounceRate: 22, seoScore: 95, topKeyword: "IT consulting pricing models", generatedFrom: "Pricing strategy candidate", body: "# How to Price IT Consulting Engagements\n\nPricing is the #1 challenge for growing consulting firms." },
    { id: 4, title: "February 2026 Tech Update", contentType: "newsletter", publishedAt: "2026-02-07", author: "Marketing Team", status: "published", url: "/newsletter/feb-2026-tech", views: 478, clicks: 82, shares: 13, openRate: 52.4, clickRate: 14.8, subscribers: 1345, seoScore: 69, topKeyword: "tech consulting February 2026", generatedFrom: "Monthly industry digest", body: "# February 2026 Tech Update\n\n## Highlights\n- Kubernetes adoption continues to grow\n- Fixed-price engagement best practices updated\n- New CI/CD standards published" },
    { id: 5, title: "Agile for Non-Tech Clients Framework", contentType: "blog_post", publishedAt: "2026-02-05", author: "PM Lead", status: "draft", url: "", views: 0, clicks: 0, shares: 0, avgTimeOnPage: "0s", bounceRate: 0, seoScore: 82, topKeyword: "agile for traditional clients", generatedFrom: "Project management candidate", body: "# Agile for Non-Tech Clients\n\n*DRAFT — Ready for review*\n\nHow to adapt agile methodology for clients who prefer traditional project management." },
  ],
  insights: [
    { id: 1, title: "Architecture questions up 45% this week", description: "3 new client projects requiring architecture reviews. Team asked 15 architecture-related questions.", type: "warning", iconName: "AlertTriangle" },
    { id: 2, title: "Pricing questions spike before quarter-end", description: "65% of pricing queries come in the last week of each quarter. Pre-load rate cards and templates.", type: "trend", iconName: "Calendar" },
    { id: 3, title: "4 SOW reviews pending for 3+ days", description: "SOW templates from PM B., Sales D., and two others are waiting for CTO review.", type: "warning", iconName: "Clock" },
    { id: 4, title: "Response accuracy improved 6%", description: "Knowledge base corrections brought accuracy from 88% to 94.2% this month.", type: "success", iconName: "TrendingDown" },
    { id: 5, title: "Project Delivery is your #1 topic", description: "24% of all queries are delivery-related. Your migration guide has 1,340 views — consider a follow-up.", type: "info", iconName: "TrendingUp" },
  ],
};

// ─── REAL ESTATE / INSURANCE ─────────────────────────────

const realEstateProfile: IndustryProfile = {
  topics: [
    { topic: "Property Valuations", count: 290, percentage: 23, color: "hsl(280, 67%, 55%)" },
    { topic: "Transaction Management", count: 250, percentage: 20, color: "hsl(217, 91%, 60%)" },
    { topic: "Market Analysis", count: 199, percentage: 16, color: "hsl(36, 95%, 50%)" },
    { topic: "Compliance & Licensing", count: 162, percentage: 13, color: "hsl(0, 72%, 51%)" },
    { topic: "Lead Generation", count: 125, percentage: 10, color: "hsl(142, 71%, 45%)" },
    { topic: "Property Management", count: 100, percentage: 8, color: "hsl(190, 70%, 50%)" },
    { topic: "Investment Analysis", count: 62, percentage: 5, color: "hsl(320, 60%, 50%)" },
    { topic: "General", count: 38, percentage: 3, color: "hsl(220, 10%, 55%)" },
  ],
  conversations: [
    { id: 1, timestamp: "2026-02-10T14:32:00", userName: "Agent A.", question: "What are the current market conditions for multi-family properties in the metro area?", responsePreview: "The multi-family market in the metro area is showing strong fundamentals...", fullResponse: "**Metro area multi-family market conditions (Q1 2026):**\n\n- **Cap rates**: 5.2-6.8% depending on class\n- **Vacancy rates**: 4.1% (down from 5.3% last year)\n- **Rent growth**: 3.8% YoY\n- **Inventory**: Tight, especially Class A\n\n**Sources:** Market Report Q1 2026, CoStar Data", topic: "Market Analysis", hadSources: true, sources: ["Market Report Q1 2026", "CoStar Data"], answered: true, responseTimeMs: 2100, confidence: 0.89 },
    { id: 2, timestamp: "2026-02-10T13:15:00", userName: "Broker B.", question: "What documents do we need for a commercial lease closing?", responsePreview: "For commercial lease closings, you'll need the following documents...", fullResponse: "**Commercial lease closing checklist:**\n\n1. Executed lease agreement\n2. Tenant financial statements\n3. Certificate of insurance\n4. Security deposit\n5. Estoppel certificates\n6. Environmental reports\n\n**Sources:** Closing Checklist Template, Transaction Guide", topic: "Transaction Management", hadSources: true, sources: ["Closing Checklist Template", "Transaction Guide"], answered: true, responseTimeMs: 1900, confidence: 0.91 },
    { id: 3, timestamp: "2026-02-10T11:45:00", userName: "Analyst C.", question: "How do I calculate the cap rate for a commercial property?", responsePreview: "Cap rate is calculated as Net Operating Income divided by Current Market Value...", fullResponse: "**Cap Rate Formula:**\n\nCap Rate = NOI / Current Market Value × 100\n\n### Example:\n- NOI: $150,000/year\n- Market Value: $2,500,000\n- Cap Rate: 6.0%\n\n### Key Considerations:\n- Use stabilized NOI (not pro forma)\n- Compare to market comps\n- Adjust for location and property class\n\n**Sources:** Valuation Guide, Investment Analysis Handbook", topic: "Property Valuations", hadSources: true, sources: ["Valuation Guide", "Investment Analysis Handbook"], answered: true, responseTimeMs: 1700, confidence: 0.93 },
    { id: 4, timestamp: "2026-02-09T16:20:00", userName: "Agent D.", question: "What are the best lead generation strategies for luxury residential listings?", responsePreview: "For luxury residential, the most effective lead generation strategies include...", fullResponse: "**Luxury residential lead generation:**\n\n1. **Referral networks** — Past clients and wealth managers\n2. **Social media** — Instagram and LinkedIn for high-net-worth audiences\n3. **Events** — Private showings and networking events\n4. **Direct mail** — High-quality mailers to target neighborhoods\n\n**Sources:** Marketing Playbook, Luxury Market Guide", topic: "Lead Generation", hadSources: true, sources: ["Marketing Playbook", "Luxury Market Guide"], answered: true, responseTimeMs: 2200, confidence: 0.86 },
    { id: 5, timestamp: "2026-02-09T14:00:00", userName: "Manager E.", question: "What maintenance schedule should we follow for our managed properties?", responsePreview: "For managed properties, we recommend a quarterly maintenance schedule...", fullResponse: "**Property maintenance schedule:**\n\n- **Monthly:** HVAC filters, common area inspection\n- **Quarterly:** Pest control, fire extinguisher checks\n- **Semi-annual:** Roof inspection, gutter cleaning\n- **Annual:** Full property inspection, HVAC service\n\n**Sources:** Property Management SOP, Maintenance Guide", topic: "Property Management", hadSources: true, sources: ["Property Management SOP", "Maintenance Guide"], answered: true, responseTimeMs: 1800, confidence: 0.90 },
    { id: 6, timestamp: "2026-02-09T10:30:00", userName: "Agent A.", question: "Are there new licensing requirements for real estate agents this year?", responsePreview: "Yes, several states have updated CE requirements for 2026...", fullResponse: "**2026 real estate licensing updates:**\n\n- **Fair housing CE** now required annually in most states\n- **Digital marketing ethics** — New 2-hour requirement in CA, NY, TX\n- **Renewal deadlines** vary by state\n\n**Sources:** State Licensing Board Updates 2026", topic: "Compliance & Licensing", hadSources: false, sources: [], answered: true, responseTimeMs: 1600, confidence: 0.78 },
  ],
  mostAsked: [
    { rank: 1, question: "What are the current cap rates for commercial properties in our market?", timesAsked: 24 },
    { rank: 2, question: "What documents are needed for commercial lease closings?", timesAsked: 17 },
    { rank: 3, question: "How do we value multi-family investment properties?", timesAsked: 15 },
    { rank: 4, question: "What are the best lead gen strategies for luxury listings?", timesAsked: 12 },
    { rank: 5, question: "What are the updated CE requirements for agents?", timesAsked: 10 },
  ],
  contentCandidates: [
    { id: 1, title: "2026 Commercial Real Estate Market Outlook", contentType: "blog_post", priority: "high", relevanceScore: 0.94, searchInterest: 91, affectsServices: ["Market Analysis", "Investment Advisory"], keyTopics: ["Market Trends", "Cap Rates", "Vacancy"], reasoning: "Extremely high search interest. Clients consistently ask about market conditions.", reviewQuestion: "Focus on commercial or include residential?", teamQuestionsCount: 24, teamQuestions: ["What are current cap rates?", "How's the multi-family market?"], mostCommonAngle: "Data-driven market analysis with forecasts", sourceUrl: "", contentPreview: "", createdAt: "2026-02-09" },
    { id: 2, title: "The Complete Commercial Lease Closing Checklist", contentType: "newsletter", priority: "high", relevanceScore: 0.89, searchInterest: 76, affectsServices: ["Transaction Management", "Brokerage"], keyTopics: ["Closings", "Documentation", "Checklists"], reasoning: "Transaction questions are consistently high. A downloadable checklist would drive leads.", reviewQuestion: "Include state-specific variations?", teamQuestionsCount: 17, teamQuestions: ["What documents do we need?", "What's the closing timeline?"], mostCommonAngle: "Downloadable checklist with timeline template", sourceUrl: "", contentPreview: "", createdAt: "2026-02-08" },
    { id: 3, title: "Luxury Real Estate Marketing: What Actually Works", contentType: "blog_post", priority: "medium", relevanceScore: 0.76, searchInterest: 58, affectsServices: ["Luxury Sales", "Marketing"], keyTopics: ["Luxury", "Marketing", "Lead Gen"], reasoning: "Growing luxury segment in our market. Agents need better marketing strategies.", reviewQuestion: "Include budget breakdowns?", teamQuestionsCount: 12, teamQuestions: ["How do we reach high-net-worth buyers?", "What's the ROI on luxury marketing?"], mostCommonAngle: "Case study with ROI metrics", sourceUrl: "", contentPreview: "", createdAt: "2026-02-07" },
    { id: 4, title: "Property Management: Reducing Vacancy Through Better Maintenance", contentType: "blog_post", priority: "medium", relevanceScore: 0.71, searchInterest: 44, affectsServices: ["Property Management", "Operations"], keyTopics: ["Maintenance", "Vacancy", "Tenant Retention"], reasoning: "Property management team frequently asks about maintenance schedules and tenant retention.", reviewQuestion: "Include vendor recommendation directory?", teamQuestionsCount: 8, teamQuestions: ["What maintenance schedule works best?", "How do we reduce tenant turnover?"], mostCommonAngle: "Preventative maintenance program with cost analysis", sourceUrl: "", contentPreview: "", createdAt: "2026-02-06" },
  ],
  suggestions: [
    { id: 1, user: "Agent A.", when: "2026-02-10T09:30:00", wrongAnswer: "Cap rates in the metro are averaging 4.5% for all property types", correctAnswer: "Cap rates vary by class: Class A 5.2%, Class B 5.8%, Class C 6.8% in the metro area", status: "pending" },
    { id: 2, user: "Broker B.", when: "2026-02-09T14:15:00", wrongAnswer: "Environmental reports are optional for commercial leases", correctAnswer: "Phase I environmental site assessments are required for all commercial transactions over $500K", status: "pending" },
    { id: 3, user: "Analyst C.", when: "2026-02-08T11:00:00", wrongAnswer: "Multi-family vacancy rate is 6% metro-wide", correctAnswer: "Metro multi-family vacancy dropped to 4.1% as of Q1 2026 per CoStar data", status: "pending" },
  ],
  failedQueries: [
    { id: 1, timestamp: "2026-02-10T10:15:00", userName: "Agent D.", question: "What's the zoning classification for the property at 4th and Main?", reason: "No property-specific zoning data in knowledge base" },
    { id: 2, timestamp: "2026-02-09T16:45:00", userName: "Manager E.", question: "Can you pull the rent roll for our Oak Street property?", reason: "External API timeout — property management system unavailable" },
  ],
  approvedCorrections: [
    { id: 1, dateApproved: "2026-02-07", approvedBy: "Broker-in-Charge", whatWasWrong: "Stated metro cap rates at 4.5% for all property types", correctionApplied: "Updated with class-specific cap rates: A (5.2%), B (5.8%), C (6.8%)" },
    { id: 2, dateApproved: "2026-02-05", approvedBy: "Compliance Officer", whatWasWrong: "Environmental reports listed as optional for commercial leases", correctionApplied: "Phase I ESA required for all commercial transactions over $500K" },
    { id: 3, dateApproved: "2026-02-01", approvedBy: "Agent A.", whatWasWrong: "Outdated vacancy rate data (6% vs actual 4.1%)", correctionApplied: "Updated with Q1 2026 CoStar data showing 4.1% metro vacancy" },
  ],
  publishedContent: [
    { id: 1, title: "2026 Commercial Real Estate Market Outlook", contentType: "blog_post", publishedAt: "2026-01-28", author: "Managing Broker", status: "published", url: "/blog/cre-market-2026", views: 1480, clicks: 215, shares: 38, avgTimeOnPage: "4m 32s", bounceRate: 29, seoScore: 91, topKeyword: "commercial real estate outlook 2026", generatedFrom: "AI-identified from team questions", body: "# 2026 Commercial Real Estate Market Outlook\n\nThe commercial real estate market enters 2026 with cautious optimism." },
    { id: 2, title: "January 2026 Real Estate Market Update", contentType: "newsletter", publishedAt: "2026-01-31", author: "Marketing Team", status: "published", url: "/newsletter/jan-2026-realestate", views: 876, clicks: 148, shares: 21, openRate: 46.5, clickRate: 12.3, subscribers: 1150, seoScore: 70, topKeyword: "real estate trends January 2026", generatedFrom: "Monthly market update", body: "# January 2026 Real Estate Market Update\n\n## Highlights\n- Multi-family vacancy at historic low\n- Cap rates stabilizing across all classes\n- New CE requirements for agents" },
    { id: 3, title: "The Complete Commercial Lease Closing Checklist", contentType: "blog_post", publishedAt: "2026-02-03", author: "Broker B.", status: "published", url: "/blog/lease-closing-checklist", views: 1920, clicks: 298, shares: 55, avgTimeOnPage: "5m 22s", bounceRate: 25, seoScore: 93, topKeyword: "commercial lease closing documents", generatedFrom: "Transaction management candidate", body: "# The Complete Commercial Lease Closing Checklist\n\nA well-organized closing process prevents delays and protects all parties." },
    { id: 4, title: "February 2026 Market Update", contentType: "newsletter", publishedAt: "2026-02-07", author: "Marketing Team", status: "published", url: "/newsletter/feb-2026-realestate", views: 435, clicks: 72, shares: 10, openRate: 50.8, clickRate: 13.9, subscribers: 1168, seoScore: 66, topKeyword: "real estate February 2026", generatedFrom: "Monthly market update", body: "# February 2026 Market Update\n\n## Highlights\n- Cap rate corrections by property class\n- Spring inventory projections\n- Luxury market gaining momentum" },
    { id: 5, title: "Luxury Real Estate Marketing Guide", contentType: "blog_post", publishedAt: "2026-02-05", author: "Agent D.", status: "draft", url: "", views: 0, clicks: 0, shares: 0, avgTimeOnPage: "0s", bounceRate: 0, seoScore: 80, topKeyword: "luxury real estate marketing strategies", generatedFrom: "Marketing candidate", body: "# Luxury Real Estate Marketing Guide\n\n*DRAFT — Ready for review*\n\nMarketing luxury properties requires a different approach." },
  ],
  insights: [
    { id: 1, title: "Valuation questions up 38% this week", description: "Multiple new listing appointments driving cap rate and CMA queries.", type: "warning", iconName: "AlertTriangle" },
    { id: 2, title: "Market analysis queries peak on Mondays", description: "60% of market data questions come in Monday mornings. Pre-load weekly market reports.", type: "trend", iconName: "Calendar" },
    { id: 3, title: "2 transaction checklists pending review", description: "Closing documents from Broker B. and Agent A. are waiting for compliance sign-off.", type: "warning", iconName: "Clock" },
    { id: 4, title: "Response accuracy improved 9%", description: "Cap rate and vacancy data corrections brought accuracy from 85% to 94%.", type: "success", iconName: "TrendingDown" },
    { id: 5, title: "Property Valuations is your #1 topic", description: "23% of all queries are valuation-related. Your market outlook has 1,480 views.", type: "info", iconName: "TrendingUp" },
  ],
};

// ─── RECRUITING & STAFFING ──────────────────────────────

const recruitingProfile: IndustryProfile = {
  topics: [
    { topic: "Candidate Sourcing", count: 310, percentage: 25, color: "hsl(280, 67%, 55%)" },
    { topic: "Client Relationships", count: 237, percentage: 19, color: "hsl(217, 91%, 60%)" },
    { topic: "Interview Process", count: 199, percentage: 16, color: "hsl(36, 95%, 50%)" },
    { topic: "Compliance & Labor Law", count: 150, percentage: 12, color: "hsl(0, 72%, 51%)" },
    { topic: "Compensation Data", count: 125, percentage: 10, color: "hsl(142, 71%, 45%)" },
    { topic: "Onboarding", count: 100, percentage: 8, color: "hsl(190, 70%, 50%)" },
    { topic: "Employer Branding", count: 62, percentage: 5, color: "hsl(320, 60%, 50%)" },
    { topic: "General", count: 38, percentage: 3, color: "hsl(220, 10%, 55%)" },
  ],
  conversations: [
    { id: 1, timestamp: "2026-02-10T14:32:00", userName: "Recruiter A.", question: "What are the current salary benchmarks for senior software engineers in our market?", responsePreview: "Based on the latest compensation data, senior SWE salaries range from...", fullResponse: "**Senior Software Engineer salary benchmarks (Q1 2026):**\n\n| Level | Base Salary | Total Comp |\n|---|---|---|\n| Senior (5-8 yrs) | $155-185K | $180-220K |\n| Staff (8-12 yrs) | $185-230K | $220-280K |\n| Principal (12+ yrs) | $230-280K | $280-350K |\n\n**Sources:** Compensation Survey 2026, Market Data Report", topic: "Compensation Data", hadSources: true, sources: ["Compensation Survey 2026", "Market Data Report"], answered: true, responseTimeMs: 1900, confidence: 0.90 },
    { id: 2, timestamp: "2026-02-10T13:15:00", userName: "Account Mgr B.", question: "What's our standard client service agreement for retained search?", responsePreview: "Our retained search agreement includes the following terms...", fullResponse: "**Retained search agreement standard terms:**\n\n- **Fee:** 25-33% of first-year total compensation\n- **Payment:** 1/3 upfront, 1/3 at shortlist, 1/3 at placement\n- **Guarantee:** 90-day replacement guarantee\n- **Exclusivity:** 60-day exclusive search period\n\n**Sources:** Service Agreement Templates, Fee Schedule", topic: "Client Relationships", hadSources: true, sources: ["Service Agreement Templates", "Fee Schedule"], answered: true, responseTimeMs: 2000, confidence: 0.92 },
    { id: 3, timestamp: "2026-02-10T11:45:00", userName: "Recruiter C.", question: "What's the best way to source passive candidates for niche technical roles?", responsePreview: "For niche technical roles, the most effective sourcing strategies include...", fullResponse: "**Passive candidate sourcing for niche roles:**\n\n1. **LinkedIn Recruiter** — Boolean search with skills-based filters\n2. **GitHub/Stack Overflow** — Find active contributors\n3. **Conference networking** — Attend industry events\n4. **Employee referrals** — $5-10K bonus for hard-to-fill roles\n5. **Niche job boards** — Dice, AngelList, specialized communities\n\n**Sources:** Sourcing Playbook, Recruitment Best Practices", topic: "Candidate Sourcing", hadSources: true, sources: ["Sourcing Playbook", "Recruitment Best Practices"], answered: true, responseTimeMs: 2200, confidence: 0.87 },
    { id: 4, timestamp: "2026-02-09T16:20:00", userName: "Compliance D.", question: "What are the new EEOC reporting requirements for staffing firms?", responsePreview: "The 2026 EEOC updates include new reporting obligations for staffing agencies...", fullResponse: "**2026 EEOC updates for staffing firms:**\n\n1. **EEO-1 Component 2** — Pay data reporting reinstated\n2. **Joint employer clarification** — Updated guidelines for temp workers\n3. **AI screening disclosure** — New requirement to disclose AI in hiring\n\n**Sources:** EEOC 2026 Guidelines, Staffing Compliance Manual", topic: "Compliance & Labor Law", hadSources: true, sources: ["EEOC 2026 Guidelines", "Staffing Compliance Manual"], answered: true, responseTimeMs: 1800, confidence: 0.88 },
    { id: 5, timestamp: "2026-02-09T14:00:00", userName: "Recruiter A.", question: "What interview framework works best for evaluating cultural fit?", responsePreview: "We recommend a structured behavioral interview approach...", fullResponse: "**Cultural fit interview framework:**\n\n1. **Values alignment questions** — How do they handle conflict, failure, collaboration?\n2. **Situational scenarios** — Role-specific situations\n3. **Reverse interview** — Let candidates ask questions\n4. **Team meet-and-greet** — Informal chat with future team\n\n**Sources:** Interview Guide, Hiring Framework", topic: "Interview Process", hadSources: true, sources: ["Interview Guide", "Hiring Framework"], answered: true, responseTimeMs: 1700, confidence: 0.89 },
    { id: 6, timestamp: "2026-02-09T10:30:00", userName: "Account Mgr B.", question: "What's our process for onboarding placed candidates at client sites?", responsePreview: "Our client-site onboarding process includes a 3-phase approach...", fullResponse: "**Client-site onboarding (3 phases):**\n\n1. **Pre-start:** Paperwork, background check, access setup\n2. **Day 1-5:** Orientation, team intro, role-specific training\n3. **30-day check-in:** Performance review, culture fit assessment\n\n**Sources:** Onboarding SOP, Client Success Playbook", topic: "Onboarding", hadSources: true, sources: ["Onboarding SOP", "Client Success Playbook"], answered: true, responseTimeMs: 1600, confidence: 0.91 },
  ],
  mostAsked: [
    { rank: 1, question: "What are the current salary benchmarks for this role?", timesAsked: 26 },
    { rank: 2, question: "How do we source passive candidates for niche roles?", timesAsked: 18 },
    { rank: 3, question: "What's our retained search fee structure?", timesAsked: 14 },
    { rank: 4, question: "What are the latest EEOC/labor law updates?", timesAsked: 11 },
    { rank: 5, question: "What interview framework do we recommend?", timesAsked: 9 },
  ],
  contentCandidates: [
    { id: 1, title: "2026 Salary Guide: Tech, Finance & Healthcare", contentType: "blog_post", priority: "high", relevanceScore: 0.95, searchInterest: 93, affectsServices: ["Compensation Advisory", "Client Consulting"], keyTopics: ["Salaries", "Benchmarks", "Hiring Trends"], reasoning: "Salary data is our #1 requested topic. Annual guide drives significant leads.", reviewQuestion: "Include remote vs. on-site differentials?", teamQuestionsCount: 26, teamQuestions: ["What's the market rate for this role?", "How have salaries changed year-over-year?"], mostCommonAngle: "Downloadable PDF with interactive calculator", sourceUrl: "", contentPreview: "", createdAt: "2026-02-09" },
    { id: 2, title: "How to Source Passive Candidates in a Tight Market", contentType: "newsletter", priority: "high", relevanceScore: 0.90, searchInterest: 79, affectsServices: ["Recruitment", "Talent Acquisition"], keyTopics: ["Sourcing", "LinkedIn", "Passive Candidates"], reasoning: "Sourcing is our team's #1 challenge. Sharing strategies builds thought leadership.", reviewQuestion: "Include tool comparisons?", teamQuestionsCount: 18, teamQuestions: ["What Boolean strings work best?", "How do we stand out in InMail?"], mostCommonAngle: "Advanced sourcing techniques with templates", sourceUrl: "", contentPreview: "", createdAt: "2026-02-08" },
    { id: 3, title: "AI in Hiring: What Recruiters Need to Know in 2026", contentType: "blog_post", priority: "medium", relevanceScore: 0.77, searchInterest: 65, affectsServices: ["Compliance", "Technology"], keyTopics: ["AI Hiring", "EEOC", "Compliance"], reasoning: "New AI disclosure requirements make this timely and important.", reviewQuestion: "Include vendor recommendations?", teamQuestionsCount: 8, teamQuestions: ["Do we need to disclose AI screening?", "What tools are compliant?"], mostCommonAngle: "Compliance-focused guide with action checklist", sourceUrl: "", contentPreview: "", createdAt: "2026-02-07" },
    { id: 4, title: "Building an Employer Brand That Attracts Top Talent", contentType: "blog_post", priority: "medium", relevanceScore: 0.70, searchInterest: 52, affectsServices: ["Client Advisory", "Employer Branding"], keyTopics: ["Employer Brand", "EVP", "Talent Attraction"], reasoning: "Clients increasingly ask for employer branding advice.", reviewQuestion: "Include social media strategy section?", teamQuestionsCount: 5, teamQuestions: ["How do we help clients build their employer brand?", "What platforms matter most?"], mostCommonAngle: "Framework with before/after case studies", sourceUrl: "", contentPreview: "", createdAt: "2026-02-06" },
  ],
  suggestions: [
    { id: 1, user: "Recruiter A.", when: "2026-02-10T09:30:00", wrongAnswer: "Senior SWE average salary is $140K nationally", correctAnswer: "Senior SWE base salary ranges $155-185K, with total comp $180-220K in most metros (2026 data)", status: "pending" },
    { id: 2, user: "Compliance D.", when: "2026-02-09T14:15:00", wrongAnswer: "AI screening disclosure is voluntary for staffing firms", correctAnswer: "EEOC 2026 guidelines require disclosure of AI/automated tools in hiring decisions", status: "pending" },
    { id: 3, user: "Account Mgr B.", when: "2026-02-08T11:00:00", wrongAnswer: "Standard retained search guarantee is 60 days", correctAnswer: "Industry standard retained search guarantee is 90 days with one-time replacement", status: "pending" },
  ],
  failedQueries: [
    { id: 1, timestamp: "2026-02-10T10:15:00", userName: "Recruiter C.", question: "What's the average time-to-fill for DevOps roles in the Southeast?", reason: "Regional time-to-fill data not in knowledge base" },
    { id: 2, timestamp: "2026-02-09T16:45:00", userName: "Account Mgr B.", question: "Can you pull our client placement history for Q4?", reason: "External API timeout — ATS unavailable" },
  ],
  approvedCorrections: [
    { id: 1, dateApproved: "2026-02-07", approvedBy: "Managing Director", whatWasWrong: "Senior SWE salary benchmark was $140K (outdated)", correctionApplied: "Updated to $155-185K base / $180-220K total comp per 2026 survey data" },
    { id: 2, dateApproved: "2026-02-05", approvedBy: "Compliance Lead", whatWasWrong: "AI hiring disclosure listed as voluntary", correctionApplied: "Updated to reflect mandatory EEOC disclosure requirement for AI screening tools" },
    { id: 3, dateApproved: "2026-02-01", approvedBy: "Account Mgr B.", whatWasWrong: "Retained search guarantee listed as 60 days", correctionApplied: "Corrected to 90-day industry standard with one-time replacement" },
  ],
  publishedContent: [
    { id: 1, title: "2026 Salary Guide: Tech, Finance & Healthcare", contentType: "blog_post", publishedAt: "2026-01-28", author: "Managing Director", status: "published", url: "/blog/salary-guide-2026", views: 2450, clicks: 387, shares: 82, avgTimeOnPage: "6m 18s", bounceRate: 20, seoScore: 96, topKeyword: "salary guide 2026", generatedFrom: "Annual compensation report", body: "# 2026 Salary Guide\n\nComprehensive compensation benchmarks across tech, finance, and healthcare." },
    { id: 2, title: "January 2026 Hiring Market Update", contentType: "newsletter", publishedAt: "2026-01-31", author: "Marketing Team", status: "published", url: "/newsletter/jan-2026-hiring", views: 945, clicks: 168, shares: 26, openRate: 49.2, clickRate: 14.1, subscribers: 1380, seoScore: 74, topKeyword: "hiring trends January 2026", generatedFrom: "Monthly market update", body: "# January 2026 Hiring Market Update\n\n## Highlights\n- Tech hiring rebounds 15% after Q4 slowdown\n- AI roles demand up 40% YoY\n- Remote work premium continues to shrink" },
    { id: 3, title: "How to Source Passive Candidates in 2026", contentType: "blog_post", publishedAt: "2026-02-03", author: "Recruiter A.", status: "published", url: "/blog/passive-sourcing-2026", views: 1780, clicks: 265, shares: 48, avgTimeOnPage: "5m 35s", bounceRate: 27, seoScore: 89, topKeyword: "passive candidate sourcing strategies", generatedFrom: "Sourcing candidate", body: "# How to Source Passive Candidates in 2026\n\nThe best talent isn't looking for jobs. Here's how to find them." },
    { id: 4, title: "February 2026 Hiring Update", contentType: "newsletter", publishedAt: "2026-02-07", author: "Marketing Team", status: "published", url: "/newsletter/feb-2026-hiring", views: 460, clicks: 79, shares: 12, openRate: 51.5, clickRate: 14.6, subscribers: 1405, seoScore: 68, topKeyword: "hiring market February 2026", generatedFrom: "Monthly market update", body: "# February 2026 Hiring Update\n\n## Highlights\n- AI disclosure requirements take effect\n- Salary inflation moderating\n- Contract-to-hire gaining popularity" },
    { id: 5, title: "AI in Hiring: Compliance Guide for Recruiters", contentType: "blog_post", publishedAt: "2026-02-05", author: "Compliance D.", status: "draft", url: "", views: 0, clicks: 0, shares: 0, avgTimeOnPage: "0s", bounceRate: 0, seoScore: 83, topKeyword: "AI hiring compliance 2026", generatedFrom: "Compliance candidate", body: "# AI in Hiring: Compliance Guide\n\n*DRAFT — Ready for review*\n\nNew regulations require transparency in AI-powered hiring tools." },
  ],
  insights: [
    { id: 1, title: "Salary questions up 50% this week", description: "Annual compensation review season driving heavy salary benchmark requests.", type: "warning", iconName: "AlertTriangle" },
    { id: 2, title: "Sourcing questions peak mid-week", description: "68% of sourcing queries come Tuesday-Thursday. Schedule sourcing workshops on Mondays.", type: "trend", iconName: "Calendar" },
    { id: 3, title: "3 fee agreements pending review", description: "Client service agreements from Account Mgr B. and two others awaiting director approval.", type: "warning", iconName: "Clock" },
    { id: 4, title: "Placement accuracy improved 7%", description: "Compensation data corrections improved salary quote accuracy from 87% to 94%.", type: "success", iconName: "TrendingDown" },
    { id: 5, title: "Compensation Data is your #1 topic", description: "25% of all queries are salary-related. Your salary guide has 2,450 views — huge engagement.", type: "info", iconName: "TrendingUp" },
  ],
};

// ─── GENERIC (Other / Fallback) ─────────────────────────

const genericProfile: IndustryProfile = {
  topics: [
    { topic: "Service Delivery", count: 295, percentage: 24, color: "hsl(280, 67%, 55%)" },
    { topic: "Client Management", count: 243, percentage: 19, color: "hsl(217, 91%, 60%)" },
    { topic: "Business Development", count: 199, percentage: 16, color: "hsl(36, 95%, 50%)" },
    { topic: "Operations", count: 162, percentage: 13, color: "hsl(0, 72%, 51%)" },
    { topic: "Marketing", count: 125, percentage: 10, color: "hsl(142, 71%, 45%)" },
    { topic: "Finance", count: 100, percentage: 8, color: "hsl(190, 70%, 50%)" },
    { topic: "Team & HR", count: 62, percentage: 5, color: "hsl(320, 60%, 50%)" },
    { topic: "General", count: 38, percentage: 3, color: "hsl(220, 10%, 55%)" },
  ],
  conversations: [
    { id: 1, timestamp: "2026-02-10T14:32:00", userName: "Sarah M.", question: "What are the best practices for client retention in professional services?", responsePreview: "Client retention in professional services requires a proactive approach...", fullResponse: "**Client retention best practices:**\n\n1. **Quarterly business reviews** — Schedule regular check-ins\n2. **NPS surveys** — Measure satisfaction consistently\n3. **Proactive outreach** — Don't wait for renewals\n4. **Value demonstration** — Show ROI regularly\n\n**Sources:** Client Retention Guide, Industry Benchmarks", topic: "Client Management", hadSources: true, sources: ["Client Retention Guide", "Industry Benchmarks"], answered: true, responseTimeMs: 1900, confidence: 0.89 },
    { id: 2, timestamp: "2026-02-10T13:15:00", userName: "Mike T.", question: "Can you pull up our standard service agreement template?", responsePreview: "Here's the current service agreement template...", fullResponse: "**Standard service agreement template:**\n\n| Section | Details |\n|---|---|\n| Scope | Defined deliverables |\n| Term | 12-month standard |\n| Fees | Monthly retainer |\n| Termination | 30-day notice |\n\n**Sources:** Agreement Templates, Legal Guidelines", topic: "Client Management", hadSources: true, sources: ["Agreement Templates", "Legal Guidelines"], answered: true, responseTimeMs: 2100, confidence: 0.90 },
    { id: 3, timestamp: "2026-02-10T11:45:00", userName: "David L.", question: "What marketing strategies work best for professional services firms?", responsePreview: "The highest-ROI marketing strategies for professional services include...", fullResponse: "**Top marketing strategies:**\n\n1. **Referral programs** — Highest conversion rate\n2. **LinkedIn thought leadership** — Best B2B platform\n3. **Email newsletters** — 47% of decision-makers prefer email\n4. **Webinars** — Great for lead nurturing\n\n**Sources:** Marketing Playbook, Industry Benchmarks", topic: "Marketing", hadSources: true, sources: ["Marketing Playbook", "Industry Benchmarks"], answered: true, responseTimeMs: 2000, confidence: 0.86 },
    { id: 4, timestamp: "2026-02-09T16:20:00", userName: "Lisa K.", question: "How should we handle client billing disputes?", responsePreview: "For billing disputes, follow our escalation process...", fullResponse: "**Billing dispute resolution:**\n\n1. **Review engagement letter** — Check scope\n2. **Document trail** — Gather communications\n3. **Partner call** — Direct conversation\n4. **Written resolution** — Formal response\n\n**Sources:** Dispute Resolution Policy", topic: "Finance", hadSources: true, sources: ["Dispute Resolution Policy"], answered: true, responseTimeMs: 1800, confidence: 0.91 },
    { id: 5, timestamp: "2026-02-09T14:00:00", userName: "James R.", question: "What's the best CRM for a mid-size services firm?", responsePreview: "For mid-size professional services firms, we recommend...", fullResponse: "**CRM recommendations:**\n\n- **HubSpot** — Best overall for services firms\n- **Pipedrive** — Best for deal pipeline focus\n- **Salesforce** — Best for enterprise needs\n\n**Sources:** Technology Stack Guide", topic: "Operations", hadSources: true, sources: ["Technology Stack Guide"], answered: true, responseTimeMs: 2200, confidence: 0.87 },
    { id: 6, timestamp: "2026-02-09T10:30:00", userName: "Sarah M.", question: "What are the key metrics we should track for service delivery?", responsePreview: "The essential service delivery metrics include...", fullResponse: "**Key service delivery metrics:**\n\n- **Utilization rate** — Target: 70-80%\n- **Client satisfaction (NPS)** — Target: 50+\n- **On-time delivery** — Target: 95%+\n- **Revenue per employee** — Industry benchmark varies\n\n**Sources:** KPI Dashboard Guide, Industry Benchmarks", topic: "Service Delivery", hadSources: true, sources: ["KPI Dashboard Guide", "Industry Benchmarks"], answered: true, responseTimeMs: 1700, confidence: 0.88 },
  ],
  mostAsked: [
    { rank: 1, question: "What are the best practices for client retention?", timesAsked: 20 },
    { rank: 2, question: "How should we structure our service agreements?", timesAsked: 17 },
    { rank: 3, question: "What marketing channels work best for B2B services?", timesAsked: 15 },
    { rank: 4, question: "How do we handle billing disputes?", timesAsked: 12 },
    { rank: 5, question: "What KPIs should we track for service delivery?", timesAsked: 9 },
  ],
  contentCandidates: [
    { id: 1, title: "Client Retention Strategies That Actually Work", contentType: "blog_post", priority: "high", relevanceScore: 0.93, searchInterest: 84, affectsServices: ["Client Success", "Account Management"], keyTopics: ["Retention", "NPS", "Client Experience"], reasoning: "Retention is the #1 asked topic. Team had 20 related questions.", reviewQuestion: "Include case study or keep it general?", teamQuestionsCount: 20, teamQuestions: ["How do we reduce churn?", "What's the best retention cadence?"], mostCommonAngle: "Step-by-step retention playbook", sourceUrl: "", contentPreview: "", createdAt: "2026-02-09" },
    { id: 2, title: "The Professional Services Marketing Playbook for 2026", contentType: "newsletter", priority: "high", relevanceScore: 0.89, searchInterest: 78, affectsServices: ["Marketing", "Business Development"], keyTopics: ["Marketing", "LinkedIn", "Content Strategy"], reasoning: "Marketing questions consistently high. Annual playbook drives leads.", reviewQuestion: "Include budget allocation recommendations?", teamQuestionsCount: 15, teamQuestions: ["What channels should we focus on?", "How much should we spend on marketing?"], mostCommonAngle: "Channel-by-channel guide with benchmarks", sourceUrl: "", contentPreview: "", createdAt: "2026-02-08" },
    { id: 3, title: "How to Structure Service Agreements That Prevent Disputes", contentType: "blog_post", priority: "medium", relevanceScore: 0.78, searchInterest: 56, affectsServices: ["Legal", "Client Management"], keyTopics: ["Agreements", "Scope", "Billing"], reasoning: "Billing disputes are common — prevention content reduces client friction.", reviewQuestion: "Include downloadable template?", teamQuestionsCount: 12, teamQuestions: ["What should our service agreement include?", "How do we handle scope changes?"], mostCommonAngle: "Template with annotated clauses", sourceUrl: "", contentPreview: "", createdAt: "2026-02-07" },
    { id: 4, title: "Key Metrics Every Services Firm Should Track", contentType: "blog_post", priority: "medium", relevanceScore: 0.72, searchInterest: 48, affectsServices: ["Operations", "Leadership"], keyTopics: ["KPIs", "Metrics", "Performance"], reasoning: "Operations questions are growing — metrics content establishes expertise.", reviewQuestion: "Include benchmarking data by firm size?", teamQuestionsCount: 9, teamQuestions: ["What utilization rate should we target?", "How do we measure profitability?"], mostCommonAngle: "Dashboard template with industry benchmarks", sourceUrl: "", contentPreview: "", createdAt: "2026-02-06" },
  ],
  suggestions: [
    { id: 1, user: "Sarah M.", when: "2026-02-10T09:30:00", wrongAnswer: "Service agreements should always be 12-month minimum", correctAnswer: "Service agreements can be month-to-month with 30-day notice — flexibility increases client satisfaction", status: "pending" },
    { id: 2, user: "Mike T.", when: "2026-02-09T14:15:00", wrongAnswer: "Target utilization rate is 90% for all roles", correctAnswer: "Target utilization varies by role: delivery staff 75-85%, managers 50-65%, partners 30-40%", status: "pending" },
    { id: 3, user: "David L.", when: "2026-02-08T11:00:00", wrongAnswer: "LinkedIn ads convert at 1-2% for B2B", correctAnswer: "LinkedIn ads convert at 2.5-4% for B2B professional services when targeting decision-makers", status: "pending" },
  ],
  failedQueries: [
    { id: 1, timestamp: "2026-02-10T10:15:00", userName: "Lisa K.", question: "What's the latest industry benchmarking data for our sector?", reason: "No sector-specific benchmarking data in knowledge base" },
    { id: 2, timestamp: "2026-02-09T16:45:00", userName: "James R.", question: "Can you pull our utilization rates for January?", reason: "External API timeout — practice management system unavailable" },
  ],
  approvedCorrections: [
    { id: 1, dateApproved: "2026-02-07", approvedBy: "Managing Partner", whatWasWrong: "Stated 12-month minimum for all service agreements", correctionApplied: "Updated to reflect flexible agreement terms — month-to-month with 30-day notice is standard" },
    { id: 2, dateApproved: "2026-02-05", approvedBy: "Operations Lead", whatWasWrong: "Target utilization rate listed as 90% for all roles", correctionApplied: "Updated with role-specific targets: delivery 75-85%, managers 50-65%, partners 30-40%" },
    { id: 3, dateApproved: "2026-02-01", approvedBy: "Marketing Lead", whatWasWrong: "Incorrect LinkedIn ad conversion rate for B2B", correctionApplied: "Updated to 2.5-4% based on 2026 industry benchmarks" },
  ],
  publishedContent: [
    { id: 1, title: "Client Retention Strategies That Actually Work", contentType: "blog_post", publishedAt: "2026-01-28", author: "Managing Partner", status: "published", url: "/blog/client-retention", views: 1180, clicks: 172, shares: 31, avgTimeOnPage: "4m 20s", bounceRate: 31, seoScore: 86, topKeyword: "client retention professional services", generatedFrom: "AI-identified from team questions", body: "# Client Retention Strategies That Actually Work\n\nRetaining clients is 5x cheaper than acquiring new ones." },
    { id: 2, title: "January 2026 Professional Services Roundup", contentType: "newsletter", publishedAt: "2026-01-31", author: "Marketing Team", status: "published", url: "/newsletter/jan-2026-roundup", views: 860, clicks: 145, shares: 20, openRate: 46.8, clickRate: 12.5, subscribers: 1200, seoScore: 71, topKeyword: "professional services trends 2026", generatedFrom: "Monthly industry digest", body: "# January 2026 Professional Services Roundup\n\n## Highlights\n- Client retention strategies evolving\n- AI adoption accelerating\n- Utilization optimization trending" },
    { id: 3, title: "The Professional Services Marketing Playbook", contentType: "blog_post", publishedAt: "2026-02-03", author: "Marketing Lead", status: "published", url: "/blog/marketing-playbook", views: 1950, clicks: 289, shares: 58, avgTimeOnPage: "5m 42s", bounceRate: 24, seoScore: 93, topKeyword: "professional services marketing", generatedFrom: "Marketing candidate", body: "# The Professional Services Marketing Playbook\n\nA channel-by-channel guide to growing your services firm." },
    { id: 4, title: "February 2026 Industry Update", contentType: "newsletter", publishedAt: "2026-02-07", author: "Marketing Team", status: "published", url: "/newsletter/feb-2026-update", views: 425, clicks: 73, shares: 10, openRate: 50.4, clickRate: 13.7, subscribers: 1218, seoScore: 67, topKeyword: "professional services February 2026", generatedFrom: "Monthly industry digest", body: "# February 2026 Industry Update\n\n## Highlights\n- Service agreement best practices updated\n- Utilization benchmarks published\n- New marketing channels performing well" },
    { id: 5, title: "Service Agreement Best Practices Guide", contentType: "blog_post", publishedAt: "2026-02-05", author: "Lisa K.", status: "draft", url: "", views: 0, clicks: 0, shares: 0, avgTimeOnPage: "0s", bounceRate: 0, seoScore: 80, topKeyword: "service agreement template professional services", generatedFrom: "Client management candidate", body: "# Service Agreement Best Practices\n\n*DRAFT — Ready for review*\n\nHow to structure agreements that protect both parties and prevent disputes." },
  ],
  insights: [
    { id: 1, title: "Client management questions up 35% this week", description: "Quarterly review season is driving more engagement letter and scope questions.", type: "warning", iconName: "AlertTriangle" },
    { id: 2, title: "Marketing questions peak on Mondays", description: "58% of marketing queries come in on Mondays. Consider pre-loading weekly marketing tips.", type: "trend", iconName: "Calendar" },
    { id: 3, title: "3 service agreements pending for 5+ days", description: "Agreement reviews from Sarah M., Mike T., and David L. are waiting for partner sign-off.", type: "warning", iconName: "Clock" },
    { id: 4, title: "Response time improved 8.5%", description: "Average response time dropped to 2.3s from 2.5s last month. P95 is now 4.1s.", type: "success", iconName: "TrendingDown" },
    { id: 5, title: "Client Management is your #1 topic", description: "19% of all queries are client-related. Your retention guide has 1,180 views.", type: "info", iconName: "TrendingUp" },
  ],
};

// ─── ACCOUNTING (existing data, re-exported as profile) ──

// We import from mockData for the accounting profile since that's the original data
// This will be assembled at runtime in the hook

export const industryProfiles: Record<IndustryKey, IndustryProfile> = {
  accounting: null as unknown as IndustryProfile, // filled from original mockData at runtime
  legal: legalProfile,
  technology: technologyProfile,
  realestate: realEstateProfile,
  recruiting: recruitingProfile,
  generic: genericProfile,
};
