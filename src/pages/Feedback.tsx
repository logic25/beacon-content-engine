import DashboardLayout from "@/components/DashboardLayout";
import FeedbackManager from "@/components/FeedbackManager";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";
import { ClipboardCheck } from "lucide-react";

const Feedback = () => {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <PageHeader
          title="Feedback & Corrections"
          description="Review team suggestions and correction history"
          icon={<ClipboardCheck className="h-6 w-6 text-primary" />}
        />
        <FeedbackManager />
      </motion.div>
    </DashboardLayout>
  );
};

export default Feedback;
