import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, AlertTriangle, Calendar, Zap, Clock } from "lucide-react";

interface Insight {
  id: number;
  title: string;
  description: string;
  type: "warning" | "trend" | "info" | "success";
  icon: React.ReactNode;
}

const insights: Insight[] = [
  {
    id: 1,
    title: "Failed queries up 40% this week",
    description: "2 failed queries this week vs. typical 1.2/week average. Both related to missing knowledge base entries.",
    type: "warning",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  {
    id: 2,
    title: "Zoning questions spike on Mondays",
    description: "62% of zoning queries come in on Mondays. Consider pre-loading zoning updates in the Monday digest.",
    type: "trend",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    id: 3,
    title: "3 corrections pending for 5+ days",
    description: "Suggestions from Sarah M., Mike T., and David L. are waiting for review in the Feedback queue.",
    type: "warning",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    id: 4,
    title: "Response time improved 8.5%",
    description: "Average response time dropped to 2.3s from 2.5s last month. P95 is now 4.1s.",
    type: "success",
    icon: <TrendingDown className="h-4 w-4" />,
  },
  {
    id: 5,
    title: "DHCR is your #1 topic",
    description: "25% of all queries are DHCR-related. Your rent stabilization blog post has 2,156 views — consider a follow-up.",
    type: "info",
    icon: <TrendingUp className="h-4 w-4" />,
  },
];

const typeStyles: Record<string, string> = {
  warning: "border-warning/30 bg-warning/5",
  trend: "border-info/30 bg-info/5",
  info: "border-chart-4/30 bg-chart-4/5",
  success: "border-success/30 bg-success/5",
};

const iconStyles: Record<string, string> = {
  warning: "text-warning",
  trend: "text-info",
  info: "text-chart-4",
  success: "text-success",
};

export default function SmartInsights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <Zap className="h-4 w-4 text-primary" />
        <h3 className="font-mono text-xs font-semibold text-foreground uppercase tracking-wider">AI Insights</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {insights.map((insight, i) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
            className={`rounded-xl border p-4 transition-all hover:shadow-card-hover cursor-default ${typeStyles[insight.type]}`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 ${iconStyles[insight.type]}`}>{insight.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground leading-snug">{insight.title}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{insight.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
