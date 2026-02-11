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
  fileName?: string;
  fileSize?: string;
  conversationRefs?: number[];
}

export const knowledgeCategories = [
  { name: "Tax & Compliance", icon: "📊", color: "bg-primary/10 text-primary" },
  { name: "Client Management", icon: "🤝", color: "bg-chart-4/10 text-chart-4" },
  { name: "Marketing & Growth", icon: "📈", color: "bg-info/10 text-info" },
  { name: "Case Studies", icon: "📋", color: "bg-success/10 text-success" },
  { name: "Communication Templates", icon: "✉️", color: "bg-warning/10 text-warning" },
  { name: "Operations", icon: "⚙️", color: "bg-destructive/10 text-destructive" },
  { name: "Technology", icon: "💻", color: "bg-chart-2/10 text-chart-2" },
  { name: "Process Workflows", icon: "🔄", color: "bg-chart-3/10 text-chart-3" },
  { name: "Team Corrections", icon: "✏️", color: "bg-chart-5/10 text-chart-5" },
];

export const mockKnowledgeDocuments: KnowledgeDocument[] = [
  // Tax & Compliance
  { id: 1, title: "Section 199A QBI Deduction Guide", category: "Tax & Compliance", type: "guide", lastReferenced: "2026-02-10", referenceCount: 47, addedAt: "2025-11-15", summary: "Complete guide to the Qualified Business Income deduction including phase-out thresholds, W-2 wage limitations, and entity type considerations.", tags: ["QBI", "199A", "deductions"], fileName: "qbi_deduction_guide.pdf", fileSize: "2.4 MB", conversationRefs: [1, 6] },
  { id: 2, title: "2026 Tax Filing Deadlines & Extensions", category: "Tax & Compliance", type: "regulation", lastReferenced: "2026-02-09", referenceCount: 38, addedAt: "2025-11-15", summary: "Master calendar of all federal and state tax filing deadlines for 2026 including extension dates.", tags: ["deadlines", "extensions", "filing"], fileName: "tax_deadlines_2026.pdf", fileSize: "1.1 MB", conversationRefs: [3] },
  { id: 3, title: "SALT Workaround State-by-State Guide", category: "Tax & Compliance", type: "guide", lastReferenced: "2026-02-10", referenceCount: 31, addedAt: "2025-12-01", summary: "Which 36 states allow PTE-level tax elections, election deadlines, and deductibility rules.", tags: ["SALT", "PTE", "state tax"], fileName: "salt_workaround.pdf", fileSize: "1.8 MB", conversationRefs: [1] },
  { id: 4, title: "CPE Tracking & Requirements", category: "Tax & Compliance", type: "procedure", lastReferenced: "2026-02-08", referenceCount: 22, addedAt: "2025-12-10", summary: "State-by-state CPE requirements, approved providers, and tracking procedures.", tags: ["CPE", "education", "compliance"], conversationRefs: [6] },
  { id: 5, title: "Estimated Tax Payment Calculator", category: "Tax & Compliance", type: "guide", lastReferenced: "2026-02-09", referenceCount: 19, addedAt: "2025-12-15", summary: "How to calculate quarterly estimated tax payments for self-employed clients and business owners.", tags: ["estimated tax", "quarterly", "payments"] },
  { id: 25, title: "Entity Selection Comparison Guide", category: "Tax & Compliance", type: "guide", lastReferenced: "2026-02-07", referenceCount: 16, addedAt: "2025-12-20", summary: "LLC vs S-Corp vs C-Corp comparison covering tax implications, liability, and operational complexity.", tags: ["entity", "LLC", "S-Corp", "C-Corp"], fileName: "entity_comparison.pdf", fileSize: "1.5 MB" },
  { id: 26, title: "Retirement Plan Options for Small Business", category: "Tax & Compliance", type: "guide", lastReferenced: "2026-02-10", referenceCount: 24, addedAt: "2025-11-20", summary: "Solo 401(k), SEP IRA, SIMPLE IRA, and defined benefit plan comparison with contribution limits.", tags: ["retirement", "401k", "SEP IRA"] },
  { id: 27, title: "Charitable Giving Strategies", category: "Tax & Compliance", type: "guide", lastReferenced: "2026-01-28", referenceCount: 9, addedAt: "2026-01-15", summary: "Donor-advised funds, bunching strategy, and qualified charitable distributions for tax optimization.", tags: ["charitable", "DAF", "donations"] },

  // Client Management
  { id: 6, title: "Advisory Retainer Agreement Guide", category: "Client Management", type: "guide", lastReferenced: "2026-02-10", referenceCount: 52, addedAt: "2025-10-20", summary: "How to structure advisory retainer agreements including scope definition, fee models, and change order processes.", tags: ["retainer", "engagement", "advisory"], fileName: "retainer_guide.pdf", fileSize: "3.8 MB", conversationRefs: [2, 4] },
  { id: 7, title: "Client Onboarding Checklist", category: "Client Management", type: "procedure", lastReferenced: "2026-02-10", referenceCount: 44, addedAt: "2026-01-15", summary: "Step-by-step onboarding process from discovery call to 30-day check-in.", tags: ["onboarding", "checklist", "new client"], conversationRefs: [2] },
  { id: 8, title: "Billing Dispute Resolution Policy", category: "Client Management", type: "procedure", lastReferenced: "2026-02-07", referenceCount: 28, addedAt: "2025-11-01", summary: "Escalation process for billing disputes including partner discussion, scope memo, and mediation.", tags: ["billing", "disputes", "resolution"], conversationRefs: [4] },
  { id: 9, title: "Client Satisfaction Survey Template", category: "Client Management", type: "template", lastReferenced: "2026-02-05", referenceCount: 15, addedAt: "2025-11-20", summary: "Quarterly client satisfaction survey with NPS, CSAT, and open-ended questions.", tags: ["survey", "satisfaction", "NPS"] },
  { id: 28, title: "Scope Creep Prevention Guide", category: "Client Management", type: "guide", lastReferenced: "2026-02-04", referenceCount: 18, addedAt: "2025-12-05", summary: "How to identify, document, and address scope creep before it becomes a billing issue.", tags: ["scope", "creep", "boundaries"] },
  { id: 29, title: "Client Retention Playbook", category: "Client Management", type: "guide", lastReferenced: "2026-02-08", referenceCount: 21, addedAt: "2025-11-10", summary: "Strategies for improving client retention including proactive outreach, value-add touchpoints, and at-risk client identification.", tags: ["retention", "churn", "loyalty"] },
  { id: 30, title: "Pricing Strategy for Advisory Services", category: "Client Management", type: "guide", lastReferenced: "2026-01-30", referenceCount: 13, addedAt: "2026-01-05", summary: "Value-based pricing vs hourly billing comparison with transition strategies.", tags: ["pricing", "value-based", "fees"] },

  // Marketing & Growth
  { id: 10, title: "B2B Marketing Channel Playbook", category: "Marketing & Growth", type: "guide", lastReferenced: "2026-02-10", referenceCount: 41, addedAt: "2025-10-15", summary: "Channel-by-channel guide for professional services marketing: LinkedIn, email, SEO, webinars, and referrals.", tags: ["marketing", "channels", "B2B"], fileName: "marketing_playbook.pdf", fileSize: "4.3 MB", conversationRefs: [3] },
  { id: 11, title: "LinkedIn Content Strategy Guide", category: "Marketing & Growth", type: "guide", lastReferenced: "2026-02-10", referenceCount: 25, addedAt: "2025-12-01", summary: "How to build thought leadership on LinkedIn with posting cadence, content types, and engagement tactics.", tags: ["LinkedIn", "social media", "content"], conversationRefs: [3] },
  { id: 12, title: "SEO for Professional Services", category: "Marketing & Growth", type: "guide", lastReferenced: "2026-02-08", referenceCount: 18, addedAt: "2026-01-20", summary: "Keyword research, on-page SEO, and content strategy for service-based businesses.", tags: ["SEO", "keywords", "content"] },
  { id: 31, title: "Email Newsletter Best Practices", category: "Marketing & Growth", type: "guide", lastReferenced: "2026-02-06", referenceCount: 14, addedAt: "2025-12-15", summary: "Email newsletter strategy: frequency, segmentation, subject lines, and conversion optimization.", tags: ["email", "newsletter", "marketing"] },
  { id: 32, title: "Referral Program Blueprint", category: "Marketing & Growth", type: "procedure", lastReferenced: "2026-02-03", referenceCount: 11, addedAt: "2025-11-25", summary: "How to build a systematic referral program with incentives, tracking, and follow-up processes.", tags: ["referrals", "growth", "partnerships"] },

  // Case Studies
  { id: 13, title: "Apex Manufacturing — Advisory Transformation", category: "Case Studies", type: "case_study", lastReferenced: "2026-02-06", referenceCount: 14, addedAt: "2025-11-10", summary: "How we helped a $5M manufacturer transition from compliance-only to full advisory services, increasing revenue by 40%.", tags: ["advisory", "manufacturing", "growth"], fileName: "apex_case_study.pdf", fileSize: "1.2 MB" },
  { id: 14, title: "River Valley Medical Group — Tax Restructuring", category: "Case Studies", type: "case_study", lastReferenced: "2026-02-04", referenceCount: 11, addedAt: "2025-11-10", summary: "Medical practice restructuring from C-Corp to S-Corp, saving $120K annually in taxes.", tags: ["medical", "restructuring", "S-Corp"], fileName: "river_valley_case.pdf", fileSize: "2.1 MB" },
  { id: 15, title: "Tech Startup — Series A Readiness", category: "Case Studies", type: "case_study", lastReferenced: "2026-02-09", referenceCount: 20, addedAt: "2025-12-05", summary: "Preparing a SaaS startup for Series A due diligence including financials cleanup, GAAP compliance, and investor reporting.", tags: ["startup", "Series A", "due diligence"] },
  { id: 33, title: "Coastal Property Group — Multi-State Tax Planning", category: "Case Studies", type: "case_study", lastReferenced: "2026-02-01", referenceCount: 8, addedAt: "2025-12-20", summary: "Real estate portfolio optimization across 4 states using entity structuring and cost segregation.", tags: ["real estate", "multi-state", "cost segregation"] },
  { id: 34, title: "Green Earth Restaurant Group — Growth Advisory", category: "Case Studies", type: "case_study", lastReferenced: "2026-01-28", referenceCount: 6, addedAt: "2026-01-10", summary: "Helping a 3-location restaurant group expand to 7 locations with financial modeling and funding strategy.", tags: ["restaurant", "growth", "expansion"] },
  { id: 35, title: "Meridian Law Firm — Practice Management Overhaul", category: "Case Studies", type: "case_study", lastReferenced: "2026-02-05", referenceCount: 10, addedAt: "2025-11-25", summary: "Redesigning billing, timekeeping, and client intake processes for a 15-attorney law firm.", tags: ["law firm", "operations", "process"] },

  // Communication Templates
  { id: 16, title: "New Client Welcome Email", category: "Communication Templates", type: "template", lastReferenced: "2026-02-08", referenceCount: 33, addedAt: "2025-11-01", summary: "Welcome email template with onboarding checklist, document request list, and team introductions.", tags: ["welcome", "email", "onboarding"] },
  { id: 17, title: "Client Status Update Template", category: "Communication Templates", type: "template", lastReferenced: "2026-02-10", referenceCount: 45, addedAt: "2025-10-25", summary: "Standard client update email covering engagement progress, deliverable timeline, and next steps.", tags: ["update", "status", "email"] },
  { id: 18, title: "Proposal Template — Advisory Services", category: "Communication Templates", type: "template", lastReferenced: "2026-02-07", referenceCount: 21, addedAt: "2025-11-15", summary: "Proposal template for advisory engagements including scope, pricing, and testimonials.", tags: ["proposal", "advisory", "sales"] },
  { id: 36, title: "Engagement Completion Letter", category: "Communication Templates", type: "template", lastReferenced: "2026-02-09", referenceCount: 30, addedAt: "2025-10-20", summary: "End-of-engagement letter with deliverable summary, next steps, and referral request.", tags: ["completion", "deliverable", "referral"] },
  { id: 37, title: "Fee Increase Notification Template", category: "Communication Templates", type: "template", lastReferenced: "2026-02-03", referenceCount: 12, addedAt: "2025-12-10", summary: "Professional fee increase notification with justification, timing, and value reinforcement.", tags: ["fee increase", "pricing", "notification"] },

  // Operations
  { id: 19, title: "Utilization Rate Tracking Guide", category: "Operations", type: "guide", lastReferenced: "2026-02-09", referenceCount: 36, addedAt: "2026-01-05", summary: "How to track, measure, and improve team utilization rates with benchmarks by role.", tags: ["utilization", "metrics", "productivity"], fileName: "utilization_guide.pdf", fileSize: "890 KB", conversationRefs: [5] },
  { id: 20, title: "Quality Control Review Checklist", category: "Operations", type: "procedure", lastReferenced: "2026-02-06", referenceCount: 17, addedAt: "2025-12-20", summary: "Pre-delivery quality review checklist for all client deliverables including accuracy, formatting, and completeness.", tags: ["quality", "review", "checklist"] },
  { id: 38, title: "Remote Work & Hybrid Policy", category: "Operations", type: "guide", lastReferenced: "2026-02-07", referenceCount: 15, addedAt: "2025-12-15", summary: "Firm policy for remote and hybrid work including communication expectations, availability hours, and equipment.", tags: ["remote", "hybrid", "policy"] },
  { id: 39, title: "Data Security & Client Confidentiality", category: "Operations", type: "regulation", lastReferenced: "2026-01-25", referenceCount: 8, addedAt: "2026-01-10", summary: "Data handling policies, encryption requirements, and confidentiality obligations for client information.", tags: ["security", "confidentiality", "data"] },

  // Technology
  { id: 21, title: "CRM Setup & Configuration Guide", category: "Technology", type: "guide", lastReferenced: "2026-02-09", referenceCount: 23, addedAt: "2025-11-05", summary: "Step-by-step CRM setup including pipeline stages, custom fields, and automation rules for professional services.", tags: ["CRM", "setup", "automation"], conversationRefs: [5] },
  { id: 22, title: "AI Knowledge Base Implementation", category: "Technology", type: "guide", lastReferenced: "2026-02-03", referenceCount: 12, addedAt: "2026-01-10", summary: "How to set up and train an internal AI knowledge assistant for your firm.", tags: ["AI", "knowledge base", "implementation"] },
  { id: 40, title: "Practice Management Software Comparison", category: "Technology", type: "guide", lastReferenced: "2026-02-08", referenceCount: 19, addedAt: "2025-11-15", summary: "Comparison of leading practice management tools including features, pricing, and integration capabilities.", tags: ["practice management", "software", "comparison"] },
  { id: 41, title: "Cloud Storage & Document Management", category: "Technology", type: "guide", lastReferenced: "2026-02-02", referenceCount: 10, addedAt: "2025-12-20", summary: "Cloud storage setup, folder structures, and access permissions for client document management.", tags: ["cloud", "storage", "documents"] },
  { id: 42, title: "Cybersecurity Best Practices for Small Firms", category: "Technology", type: "guide", lastReferenced: "2026-02-06", referenceCount: 16, addedAt: "2025-11-25", summary: "Essential cybersecurity practices including MFA, endpoint protection, and phishing awareness.", tags: ["cybersecurity", "MFA", "security"] },

  // Process Workflows
  { id: 23, title: "New Client Intake Workflow", category: "Process Workflows", type: "procedure", lastReferenced: "2026-02-10", referenceCount: 29, addedAt: "2025-10-30", summary: "Complete workflow from initial inquiry to engagement kickoff including document collection and conflict check.", tags: ["intake", "workflow", "onboarding"] },
  { id: 24, title: "Deliverable Review & Approval Process", category: "Process Workflows", type: "procedure", lastReferenced: "2026-02-08", referenceCount: 26, addedAt: "2025-11-10", summary: "Multi-level review process for client deliverables including preparer, reviewer, and partner sign-off.", tags: ["review", "approval", "quality"] },
  { id: 43, title: "Weekly Team Sync Checklist", category: "Process Workflows", type: "guide", lastReferenced: "2026-02-10", referenceCount: 22, addedAt: "2025-11-01", summary: "Checklist for weekly team meetings: engagement status, deadline tracking, and capacity planning.", tags: ["sync", "checklist", "weekly"] },
  { id: 44, title: "Client Billing & Invoice Workflow", category: "Process Workflows", type: "procedure", lastReferenced: "2026-02-09", referenceCount: 18, addedAt: "2025-12-01", summary: "End-to-end billing process from time entry to invoice generation and payment follow-up.", tags: ["billing", "invoice", "payment"] },

  // Team Corrections
  { id: 45, title: "Correction: QBI Deduction Thresholds", category: "Team Corrections", type: "correction", lastReferenced: "2026-02-10", referenceCount: 8, addedAt: "2026-02-07", summary: "Previously stated threshold was $150,000 — corrected to 2026 thresholds: $182,100 (single) / $364,200 (MFJ). Approved by Managing Partner.", tags: ["correction", "QBI", "thresholds"] },
  { id: 46, title: "Correction: LinkedIn Ad Conversion Rates", category: "Team Corrections", type: "correction", lastReferenced: "2026-02-09", referenceCount: 5, addedAt: "2026-02-05", summary: "Incorrect rate of 1-2% corrected to 2.5-4% based on 2026 B2B benchmarks. Approved by Marketing Team.", tags: ["correction", "LinkedIn", "marketing"] },
  { id: 47, title: "Correction: SALT Workaround State Count", category: "Team Corrections", type: "correction", lastReferenced: "2026-02-06", referenceCount: 3, addedAt: "2026-02-01", summary: "Updated from 30 states to 36 states with PTE-level tax elections. Approved by Sarah M.", tags: ["correction", "SALT", "states"] },
];

