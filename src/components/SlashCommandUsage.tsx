import { mockSlashCommands } from "@/data/mockData";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export default function SlashCommandUsage() {
  const maxUses = Math.max(...mockSlashCommands.map((c) => c.uses));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="rounded-xl border border-border bg-card p-6 shadow-card"
    >
      <div className="flex items-center gap-2 mb-1">
        <Terminal className="h-4 w-4 text-primary" />
        <h3 className="font-mono text-sm font-semibold text-foreground">Slash Command Usage</h3>
      </div>
      <p className="mb-5 text-xs text-muted-foreground">Command usage across all spaces</p>
      <div className="space-y-3">
        {mockSlashCommands.map((cmd, i) => (
          <div key={cmd.command} className="group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-sm font-medium text-foreground">{cmd.command}</span>
              <span className="font-mono text-xs text-muted-foreground">{cmd.uses} uses</span>
            </div>
            <div className="h-2 w-full rounded-full bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(cmd.uses / maxUses) * 100}%` }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.05 }}
                className="h-full rounded-full bg-primary"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
