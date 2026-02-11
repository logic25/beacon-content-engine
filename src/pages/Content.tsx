import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ContentPipeline from "@/components/ContentPipeline";
import PublishedContentList from "@/components/PublishedContent";
import NewsletterEditions from "@/components/NewsletterEditions";
import ContentCalendar from "@/components/ContentCalendar";
import PageHeader from "@/components/PageHeader";
import { contentTemplates } from "@/data/contentTemplates";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Content = () => {
  const [activeTab, setActiveTab] = useState("pipeline");

  const handlePublish = () => {
    setActiveTab("published");
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <PageHeader
          title="Content Intelligence"
          description="AI-identified content opportunities from team questions and trends"
          icon={<Lightbulb className="h-6 w-6 text-primary" />}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="pipeline" className="gap-1.5">
              🔍 Pipeline
            </TabsTrigger>
            <TabsTrigger value="published" className="gap-1.5">
              📊 Published
            </TabsTrigger>
            <TabsTrigger value="newsletters" className="gap-1.5">
              📧 Newsletters
            </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-1.5">
              📅 Calendar
            </TabsTrigger>
            <TabsTrigger value="templates" className="gap-1.5">
              📐 Templates
              <Badge variant="secondary" className="ml-1 h-5 min-w-5 rounded-full px-1.5 text-[10px] bg-primary/10 text-primary">{contentTemplates.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline">
            <ContentPipeline onPublish={handlePublish} />
          </TabsContent>

          <TabsContent value="published">
            <PublishedContentList />
          </TabsContent>

          <TabsContent value="newsletters">
            <NewsletterEditions />
          </TabsContent>

          <TabsContent value="calendar">
            <ContentCalendar />
          </TabsContent>

          <TabsContent value="templates">
            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-gradient-to-br from-card to-primary/5 p-5 shadow-card">
                <h3 className="font-mono text-sm font-semibold text-foreground mb-1">Content Templates</h3>
                <p className="text-xs text-muted-foreground">
                  Pre-built structures for common content types. Select one when composing new content to get a head start.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {contentTemplates.map((template, i) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{template.icon}</span>
                      <h4 className="text-sm font-semibold text-foreground">{template.name}</h4>
                    </div>
                    <Badge variant="secondary" className="text-[10px] mb-2">{template.category}</Badge>
                    <p className="text-xs text-muted-foreground mb-3">{template.description}</p>
                    <div className="rounded-lg bg-secondary/50 border border-border p-3 max-h-32 overflow-y-auto">
                      <pre className="text-[10px] text-muted-foreground whitespace-pre-wrap font-mono">{template.structure.slice(0, 200)}...</pre>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </DashboardLayout>
  );
};

export default Content;