// Cross-reference data
export interface ConversationDocRef {
  conversationId: number;
  documentIds: number[];
  question: string;
  userName: string;
  timestamp: string;
}

export const conversationDocRefs: ConversationDocRef[] = [
  { conversationId: 1, documentIds: [1, 3], question: "What are the new IRS guidelines for pass-through entity deductions in 2026?", userName: "Sarah M.", timestamp: "2026-02-10T14:32:00" },
  { conversationId: 2, documentIds: [6, 7], question: "Can you pull up the engagement letter template for new advisory clients?", userName: "Mike T.", timestamp: "2026-02-10T13:15:00" },
  { conversationId: 3, documentIds: [10, 11], question: "What marketing channels work best for B2B professional services?", userName: "David L.", timestamp: "2026-02-10T11:45:00" },
  { conversationId: 4, documentIds: [8], question: "How should we handle a client dispute over billing for out-of-scope work?", userName: "Lisa K.", timestamp: "2026-02-09T16:20:00" },
  { conversationId: 5, documentIds: [21], question: "What's the best CRM setup for a 20-person consulting firm?", userName: "James R.", timestamp: "2026-02-09T14:00:00" },
  { conversationId: 6, documentIds: [1, 4], question: "Are there updated continuing education requirements for CPAs this year?", userName: "Sarah M.", timestamp: "2026-02-09T10:30:00" },
];

