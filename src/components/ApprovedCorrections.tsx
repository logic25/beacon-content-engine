import { mockApprovedCorrections } from "@/data/mockData";
import { motion } from "framer-motion";
import { CheckSquare } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ApprovedCorrections() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.55 }}
      className="rounded-xl border border-border bg-card p-6 shadow-card"
    >
      <div className="flex items-center gap-2 mb-1">
        <CheckSquare className="h-4 w-4 text-success" />
        <h3 className="font-mono text-sm font-semibold text-foreground">Approved Corrections History</h3>
      </div>
      <p className="mb-5 text-xs text-muted-foreground">Previously reviewed and applied corrections</p>

      {mockApprovedCorrections.length === 0 ? (
        <p className="text-sm text-muted-foreground">No approved corrections yet</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Date Approved</TableHead>
                <TableHead className="text-xs">Approved By</TableHead>
                <TableHead className="text-xs">What Was Wrong</TableHead>
                <TableHead className="text-xs">Correction Applied</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockApprovedCorrections.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(c.dateApproved).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </TableCell>
                  <TableCell className="text-sm font-medium">{c.approvedBy}</TableCell>
                  <TableCell className="text-xs text-destructive max-w-48">{c.whatWasWrong}</TableCell>
                  <TableCell className="text-xs text-success max-w-48">{c.correctionApplied}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </motion.div>
  );
}
