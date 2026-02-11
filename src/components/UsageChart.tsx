import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { mockDailyUsage } from "@/data/mockData";
import { motion } from "framer-motion";

export default function UsageChart() {
  const data = mockDailyUsage.map((d) => ({
    ...d,
    date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-xl border border-border bg-card p-6 shadow-card"
    >
      <h3 className="mb-1 font-mono text-sm font-semibold text-foreground">Daily Usage</h3>
      <p className="mb-6 text-xs text-muted-foreground">Questions asked over the last 30 days</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(36, 95%, 50%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(36, 95%, 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAnswered" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 55%)" tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 55%)" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(220, 13%, 91%)",
                borderRadius: "8px",
                fontSize: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />
            <Area type="monotone" dataKey="queries" stroke="hsl(36, 95%, 50%)" strokeWidth={2} fill="url(#colorQueries)" />
            <Area type="monotone" dataKey="answered" stroke="hsl(142, 71%, 45%)" strokeWidth={2} fill="url(#colorAnswered)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
