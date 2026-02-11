import { useState } from "react";
import { Bell, CheckCircle, FileText, AlertTriangle, Mail, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ActivityEvent {
  id: number;
  type: "correction" | "content" | "failed" | "digest";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  navigateTo: string;
}

const initialEvents: ActivityEvent[] = [
  { id: 1, type: "correction", title: "Correction approved", description: "RGB rent increase rates updated by Manny", timestamp: "2026-02-10T14:30:00", read: false, navigateTo: "/feedback" },
  { id: 2, type: "content", title: "Blog post published", description: "Understanding Rent Stabilization Changes for 2026", timestamp: "2026-02-10T10:00:00", read: false, navigateTo: "/content" },
  { id: 3, type: "failed", title: "Failed query detected", description: "LIHTC allocation question — no sources found", timestamp: "2026-02-10T09:15:00", read: false, navigateTo: "/conversations" },
  { id: 4, type: "digest", title: "Weekly digest ready", description: "Feb 10-14 digest drafted with 3 items", timestamp: "2026-02-10T08:00:00", read: true, navigateTo: "/feedback" },
  { id: 5, type: "correction", title: "Correction submitted", description: "Sarah M. flagged TCO inspection info", timestamp: "2026-02-09T16:00:00", read: true, navigateTo: "/feedback" },
  { id: 6, type: "content", title: "Newsletter sent", description: "Beacon Weekly — Feb 3-7 sent to 1,258 recipients", timestamp: "2026-02-07T09:00:00", read: true, navigateTo: "/content" },
];

const typeIcons: Record<string, React.ReactNode> = {
  correction: <CheckCircle className="h-3.5 w-3.5 text-success" />,
  content: <FileText className="h-3.5 w-3.5 text-info" />,
  failed: <AlertTriangle className="h-3.5 w-3.5 text-destructive" />,
  digest: <Mail className="h-3.5 w-3.5 text-primary" />,
};

export default function ActivityFeed({ collapsed }: { collapsed: boolean }) {
  const [events, setEvents] = useState(initialEvents);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const unreadCount = events.filter((e) => !e.read).length;

  const markAllRead = () => setEvents(events.map((e) => ({ ...e, read: true })));

  const handleClick = (event: ActivityEvent) => {
    setEvents(events.map((e) => (e.id === event.id ? { ...e, read: true } : e)));
    setOpen(false);
    navigate(event.navigateTo);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="relative flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[9px] font-bold text-destructive-foreground">
              {unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start" side="right">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">Activity</h4>
          {unreadCount > 0 && (
            <Button size="sm" variant="ghost" className="h-6 text-[10px] text-muted-foreground" onClick={markAllRead}>
              Mark all read
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {events.map((event) => (
            <button
              key={event.id}
              onClick={() => handleClick(event)}
              className={`w-full text-left px-4 py-3 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors ${!event.read ? "bg-primary/5" : ""}`}
            >
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5">{typeIcons[event.type]}</div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium leading-snug ${!event.read ? "text-foreground" : "text-muted-foreground"}`}>{event.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{event.description}</p>
                  <p className="text-[9px] text-muted-foreground/60 mt-1">
                    {new Date(event.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                  </p>
                </div>
                {!event.read && <span className="h-2 w-2 rounded-full bg-primary mt-1 shrink-0" />}
              </div>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
