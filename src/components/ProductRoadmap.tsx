import { useState } from "react";
import { mockRoadmap as initialRoadmap, RoadmapItem } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { X, Edit3, ArrowRight } from "lucide-react";

const statusStyles: Record<string, string> = {
  shipped: "bg-success/10 text-success",
  in_progress: "bg-warning/10 text-warning",
  planned: "bg-info/10 text-info",
  backlog: "bg-muted text-muted-foreground",
};

const statusLabels: Record<string, string> = {
  shipped: "✅ Shipped",
  in_progress: "🚧 In Progress",
  planned: "📅 Planned",
  backlog: "📋 Backlog",
};

const priorityStyles: Record<string, string> = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-warning/10 text-warning",
  low: "bg-muted text-muted-foreground",
};

export default function ProductRoadmap() {
  const [items, setItems] = useState<RoadmapItem[]>([...initialRoadmap]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [selected, setSelected] = useState<RoadmapItem | null>(null);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<RoadmapItem>>({});
  const { toast } = useToast();

  const filtered = items.filter((item) => {
    if (statusFilter !== "all" && item.status !== statusFilter) return false;
    if (priorityFilter !== "all" && item.priority !== priorityFilter) return false;
    return true;
  });

  const statusCounts = {
    shipped: items.filter((i) => i.status === "shipped").length,
    in_progress: items.filter((i) => i.status === "in_progress").length,
    planned: items.filter((i) => i.status === "planned").length,
    backlog: items.filter((i) => i.status === "backlog").length,
  };

  const handleOpen = (item: RoadmapItem) => {
    setSelected(item);
    setEditForm({ ...item });
    setEditing(false);
  };

  const handleSave = () => {
    if (!selected || !editForm) return;
    setItems(items.map((i) => i.id === selected.id ? { ...i, ...editForm } as RoadmapItem : i));
    setSelected({ ...selected, ...editForm } as RoadmapItem);
    setEditing(false);
    toast({ title: "Item updated", description: `"${editForm.idea}" has been updated.` });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Status Summary Cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Object.entries(statusCounts).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setStatusFilter(statusFilter === status ? "all" : status)}
              className={`rounded-xl border p-4 text-center transition-all ${
                statusFilter === status
                  ? "border-primary bg-primary/5 shadow-card-hover"
                  : "border-border bg-card shadow-card hover:shadow-card-hover"
              }`}
            >
              <p className="font-mono text-2xl font-bold text-foreground">{count}</p>
              <p className="text-xs text-muted-foreground mt-1">{statusLabels[status]}</p>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-muted-foreground mr-1">Priority:</span>
          {["all", "high", "medium", "low"].map((p) => (
            <Button
              key={p}
              variant={priorityFilter === p ? "default" : "outline"}
              size="sm"
              className="h-7 text-xs capitalize"
              onClick={() => setPriorityFilter(p)}
            >
              {p === "all" ? "All" : p}
            </Button>
          ))}
          {(statusFilter !== "all" || priorityFilter !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-muted-foreground"
              onClick={() => { setStatusFilter("all"); setPriorityFilter("all"); }}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Cards */}
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl border border-border bg-card p-12 text-center shadow-card"
              >
                <p className="text-sm text-muted-foreground">No items match filters</p>
              </motion.div>
            ) : (
              filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-card-hover hover:border-primary/30 cursor-pointer"
                  onClick={() => handleOpen(item)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge variant="secondary" className={`text-[10px] ${statusStyles[item.status]}`}>
                          {statusLabels[item.status]}
                        </Badge>
                        <Badge variant="secondary" className={`text-[10px] ${priorityStyles[item.priority]}`}>
                          {item.priority} priority
                        </Badge>
                        {item.target && (
                          <span className="text-xs text-muted-foreground">Target: {item.target}</span>
                        )}
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">{item.idea}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Requested by {item.requestedBy}
                        {item.notes && <> · {item.notes}</>}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40 group-hover:text-primary transition-colors mt-1" />
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Detail/Edit Dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => { if (!open) { setSelected(null); setEditing(false); } }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base">
              {editing ? "Edit Roadmap Item" : "Roadmap Item"}
            </DialogTitle>
          </DialogHeader>

          {selected && !editing && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className={`text-xs ${statusStyles[selected.status]}`}>
                  {statusLabels[selected.status]}
                </Badge>
                <Badge variant="secondary" className={`text-xs ${priorityStyles[selected.priority]}`}>
                  {selected.priority} priority
                </Badge>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground">{selected.idea}</h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-secondary/50 p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Requested By</p>
                  <p className="text-sm font-medium text-foreground">{selected.requestedBy}</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Target</p>
                  <p className="text-sm font-medium text-foreground">{selected.target || "TBD"}</p>
                </div>
              </div>

              {selected.notes && (
                <div className="rounded-lg bg-secondary/50 p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Notes</p>
                  <p className="text-sm text-foreground">{selected.notes}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <Button variant="ghost" onClick={() => setSelected(null)}>Close</Button>
                <Button variant="outline" className="gap-1.5" onClick={() => setEditing(true)}>
                  <Edit3 className="h-4 w-4" /> Edit
                </Button>
              </div>
            </div>
          )}

          {selected && editing && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Idea</label>
                <Input
                  value={editForm.idea || ""}
                  onChange={(e) => setEditForm({ ...editForm, idea: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Status</label>
                  <Select value={editForm.status} onValueChange={(v) => setEditForm({ ...editForm, status: v as RoadmapItem["status"] })}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="backlog">📋 Backlog</SelectItem>
                      <SelectItem value="planned">📅 Planned</SelectItem>
                      <SelectItem value="in_progress">🚧 In Progress</SelectItem>
                      <SelectItem value="shipped">✅ Shipped</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Priority</label>
                  <Select value={editForm.priority} onValueChange={(v) => setEditForm({ ...editForm, priority: v as RoadmapItem["priority"] })}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">Target</label>
                <Input
                  value={editForm.target || ""}
                  onChange={(e) => setEditForm({ ...editForm, target: e.target.value })}
                  className="mt-1"
                  placeholder="e.g., Q2 2026"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">Notes</label>
                <Textarea
                  value={editForm.notes || ""}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <Button variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
