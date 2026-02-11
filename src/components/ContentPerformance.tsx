import { useIndustryData } from "@/hooks/useIndustryData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Eye, MousePointerClick, Share2 } from "lucide-react";
import { motion } from "framer-motion";

// Generate 30-day mock performance data
const performanceData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    views: Math.floor(Math.random() * 200) + 50 + (i > 20 ? 100 : 0),
    clicks: Math.floor(Math.random() * 40) + 10,
    shares: Math.floor(Math.random() * 10) + 2,
  };
});

export default function ContentPerformance() {
  const { publishedContent } = useIndustryData();
  const published = publishedContent.filter((c) => c.status === "published");
  const topPerforming = [...published].sort((a, b) => b.views - a.views).slice(0, 3);
  const needsAttention = [...published].sort((a, b) => a.views - b.views).slice(0, 2);

  return (
    <div className="space-y-6">
      {/* 30-day chart */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border bg-card p-5 shadow-card"
      >
        <h3 className="font-mono text-sm font-semibold text-foreground mb-1">30-Day Performance</h3>
        <p className="text-xs text-muted-foreground mb-4">Views, clicks, and shares across all published content</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="clicksGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} className="text-muted-foreground" />
              <YAxis tick={{ fontSize: 10 }} className="text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area type="monotone" dataKey="views" stroke="hsl(217, 91%, 60%)" fill="url(#viewsGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="clicks" stroke="hsl(142, 71%, 45%)" fill="url(#clicksGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Top Performing */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-border bg-card p-5 shadow-card"
        >
          <h3 className="font-mono text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-success" /> Top Performing
          </h3>
          <div className="space-y-3">
            {topPerforming.map((c) => (
              <div key={c.id} className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/10">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{c.title}</p>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-0.5"><Eye className="h-2.5 w-2.5" /> {c.views.toLocaleString()}</span>
                    <span className="flex items-center gap-0.5"><MousePointerClick className="h-2.5 w-2.5" /> {c.clicks}</span>
                    <span className="flex items-center gap-0.5"><Share2 className="h-2.5 w-2.5" /> {c.shares}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">Source: {c.generatedFrom}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Needs Attention */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-xl border border-border bg-card p-5 shadow-card"
        >
          <h3 className="font-mono text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-warning" /> Needs Attention
          </h3>
          <div className="space-y-3">
            {needsAttention.map((c) => (
              <div key={c.id} className="flex items-start gap-3 p-3 rounded-lg bg-warning/5 border border-warning/10">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{c.title}</p>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-0.5"><Eye className="h-2.5 w-2.5" /> {c.views.toLocaleString()}</span>
                    <span className="flex items-center gap-0.5"><MousePointerClick className="h-2.5 w-2.5" /> {c.clicks}</span>
                  </div>
                  <Badge variant="secondary" className="mt-1.5 text-[9px] bg-warning/10 text-warning">
                    {c.status === "draft" ? "Still in draft" : "Low engagement"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
