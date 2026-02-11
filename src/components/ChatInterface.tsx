import { useState, useRef, useEffect } from "react";
import { Conversation, Suggestion } from "@/data/mockData";
import { useIndustryData } from "@/hooks/useIndustryData";
import { suggestionsStore } from "@/data/suggestionsStore";
import { contentStore } from "@/data/contentStore";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, FileText, Flag, Edit3, Clock, Shield, Search, Plus, X, MessageSquare, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import ReactMarkdown from "react-markdown";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  sources?: string[];
  confidence?: number;
}

const topicColors: Record<string, string> = {
  DHCR: "bg-chart-4/10 text-chart-4",
  Zoning: "bg-info/10 text-info",
  DOB: "bg-primary/10 text-primary",
  Violations: "bg-destructive/10 text-destructive",
  "Certificate of Occupancy": "bg-success/10 text-success",
  MDL: "bg-chart-4/10 text-chart-4",
  General: "bg-muted text-muted-foreground",
};

// Mock responses based on keywords
function getMockResponse(question: string): { content: string; sources: string[]; confidence: number } {
  const q = question.toLowerCase();
  if (q.includes("dhcr") || q.includes("rent stab") || q.includes("rgb")) {
    return {
      content: "Under the Housing Stability and Tenant Protection Act (HSTPA), **high-rent vacancy deregulation has been eliminated**.\n\n### 2026 RGB Order\n- **1-year renewals**: 2.75% increase\n- **2-year renewals**: 5.25% increase\n\nPreferential rents are now the base for calculating increases. Landlords cannot revert to the legal regulated rent upon renewal.\n\n*Need more specific details? Ask me about IAIs, preferential rents, or deregulation history.*",
      sources: ["HSTPA 2019 Full Text", "RGB Order #58", "DHCR Operational Bulletin 2026-1"],
      confidence: 0.92,
    };
  }
  if (q.includes("zoning") || q.includes("far") || q.includes("medical office")) {
    return {
      content: "Medical offices are permitted in several zoning districts:\n\n### As-of-Right\n- **C1-1 through C1-5** — Under 10,000 sqft\n- **C2-1 through C2-5** — Any size\n- **C4, C5, C6** — Permitted\n\n### Special Permit Required\n- **C1 zones** — Over 10,000 sqft (BSA permit)\n- **M1 zones** — CPC special permit under ZR 42-10\n\nCheck for restrictive declarations on specific lots.",
      sources: ["NYC Zoning Resolution", "ZR 22-14", "DCP Zoning Handbook"],
      confidence: 0.85,
    };
  }
  if (q.includes("tco") || q.includes("certificate of occupancy")) {
    return {
      content: "To obtain a **Temporary Certificate of Occupancy (TCO)**:\n\n1. Complete all life-safety items\n2. Get partial inspection sign-offs\n3. Submit through **DOB NOW** with:\n   - Signed-off partial inspections\n   - Architect/engineer safety certification\n   - Outstanding items timeline\n4. Pay $100 initial + $100/month renewal\n5. Valid for **90 days**, max 4 renewals\n\n**Tip:** Submit at least 2 weeks before you need occupancy.",
      sources: ["DOB TCO Guidelines", "Admin Code 28-118.3.2"],
      confidence: 0.91,
    };
  }
  if (q.includes("violation") || q.includes("ecb") || q.includes("penalty")) {
    return {
      content: "### 2026 ECB Penalty Schedule\n\n| Violation | Fine |\n|---|---|\n| Work w/o Permit | $10,000 |\n| Failure to Maintain | $5,000 |\n| Unsafe Conditions | $15,000 |\n| After Hours Work | $2,500 |\n\n**Repeat offenders** face 2x-2.5x penalties within 18 months.\n\nTo contest: respond within **60 days** via payment, OATH hearing, or cure notice.",
      sources: ["ECB Penalty Schedule 2026", "OATH Hearing Guide"],
      confidence: 0.88,
    };
  }
  if (q.includes("alt-1") || q.includes("alt-2") || q.includes("permit")) {
    return {
      content: "### Alt-2 Filing Requirements (Updated Feb 2026)\n\n1. **Digital-only submission** through DOB NOW\n2. **Updated energy compliance forms** (ECC-2R)\n3. **Asbestos investigation** for pre-1985 buildings\n4. **Construction superintendent** for projects over $1M\n\nApplications before Feb 1 are grandfathered. Amendments after that date must comply.\n\n**Grace period ends March 15, 2026.**",
      sources: ["DOB Filing Requirements 2026", "Buildings Bulletin 2026-001"],
      confidence: 0.90,
    };
  }
  return {
    content: "I found some relevant information in the knowledge base, but I'm not fully confident in this answer.\n\nCould you provide more context? For example:\n- Which **specific regulation** are you asking about?\n- Is this for a **particular property** or general guidance?\n- Are you looking for **filing procedures** or **regulatory requirements**?\n\nI work best with questions about DOB procedures, DHCR/rent stabilization, zoning, violations, and building code.",
    sources: [],
    confidence: 0.45,
  };
}

