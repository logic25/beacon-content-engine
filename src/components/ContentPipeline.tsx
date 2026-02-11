import { useState, useEffect } from "react";
import { mockContentCandidates, mockGeneratedContent, ContentCandidate } from "@/data/mockData";
import { contentStore, PipelineItem, ContentStatus } from "@/data/contentStore";
import ContentSourceTrail from "@/components/ContentSourceTrail";
import ContentComposer from "@/components/ContentComposer";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, TrendingUp, Users, FileText, Newspaper, ExternalLink, X, Send, Edit3, Eye, Loader2, Plus, Clock, EyeOff, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

const priorityStyles: Record<string, string> = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  low: "bg-muted text-muted-foreground border-border",
};

const statusStyles: Record<string, string> = {
  idea: "bg-chart-4/10 text-chart-4",
  draft: "bg-warning/10 text-warning",
  review: "bg-info/10 text-info",
  published: "bg-success/10 text-success",
  dismissed: "bg-muted text-muted-foreground",
};

const typeIcons: Record<string, React.ReactNode> = {
  blog_post: <FileText className="h-4 w-4" />,
  newsletter: <Newspaper className="h-4 w-4" />,
  training: <GraduationCap className="h-4 w-4" />,
};

type FlowStep = "idle" | "generating" | "preview" | "editing" | "publishing" | "published";

