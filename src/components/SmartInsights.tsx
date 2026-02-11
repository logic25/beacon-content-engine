import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, AlertTriangle, Calendar, Zap, Clock } from "lucide-react";
import { useIndustryData } from "@/hooks/useIndustryData";
import type { InsightData } from "@/data/industryProfiles";

const iconMap: Record<string, React.ReactNode> = {
  AlertTriangle: <AlertTriangle className="h-4 w-4" />,
  Calendar: <Calendar className="h-4 w-4" />,
  Clock: <Clock className="h-4 w-4" />,
  TrendingDown: <TrendingDown className="h-4 w-4" />,
  TrendingUp: <TrendingUp className="h-4 w-4" />,
};

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
  const { insights } = useIndustryData();

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
              <div className={`mt-0.5 ${iconStyles[insight.type]}`}>{iconMap[insight.iconName]}</div>
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
