import { useState } from "react";
import { mockConversations, Conversation } from "@/data/mockData";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock, FileText, X, Shield, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";

const topicColors: Record<string, string> = {
  DHCR: "bg-chart-4/10 text-chart-4",
  Zoning: "bg-info/10 text-info",
  DOB: "bg-primary/10 text-primary",
  Violations: "bg-destructive/10 text-destructive",
  "Certificate of Occupancy": "bg-success/10 text-success",
  MDL: "bg-chart-4/10 text-chart-4",
  General: "bg-muted text-muted-foreground",
};

export default function ConversationsList() {
  const [selected, setSelected] = useState<Conversation | null>(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="space-y-3"
      >
        {mockConversations.map((conv, i) => (
          <motion.div
            key={conv.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
            className="group cursor-pointer rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-card-hover hover:border-primary/30"
            onClick={() => setSelected(conv)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${topicColors[conv.topic] || topicColors.General}`}>
                    {conv.topic}
                  </Badge>
                  {conv.answered ? (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-success/10 text-success">✓ Answered</Badge>
                  ) : (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-destructive/10 text-destructive">✗ Failed</Badge>
                  )}
                </div>
                <p className="text-sm font-medium text-foreground leading-snug">{conv.question}</p>
                <p className="mt-2 line-clamp-2 text-xs text-muted-foreground leading-relaxed">{conv.responsePreview}</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40 group-hover:text-primary transition-colors mt-1" />
            </div>
            <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="font-medium text-foreground/70">{conv.userName}</span>
              <span className="text-muted-foreground/30">·</span>
              <span>{new Date(conv.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</span>
              <span className="text-muted-foreground/30">·</span>
              <span className="flex items-center gap-0.5">
                <Clock className="h-3 w-3" />
                {(conv.responseTimeMs / 1000).toFixed(1)}s
              </span>
              <span className="text-muted-foreground/30">·</span>
              <span className="flex items-center gap-0.5">
                <Shield className="h-3 w-3" />
                {Math.round(conv.confidence * 100)}%
              </span>
              {conv.hadSources && (
                <>
                  <span className="text-muted-foreground/30">·</span>
                  <span className="flex items-center gap-0.5">
                    <FileText className="h-3 w-3" />
                    {conv.sources?.length || 0} sources
                  </span>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Conversation Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold leading-snug pr-8">
              {selected?.question}
            </DialogTitle>
          </DialogHeader>

          {selected && (
            <div className="flex-1 overflow-y-auto space-y-5">
              {/* Meta bar */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className={`text-xs ${topicColors[selected.topic] || topicColors.General}`}>
                  {selected.topic}
                </Badge>
                {selected.answered ? (
                  <Badge variant="secondary" className="text-xs bg-success/10 text-success gap-1">
                    <CheckCircle className="h-3 w-3" /> Answered
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-xs bg-destructive/10 text-destructive gap-1">
                    <XCircle className="h-3 w-3" /> Failed
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground">
                  {selected.userName} · {new Date(selected.timestamp).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                </span>
              </div>

              {/* Performance stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-secondary/50 p-3 text-center">
                  <p className="font-mono text-lg font-bold text-foreground">{(selected.responseTimeMs / 1000).toFixed(1)}s</p>
                  <p className="text-[10px] text-muted-foreground">Response Time</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3 text-center">
                  <p className="font-mono text-lg font-bold text-foreground">{Math.round(selected.confidence * 100)}%</p>
                  <p className="text-[10px] text-muted-foreground">Confidence</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3 text-center">
                  <p className="font-mono text-lg font-bold text-foreground">{selected.sources?.length || 0}</p>
                  <p className="text-[10px] text-muted-foreground">Sources Used</p>
                </div>
              </div>

              {/* Full response */}
              <div>
                <h4 className="font-mono text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Beacon's Response</h4>
                <div className="prose prose-sm max-w-none rounded-lg border border-border bg-secondary/30 p-5">
                  <ReactMarkdown>{selected.fullResponse}</ReactMarkdown>
                </div>
              </div>

              {/* Sources */}
              {selected.sources && selected.sources.length > 0 && (
                <div>
                  <h4 className="font-mono text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Sources Referenced</h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.sources.map((src, i) => (
                      <span key={i} className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground flex items-center gap-1.5">
                        <FileText className="h-3 w-3 text-primary" />
                        {src}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between border-t border-border pt-4 mt-4">
            <Button variant="ghost" onClick={() => setSelected(null)} className="gap-1.5">
              <X className="h-4 w-4" />
              Close
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs">Flag as Incorrect</Button>
              <Button variant="outline" size="sm" className="text-xs">Suggest Correction</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