export default function ContentPipeline({ onPublish }: { onPublish?: () => void }) {
  const [activeCandidate, setActiveCandidate] = useState<ContentCandidate | null>(null);
  const [flowStep, setFlowStep] = useState<FlowStep>("idle");
  const [generatedBody, setGeneratedBody] = useState("");
  const [editableBody, setEditableBody] = useState("");
  const [composerOpen, setComposerOpen] = useState(false);
  const [pipelineItems, setPipelineItems] = useState<PipelineItem[]>(contentStore.getAll());
  const { toast } = useToast();

  useEffect(() => {
    const unsub = contentStore.subscribe(() => setPipelineItems(contentStore.getAll()));
    return () => { unsub(); };
  }, []);

  const handleGenerate = (candidate: ContentCandidate) => {
    setActiveCandidate(candidate);
    setFlowStep("generating");
    setTimeout(() => {
      const body = mockGeneratedContent[candidate.id] || `# ${candidate.title}\n\nGenerated content for this ${candidate.contentType === "blog_post" ? "blog post" : "newsletter"} based on team questions and search trends.\n\n## Overview\n\n${candidate.reasoning}\n\n## Key Points\n\n${candidate.keyTopics.map(t => `- ${t}`).join("\n")}\n\n## Common Questions\n\n${candidate.teamQuestions.map(q => `**Q:** ${q}`).join("\n\n")}`;
      setGeneratedBody(body);
      setEditableBody(body);
      setFlowStep("preview");
    }, 2000);
  };

  const handleEdit = () => setFlowStep("editing");
  const handleBackToPreview = () => setFlowStep("preview");

  const handlePublish = () => {
    setFlowStep("publishing");
    setTimeout(() => {
      setFlowStep("published");
      toast({
        title: activeCandidate?.contentType === "newsletter" ? "Newsletter sent!" : "Blog post published!",
        description: `"${activeCandidate?.title}" is now live.`,
      });
    }, 1500);
  };

  const handleClose = () => {
    if (flowStep === "published" && onPublish) onPublish();
    setActiveCandidate(null);
    setFlowStep("idle");
    setGeneratedBody("");
    setEditableBody("");
  };

  const handleDismiss = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    contentStore.updateStatus(id, "dismissed");
    toast({ title: "Dismissed", description: "Item removed from pipeline." });
  };

  const handleSnooze = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const snoozeTo = new Date();
    snoozeTo.setDate(snoozeTo.getDate() + 7);
    contentStore.snooze(id, snoozeTo.toISOString());
    toast({ title: "Snoozed for 7 days", description: "Will reappear next week." });
  };

  const handleStatusChange = (e: React.MouseEvent, id: number, status: ContentStatus) => {
    e.stopPropagation();
    contentStore.updateStatus(id, status);
  };

  const activePipelineItems = pipelineItems.filter((p) => p.status !== "dismissed" && !p.snoozedUntil);

  return (
    <>
      {/* Top actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {activePipelineItems.length > 0 && (
            <Badge variant="secondary" className="text-xs bg-chart-4/10 text-chart-4">
              {activePipelineItems.length} from conversations & AI ideas
            </Badge>
          )}
        </div>
        <Button onClick={() => setComposerOpen(true)} className="gap-1.5" size="sm">
          <Plus className="h-4 w-4" /> Compose from Scratch
        </Button>
      </div>

      {/* Pipeline items from contentStore */}
      {activePipelineItems.length > 0 && (
        <div className="space-y-3 mb-6">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">From Conversations & AI Ideas</h3>
          {activePipelineItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="rounded-xl border border-primary/20 bg-card p-5 shadow-card transition-all hover:shadow-card-hover"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge variant="secondary" className={`text-[10px] ${statusStyles[item.status]}`}>{item.status}</Badge>
                    <Badge variant="outline" className={priorityStyles[item.priority]}>{item.priority}</Badge>
                    <Badge variant="secondary" className="gap-1 text-xs">
                      {typeIcons[item.contentType]}
                      {item.contentType === "blog_post" ? "Blog Post" : item.contentType === "newsletter" ? "Newsletter" : "Training"}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.reasoning}</p>

                  {/* Source trail */}
                  <div className="mt-3">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Source Trail</p>
                    <ContentSourceTrail sources={item.sourceTrail} />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                  {item.status === "idea" && (
                    <Button size="sm" variant="outline" className="gap-1 text-xs h-7" onClick={(e) => handleStatusChange(e, item.id, "draft")}>
                      <Edit3 className="h-3 w-3" /> Draft
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" className="gap-1 text-xs h-7 text-muted-foreground" onClick={(e) => handleSnooze(e, item.id)}>
                    <Clock className="h-3 w-3" /> Snooze
                  </Button>
                  <Button size="sm" variant="ghost" className="gap-1 text-xs h-7 text-muted-foreground" onClick={(e) => handleDismiss(e, item.id)}>
                    <EyeOff className="h-3 w-3" /> Dismiss
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Original static candidates */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">AI-Identified Opportunities</h3>
        <div className="grid gap-4">
          {mockContentCandidates.map((candidate, i) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover cursor-pointer"
              onClick={() => handleGenerate(candidate)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={priorityStyles[candidate.priority]}>{candidate.priority}</Badge>
                    <Badge variant="secondary" className="gap-1 text-xs">
                      {typeIcons[candidate.contentType]}
                      {candidate.contentType === "blog_post" ? "Blog Post" : "Newsletter"}
                    </Badge>
                  </div>
                  <h3 className="text-base font-semibold text-foreground leading-snug">{candidate.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{candidate.reasoning}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      <span className="font-medium text-foreground">{Math.round(candidate.relevanceScore * 100)}%</span> relevance
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3.5 w-3.5 text-info" />
                      <span className="font-medium text-foreground">{candidate.searchInterest}</span> search interest
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-chart-4" />
                      <span className="font-medium text-foreground">{candidate.teamQuestionsCount}</span> team questions
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {candidate.keyTopics.map((topic) => (
                      <span key={topic} className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">{topic}</span>
                    ))}
                  </div>

                  <div className="mt-4 rounded-lg bg-primary/5 border border-primary/10 px-4 py-3">
                    <p className="text-xs font-medium text-primary">💡 Review Question</p>
                    <p className="mt-1 text-sm text-foreground">{candidate.reviewQuestion}</p>
                  </div>

                  {candidate.teamQuestions.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-medium text-muted-foreground mb-1.5">Common team questions:</p>
                      <ul className="space-y-1">
                        {candidate.teamQuestions.map((q, qi) => (
                          <li key={qi} className="text-xs text-muted-foreground pl-3 relative before:absolute before:left-0 before:top-1.5 before:h-1 before:w-1 before:rounded-full before:bg-muted-foreground/40">{q}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <Button size="sm" className="gap-1.5" onClick={() => handleGenerate(candidate)}>
                    <Sparkles className="h-3.5 w-3.5" /> Generate
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1.5" onClick={() => window.open(candidate.sourceUrl, "_blank")}>
                    <ExternalLink className="h-3.5 w-3.5" /> Source
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Generate / Preview / Publish Dialog */}
      <Dialog open={flowStep !== "idle"} onOpenChange={(open) => { if (!open) handleClose(); }}>
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              {flowStep === "generating" && <><Loader2 className="h-5 w-5 animate-spin text-primary" /> Generating content...</>}
              {flowStep === "preview" && <><Eye className="h-5 w-5 text-primary" /> Preview: {activeCandidate?.title}</>}
              {flowStep === "editing" && <><Edit3 className="h-5 w-5 text-primary" /> Edit: {activeCandidate?.title}</>}
              {flowStep === "publishing" && <><Loader2 className="h-5 w-5 animate-spin text-primary" /> Publishing...</>}
              {flowStep === "published" && <><span className="text-success">✅</span> Published!</>}
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {flowStep === "generating" && (
                <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-16 gap-4">
                  <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-primary-foreground animate-pulse" />
                  </div>
                  <p className="text-sm text-muted-foreground">AI is generating your {activeCandidate?.contentType === "blog_post" ? "blog post" : "newsletter"}...</p>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div key={i} className="h-2 w-2 rounded-full bg-primary" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
                    ))}
                  </div>
                </motion.div>
              )}
              {flowStep === "preview" && (
                <motion.div key="preview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div className="mb-4 flex items-center gap-2">
                    <Badge variant="secondary" className="gap-1 text-xs">
                      {activeCandidate && typeIcons[activeCandidate.contentType]}
                      {activeCandidate?.contentType === "blog_post" ? "Blog Post" : "Newsletter"}
                    </Badge>
                    <Badge variant="outline" className={activeCandidate ? priorityStyles[activeCandidate.priority] : ""}>{activeCandidate?.priority}</Badge>
                  </div>
                  <div className="prose prose-sm max-w-none rounded-lg border border-border bg-secondary/30 p-6">
                    <ReactMarkdown>{editableBody}</ReactMarkdown>
                  </div>
                </motion.div>
              )}
              {flowStep === "editing" && (
                <motion.div key="editing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <Textarea value={editableBody} onChange={(e) => setEditableBody(e.target.value)} className="min-h-[400px] font-mono text-sm" placeholder="Edit your content here (Markdown supported)..." />
                </motion.div>
              )}
              {flowStep === "publishing" && (
                <motion.div key="publishing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-16 gap-4">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">{activeCandidate?.contentType === "newsletter" ? "Sending newsletter to subscribers..." : "Publishing blog post..."}</p>
                </motion.div>
              )}
              {flowStep === "published" && (
                <motion.div key="published" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-16 gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-success/10 flex items-center justify-center"><span className="text-3xl">🎉</span></div>
                  <p className="text-lg font-semibold text-foreground">Successfully published!</p>
                  <p className="text-sm text-muted-foreground text-center max-w-md">"{activeCandidate?.title}" is now live. You can track its performance in the Published tab.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4 mt-4">
            <Button variant="ghost" onClick={handleClose} className="gap-1.5">
              <X className="h-4 w-4" /> {flowStep === "published" ? "Close" : "Cancel"}
            </Button>
            <div className="flex items-center gap-2">
              {flowStep === "preview" && (
                <>
                  <Button variant="outline" onClick={handleEdit} className="gap-1.5"><Edit3 className="h-4 w-4" /> Edit</Button>
                  <Button onClick={handlePublish} className="gap-1.5"><Send className="h-4 w-4" /> {activeCandidate?.contentType === "newsletter" ? "Send Newsletter" : "Publish Post"}</Button>
                </>
              )}
              {flowStep === "editing" && (
                <>
                  <Button variant="outline" onClick={handleBackToPreview} className="gap-1.5"><Eye className="h-4 w-4" /> Preview</Button>
                  <Button onClick={handlePublish} className="gap-1.5"><Send className="h-4 w-4" /> {activeCandidate?.contentType === "newsletter" ? "Send Newsletter" : "Publish Post"}</Button>
                </>
              )}
              {flowStep === "published" && (
                <Button onClick={handleClose} className="gap-1.5">View Published Content →</Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Blog Post Composer */}
      <ContentComposer open={composerOpen} onClose={() => setComposerOpen(false)} />
    </>
  );
}
