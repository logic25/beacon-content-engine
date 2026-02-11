import DashboardLayout from "@/components/DashboardLayout";
import MetricCard from "@/components/MetricCard";
import UsageChart from "@/components/UsageChart";
import TopicsBreakdown from "@/components/TopicsBreakdown";
import SlashCommandUsage from "@/components/SlashCommandUsage";
import TopUsers from "@/components/TopUsers";
import PageHeader from "@/components/PageHeader";
import SmartInsights from "@/components/SmartInsights";
import { mockMetrics } from "@/data/mockData";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <PageHeader
          title="Analytics"
          description="Beacon bot performance · Auto-refreshes every 30 seconds"
          icon={<BarChart3 className="h-6 w-6 text-primary" />}
        />

        <SmartInsights />

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {mockMetrics.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <UsageChart />
          </div>
          <div className="lg:col-span-2">
            <TopicsBreakdown />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <TopUsers />
          <SlashCommandUsage />
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Index;
