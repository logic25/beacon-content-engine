export interface ContentTemplate {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
  structure: string;
}

export const contentTemplates: ContentTemplate[] = [
  {
    id: "regulatory-update",
    name: "Regulatory Update",
    icon: "📋",
    description: "Announce DOB/DHCR regulatory changes with impact analysis and action items.",
    category: "Updates",
    structure: `# [Regulatory Body] [Update Title]

**Effective Date:** [Date]
**Impact Level:** [High/Medium/Low]

## What Changed

[Describe the regulatory change in 2-3 sentences]

## Key Details

| Item | Previous | New |
|------|----------|-----|
| [Detail 1] | [Old value] | [New value] |
| [Detail 2] | [Old value] | [New value] |

## Who Is Affected

- [Affected group 1]
- [Affected group 2]

## Action Items

1. [Action 1 with deadline]
2. [Action 2 with deadline]
3. [Action 3 with deadline]

## Common Questions

**Q: [Anticipated question]**
A: [Answer]

## Need Help?

Contact Greenlight Expediting for assistance navigating this change.`,
  },
  {
    id: "how-to-guide",
    name: "How-To Guide",
    icon: "📝",
    description: "Step-by-step procedure for common filing, compliance, or operational tasks.",
    category: "Guides",
    structure: `# How to [Task Name]

*Estimated time: [X minutes/hours] · Difficulty: [Easy/Medium/Complex]*

## Prerequisites

- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

## Step-by-Step Guide

### Step 1: [Step Name]
[Detailed instructions]

### Step 2: [Step Name]
[Detailed instructions]

### Step 3: [Step Name]
[Detailed instructions]

### Step 4: [Step Name]
[Detailed instructions]

## Common Mistakes to Avoid

1. ❌ [Mistake 1] → ✅ [What to do instead]
2. ❌ [Mistake 2] → ✅ [What to do instead]

## Tips & Best Practices

- [Tip 1]
- [Tip 2]

## Related Resources

- [Resource 1]
- [Resource 2]`,
  },
  {
    id: "case-study",
    name: "Case Study Spotlight",
    icon: "🔍",
    description: "Showcase a real project with challenges, solutions, and outcomes.",
    category: "Case Studies",
    structure: `# Case Study: [Project/Building Name]

**Location:** [Address]
**Project Type:** [Type]
**Duration:** [Timeline]

## The Challenge

[Describe the problem or situation the client faced — 2-3 paragraphs]

## Our Approach

### Phase 1: Assessment
[What was done]

### Phase 2: Strategy
[What was planned]

### Phase 3: Execution
[What was implemented]

## Results

| Metric | Before | After |
|--------|--------|-------|
| [Metric 1] | [Value] | [Value] |
| [Metric 2] | [Value] | [Value] |

## Key Takeaways

1. [Lesson learned 1]
2. [Lesson learned 2]
3. [Lesson learned 3]

## Client Testimonial

> "[Quote from client]"
> — [Client Name], [Title]`,
  },
  {
    id: "weekly-digest",
    name: "Weekly Digest",
    icon: "📰",
    description: "Auto-generated weekly summary of team activity, corrections, and content.",
    category: "Newsletters",
    structure: `# Beacon Weekly — [Date Range]

## 🔥 Trending This Week
[Top topics and question trends]

## 📝 Knowledge Base Updates
[New documents, corrections applied]

## 📰 New Content
[Published articles and newsletters]

## ❓ Most Asked Questions
1. [Question 1] ([X] asks)
2. [Question 2] ([X] asks)
3. [Question 3] ([X] asks)

## 🗺️ Roadmap Update
[Progress on requested features]

## 📅 Coming Up
[Upcoming deadlines, events, compliance dates]`,
  },
  {
    id: "client-advisory",
    name: "Client Advisory",
    icon: "⚡",
    description: "Urgent update for clients about regulatory changes or compliance deadlines.",
    category: "Advisories",
    structure: `# ⚡ Client Advisory: [Topic]

**Date:** [Date]
**Priority:** URGENT
**Affects:** [Who is affected]

---

## Summary

[1-2 sentence summary of the urgent update]

## What You Need to Know

[Detailed explanation — keep concise and actionable]

## Immediate Action Required

1. **By [Date]:** [Action 1]
2. **By [Date]:** [Action 2]

## Penalties for Non-Compliance

- [Penalty 1]
- [Penalty 2]

## How Greenlight Can Help

[Brief description of services relevant to this advisory]

---

*Questions? Reply to this email or call [phone number].*`,
  },
];
