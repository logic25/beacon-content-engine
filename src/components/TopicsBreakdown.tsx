import { mockTopics } from "@/data/mockData";
import { motion } from "framer-motion";

export default function TopicsBreakdown() {
  const maxCount = Math.max(...mockTopics.map((t) => t.count));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="rounded-xl border border-border bg-card p-6 shadow-card"
    >
      <h3 className="mb-1 font-mono text-sm font-semibold text-foreground">Questions by Topic</h3>
      <p className="mb-6 text-xs text-muted-foreground">Distribution across knowledge areas</p>
      <div className="space-y-3">
        {mockTopics.map((topic, i) => (
          <div key={topic.topic} className="group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-foreground">{topic.topic}</span>
              <span className="font-mono text-xs text-muted-foreground">
                {topic.count} <span className="text-muted-foreground/50">({topic.percentage}%)</span>
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(topic.count / maxCount) * 100}%` }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.05 }}
                className="h-full rounded-full"
                style={{ backgroundColor: topic.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
