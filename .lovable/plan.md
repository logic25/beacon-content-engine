

# Content Intelligence Engine: Full Build-Out

Right now, the Content Engine has the shell but not the brain. The pipeline cards are hardcoded, the AI Ideas in the Knowledge Base are disconnected from the Pipeline, and there's no way to go from "a team conversation" to "a published blog post" in one flow. Here's what changes.

---

## What's Being Built

### 1. "Conversation to Content" Flow
The single most powerful feature nobody else has. From any conversation in the chat history, you can click "Turn into Content" and Beacon will:
- Pull the conversation Q&A + cited sources
- Cross-reference with related KB documents
- Identify the content type (blog post, newsletter section, training material)
- Generate a draft with proper citations

This adds a "Turn into Content" button on each chat message that pushes the conversation data into the Content Pipeline as a new candidate.

### 2. AI Ideas -> Pipeline Bridge
The AI Ideas tab in Knowledge Base currently shows ideas but they're dead ends. Adding a "Send to Pipeline" button on each idea that creates a real content candidate in the Pipeline tab, pre-filled with the cross-referenced sources, suggested outline, and reasoning.

### 3. "Compose from Scratch" for Blog Posts
Newsletters have a "Compose New" button. Blog posts don't. Adding a full blog post composer with:
- Title, category, and target audience fields
- Markdown editor with live preview (same pattern as newsletters)
- Option to pull in KB documents as reference material
- Save as Draft flow

### 4. Content Performance Dashboard
The Published tab shows flat metrics. Upgrading it with:
- A performance summary chart showing views/clicks/shares over the last 30 days (using Recharts, which is already installed)
- "Top Performing" and "Needs Attention" sections
- Content source attribution: "Generated from conversation #4" or "Based on AI Idea #2"

### 5. Weekly Digest Auto-Generator
A new "Generate Digest" button in the Newsletters tab that automatically compiles:
- Top team questions from the past week
- New KB documents added
- Corrections approved
- Content published
- Upcoming calendar events

This produces a ready-to-edit newsletter draft from platform activity.

### 6. Content Templates
Pre-built templates for common content types:
- Regulatory Update (for DOB/DHCR changes)
- How-To Guide (step-by-step procedures)
- Case Study Spotlight (from KB case studies)
- Weekly Digest (automated)
- Client Advisory (urgent updates)

Selectable when composing new content, they pre-fill the Markdown structure.

### 7. Pipeline Enrichment
The current 4 pipeline candidates are static. Enriching them with:
- Visual source trail: shows which conversations + KB docs + trends fed into each idea
- "Why this matters" section with data points (not just a text blurb)
- Status tracking: Idea -> Draft -> Review -> Published (instead of just generate/publish)
- Dismiss/snooze options for ideas you don't want right now

---

## Updated Content Page Tabs

| Tab | What Changes |
|-----|-------------|
| Pipeline | + Source trail visualization, status tracking, dismiss/snooze, "Compose from Scratch" button |
| Published | + Performance chart, source attribution, top/needs-attention sections |
| Newsletters | + "Generate Digest" auto-compiler, templates |
| Calendar | + Drag-to-reschedule (future), content type legend improved |
| Templates (NEW) | Pre-built content structures for common use cases |

---

## Technical Details

### New Files
- `src/components/ContentComposer.tsx` -- Full blog post/newsletter composer with markdown editor, live preview, KB reference picker, and template selector
- `src/components/ContentPerformance.tsx` -- Recharts-based performance dashboard for the Published tab
- `src/components/DigestGenerator.tsx` -- Auto-digest compiler that pulls from mockData activity
- `src/components/ContentSourceTrail.tsx` -- Visual component showing conversation -> KB -> trend connections for each pipeline item
- `src/data/contentTemplates.ts` -- Template definitions (title, structure, placeholders)

### Modified Files
- `src/components/ContentPipeline.tsx` -- Add source trail, status tracking, dismiss/snooze, compose button, receive items from AI Ideas and conversations
- `src/components/PublishedContent.tsx` -- Add performance chart section, source attribution badges
- `src/components/NewsletterEditions.tsx` -- Add "Generate Digest" button and template picker
- `src/components/ChatInterface.tsx` -- Add "Turn into Content" button on assistant messages
- `src/pages/Content.tsx` -- Add Templates tab, wire new components
- `src/pages/KnowledgeBase.tsx` -- Add "Send to Pipeline" button on AI Ideas
- `src/data/mockData.ts` -- Add content status tracking, source attribution fields, richer pipeline candidates (8-10 instead of 4)

### Shared State
A new `src/data/contentStore.ts` (same pub/sub pattern as `suggestionsStore.ts`) to sync content candidates across:
- ChatInterface "Turn into Content" -> Pipeline
- KB AI Ideas "Send to Pipeline" -> Pipeline
- DigestGenerator -> Newsletter drafts

### Key Patterns
- All new components follow existing framer-motion animation patterns
- Recharts for the performance chart (already a dependency)
- ReactMarkdown for all preview rendering (already used everywhere)
- Content templates are pure data -- no new dependencies needed

