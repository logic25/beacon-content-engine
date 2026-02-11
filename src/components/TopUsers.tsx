import { mockTopUsers } from "@/data/mockData";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function TopUsers() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="rounded-xl border border-border bg-card p-6 shadow-card"
    >
      <div className="flex items-center gap-2 mb-1">
        <Users className="h-4 w-4 text-chart-4" />
        <h3 className="font-mono text-sm font-semibold text-foreground">Most Active Users</h3>
      </div>
      <p className="mb-5 text-xs text-muted-foreground">By questions asked</p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs w-12">Rank</TableHead>
            <TableHead className="text-xs">User</TableHead>
            <TableHead className="text-xs text-right">Questions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockTopUsers.map((u) => (
            <TableRow key={u.rank}>
              <TableCell className="font-mono text-sm font-bold text-primary">{u.rank}</TableCell>
              <TableCell className="text-sm font-medium">{u.name}</TableCell>
              <TableCell className="text-right font-mono text-sm">{u.questionsAsked}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}
