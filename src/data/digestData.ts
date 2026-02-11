// Weekly digest and newsletter edition mock data

export interface WeeklyDigest {
  id: number;
  weekOf: string;
  sentAt: string | null;
  status: "draft" | "scheduled" | "sent";
  recipientCount: number;
  items: DigestItem[];
}

export interface DigestItem {
  type: "correction_approved" | "correction_rejected" | "content_published";
  title: string;
  description: string;
  submittedBy?: string;
  date: string;
}

export interface NewsletterEdition {
  id: number;
  title: string;
  status: "draft" | "scheduled" | "sent";
  createdAt: string;
  scheduledFor: string | null;
  sentAt: string | null;
  recipientCount: number;
  openRate: number | null;
  clickRate: number | null;
  sections: NewsletterSection[];
  body: string;
}

export interface NewsletterSection {
  heading: string;
  content: string;
}

export const mockDigests: WeeklyDigest[] = [
  {
    id: 1,
    weekOf: "2026-02-03",
    sentAt: "2026-02-07T09:00:00",
    status: "sent",
    recipientCount: 23,
    items: [
      { type: "correction_approved", title: "QBI deduction threshold correction", description: "Updated from $150,000 to $182,100 (single) / $364,200 (MFJ) for 2026.", submittedBy: "Sarah M.", date: "2026-02-05" },
      { type: "correction_approved", title: "LinkedIn ad conversion rate update", description: "B2B professional services conversion rate updated to 2.5-4%.", submittedBy: "Mike T.", date: "2026-02-05" },
      { type: "content_published", title: "2026 Tax Planning Strategies for Small Business Owners", description: "New blog post published covering QBI deductions, SALT workarounds, and retirement planning.", date: "2026-02-03" },
    ],
  },
  {
    id: 2,
    weekOf: "2026-02-10",
    sentAt: null,
    status: "draft",
    recipientCount: 23,
    items: [
      { type: "correction_approved", title: "SALT workaround state count update", description: "Updated from 30 to 36 states with PTE-level tax elections.", submittedBy: "David L.", date: "2026-02-01" },
      { type: "correction_rejected", title: "Retainer commitment length clarification", description: "Suggestion about 12-month minimums was rejected — month-to-month is standard.", submittedBy: "Lisa K.", date: "2026-02-09" },
      { type: "content_published", title: "Client Billing Dispute Resolution Guide", description: "Draft blog post ready for review.", date: "2026-02-05" },
    ],
  },
];

export const mockNewsletterEditions: NewsletterEdition[] = [
  {
    id: 1,
    title: "Beacon Weekly — Feb 3-7, 2026",
    status: "sent",
    createdAt: "2026-02-06",
    scheduledFor: "2026-02-07T09:00:00",
    sentAt: "2026-02-07T09:00:00",
    recipientCount: 1258,
    openRate: 51.2,
    clickRate: 14.1,
    sections: [
      { heading: "🔥 Trending This Week", content: "Tax planning questions dominated with 23 queries. The 2026 QBI deduction changes continue to generate interest." },
      { heading: "📝 Knowledge Base Updates", content: "2 corrections applied: QBI thresholds updated, LinkedIn conversion rates corrected." },
      { heading: "📰 New Content", content: "Published: '2026 Tax Planning Strategies for Small Business Owners' — already 2,156 views!" },
      { heading: "❓ Most Asked", content: "1. What are the 2026 pass-through entity deduction rules? (23 asks)\n2. How should we structure advisory retainers? (18 asks)\n3. What marketing channels work for B2B? (15 asks)" },
    ],
    body: "# Beacon Weekly — Feb 3-7, 2026\n\n## 🔥 Trending This Week\nTax planning questions dominated with 23 queries. The 2026 QBI deduction changes continue to generate interest.\n\n## 📝 Knowledge Base Updates\n2 corrections applied:\n- QBI deduction thresholds updated ($182,100 / $364,200)\n- LinkedIn ad conversion rates corrected (2.5-4%)\n\n## 📰 New Content\nPublished: **2026 Tax Planning Strategies for Small Business Owners** — already 2,156 views!\n\n## ❓ Most Asked Questions\n1. What are the 2026 pass-through entity deduction rules? (23 asks)\n2. How should we structure advisory retainers? (18 asks)\n3. What marketing channels work for B2B services? (15 asks)",
  },
  {
    id: 2,
    title: "Beacon Weekly — Feb 10-14, 2026",
    status: "draft",
    createdAt: "2026-02-10",
    scheduledFor: null,
    sentAt: null,
    recipientCount: 1265,
    openRate: null,
    clickRate: null,
    sections: [
      { heading: "🔥 Trending This Week", content: "Client management and billing disputes were the hot topics with 15 combined queries." },
      { heading: "📝 Knowledge Base Updates", content: "1 correction applied: SALT workaround state count updated to 36." },
      { heading: "📰 New Content", content: "Draft ready: 'Client Billing Dispute Resolution Guide'" },
      { heading: "🗺️ Roadmap Update", content: "Auto-generate client proposal drafts — MVP ready for testing!" },
    ],
    body: "# Beacon Weekly — Feb 10-14, 2026\n\n## 🔥 Trending This Week\nClient management and billing disputes were the hot topics with 15 combined queries.\n\n## 📝 Knowledge Base Updates\n1 correction applied:\n- SALT workaround state count updated to 36\n\n## 📰 New Content\nDraft ready: **Client Billing Dispute Resolution Guide**\n\n## 🗺️ Roadmap Update\n- Auto-generate client proposal drafts — MVP ready for testing!",
  },
  {
    id: 3,
    title: "Beacon Weekly — Jan 27-31, 2026",
    status: "sent",
    createdAt: "2026-01-30",
    scheduledFor: "2026-01-31T09:00:00",
    sentAt: "2026-01-31T09:00:00",
    recipientCount: 1240,
    openRate: 47.3,
    clickRate: 12.8,
    sections: [
      { heading: "🔥 Trending This Week", content: "Advisory retainer structure questions sparked the most questions this week." },
      { heading: "📰 New Content", content: "Published: 'How to Structure Advisory Retainer Agreements That Work' and 'January 2026 Industry Roundup'" },
    ],
    body: "# Beacon Weekly — Jan 27-31, 2026\n\n## 🔥 Trending This Week\nAdvisory retainer structure questions sparked the most questions.\n\n## 📰 New Content\n- Published: **How to Structure Advisory Retainer Agreements That Work** (1,243 views)\n- Published: **January 2026 Industry Roundup** (892 views)",
  },
];
