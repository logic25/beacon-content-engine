import { SourceTrailEntry } from "@/data/contentStore";
import { MessageSquare, FileText, CheckSquare, TrendingUp, Sparkles, ArrowRight } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  conversation: <MessageSquare className="h-3 w-3" />,
  document: <FileText className="h-3 w-3" />,
  correction: <CheckSquare className="h-3 w-3" />,
  trend: <TrendingUp className="h-3 w-3" />,
  ai_idea: <Sparkles className="h-3 w-3" />,
};

const colorMap: Record<string, string> = {
  conversation: "bg-info/10 text-info border-info/20",
  document: "bg-primary/10 text-primary border-primary/20",
  correction: "bg-chart-5/10 text-chart-5 border-chart-5/20",
  trend: "bg-warning/10 text-warning border-warning/20",
  ai_idea: "bg-chart-4/10 text-chart-4 border-chart-4/20",
};

export default function ContentSourceTrail({ sources }: { sources: SourceTrailEntry[] }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {sources.map((src, i) => (
        <span key={i} className="contents">
          <span
            className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-medium ${colorMap[src.type] || "bg-secondary text-secondary-foreground border-border"}`}
          >
            {iconMap[src.type] || <FileText className="h-3 w-3" />}
            <span className="max-w-[120px] truncate">{src.label}</span>
          </span>
          {i < sources.length - 1 && (
            <ArrowRight className="h-2.5 w-2.5 text-muted-foreground/40" />
          )}
        </span>
      ))}
    </div>
  );
}