export default function ChatInterface() {
  const isMobile = useIsMobile();
  const { conversations: industryConversations } = useIndustryData();
  const [conversations] = useState<Conversation[]>(industryConversations);
  const [activeConvId, setActiveConvId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [search, setSearch] = useState("");
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [flagDialog, setFlagDialog] = useState<{ messageId: string; type: "flag" | "suggest" } | null>(null);
  const [flagWrong, setFlagWrong] = useState("");
  const [flagCorrect, setFlagCorrect] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadConversation = (conv: Conversation) => {
    setActiveConvId(conv.id);
    setMessages([
      { id: `${conv.id}-q`, role: "user", content: conv.question, timestamp: conv.timestamp },
      { id: `${conv.id}-a`, role: "assistant", content: conv.fullResponse, timestamp: conv.timestamp, sources: conv.sources, confidence: conv.confidence },
    ]);
    if (isMobile) setShowSidebar(false);
  };

  const startNewChat = () => {
    setActiveConvId(null);
    setMessages([]);
    setInput("");
    if (isMobile) setShowSidebar(false);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setActiveConvId(null);

    setTimeout(() => {
      const response = getMockResponse(userMsg.content);
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now()}-resp`,
        role: "assistant",
        content: response.content,
        timestamp: new Date().toISOString(),
        sources: response.sources,
        confidence: response.confidence,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleFlag = () => {
    if (!flagDialog) return;
    const newSuggestion: Suggestion = {
      id: Date.now(),
      user: "Manny",
      when: new Date().toISOString(),
      wrongAnswer: flagWrong,
      correctAnswer: flagCorrect,
      status: "pending",
    };
    suggestionsStore.add(newSuggestion);
    setFlagDialog(null);
    setFlagWrong("");
    setFlagCorrect("");
    toast({
      title: flagDialog.type === "flag" ? "Flagged as incorrect ⚠️" : "Correction submitted ✅",
      description: "Added to Feedback queue for review.",
    });
  };

  const filteredConvs = conversations.filter((c) =>
    c.question.toLowerCase().includes(search.toLowerCase()) || c.topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-10rem)] rounded-xl border border-border bg-card shadow-card overflow-hidden">
      {/* Conversation Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isMobile ? "100%" : 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex flex-col border-r border-border bg-card ${isMobile ? "absolute inset-0 z-10" : ""}`}
          >
            <div className="p-3 border-b border-border space-y-2">
              <div className="flex items-center justify-between">
                <Button size="sm" className="gap-1.5 w-full" onClick={startNewChat}>
                  <Plus className="h-3.5 w-3.5" /> New Chat
                </Button>
                {isMobile && (
                  <Button size="icon" variant="ghost" className="ml-2 shrink-0" onClick={() => setShowSidebar(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <Input placeholder="Search conversations..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8 h-8 text-xs" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredConvs.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => loadConversation(conv)}
                  className={`w-full text-left rounded-lg p-3 transition-colors text-sm ${
                    activeConvId === conv.id ? "bg-primary/10 border border-primary/20" : "hover:bg-secondary border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Badge variant="secondary" className={`text-[9px] px-1 py-0 ${topicColors[conv.topic] || topicColors.General}`}>
                      {conv.topic}
                    </Badge>
                    {!conv.answered && <Badge variant="secondary" className="text-[9px] px-1 py-0 bg-destructive/10 text-destructive">Failed</Badge>}
                  </div>
                  <p className="text-xs font-medium text-foreground line-clamp-2 leading-snug">{conv.question}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{conv.userName} · {new Date(conv.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="h-12 border-b border-border flex items-center px-4 gap-3 shrink-0">
          {(!showSidebar || isMobile) && (
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setShowSidebar(true)}>
              <MessageSquare className="h-4 w-4" />
            </Button>
          )}
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md gradient-primary flex items-center justify-center">
              <Bot className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="font-mono text-sm font-semibold text-foreground">Beacon</span>
            <span className="text-[10px] text-muted-foreground">· Ready</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex-1 flex items-center justify-center h-full">
              <div className="text-center max-w-md">
                <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                  <Bot className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-mono text-lg font-bold text-foreground mb-2">Ask Beacon anything</h3>
                <p className="text-sm text-muted-foreground mb-6">I have access to DOB procedures, DHCR regulations, zoning rules, case studies, and communication templates.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {["What are the 2026 RGB rent increases?", "How do I file for a TCO?", "ECB penalty amounts for 2026?", "Zoning for medical offices in Brooklyn?"].map((q) => (
                    <button
                      key={q}
                      onClick={() => { setInput(q); }}
                      className="text-left rounded-lg border border-border p-3 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="h-7 w-7 rounded-md gradient-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
              )}
              <div className={`max-w-[80%] ${msg.role === "user" ? "order-first" : ""}`}>
                <div className={`rounded-xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "bg-secondary/50 border border-border"
                }`}>
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none text-foreground">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm">{msg.content}</p>
                  )}
                </div>

                {/* Sources & Actions for assistant messages */}
                {msg.role === "assistant" && (
                  <div className="mt-2 space-y-2">
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {msg.sources.map((src, i) => (
                          <span key={i} className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            <FileText className="h-2.5 w-2.5" /> {src}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      {msg.confidence && (
                        <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                          <Shield className="h-2.5 w-2.5" /> {Math.round(msg.confidence * 100)}% confidence
                        </span>
                      )}
                      <div className="flex gap-1 ml-auto">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 px-2 text-[10px] text-muted-foreground hover:text-primary"
                          onClick={() => {
                            contentStore.addFromConversation({
                              id: parseInt(msg.id) || Date.now(),
                              question: messages.find((m) => m.role === "user")?.content || "Team question",
                              sources: msg.sources || [],
                              topic: "General",
                              userName: "Team",
                            });
                            toast({ title: "Sent to Content Pipeline ✨", description: "This conversation has been added as a content candidate." });
                          }}
                        >
                          <Lightbulb className="h-2.5 w-2.5 mr-1" /> Turn into Content
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 px-2 text-[10px] text-muted-foreground hover:text-destructive"
                          onClick={() => { setFlagDialog({ messageId: msg.id, type: "flag" }); setFlagWrong(msg.content.slice(0, 100)); }}
                        >
                          <Flag className="h-2.5 w-2.5 mr-1" /> Flag
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 px-2 text-[10px] text-muted-foreground hover:text-info"
                          onClick={() => { setFlagDialog({ messageId: msg.id, type: "suggest" }); setFlagWrong(msg.content.slice(0, 100)); }}
                        >
                          <Edit3 className="h-2.5 w-2.5 mr-1" /> Suggest
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {msg.role === "user" && (
                <div className="h-7 w-7 rounded-md bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                  <User className="h-3.5 w-3.5 text-foreground" />
                </div>
              )}
            </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="h-7 w-7 rounded-md gradient-primary flex items-center justify-center shrink-0">
                <Bot className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <div className="rounded-xl bg-secondary/50 border border-border px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Beacon a question..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button type="submit" disabled={!input.trim() || isTyping} size="icon" className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-[10px] text-muted-foreground mt-2 text-center">
            Beacon searches 106+ indexed documents · Mock responses (ready for Python/Pinecone backend)
          </p>
        </div>
      </div>

      {/* Flag/Suggest Dialog */}
      <Dialog open={!!flagDialog} onOpenChange={(open) => { if (!open) setFlagDialog(null); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {flagDialog?.type === "flag" ? <Flag className="h-5 w-5 text-destructive" /> : <Edit3 className="h-5 w-5 text-info" />}
              {flagDialog?.type === "flag" ? "Flag as Incorrect" : "Suggest Correction"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-destructive uppercase tracking-wider mb-1.5 block">What was wrong?</label>
              <Textarea value={flagWrong} onChange={(e) => setFlagWrong(e.target.value)} placeholder="Describe what was incorrect..." className="min-h-[60px] text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-success uppercase tracking-wider mb-1.5 block">What should it say?</label>
              <Textarea value={flagCorrect} onChange={(e) => setFlagCorrect(e.target.value)} placeholder="Provide the correct answer..." className="min-h-[60px] text-sm" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setFlagDialog(null)}>Cancel</Button>
              <Button onClick={handleFlag} disabled={!flagWrong.trim() || !flagCorrect.trim()}>
                Submit to Feedback
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
