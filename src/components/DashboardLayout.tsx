import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart3, Lightbulb, MessageSquare, ChevronLeft, ChevronRight, ClipboardCheck, Map, Moon, Sun, BookOpen, Menu, X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import ActivityFeed from "@/components/ActivityFeed";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useBusinessProfile } from "@/contexts/BusinessProfileContext";

const navItems = [
  { label: "Analytics", icon: BarChart3, path: "/" },
  { label: "Conversations", icon: MessageSquare, path: "/conversations" },
  { label: "Feedback", icon: ClipboardCheck, path: "/feedback" },
  { label: "Content Engine", icon: Lightbulb, path: "/content" },
  { label: "Knowledge Base", icon: BookOpen, path: "/knowledge-base" },
  { label: "Roadmap", icon: Map, path: "/roadmap" },
];

function SidebarContent({ collapsed, location, onNavigate }: { collapsed: boolean; location: ReturnType<typeof useLocation>; onNavigate?: () => void }) {
  return (
    <nav className="flex-1 space-y-1 p-3">
      {navItems.map((item) => {
        const active = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        );
      })}
    </nav>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { resetProfile } = useBusinessProfile();
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Mobile layout
  if (isMobile) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card px-4">
          <div className="flex items-center gap-3">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="text-muted-foreground hover:text-foreground"><Menu className="h-5 w-5" /></button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex h-14 items-center gap-3 border-b border-border px-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg gradient-primary">
                    <span className="text-sm font-bold text-primary-foreground">B</span>
                  </div>
                  <span className="font-mono text-sm font-bold tracking-tight text-foreground">Beacon</span>
                </div>
                <SidebarContent collapsed={false} location={location} onNavigate={() => setMobileOpen(false)} />
                <div className="border-t border-border p-3 space-y-1">
                  <button
                    onClick={() => setDark((v) => !v)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  >
                    {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    <span>{dark ? "Light Mode" : "Dark Mode"}</span>
                  </button>
                  <button
                    onClick={() => { resetProfile(); setMobileOpen(false); }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Reset Onboarding</span>
                  </button>
                </div>
              </SheetContent>
            </Sheet>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-primary">
              <span className="text-xs font-bold text-primary-foreground">B</span>
            </div>
            <span className="font-mono text-sm font-bold text-foreground">Beacon</span>
          </div>
          <ActivityFeed collapsed={false} />
        </header>

        {/* Main content */}
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-4">
            {children}
          </div>
        </main>

        {/* Bottom navigation */}
        <nav className="sticky bottom-0 z-30 flex items-center justify-around border-t border-border bg-card py-2 px-1">
          {navItems.slice(0, 5).map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="truncate max-w-[56px]">{item.label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="flex min-h-screen bg-background">
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-y-0 left-0 z-30 flex flex-col border-r border-border bg-card"
      >
        <div className="flex h-16 items-center gap-3 border-b border-border px-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg gradient-primary">
            <span className="text-sm font-bold text-primary-foreground">B</span>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden whitespace-nowrap font-mono text-sm font-bold tracking-tight text-foreground"
              >
                Beacon
              </motion.span>
            )}
          </AnimatePresence>
          <div className="ml-auto">
            <ActivityFeed collapsed={collapsed} />
          </div>
        </div>

        <SidebarContent collapsed={collapsed} location={location} />

        <div className="border-t border-border p-3 space-y-1">
          <button
            onClick={() => setDark((v) => !v)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            {dark ? <Sun className="h-4 w-4 shrink-0" /> : <Moon className="h-4 w-4 shrink-0" />}
            <AnimatePresence>
              {!collapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-hidden whitespace-nowrap">
                  {dark ? "Light Mode" : "Dark Mode"}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            onClick={resetProfile}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <RotateCcw className="h-4 w-4 shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-hidden whitespace-nowrap">
                  Reset Onboarding
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="flex w-full items-center justify-center rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </motion.aside>

      <motion.main
        animate={{ marginLeft: collapsed ? 72 : 240 }}
        transition={{ duration: 0.2 }}
        className="flex-1 min-h-screen"
      >
        <div className="mx-auto max-w-7xl px-6 py-8">
          {children}
        </div>
      </motion.main>
    </div>
  );
}
