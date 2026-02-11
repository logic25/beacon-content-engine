import { useState } from "react";
import { mockNewsletterEditions, NewsletterEdition } from "@/data/digestData";
import DigestGenerator from "@/components/DigestGenerator";
import { motion } from "framer-motion";
import { Mail, Calendar, Eye, Send, Clock, MousePointerClick, Users, Edit3, X, Loader2, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

const statusStyles: Record<string, string> = {
  draft: "bg-warning/10 text-warning",
  scheduled: "bg-info/10 text-info",
  sent: "bg-success/10 text-success",
};

type ViewMode = "preview" | "editing" | "scheduling" | "sending" | "sent";

export default function NewsletterEditions() {
  const [editions, setEditions] = useState<NewsletterEdition[]>([...mockNewsletterEditions]);
  const [selected, setSelected] = useState<NewsletterEdition | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("preview");
  const [editableBody, setEditableBody] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeTitle, setComposeTitle] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const { toast } = useToast();

  const openEdition = (ed: NewsletterEdition) => {
    setSelected(ed);
    setEditableBody(ed.body);
    setViewMode("preview");
  };

  const handleSave = () => {
    if (!selected) return;
    setEditions(editions.map((e) => e.id === selected.id ? { ...e, body: editableBody } : e));
    setSelected({ ...selected, body: editableBody });
    setViewMode("preview");
    toast({ title: "Saved ✅", description: "Newsletter draft updated." });
  };

  const handleSchedule = () => {
    if (!selected || !scheduleDate) return;
    const updated = { ...selected, status: "scheduled" as const, scheduledFor: scheduleDate };
    setEditions(editions.map((e) => e.id === selected.id ? updated : e));
    setSelected(updated);
    setViewMode("preview");
    toast({ title: "Scheduled 📅", description: `Newsletter scheduled for ${new Date(scheduleDate).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}.` });
  };

  const handleSendNow = () => {
    if (!selected) return;
    setViewMode("sending");
    setTimeout(() => {
      const updated = { ...selected, status: "sent" as const, sentAt: new Date().toISOString(), openRate: 0, clickRate: 0 };
      setEditions(editions.map((e) => e.id === selected.id ? updated : e));
      setSelected(updated);
      setViewMode("sent");
      toast({ title: "Newsletter sent! 🎉", description: `Sent to ${selected.recipientCount} subscribers.` });
    }, 1500);
  };

  const handleCompose = () => {
    if (!composeTitle.trim() || !composeBody.trim()) return;
    const newEdition: NewsletterEdition = {
      id: Date.now(),
      title: composeTitle,
      status: "draft",
      createdAt: new Date().toISOString(),
      scheduledFor: null,
      sentAt: null,
      recipientCount: Math.max(...editions.map((e) => e.recipientCount)),
      openRate: null,
      clickRate: null,
      sections: [],
      body: composeBody,
    };
    setEditions([newEdition, ...editions]);
    setComposeOpen(false);
    setComposeTitle("");
    setComposeBody("");
    toast({ title: "Draft created ✍️", description: `"${composeTitle}" saved as a new draft.` });
  };

  const handleClose = () => {
    setSelected(null);
    setViewMode("preview");
  };

  // Summary stats
  const sentCount = editions.filter((e) => e.status === "sent").length;
  const avgOpenRate = editions.filter((e) => e.openRate).reduce((a, b) => a + (b.openRate || 0), 0) / (editions.filter((e) => e.openRate).length || 1);
  const totalSubscribers = Math.max(...editions.map((e) => e.recipientCount));

  return (
    <>
      <div className="space-y-6">
        {/* Digest Generator */}
        <DigestGenerator onInsert={(body) => {
          setComposeBody(body);
          setComposeTitle(`Beacon Weekly — ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`);
          setComposeOpen(true);
        }} />

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Editions Sent</span>
            </div>
            <p className="font-mono text-2xl font-bold text-foreground">{sentCount}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-4 w-4 text-info" />
              <span className="text-xs text-muted-foreground">Avg Open Rate</span>
            </div>
            <p className="font-mono text-2xl font-bold text-foreground">{avgOpenRate.toFixed(1)}%</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-success" />
              <span className="text-xs text-muted-foreground">Subscribers</span>
            </div>
            <p className="font-mono text-2xl font-bold text-foreground">{totalSubscribers.toLocaleString()}</p>
          </div>
        </div>

        {/* Compose + Edition Cards */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">All Editions</h3>
          <Button onClick={() => setComposeOpen(true)} className="gap-1.5" size="sm">
            <Plus className="h-4 w-4" /> Compose New
          </Button>
        </div>
        <div className="grid gap-4">
          {editions.map((ed, i) => (
            <motion.div
              key={ed.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover cursor-pointer"
              onClick={() => openEdition(ed)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className={`text-[10px] ${statusStyles[ed.status]}`}>
                      {ed.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(ed.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground leading-snug">{ed.title}</h3>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {ed.sections.map((s, idx) => (
                      <span key={idx} className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
                        {s.heading}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-primary" />
                      <span className="font-medium text-foreground">{ed.recipientCount.toLocaleString()}</span> subscribers
                    </span>
                    {ed.openRate !== null && (
                      <span className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5 text-info" />
                        <span className="font-medium text-foreground">{ed.openRate}%</span> open rate
                      </span>
                    )}
                    {ed.clickRate !== null && (
                      <span className="flex items-center gap-1">
                        <MousePointerClick className="h-3.5 w-3.5 text-success" />
                        <span className="font-medium text-foreground">{ed.clickRate}%</span> click rate
                      </span>
                    )}
                    {ed.scheduledFor && ed.status === "scheduled" && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-warning" />
                        Scheduled: {new Date(ed.scheduledFor).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                      </span>
                    )}
                  </div>
                </div>
                <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                  <Button size="sm" variant="outline" className="gap-1.5" onClick={() => openEdition(ed)}>
                    <Eye className="h-3.5 w-3.5" /> View
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Edition Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => { if (!open) handleClose(); }}>
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <Mail className="h-5 w-5 text-primary" />
              {selected?.title}
            </DialogTitle>
          </DialogHeader>

          {selected && (
            <div className="flex-1 overflow-y-auto">
              {viewMode === "preview" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className={`text-[10px] ${statusStyles[selected.status]}`}>{selected.status}</Badge>
                    <span className="text-xs text-muted-foreground">{selected.recipientCount.toLocaleString()} subscribers</span>
                    {selected.openRate !== null && <span className="text-xs text-muted-foreground">· {selected.openRate}% open rate</span>}
                  </div>
                  <div className="prose prose-sm max-w-none rounded-lg border border-border bg-secondary/30 p-6">
                    <ReactMarkdown>{selected.body}</ReactMarkdown>
                  </div>
                </div>
              )}

              {viewMode === "editing" && (
                <Textarea
                  value={editableBody}
                  onChange={(e) => setEditableBody(e.target.value)}
                  className="min-h-[400px] font-mono text-sm"
                  placeholder="Edit newsletter content (Markdown supported)..."
                />
              )}

              {viewMode === "scheduling" && (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <Calendar className="h-12 w-12 text-primary" />
                  <p className="text-sm font-medium text-foreground">Schedule this newsletter</p>
                  <Input
                    type="datetime-local"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="max-w-xs"
                  />
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" onClick={() => setViewMode("preview")}>Cancel</Button>
                    <Button disabled={!scheduleDate} onClick={handleSchedule} className="gap-1.5">
                      <Calendar className="h-4 w-4" /> Confirm Schedule
                    </Button>
                  </div>
                </div>
              )}

              {viewMode === "sending" && (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Sending to {selected.recipientCount.toLocaleString()} subscribers...</p>
                </div>
              )}

              {viewMode === "sent" && (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-success/10 flex items-center justify-center">
                    <span className="text-3xl">🎉</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">Newsletter sent!</p>
                  <p className="text-sm text-muted-foreground">Delivered to {selected.recipientCount.toLocaleString()} subscribers.</p>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between border-t border-border pt-4 mt-4">
            <Button variant="ghost" onClick={handleClose} className="gap-1.5">
              <X className="h-4 w-4" /> Close
            </Button>
            <div className="flex items-center gap-2">
              {viewMode === "preview" && selected?.status !== "sent" && (
                <>
                  <Button variant="outline" onClick={() => setViewMode("editing")} className="gap-1.5">
                    <Edit3 className="h-4 w-4" /> Edit
                  </Button>
                  <Button variant="outline" onClick={() => setViewMode("scheduling")} className="gap-1.5">
                    <Calendar className="h-4 w-4" /> Schedule
                  </Button>
                  <Button onClick={handleSendNow} className="gap-1.5">
                    <Send className="h-4 w-4" /> Send Now
                  </Button>
                </>
              )}
              {viewMode === "editing" && (
                <>
                  <Button variant="outline" onClick={() => setViewMode("preview")} className="gap-1.5">
                    <Eye className="h-4 w-4" /> Preview
                  </Button>
                  <Button onClick={handleSave} className="gap-1.5">
                    Save Changes
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Compose New Dialog */}
      <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <Plus className="h-5 w-5 text-primary" />
              Compose New Newsletter
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Title</label>
              <Input
                value={composeTitle}
                onChange={(e) => setComposeTitle(e.target.value)}
                placeholder="e.g. Beacon Weekly — Feb 17-21, 2026"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Body (Markdown)</label>
              <Textarea
                value={composeBody}
                onChange={(e) => setComposeBody(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
                placeholder={"# Newsletter Title\n\n## 🔥 Trending This Week\nDescribe trending topics...\n\n## 📝 Knowledge Base Updates\nList corrections...\n\n## 📰 New Content\nHighlight published articles..."}
              />
            </div>
            {composeBody && (
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Preview</label>
                <div className="prose prose-sm max-w-none rounded-lg border border-border bg-secondary/30 p-4">
                  <ReactMarkdown>{composeBody}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4 mt-4">
            <Button variant="ghost" onClick={() => setComposeOpen(false)} className="gap-1.5">
              <X className="h-4 w-4" /> Cancel
            </Button>
            <Button disabled={!composeTitle.trim() || !composeBody.trim()} onClick={handleCompose} className="gap-1.5">
              <Mail className="h-4 w-4" /> Save as Draft
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
