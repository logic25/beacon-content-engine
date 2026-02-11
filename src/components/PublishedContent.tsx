import { useState } from "react";
import { mockPublishedContent, PublishedContent } from "@/data/mockData";
import ContentPerformance from "@/components/ContentPerformance";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, MousePointerClick, Share2, Mail, BarChart3, TrendingUp, FileText, Newspaper, Clock, ArrowUpRight, X, MessageSquare, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";

const statusStyles: Record<string, string> = {
  published: "bg-success/10 text-success",
  draft: "bg-warning/10 text-warning",
  scheduled: "bg-info/10 text-info",
};

const sourceIcons: Record<string, React.ReactNode> = {
  "AI-identified": <Sparkles className="h-2.5 w-2.5" />,
  "conversation": <MessageSquare className="h-2.5 w-2.5" />,
  "Monthly": <TrendingUp className="h-2.5 w-2.5" />,
  "DHCR": <FileText className="h-2.5 w-2.5" />,
  "ECB": <FileText className="h-2.5 w-2.5" />,
};

function getSourceIcon(source: string) {
  for (const [key, icon] of Object.entries(sourceIcons)) {
    if (source.includes(key)) return icon;
  }
  return <FileText className="h-2.5 w-2.5" />;
}

export default function PublishedContentList() {
  const [filter, setFilter] = useState<"all" | "blog_post" | "newsletter">("all");
  const [selectedContent, setSelectedContent] = useState<PublishedContent | null>(null);
  const [showPerformance, setShowPerformance] = useState(true);

  const filtered = mockPublishedContent.filter(
    (c) => filter === "all" || c.contentType === filter
  );

  const totalViews = mockPublishedContent.reduce((a, b) => a + b.views, 0);
  const totalClicks = mockPublishedContent.reduce((a, b) => a + b.clicks, 0);
  const totalShares = mockPublishedContent.reduce((a, b) => a + b.shares, 0);
  const publishedCount = mockPublishedContent.filter((c) => c.status === "published").length;

  return (
    <>
      <div className="space-y-6">
        {/* Performance Dashboard */}
        {showPerformance && <ContentPerformance />}

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Published</span>
            </div>
            <p className="font-mono text-2xl font-bold text-foreground">{publishedCount}</p>
            <p className="text-xs text-muted-foreground mt-1">pieces of content</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-4 w-4 text-info" />
              <span className="text-xs text-muted-foreground">Total Views</span>
            </div>
            <p className="font-mono text-2xl font-bold text-foreground">{totalViews.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">across all content</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <MousePointerClick className="h-4 w-4 text-success" />
              <span className="text-xs text-muted-foreground">Total Clicks</span>
            </div>
            <p className="font-mono text-2xl font-bold text-foreground">{totalClicks.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {((totalClicks / totalViews) * 100).toFixed(1)}% click rate
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <Share2 className="h-4 w-4 text-chart-4" />
              <span className="text-xs text-muted-foreground">Total Shares</span>
            </div>
            <p className="font-mono text-2xl font-bold text-foreground">{totalShares}</p>
            <p className="text-xs text-muted-foreground mt-1">organic reach</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          {(["all", "blog_post", "newsletter"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              className="h-8 text-xs gap-1.5"
              onClick={() => setFilter(f)}
            >
              {f === "all" && "All"}
              {f === "blog_post" && <><FileText className="h-3.5 w-3.5" /> Blog Posts</>}
              {f === "newsletter" && <><Newspaper className="h-3.5 w-3.5" /> Newsletters</>}
            </Button>
          ))}
        </div>

        {/* Content Cards */}
        <div className="grid gap-4">
          {filtered.map((content, i) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover cursor-pointer"
              onClick={() => setSelectedContent(content)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className={`text-[10px] ${statusStyles[content.status]}`}>{content.status}</Badge>
                    <Badge variant="secondary" className="gap-1 text-xs">
                      {content.contentType === "blog_post" ? <FileText className="h-3 w-3" /> : <Newspaper className="h-3 w-3" />}
                      {content.contentType === "blog_post" ? "Blog Post" : "Newsletter"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(content.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-foreground leading-snug">{content.title}</h3>

                  {/* Source attribution */}
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground">By {content.author}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-chart-4/10 px-2 py-0.5 text-[10px] font-medium text-chart-4">
                      {getSourceIcon(content.generatedFrom)}
                      {content.generatedFrom}
                    </span>
                  </div>

                  {/* Performance Metrics */}
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5 text-info" />
                      <span className="font-medium text-foreground">{content.views.toLocaleString()}</span> views
                    </span>
                    <span className="flex items-center gap-1">
                      <MousePointerClick className="h-3.5 w-3.5 text-success" />
                      <span className="font-medium text-foreground">{content.clicks}</span> clicks
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 className="h-3.5 w-3.5 text-chart-4" />
                      <span className="font-medium text-foreground">{content.shares}</span> shares
                    </span>
                    {content.contentType === "newsletter" && content.openRate && (
                      <span className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5 text-primary" />
                        <span className="font-medium text-foreground">{content.openRate}%</span> open rate
                      </span>
                    )}
                    {content.contentType === "blog_post" && content.avgTimeOnPage && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        <span className="font-medium text-foreground">{content.avgTimeOnPage}</span> avg read
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <BarChart3 className="h-3.5 w-3.5 text-warning" />
                      SEO: <span className="font-medium text-foreground">{content.seoScore}</span>
                    </span>
                  </div>

                  <div className="mt-3">
                    <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">🔍 {content.topKeyword}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <Button size="sm" variant="outline" className="gap-1.5" onClick={() => setSelectedContent(content)}>
                    <Eye className="h-3.5 w-3.5" /> View
                  </Button>
                  {content.url && content.status === "published" && (
                    <Button size="sm" variant="outline" className="gap-1.5" onClick={() => window.open(content.url, "_blank")}>
                      <ArrowUpRight className="h-3.5 w-3.5" /> Live
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="rounded-xl border border-border bg-card p-12 text-center shadow-card">
              <p className="text-sm text-muted-foreground">No published content yet. Generate and publish from the Pipeline tab!</p>
            </div>
          )}
        </div>
      </div>

      {/* Content Detail Dialog */}
      <Dialog open={!!selectedContent} onOpenChange={(open) => { if (!open) setSelectedContent(null); }}>
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              {selectedContent?.contentType === "blog_post" ? <FileText className="h-5 w-5 text-primary" /> : <Newspaper className="h-5 w-5 text-primary" />}
              {selectedContent?.title}
            </DialogTitle>
          </DialogHeader>

          {selectedContent && (
            <div className="flex-1 overflow-y-auto space-y-6">
              {/* Performance summary bar */}
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                <div className="rounded-lg bg-secondary/50 p-3 text-center">
                  <p className="font-mono text-lg font-bold text-foreground">{selectedContent.views.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">Views</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3 text-center">
                  <p className="font-mono text-lg font-bold text-foreground">{selectedContent.clicks}</p>
                  <p className="text-[10px] text-muted-foreground">Clicks</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3 text-center">
                  <p className="font-mono text-lg font-bold text-foreground">{selectedContent.shares}</p>
                  <p className="text-[10px] text-muted-foreground">Shares</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3 text-center">
                  <p className="font-mono text-lg font-bold text-foreground">{selectedContent.seoScore}</p>
                  <p className="text-[10px] text-muted-foreground">SEO</p>
                </div>
                {selectedContent.contentType === "newsletter" && (
                  <>
                    <div className="rounded-lg bg-secondary/50 p-3 text-center">
                      <p className="font-mono text-lg font-bold text-foreground">{selectedContent.openRate}%</p>
                      <p className="text-[10px] text-muted-foreground">Open Rate</p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-3 text-center">
                      <p className="font-mono text-lg font-bold text-foreground">{selectedContent.subscribers?.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground">Subscribers</p>
                    </div>
                  </>
                )}
                {selectedContent.contentType === "blog_post" && (
                  <>
                    <div className="rounded-lg bg-secondary/50 p-3 text-center">
                      <p className="font-mono text-lg font-bold text-foreground">{selectedContent.avgTimeOnPage}</p>
                      <p className="text-[10px] text-muted-foreground">Avg Read</p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-3 text-center">
                      <p className="font-mono text-lg font-bold text-foreground">{selectedContent.bounceRate}%</p>
                      <p className="text-[10px] text-muted-foreground">Bounce</p>
                    </div>
                  </>
                )}
              </div>

              {/* Source attribution */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Generated from:</span>
                <span className="inline-flex items-center gap-1 rounded-md bg-chart-4/10 px-2 py-1 text-xs font-medium text-chart-4">
                  {getSourceIcon(selectedContent.generatedFrom)}
                  {selectedContent.generatedFrom}
                </span>
              </div>

              {/* Content body */}
              <div className="prose prose-sm max-w-none rounded-lg border border-border bg-secondary/30 p-6">
                <ReactMarkdown>{selectedContent.body}</ReactMarkdown>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-border pt-4 mt-4">
            <Button variant="ghost" onClick={() => setSelectedContent(null)} className="gap-1.5">
              <X className="h-4 w-4" /> Close
            </Button>
            <div className="flex items-center gap-2">
              {selectedContent?.url && selectedContent.status === "published" && (
                <Button variant="outline" className="gap-1.5" onClick={() => window.open(selectedContent.url, "_blank")}>
                  <ArrowUpRight className="h-4 w-4" /> View Live
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
