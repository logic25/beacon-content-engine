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
      { type: "correction_approved", title: "RGB order rent increase correction", description: "Updated from 3.5% to 2.75% for 1-year, 5.25% for 2-year per 2026 RGB order.", submittedBy: "Sarah M.", date: "2026-02-05" },
      { type: "correction_approved", title: "ECB fine amount update", description: "Work without permit penalty updated to $10,000 per 2026 schedule.", submittedBy: "Mike T.", date: "2026-02-05" },
      { type: "content_published", title: "Understanding Rent Stabilization Changes for 2026", description: "New blog post published covering the 2026 RGB order and its implications.", date: "2026-02-03" },
    ],
  },
  {
    id: 2,
    weekOf: "2026-02-10",
    sentAt: null,
    status: "draft",
    recipientCount: 23,
    items: [
      { type: "correction_approved", title: "J-51 tax exemption eligibility update", description: "Added 2026 income limits and building requirements for J-51.", submittedBy: "David L.", date: "2026-02-01" },
      { type: "correction_rejected", title: "DOB inspection requirement clarification", description: "Suggestion about TCO inspection requirements was rejected — original answer was correct.", submittedBy: "Lisa K.", date: "2026-02-09" },
      { type: "content_published", title: "ECB Violation Penalty Guide: 2026 Edition", description: "Draft blog post ready for review.", date: "2026-02-05" },
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
      { heading: "🔥 Trending This Week", content: "DHCR rent stabilization questions dominated with 23 queries. The 2026 RGB order continues to generate interest." },
      { heading: "📝 Knowledge Base Updates", content: "2 corrections applied: RGB rent increase rates updated, ECB fine amounts corrected." },
      { heading: "📰 New Content", content: "Published: 'Understanding Rent Stabilization Changes for 2026' — already 2,156 views!" },
      { heading: "❓ Most Asked", content: "1. What are the DHCR rent stabilization requirements? (23 asks)\n2. How do I file for a TCO? (18 asks)\n3. What zoning allows medical offices? (15 asks)" },
    ],
    body: "# Beacon Weekly — Feb 3-7, 2026\n\n## 🔥 Trending This Week\nDHCR rent stabilization questions dominated with 23 queries. The 2026 RGB order continues to generate interest.\n\n## 📝 Knowledge Base Updates\n2 corrections applied:\n- RGB rent increase rates updated (2.75% / 5.25%)\n- ECB fine amounts corrected ($10,000 for work w/o permit)\n\n## 📰 New Content\nPublished: **Understanding Rent Stabilization Changes for 2026** — already 2,156 views!\n\n## ❓ Most Asked Questions\n1. What are the DHCR rent stabilization requirements? (23 asks)\n2. How do I file for a TCO? (18 asks)\n3. What zoning allows medical offices? (15 asks)",
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
      { heading: "🔥 Trending This Week", content: "DOB permit renewals and violations were the hot topics with 15 combined queries." },
      { heading: "📝 Knowledge Base Updates", content: "1 correction applied: J-51 tax exemption eligibility updated with 2026 requirements." },
      { heading: "📰 New Content", content: "Draft ready: 'ECB Violation Penalty Guide: 2026 Edition'" },
      { heading: "🗺️ Roadmap Update", content: "Auto-generate violation response letters — MVP ready for testing!" },
    ],
    body: "# Beacon Weekly — Feb 10-14, 2026\n\n## 🔥 Trending This Week\nDOB permit renewals and violations were the hot topics with 15 combined queries.\n\n## 📝 Knowledge Base Updates\n1 correction applied:\n- J-51 tax exemption eligibility updated with 2026 requirements\n\n## 📰 New Content\nDraft ready: **ECB Violation Penalty Guide: 2026 Edition**\n\n## 🗺️ Roadmap Update\n- Auto-generate violation response letters — MVP ready for testing!",
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
      { heading: "🔥 Trending This Week", content: "Alt-1 filing process changes sparked the most questions this week." },
      { heading: "📰 New Content", content: "Published: 'How to Navigate the New Alt-1 Filing Process in NYC' and 'January 2026 Regulatory Roundup'" },
    ],
    body: "# Beacon Weekly — Jan 27-31, 2026\n\n## 🔥 Trending This Week\nAlt-1 filing process changes sparked the most questions.\n\n## 📰 New Content\n- Published: **How to Navigate the New Alt-1 Filing Process in NYC** (1,243 views)\n- Published: **January 2026 Regulatory Roundup** (892 views)",
  },
];
