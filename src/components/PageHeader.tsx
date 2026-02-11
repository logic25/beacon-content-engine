import { ReactNode } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: ReactNode;
  showDateFilter?: boolean;
  showRefresh?: boolean;
}

export default function PageHeader({ title, description, icon, showDateFilter = true, showRefresh = true }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="flex items-center gap-2.5">
          {icon}
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        {showDateFilter && (
          <Select defaultValue="7d">
            <SelectTrigger className="h-9 w-[140px] text-xs">
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="lastmonth">Last Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        )}
        {showRefresh && (
          <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </Button>
        )}
      </div>
    </div>
  );
}
