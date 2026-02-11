import { useState, useRef } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import { mockKnowledgeDocuments, knowledgeCategories, KnowledgeDocument, conversationDocRefs, mockContentIdeas, ContentIdea } from "@/data/knowledgeBaseData";
import { mockApprovedCorrections, mockConversations, mockMostAsked } from "@/data/mockData";
import { contentStore } from "@/data/contentStore";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Search, FileText, Clock, TrendingUp, Plus, Upload, MessageSquare, CheckSquare, Sparkles, ExternalLink, ChevronRight, File, X, Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const KnowledgeBase = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selected, setSelected] = useState<KnowledgeDocument | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; addedAt: string }[]>([]);
  const [aiIdeas, setAiIdeas] = useState<ContentIdea[]>(mockContentIdeas);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const generateAIIdeas = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-content-ideas", {
        body: {
          conversations: mockConversations.slice(0, 6).map((c) => ({
            userName: c.userName,
            question: c.question,
            topic: c.topic,
            confidence: c.confidence,
          })),
          documents: mockKnowledgeDocuments.slice(0, 15).map((d) => ({
            title: d.title,
            category: d.category,
            referenceCount: d.referenceCount,
            type: d.type,
          })),
          corrections: mockApprovedCorrections.map((c) => ({
            whatWasWrong: c.whatWasWrong,
            correctionApplied: c.correctionApplied,
            approvedBy: c.approvedBy,
          })),
          mostAskedQuestions: mockMostAsked.map((q) => ({
            question: q.question,
            timesAsked: q.timesAsked,
          })),
        },
      });

      if (error) throw error;

      if (data?.ideas && Array.isArray(data.ideas)) {
        const newIdeas: ContentIdea[] = data.ideas.map((idea: ContentIdea, i: number) => ({
          id: Date.now() + i,
          title: idea.title,
          type: idea.type,
          confidence: idea.confidence,
          sources: idea.sources || [],
          reasoning: idea.reasoning,
          suggestedOutline: idea.suggestedOutline || [],
          estimatedImpact: idea.estimatedImpact,
          createdAt: new Date().toISOString(),
        }));
        setAiIdeas(newIdeas);
        toast({ title: "New ideas generated! ✨", description: `${newIdeas.length} content ideas from AI analysis.` });
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err: unknown) {
      console.error("AI Ideas generation error:", err);
      toast({
        title: "Generation failed",
        description: err instanceof Error ? err.message : "Could not generate ideas. Try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const filtered = mockKnowledgeDocuments.filter((doc) => {
    const matchesSearch = search === "" || doc.title.toLowerCase().includes(search.toLowerCase()) || doc.category.toLowerCase().includes(search.toLowerCase()) || doc.summary.toLowerCase().includes(search.toLowerCase()) || doc.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = !activeCategory || doc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const hotSources = [...mockKnowledgeDocuments].sort((a, b) => b.referenceCount - a.referenceCount).slice(0, 5);
  const corrections = mockKnowledgeDocuments.filter((d) => d.type === "correction");
  const docConvRefs = selected ? conversationDocRefs.filter((r) => r.documentIds.includes(selected.id)) : [];

  const typeColors: Record<string, string> = {
    procedure: "bg-primary/10 text-primary",
    case_study: "bg-success/10 text-success",
    template: "bg-warning/10 text-warning",
    regulation: "bg-info/10 text-info",
    guide: "bg-chart-4/10 text-chart-4",
    correction: "bg-chart-5/10 text-chart-5",
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newFiles = Array.from(files).map((f) => ({
      name: f.name,
      size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
      addedAt: new Date().toISOString(),
    }));
    setUploadedFiles((prev) => [...newFiles, ...prev]);
    toast({
      title: `${files.length} file${files.length > 1 ? "s" : ""} uploaded 📄`,
      description: "Files queued for indexing. They'll appear in the knowledge base once processed by the backend.",
    });
    e.target.value = "";
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <PageHeader
          title="Knowledge Base"
          description={`${mockKnowledgeDocuments.length} indexed documents powering Beacon's responses`}
          icon={<BookOpen className="h-6 w-6 text-primary" />}
        />

        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="documents" className="gap-1.5">
              📚 Documents
              <Badge variant="secondary" className="ml-1 h-5 min-w-5 rounded-full px-1.5 text-[10px] bg-primary/10 text-primary">{mockKnowledgeDocuments.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="corrections" className="gap-1.5">
              ✏️ Corrections
              <Badge variant="secondary" className="ml-1 h-5 min-w-5 rounded-full px-1.5 text-[10px] bg-chart-5/10 text-chart-5">{corrections.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="upload" className="gap-1.5">
              📤 Upload
            </TabsTrigger>
            <TabsTrigger value="ideas" className="gap-1.5">
              ✨ AI Ideas
              <Badge variant="secondary" className="ml-1 h-5 min-w-5 rounded-full px-1.5 text-[10px] bg-warning/10 text-warning">{aiIdeas.length}</Badge>
            </TabsTrigger>
          </TabsList>

          {/* Documents Tab */}
          <TabsContent value="documents">
            {/* Search & Add */}
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search documents, categories, tags..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
              </div>
              <Button variant="outline" className="gap-1.5" onClick={() => fileInputRef.current?.click()}>
                <Plus className="h-4 w-4" /> Add Document
              </Button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setActiveCategory(null)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${!activeCategory ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
              >
                All ({mockKnowledgeDocuments.length})
              </button>
              {knowledgeCategories.map((cat) => {
                const count = mockKnowledgeDocuments.filter((d) => d.category === cat.name).length;
                if (count === 0) return null;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${activeCategory === cat.name ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
                  >
                    {cat.icon} {cat.name} ({count})
                  </button>
                );
              })}
            </div>

            <div className="grid gap-6 lg:grid-cols-4">
              {/* Document List */}
              <div className="lg:col-span-3 space-y-3">
                {filtered.length === 0 ? (
                  <div className="rounded-xl border border-border bg-card p-12 text-center shadow-card">
                    <p className="text-sm text-muted-foreground">No documents match your search.</p>
                  </div>
                ) : (
                  filtered.map((doc, i) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.02 }}
                      className="rounded-xl border border-border bg-card p-4 shadow-card transition-all hover:shadow-card-hover hover:border-primary/30 cursor-pointer"
                      onClick={() => setSelected(doc)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${typeColors[doc.type]}`}>
                              {doc.type.replace("_", " ")}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground">{doc.category}</span>
                            {doc.fileName && (
                              <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                                <File className="h-2.5 w-2.5" /> {doc.fileName}
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-medium text-foreground">{doc.title}</p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{doc.summary}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-mono text-sm font-bold text-foreground">{doc.referenceCount}</p>
                          <p className="text-[10px] text-muted-foreground">references</p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" /> Added {new Date(doc.addedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                        {doc.lastReferenced && (
                          <span className="flex items-center gap-0.5"><TrendingUp className="h-2.5 w-2.5" /> Last used {new Date(doc.lastReferenced).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                        )}
                        {doc.conversationRefs && doc.conversationRefs.length > 0 && (
                          <span className="flex items-center gap-0.5"><MessageSquare className="h-2.5 w-2.5" /> {doc.conversationRefs.length} conversations</span>
                        )}
                        <div className="flex gap-1 ml-auto">
                          {doc.tags.slice(0, 3).map((t) => (
                            <span key={t} className="rounded bg-secondary px-1.5 py-0.5 text-[9px]">{t}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Hot Sources Sidebar */}
              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-card p-4 shadow-card">
                  <h3 className="font-mono text-xs font-semibold text-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5 text-primary" /> Hot Sources
                  </h3>
                  <div className="space-y-2">
                    {hotSources.map((doc, i) => (
                      <div key={doc.id} className="flex items-center gap-2 text-xs cursor-pointer hover:text-primary transition-colors" onClick={() => setSelected(doc)}>
                        <span className="font-mono text-[10px] text-muted-foreground w-4">{i + 1}.</span>
                        <FileText className="h-3 w-3 text-muted-foreground shrink-0" />
                        <span className="text-foreground truncate flex-1">{doc.title}</span>
                        <span className="font-mono text-[10px] text-muted-foreground">{doc.referenceCount}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-4 shadow-card">
                  <h3 className="font-mono text-xs font-semibold text-foreground uppercase tracking-wider mb-3">Stats</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between"><span className="text-muted-foreground">Total Documents</span><span className="font-mono font-bold text-foreground">{mockKnowledgeDocuments.length}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Categories</span><span className="font-mono font-bold text-foreground">{knowledgeCategories.filter((c) => mockKnowledgeDocuments.some((d) => d.category === c.name)).length}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Total References</span><span className="font-mono font-bold text-foreground">{mockKnowledgeDocuments.reduce((a, d) => a + d.referenceCount, 0)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Corrections Applied</span><span className="font-mono font-bold text-foreground">{corrections.length}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Last Updated</span><span className="font-mono font-bold text-foreground">Today</span></div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Corrections Tab */}
          <TabsContent value="corrections">
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-5 shadow-card">
                <h3 className="font-mono text-sm font-semibold text-foreground mb-1">What Beacon Learned</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  These corrections were submitted by the team and approved. They're now part of Beacon's knowledge base.
                </p>
                <div className="space-y-3">
                  {mockApprovedCorrections.map((c, i) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="rounded-xl border border-border bg-card p-4 shadow-card"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <CheckSquare className="h-4 w-4 text-success" />
                        <span className="text-xs font-medium text-foreground">{c.approvedBy}</span>
                        <span className="text-[10px] text-muted-foreground">
                          approved on {new Date(c.dateApproved).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-lg bg-destructive/5 border border-destructive/10 p-3">
                          <p className="text-[10px] font-semibold text-destructive uppercase tracking-wider mb-1">❌ Was Wrong</p>
                          <p className="text-xs text-foreground">{c.whatWasWrong}</p>
                        </div>
                        <div className="rounded-lg bg-success/5 border border-success/10 p-3">
                          <p className="text-[10px] font-semibold text-success uppercase tracking-wider mb-1">✅ Now Correct</p>
                          <p className="text-xs text-foreground">{c.correctionApplied}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Correction documents in KB */}
              <div className="rounded-xl border border-border bg-card p-5 shadow-card">
                <h3 className="font-mono text-sm font-semibold text-foreground mb-1">Indexed as Knowledge</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Each correction generates a knowledge entry that Beacon references to avoid repeating mistakes.
                </p>
                <div className="space-y-2">
                  {corrections.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 cursor-pointer transition-colors"
                      onClick={() => setSelected(doc)}
                    >
                      <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${typeColors.correction}`}>correction</Badge>
                      <span className="text-sm text-foreground flex-1">{doc.title}</span>
                      <span className="text-[10px] text-muted-foreground">{doc.referenceCount} refs</span>
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload">
            <div className="max-w-2xl space-y-6">
              <div
                className="rounded-xl border-2 border-dashed border-border bg-card p-12 text-center shadow-card hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground mb-1">Drop files here or click to upload</p>
                <p className="text-xs text-muted-foreground mb-4">PDF, DOCX, TXT, MD — up to 20MB per file</p>
                <Button variant="outline" className="gap-1.5">
                  <Plus className="h-4 w-4" /> Choose Files
                </Button>
                <input ref={fileInputRef} type="file" multiple accept=".pdf,.docx,.txt,.md,.doc" className="hidden" onChange={handleFileUpload} />
              </div>

              {uploadedFiles.length > 0 && (
                <div className="rounded-xl border border-border bg-card p-5 shadow-card">
                  <h3 className="font-mono text-sm font-semibold text-foreground mb-3">Uploaded Files</h3>
                  <div className="space-y-2">
                    {uploadedFiles.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                        <File className="h-4 w-4 text-primary shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{f.name}</p>
                          <p className="text-[10px] text-muted-foreground">{f.size} · Uploaded {new Date(f.addedAt).toLocaleTimeString()}</p>
                        </div>
                        <Badge variant="secondary" className="text-[10px] bg-warning/10 text-warning">Pending indexing</Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                          onClick={() => setUploadedFiles((prev) => prev.filter((_, idx) => idx !== i))}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-3">
                    Files will be processed and added to the knowledge base once connected to the Pinecone backend.
                  </p>
                </div>
              )}

              <div className="rounded-xl border border-border bg-card p-5 shadow-card">
                <h3 className="font-mono text-sm font-semibold text-foreground mb-2">How Document Indexing Works</h3>
                <div className="space-y-3 text-xs text-muted-foreground">
                  <div className="flex gap-3">
                    <span className="font-mono text-primary font-bold shrink-0">1.</span>
                    <p><strong className="text-foreground">Upload</strong> — Drop your PDF, DOCX, or text file here</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-mono text-primary font-bold shrink-0">2.</span>
                    <p><strong className="text-foreground">Chunk</strong> — Document is split into semantic sections (~500 tokens each)</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-mono text-primary font-bold shrink-0">3.</span>
                    <p><strong className="text-foreground">Embed</strong> — Each chunk is converted to a vector using Voyage AI</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-mono text-primary font-bold shrink-0">4.</span>
                    <p><strong className="text-foreground">Index</strong> — Vectors stored in Pinecone with metadata (category, tags, date)</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-mono text-primary font-bold shrink-0">5.</span>
                    <p><strong className="text-foreground">Ready</strong> — Beacon can now cite this document when answering questions</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* AI Ideas Tab */}
          <TabsContent value="ideas">
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-gradient-to-br from-card to-primary/5 p-5 shadow-card">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="font-mono text-sm font-semibold text-foreground">AI Cross-Reference Engine</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Content ideas generated by analyzing team conversations, knowledge base documents, corrections, and trends.
                </p>
                <Button
                  className="gap-1.5"
                  disabled={isGenerating}
                  onClick={generateAIIdeas}
                >
                  {isGenerating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
                  {isGenerating ? "Analyzing..." : "Generate New Ideas"}
                </Button>
              </div>

              <div className="space-y-4">
                {aiIdeas.map((idea, i) => (
                  <motion.div
                    key={idea.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover transition-all"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${
                            idea.type === "blog_post" ? "bg-primary/10 text-primary" : idea.type === "newsletter" ? "bg-info/10 text-info" : "bg-chart-4/10 text-chart-4"
                          }`}>
                            {idea.type.replace("_", " ")}
                          </Badge>
                          <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${
                            idea.estimatedImpact === "high" ? "bg-success/10 text-success" : idea.estimatedImpact === "medium" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"
                          }`}>
                            {idea.estimatedImpact} impact
                          </Badge>
                          <span className="text-[10px] text-muted-foreground">{Math.round(idea.confidence * 100)}% confidence</span>
                        </div>
                        <h4 className="text-sm font-semibold text-foreground">{idea.title}</h4>
                      </div>
                      <Button size="sm" variant="outline" className="gap-1 shrink-0 text-xs" onClick={() => {
                        contentStore.addFromAIIdea({
                          id: idea.id,
                          title: idea.title,
                          type: idea.type,
                          reasoning: idea.reasoning,
                          sources: idea.sources,
                          suggestedOutline: idea.suggestedOutline,
                        });
                        toast({ title: "Sent to Content Pipeline ✨", description: `"${idea.title}" has been added to your content queue.` });
                      }}>
                        <Send className="h-3 w-3" /> Send to Pipeline
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground mb-3">{idea.reasoning}</p>

                    {/* Sources that informed this idea */}
                    <div className="mb-3">
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Cross-Referenced From</p>
                      <div className="flex flex-wrap gap-1.5">
                        {idea.sources.map((src, j) => (
                          <span
                            key={j}
                            className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium ${
                              src.type === "conversation" ? "bg-info/10 text-info" :
                              src.type === "document" ? "bg-primary/10 text-primary" :
                              src.type === "correction" ? "bg-chart-5/10 text-chart-5" :
                              "bg-warning/10 text-warning"
                            }`}
                          >
                            {src.type === "conversation" ? <MessageSquare className="h-2.5 w-2.5" /> :
                             src.type === "document" ? <FileText className="h-2.5 w-2.5" /> :
                             src.type === "correction" ? <CheckSquare className="h-2.5 w-2.5" /> :
                             <TrendingUp className="h-2.5 w-2.5" />}
                            {src.label}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Suggested outline */}
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Suggested Outline</p>
                      <ol className="list-decimal list-inside text-xs text-foreground space-y-0.5">
                        {idea.suggestedOutline.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ol>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Document Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold leading-snug pr-8">{selected?.title}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className={`text-xs ${typeColors[selected.type]}`}>{selected.type.replace("_", " ")}</Badge>
                <Badge variant="secondary" className="text-xs">{selected.category}</Badge>
              </div>
              <p className="text-sm text-foreground">{selected.summary}</p>

              {/* File info */}
              {selected.fileName && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 border border-border">
                  <File className="h-4 w-4 text-primary" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">{selected.fileName}</p>
                    <p className="text-[10px] text-muted-foreground">{selected.fileSize}</p>
                  </div>
                  <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => toast({ title: "PDF viewer coming soon", description: "Will display the actual document content when connected to storage backend." })}>
                    <FileText className="h-3 w-3" /> View PDF
                  </Button>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-secondary/50 p-3 text-center">
                  <p className="font-mono text-lg font-bold text-foreground">{selected.referenceCount}</p>
                  <p className="text-[10px] text-muted-foreground">References</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3 text-center">
                  <p className="font-mono text-sm font-bold text-foreground">{new Date(selected.addedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</p>
                  <p className="text-[10px] text-muted-foreground">Added</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3 text-center">
                  <p className="font-mono text-sm font-bold text-foreground">{selected.lastReferenced ? new Date(selected.lastReferenced).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Never"}</p>
                  <p className="text-[10px] text-muted-foreground">Last Used</p>
                </div>
              </div>

              {/* Conversation cross-references */}
              {docConvRefs.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" /> Referenced in Conversations
                  </p>
                  <div className="space-y-1.5">
                    {docConvRefs.map((ref) => (
                      <div key={ref.conversationId} className="flex items-start gap-2 p-2 rounded-lg bg-secondary/30 border border-border text-xs">
                        <MessageSquare className="h-3 w-3 text-info shrink-0 mt-0.5" />
                        <div>
                          <p className="text-foreground font-medium">{ref.question}</p>
                          <p className="text-[10px] text-muted-foreground">{ref.userName} · {new Date(ref.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.tags.map((t) => (
                    <span key={t} className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex justify-end pt-2 border-t border-border">
                <Button variant="ghost" onClick={() => setSelected(null)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <input ref={fileInputRef} type="file" multiple accept=".pdf,.docx,.txt,.md,.doc" className="hidden" onChange={handleFileUpload} />
    </DashboardLayout>
  );
};

export default KnowledgeBase;
