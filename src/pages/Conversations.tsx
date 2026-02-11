import DashboardLayout from "@/components/DashboardLayout";
import ChatInterface from "@/components/ChatInterface";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

const Conversations = () => {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <PageHeader
          title="Conversations"
          description="Chat with Beacon or browse past conversations"
          icon={<MessageSquare className="h-6 w-6 text-primary" />}
        />
        <ChatInterface />
      </motion.div>
    </DashboardLayout>
  );
};

export default Conversations;
