import { useState, useSyncExternalStore } from "react";
import { mockApprovedCorrections as initialCorrections, Suggestion, ApprovedCorrection } from "@/data/mockData";
import { suggestionsStore } from "@/data/suggestionsStore";
import { mockDigests, WeeklyDigest } from "@/data/digestData";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, MessageSquareWarning, CheckSquare, Eye, X, Edit3, Mail, Calendar, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FeedbackManager() {
  const suggestions = useSyncExternalStore(suggestionsStore.subscribe, suggestionsStore.getAll);
  const [corrections, setCorrections] = useState<ApprovedCorrection[]>([...initialCorrections]);
  const [digests, setDigests] = useState<WeeklyDigest[]>([...mockDigests]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
  const [selectedCorrection, setSelectedCorrection] = useState<ApprovedCorrection | null>(null);
  const [selectedDigest, setSelectedDigest] = useState<WeeklyDigest | null>(null);
  const [editedCorrectAnswer, setEditedCorrectAnswer] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const openSuggestion = (s: Suggestion) => {
    setSelectedSuggestion(s);
    setEditedCorrectAnswer(s.correctAnswer);
    setIsEditing(false);
  };

  const handleApprove = (s: Suggestion, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const finalAnswer = selectedSuggestion?.id === s.id ? editedCorrectAnswer : s.correctAnswer;
    const newCorrection: ApprovedCorrection = {
      id: corrections.length + 1,
      dateApproved: new Date().toISOString().split("T")[0],
      approvedBy: "Manny",
      whatWasWrong: s.wrongAnswer,
      correctionApplied: finalAnswer,
    };
    setCorrections([newCorrection, ...corrections]);
    suggestionsStore.remove(s.id);
    setSelectedSuggestion(null);
    setIsEditing(false);
    toast({ title: "Suggestion approved ✅", description: `Correction from ${s.user} has been applied to Beacon's knowledge base.` });
  };

  const handleReject = (s: Suggestion, e?: React.MouseEvent) => {
    e?.stopPropagation();
    suggestionsStore.remove(s.id);
    setSelectedSuggestion(null);
    setIsEditing(false);
    toast({ title: "Suggestion rejected", description: `Feedback from ${s.user} has been dismissed.` });
  };

  const handleSendDigest = (digest: WeeklyDigest) => {
    setDigests(digests.map((d) => d.id === digest.id ? { ...d, status: "sent" as const, sentAt: new Date().toISOString() } : d));
    setSelectedDigest(null);
    toast({ title: "Digest sent! 📧", description: `Weekly digest sent to ${digest.recipientCount} team members.` });
  };

  return (
    <>
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="pending" className="gap-1.5">
            📝 Pending Review
            {suggestions.length > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 min-w-5 rounded-full px-1.5 text-[10px] bg-warning/10 text-warning">
                {suggestions.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-1.5">
            ✅ Approved History
          </TabsTrigger>
          <TabsTrigger value="digests" className="gap-1.5">
            📧 Weekly Digests
          </TabsTrigger>
        </TabsList>

        {/* Pending Suggestions */}
        <TabsContent value="pending">
          <AnimatePresence mode="popLayout">
            {suggestions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl border border-border bg-card p-12 text-center shadow-card"
              >
                <div className="h-12 w-12 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <p className="text-sm font-medium text-foreground">All caught up!</p>
                <p className="text-xs text-muted-foreground mt-1">No pending suggestions to review</p>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {suggestions.map((s) => (
                  <motion.div
                    key={s.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100, height: 0, marginBottom: 0, padding: 0 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-card-hover hover:border-warning/30 cursor-pointer"
                    onClick={() => openSuggestion(s)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-3">
                          <MessageSquareWarning className="h-4 w-4 text-warning" />
                          <span className="text-sm font-medium text-foreground">{s.user}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(s.when).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                          </span>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-lg bg-destructive/5 border border-destructive/10 p-3">
                            <p className="text-[10px] font-semibold text-destructive uppercase tracking-wider mb-1">❌ Wrong Answer</p>
                            <p className="text-sm text-foreground">{s.wrongAnswer}</p>
                          </div>
                          <div className="rounded-lg bg-success/5 border border-success/10 p-3">
                            <p className="text-[10px] font-semibold text-success uppercase tracking-wider mb-1">✅ Correct Answer</p>
                            <p className="text-sm text-foreground">{s.correctAnswer}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <Button size="sm" variant="outline" className="h-8 gap-1 text-success hover:text-success hover:bg-success/10 hover:border-success/30" onClick={(e) => handleApprove(s, e)}>
                          <CheckCircle className="h-3.5 w-3.5" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 gap-1 text-destructive hover:text-destructive hover:bg-destructive/10 hover:border-destructive/30" onClick={(e) => handleReject(s, e)}>
                          <XCircle className="h-3.5 w-3.5" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </TabsContent>

        {/* Approved History */}
        <TabsContent value="history">
          {corrections.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-12 text-center shadow-card">
              <p className="text-sm text-muted-foreground">No approved corrections yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {corrections.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-card-hover hover:border-success/30 cursor-pointer"
                  onClick={() => setSelectedCorrection(c)}
                >
                  <div className="flex items-start gap-3">
                    <CheckSquare className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-foreground">{c.approvedBy}</span>
                        <span className="text-xs text-muted-foreground">
                          approved on {new Date(c.dateApproved).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-lg bg-destructive/5 border border-destructive/10 p-3">
                          <p className="text-[10px] font-semibold text-destructive uppercase tracking-wider mb-1">Was Wrong</p>
                          <p className="text-xs text-foreground">{c.whatWasWrong}</p>
                        </div>
                        <div className="rounded-lg bg-success/5 border border-success/10 p-3">
                          <p className="text-[10px] font-semibold text-success uppercase tracking-wider mb-1">Corrected To</p>
                          <p className="text-xs text-foreground">{c.correctionApplied}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Weekly Digests */}
        <TabsContent value="digests">
          <div className="space-y-3">
            {digests.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-card-hover cursor-pointer"
                onClick={() => setSelectedDigest(d)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        Week of {new Date(d.weekOf).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      <Badge variant="secondary" className={`text-[10px] ${d.status === "sent" ? "bg-success/10 text-success" : d.status === "scheduled" ? "bg-info/10 text-info" : "bg-warning/10 text-warning"}`}>
                        {d.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {d.items.length} items · {d.recipientCount} recipients
                      {d.sentAt && ` · Sent ${new Date(d.sentAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {d.items.slice(0, 3).map((item, idx) => (
                        <span key={idx} className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground truncate max-w-48">
                          {item.type === "correction_approved" ? "✅" : item.type === "correction_rejected" ? "❌" : "📰"} {item.title}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                    {d.status === "draft" && (
                      <Button size="sm" className="gap-1.5" onClick={() => handleSendDigest(d)}>
                        <Send className="h-3.5 w-3.5" />
                        Send Now
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Suggestion Detail Dialog with Edit */}
      <Dialog open={!!selectedSuggestion} onOpenChange={(open) => { if (!open) { setSelectedSuggestion(null); setIsEditing(false); } }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquareWarning className="h-5 w-5 text-warning" />
              Review Suggestion
            </DialogTitle>
          </DialogHeader>
          {selectedSuggestion && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{selectedSuggestion.user}</span>
                <span>·</span>
                <span>{new Date(selectedSuggestion.when).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}</span>
              </div>
              <div className="rounded-lg bg-destructive/5 border border-destructive/10 p-4">
                <p className="text-xs font-semibold text-destructive uppercase tracking-wider mb-2">❌ Beacon Gave This Wrong Answer</p>
                <p className="text-sm text-foreground">{selectedSuggestion.wrongAnswer}</p>
              </div>
              <div className="rounded-lg bg-success/5 border border-success/10 p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-success uppercase tracking-wider">✅ {isEditing ? "Edit Correct Answer" : "The Correct Answer Should Be"}</p>
                  {!isEditing && (
                    <Button size="sm" variant="ghost" className="h-6 gap-1 text-xs text-muted-foreground hover:text-foreground" onClick={() => setIsEditing(true)}>
                      <Edit3 className="h-3 w-3" /> Edit
                    </Button>
                  )}
                </div>
                {isEditing ? (
                  <Textarea
                    value={editedCorrectAnswer}
                    onChange={(e) => setEditedCorrectAnswer(e.target.value)}
                    className="min-h-[80px] text-sm"
                  />
                ) : (
                  <p className="text-sm text-foreground">{editedCorrectAnswer}</p>
                )}
              </div>
              {isEditing && editedCorrectAnswer !== selectedSuggestion.correctAnswer && (
                <p className="text-xs text-info flex items-center gap-1">
                  <Edit3 className="h-3 w-3" /> Answer has been modified from original suggestion
                </p>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <Button variant="ghost" onClick={() => { setSelectedSuggestion(null); setIsEditing(false); }}>Cancel</Button>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleReject(selectedSuggestion)}>
                    <XCircle className="h-4 w-4" /> Reject
                  </Button>
                  <Button className="gap-1.5" onClick={() => handleApprove(selectedSuggestion)}>
                    <CheckCircle className="h-4 w-4" /> {isEditing ? "Edit & Approve" : "Approve & Apply"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Correction Detail Dialog */}
      <Dialog open={!!selectedCorrection} onOpenChange={(open) => { if (!open) setSelectedCorrection(null); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-success" />
              Approved Correction
            </DialogTitle>
          </DialogHeader>
          {selectedCorrection && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                Approved by <span className="font-medium text-foreground">{selectedCorrection.approvedBy}</span>
                on {new Date(selectedCorrection.dateApproved).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </div>
              <div className="rounded-lg bg-destructive/5 border border-destructive/10 p-4">
                <p className="text-xs font-semibold text-destructive uppercase tracking-wider mb-2">What Was Wrong</p>
                <p className="text-sm text-foreground">{selectedCorrection.whatWasWrong}</p>
              </div>
              <div className="rounded-lg bg-success/5 border border-success/10 p-4">
                <p className="text-xs font-semibold text-success uppercase tracking-wider mb-2">Correction Applied</p>
                <p className="text-sm text-foreground">{selectedCorrection.correctionApplied}</p>
              </div>
              <div className="flex justify-end pt-2 border-t border-border">
                <Button variant="ghost" onClick={() => setSelectedCorrection(null)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Digest Detail Dialog */}
      <Dialog open={!!selectedDigest} onOpenChange={(open) => { if (!open) setSelectedDigest(null); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Weekly Digest — {selectedDigest && new Date(selectedDigest.weekOf).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </DialogTitle>
          </DialogHeader>
          {selectedDigest && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary" className={`text-[10px] ${selectedDigest.status === "sent" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                  {selectedDigest.status}
                </Badge>
                <span>{selectedDigest.recipientCount} recipients</span>
                {selectedDigest.sentAt && (
                  <span>· Sent {new Date(selectedDigest.sentAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</span>
                )}
              </div>

              <div className="space-y-2">
                {selectedDigest.items.map((item, idx) => (
                  <div key={idx} className={`rounded-lg border p-3 ${
                    item.type === "correction_approved" ? "bg-success/5 border-success/10" :
                    item.type === "correction_rejected" ? "bg-destructive/5 border-destructive/10" :
                    "bg-info/5 border-info/10"
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold">
                        {item.type === "correction_approved" ? "✅ Correction Approved" :
                         item.type === "correction_rejected" ? "❌ Correction Rejected" :
                         "📰 Content Published"}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    {item.submittedBy && <p className="text-[10px] text-muted-foreground mt-1">Submitted by {item.submittedBy}</p>}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <Button variant="ghost" onClick={() => setSelectedDigest(null)}>Close</Button>
                {selectedDigest.status === "draft" && (
                  <Button className="gap-1.5" onClick={() => handleSendDigest(selectedDigest)}>
                    <Send className="h-4 w-4" /> Send Digest
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}