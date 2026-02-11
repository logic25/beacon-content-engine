import { mockFailedQueries } from "@/data/mockData";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function FailedQueries() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="rounded-xl border border-border bg-card p-6 shadow-card"
    >
      <div className="flex items-center gap-2 mb-1">
        <AlertTriangle className="h-4 w-4 text-destructive" />
        <h3 className="font-mono text-sm font-semibold text-foreground">Failed Queries</h3>
      </div>
      <p className="mb-5 text-xs text-muted-foreground">Need attention</p>

      {mockFailedQueries.length === 0 ? (
        <p className="text-sm text-success">No failed queries — great job!</p>
      ) : (
        <div className="space-y-3">
          {mockFailedQueries.map((q) => (
            <div key={q.id} className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
              <p className="text-sm font-medium text-foreground">{q.question}</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground/70">{q.userName}</span>
                <span>·</span>
                <span>{new Date(q.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</span>
              </div>
              <p className="mt-2 text-xs text-destructive">{q.reason}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
