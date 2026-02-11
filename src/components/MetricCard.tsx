import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, MessageSquare, CheckCircle, Users, DollarSign, Clock, AlertCircle } from "lucide-react";
import type { MetricData } from "@/data/mockData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  CheckCircle,
  Users,
  DollarSign,
  Clock,
  AlertCircle,
};

export default function MetricCard({ metric, index }: { metric: MetricData; index: number }) {
  const Icon = iconMap[metric.icon] || MessageSquare;
  const trendPositive = metric.trend && metric.trend > 0;
  const trendNegative = metric.trend && metric.trend < 0;
  const trendNeutral = !metric.trend || metric.trend === 0;

  // For cost and response time, negative trend is good
  const invertTrend = metric.icon === "DollarSign" || metric.icon === "Clock";
  const isGood = invertTrend ? trendNegative : trendPositive;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-card-hover"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        {!trendNeutral && (
          <span
            className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
              isGood ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            }`}
          >
            {trendPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(metric.trend!)}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="font-mono text-2xl font-bold tracking-tight text-foreground">{metric.value}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{metric.label}</p>
        {metric.sublabel && <p className="mt-1 text-xs text-muted-foreground/70">{metric.sublabel}</p>}
      </div>
    </motion.div>
  );
}
