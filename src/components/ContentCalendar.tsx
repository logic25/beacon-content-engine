import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CalendarEvent {
  id: number;
  date: string;
  title: string;
  type: "blog_post" | "newsletter" | "digest";
  status: "published" | "scheduled" | "draft";
}

const calendarEvents: CalendarEvent[] = [
  { id: 1, date: "2026-01-28", title: "How to Navigate the New Alt-1 Filing Process", type: "blog_post", status: "published" },
  { id: 2, date: "2026-01-31", title: "January 2026 Regulatory Roundup", type: "newsletter", status: "published" },
  { id: 3, date: "2026-01-31", title: "Weekly Digest — Jan 27-31", type: "digest", status: "published" },
  { id: 4, date: "2026-02-03", title: "Understanding Rent Stabilization Changes", type: "blog_post", status: "published" },
  { id: 5, date: "2026-02-05", title: "ECB Violation Penalty Guide: 2026", type: "blog_post", status: "draft" },
  { id: 6, date: "2026-02-07", title: "Beacon Weekly — Feb 3-7", type: "newsletter", status: "published" },
  { id: 7, date: "2026-02-07", title: "Weekly Digest — Feb 3-7", type: "digest", status: "published" },
  { id: 8, date: "2026-02-10", title: "Beacon Weekly — Feb 10-14", type: "newsletter", status: "draft" },
  { id: 9, date: "2026-02-14", title: "Weekly Digest — Feb 10-14", type: "digest", status: "scheduled" },
  { id: 10, date: "2026-02-17", title: "NYC DOB Alt-2 Filing Updates", type: "blog_post", status: "scheduled" },
  { id: 11, date: "2026-02-21", title: "Beacon Weekly — Feb 17-21", type: "newsletter", status: "scheduled" },
  { id: 12, date: "2026-02-28", title: "February 2026 Regulatory Roundup", type: "newsletter", status: "scheduled" },
];

const typeColors: Record<string, string> = {
  blog_post: "bg-info",
  newsletter: "bg-primary",
  digest: "bg-success",
};

const typeLabelColors: Record<string, string> = {
  blog_post: "bg-info/10 text-info",
  newsletter: "bg-primary/10 text-primary",
  digest: "bg-success/10 text-success",
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ContentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // Feb 2026
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = "2026-02-11";

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getEventsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return calendarEvents.filter((e) => e.date === dateStr);
  };

  const selectedEvents = selectedDate ? calendarEvents.filter((e) => e.date === selectedDate) : [];

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono text-sm font-semibold text-foreground">
          {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h3>
        <div className="flex gap-1">
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={prevMonth}><ChevronLeft className="h-4 w-4" /></Button>
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={nextMonth}><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><span className="h-2.5 w-2.5 rounded-full bg-info" /> Blog Post</div>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><span className="h-2.5 w-2.5 rounded-full bg-primary" /> Newsletter</div>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><span className="h-2.5 w-2.5 rounded-full bg-success" /> Digest</div>
      </div>

      {/* Calendar Grid */}
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="grid grid-cols-7">
          {DAYS.map((day) => (
            <div key={day} className="px-2 py-2 text-center text-[10px] font-semibold text-muted-foreground border-b border-border bg-secondary/30">
              {day}
            </div>
          ))}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[80px] border-b border-r border-border bg-secondary/10" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const events = getEventsForDate(day);
            const isToday = dateStr === today;
            return (
              <button
                key={day}
                onClick={() => events.length > 0 && setSelectedDate(dateStr)}
                className={`min-h-[80px] border-b border-r border-border p-1.5 text-left transition-colors ${
                  events.length > 0 ? "hover:bg-secondary/50 cursor-pointer" : "cursor-default"
                } ${isToday ? "bg-primary/5" : ""}`}
              >
                <span className={`text-xs font-medium ${isToday ? "text-primary font-bold" : "text-foreground"}`}>{day}</span>
                <div className="mt-1 space-y-0.5">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-center gap-1">
                      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${typeColors[event.type]} ${event.status === "draft" ? "opacity-50" : ""}`} />
                      <span className="text-[9px] text-muted-foreground truncate">{event.title.slice(0, 20)}</span>
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Date Detail Dialog */}
      <Dialog open={!!selectedDate} onOpenChange={(open) => { if (!open) setSelectedDate(null); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-sm">
              {selectedDate && new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {selectedEvents.map((event) => (
              <div key={event.id} className="rounded-lg border border-border p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className={`text-[10px] ${typeLabelColors[event.type]}`}>
                    {event.type.replace("_", " ")}
                  </Badge>
                  <Badge variant="secondary" className={`text-[10px] ${
                    event.status === "published" ? "bg-success/10 text-success" : event.status === "scheduled" ? "bg-info/10 text-info" : "bg-warning/10 text-warning"
                  }`}>
                    {event.status}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-foreground">{event.title}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
