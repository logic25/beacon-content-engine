import { ContentCandidate } from "@/data/mockData";

export type ContentStatus = "idea" | "draft" | "review" | "published" | "dismissed";

export interface PipelineItem {
  id: number;
  title: string;
  contentType: "blog_post" | "newsletter" | "training";
  status: ContentStatus;
  priority: "high" | "medium" | "low";
  relevanceScore: number;
  reasoning: string;
  keyTopics: string[];
  sourceTrail: SourceTrailEntry[];
  createdAt: string;
  body?: string;
  dismissedAt?: string;
  snoozedUntil?: string;
}

export interface SourceTrailEntry {
  type: "conversation" | "document" | "correction" | "trend" | "ai_idea";
  id: number | string;
  label: string;
  timestamp?: string;
}

type Listener = () => void;

let pipelineItems: PipelineItem[] = [];
const listeners: Set<Listener> = new Set();

function notify() {
  listeners.forEach((l) => l());
}

export const contentStore = {
  getAll: () => pipelineItems,
  getActive: () => pipelineItems.filter((p) => p.status !== "dismissed"),

  add: (item: PipelineItem) => {
    pipelineItems = [item, ...pipelineItems];
    notify();
  },

  addFromConversation: (conv: {
    id: number;
    question: string;
    sources: string[];
    topic: string;
    userName: string;
  }) => {
    const item: PipelineItem = {
      id: Date.now(),
      title: `Content from: "${conv.question.slice(0, 60)}..."`,
      contentType: "blog_post",
      status: "idea",
      priority: "medium",
      relevanceScore: 0.75,
      reasoning: `Generated from a team conversation by ${conv.userName} about ${conv.topic}.`,
      keyTopics: [conv.topic],
      sourceTrail: [
        { type: "conversation", id: conv.id, label: conv.question.slice(0, 50), timestamp: new Date().toISOString() },
        ...conv.sources.map((s, i) => ({ type: "document" as const, id: `src-${i}`, label: s })),
      ],
      createdAt: new Date().toISOString(),
    };
    pipelineItems = [item, ...pipelineItems];
    notify();
  },

  addFromAIIdea: (idea: {
    id: number;
    title: string;
    type: string;
    reasoning: string;
    sources: { type: string; label: string }[];
    suggestedOutline: string[];
  }) => {
    const item: PipelineItem = {
      id: Date.now(),
      title: idea.title,
      contentType: idea.type === "newsletter" ? "newsletter" : idea.type === "training" ? "training" : "blog_post",
      status: "idea",
      priority: "high",
      relevanceScore: 0.85,
      reasoning: idea.reasoning,
      keyTopics: [],
      sourceTrail: [
        { type: "ai_idea", id: idea.id, label: "AI Cross-Reference Engine" },
        ...idea.sources.map((s) => ({
          type: s.type as SourceTrailEntry["type"],
          id: s.label,
          label: s.label,
        })),
      ],
      body: `# ${idea.title}\n\n${idea.suggestedOutline.map((s, i) => `## ${i + 1}. ${s}`).join("\n\n")}`,
      createdAt: new Date().toISOString(),
    };
    pipelineItems = [item, ...pipelineItems];
    notify();
  },

  updateStatus: (id: number, status: ContentStatus) => {
    pipelineItems = pipelineItems.map((p) =>
      p.id === id ? { ...p, status, ...(status === "dismissed" ? { dismissedAt: new Date().toISOString() } : {}) } : p
    );
    notify();
  },

  snooze: (id: number, until: string) => {
    pipelineItems = pipelineItems.map((p) =>
      p.id === id ? { ...p, snoozedUntil: until } : p
    );
    notify();
  },

  remove: (id: number) => {
    pipelineItems = pipelineItems.filter((p) => p.id !== id);
    notify();
  },

  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