// AI-generated content ideas
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
    title: "Advisory Retainer Agreements: A Complete Guide for Service Firms",
    type: "blog_post",
    confidence: 0.94,
    sources: [
      { type: "conversation", label: "Mike T. asked about engagement letter templates", id: 2 },
      { type: "document", label: "Advisory Retainer Agreement Guide", id: 6 },
      { type: "trend", label: "18 team questions about retainers in 30 days" },
      { type: "correction", label: "Retainer commitments can be month-to-month" },
    ],
    reasoning: "Retainer structures are the 2nd most-asked question (18x), and a recent correction shows the team was confused about commitment terms. High-value blog post targeting 'advisory retainer agreement template'.",
    suggestedOutline: ["What is an advisory retainer?", "Key components every agreement needs", "Three pricing models compared", "Handling scope changes", "Template download"],
    estimatedImpact: "high",
    createdAt: "2026-02-11",
  },
  {
    id: 2,
    title: "2026 Tax Planning Strategies Every Small Business Owner Must Know",
    type: "newsletter",
    confidence: 0.92,
    sources: [
      { type: "conversation", label: "Sarah M. asked about pass-through deductions", id: 1 },
      { type: "document", label: "Section 199A QBI Deduction Guide", id: 1 },
      { type: "document", label: "SALT Workaround State-by-State Guide", id: 3 },
      { type: "correction", label: "QBI threshold corrected to $182,100/$364,200" },
    ],
    reasoning: "Most-asked topic (23 questions), recent correction means even the team was confused. Timely for tax planning season. Could drive newsletter signups.",
    suggestedOutline: ["2026 QBI deduction changes", "SALT workaround expansion to 36 states", "Retirement plan maximization strategies", "Key deadlines and action items"],
    estimatedImpact: "high",
    createdAt: "2026-02-11",
  },
  {
    id: 3,
    title: "B2B Marketing for Professional Services: What Actually Works in 2026",
    type: "blog_post",
    confidence: 0.87,
    sources: [
      { type: "conversation", label: "David L. asked about B2B marketing channels", id: 3 },
      { type: "document", label: "B2B Marketing Channel Playbook", id: 10 },
      { type: "document", label: "LinkedIn Content Strategy Guide", id: 11 },
      { type: "correction", label: "LinkedIn converts at 2.5-4%, not 1-2%" },
    ],
    reasoning: "15 team questions about marketing strategies. Recent correction about LinkedIn conversion rates shows common misconception worth addressing publicly.",
    suggestedOutline: ["Top channels ranked by ROI", "LinkedIn deep-dive with real benchmarks", "Content repurposing strategy", "Measuring what matters: pipeline vs MQLs"],
    estimatedImpact: "medium",
    createdAt: "2026-02-11",
  },
  {
    id: 4,
    title: "How Our Firm Uses AI to Answer 94% of Internal Questions",
    type: "blog_post",
    confidence: 0.81,
    sources: [
      { type: "document", label: "AI Knowledge Base Implementation", id: 22 },
      { type: "document", label: "CRM Setup & Configuration Guide", id: 21 },
      { type: "document", label: "Apex Manufacturing Case Study", id: 13 },
      { type: "trend", label: "AI-related queries up 30% in Feb" },
    ],
    reasoning: "Combines internal process with public thought leadership. Shows expertise and attracts firms interested in AI adoption.",
    suggestedOutline: ["The problem: 15 minutes per question", "What we built", "Real metrics and ROI", "How to implement in your firm"],
    estimatedImpact: "medium",
    createdAt: "2026-02-11",
  },
  {
    id: 5,
    title: "New Team Member Onboarding: Firm Processes & Tools",
    type: "training_material",
    confidence: 0.78,
    sources: [
      { type: "document", label: "New Client Intake Workflow", id: 23 },
      { type: "document", label: "CRM Setup & Configuration Guide", id: 21 },
      { type: "document", label: "Quality Control Review Checklist", id: 20 },
      { type: "trend", label: "New hire starting Q2" },
    ],
    reasoning: "Combines the most-referenced process documents into a structured training module for onboarding new team members efficiently.",
    suggestedOutline: ["Firm tools overview", "Client intake process", "CRM and time tracking", "Quality review standards", "Practice exercises"],
    estimatedImpact: "high",
    createdAt: "2026-02-11",
  },
];
