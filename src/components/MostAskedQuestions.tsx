import { mockMostAsked } from "@/data/mockData";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function MostAskedQuestions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className="rounded-xl border border-border bg-card p-6 shadow-card"
    >
      <div className="flex items-center gap-2 mb-1">
        <HelpCircle className="h-4 w-4 text-info" />
        <h3 className="font-mono text-sm font-semibold text-foreground">Most Asked Questions</h3>
      </div>
      <p className="mb-5 text-xs text-muted-foreground">Top recurring questions</p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs w-12">Rank</TableHead>
            <TableHead className="text-xs">Question</TableHead>
            <TableHead className="text-xs text-right">Times Asked</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockMostAsked.map((q) => (
            <TableRow key={q.rank}>
              <TableCell className="font-mono text-sm font-bold text-primary">{q.rank}</TableCell>
              <TableCell className="text-sm">{q.question}</TableCell>
              <TableCell className="text-right font-mono text-sm font-medium">{q.timesAsked}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}
