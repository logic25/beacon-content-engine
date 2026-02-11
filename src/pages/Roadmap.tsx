import DashboardLayout from "@/components/DashboardLayout";
import ProductRoadmap from "@/components/ProductRoadmap";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";
import { Map } from "lucide-react";

const Roadmap = () => {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <PageHeader
          title="Product Roadmap"
          description="Track feature requests and development progress"
          icon={<Map className="h-6 w-6 text-primary" />}
          showDateFilter={false}
        />

        <ProductRoadmap />
      </motion.div>
    </DashboardLayout>
  );
};

export default Roadmap;
