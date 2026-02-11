import { mockSuggestions } from "@/data/mockData";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, MessageSquareWarning } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function SuggestionsQueue() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className="rounded-xl border border-border bg-card p-6 shadow-card"
    >
      <div className="flex items-center gap-2 mb-1">
        <MessageSquareWarning className="h-4 w-4 text-warning" />
        <h3 className="font-mono text-sm font-semibold text-foreground">Suggestions Queue</h3>
      </div>
      <p className="mb-5 text-xs text-muted-foreground">{mockSuggestions.length} pending review</p>

      {mockSuggestions.length === 0 ? (
        <p className="text-sm text-muted-foreground">No pending suggestions</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">User</TableHead>
                <TableHead className="text-xs">When</TableHead>
                <TableHead className="text-xs">Wrong Answer</TableHead>
                <TableHead className="text-xs">Correct Answer</TableHead>
                <TableHead className="text-xs text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSuggestions.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="text-sm font-medium">{s.user}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(s.when).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </TableCell>
                  <TableCell className="text-xs text-destructive max-w-48 truncate">{s.wrongAnswer}</TableCell>
                  <TableCell className="text-xs text-success max-w-48 truncate">{s.correctAnswer}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-success hover:text-success">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive hover:text-destructive">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </motion.div>
  );
}
