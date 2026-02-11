import { useState } from "react";
import { contentTemplates, ContentTemplate } from "@/data/contentTemplates";
import { motion } from "framer-motion";
import { Edit3, Eye, FileText, Save, X, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

interface ContentComposerProps {
  open: boolean;
  onClose: () => void;
  initialBody?: string;
  initialTitle?: string;
}

export default function ContentComposer({ open, onClose, initialBody = "", initialTitle = "" }: ContentComposerProps) {
  const [title, setTitle] = useState(initialTitle);
  const [category, setCategory] = useState("");
  const [audience, setAudience] = useState("");
  const [body, setBody] = useState(initialBody);
  const [showPreview, setShowPreview] = useState(false);
  const [templatePicker, setTemplatePicker] = useState(false);
  const { toast } = useToast();

  const applyTemplate = (template: ContentTemplate) => {
    setBody(template.structure);
    setTitle(template.name);
    setTemplatePicker(false);
  };

  const handleSave = () => {
    if (!title.trim() || !body.trim()) return;
    toast({
      title: "Draft saved ✅",
      description: `"${title}" saved to your content pipeline.`,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Edit3 className="h-5 w-5 text-primary" />
            Compose Blog Post
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4">
          {/* Meta fields */}
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Title</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Blog post title..." />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regulatory">Regulatory Update</SelectItem>
                  <SelectItem value="howto">How-To Guide</SelectItem>
                  <SelectItem value="casestudy">Case Study</SelectItem>
                  <SelectItem value="advisory">Client Advisory</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Target Audience</label>
              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger>
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="landlords">Landlords</SelectItem>
                  <SelectItem value="contractors">Contractors</SelectItem>
                  <SelectItem value="architects">Architects / Engineers</SelectItem>
                  <SelectItem value="tenants">Tenants</SelectItem>
                  <SelectItem value="team">Internal Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Template picker */}
          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setTemplatePicker(!templatePicker)}>
            <Layout className="h-3.5 w-3.5" /> Use Template
          </Button>

          {templatePicker && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
            >
              {contentTemplates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => applyTemplate(t)}
                  className="text-left rounded-lg border border-border p-3 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span>{t.icon}</span>
                    <span className="text-xs font-semibold text-foreground">{t.name}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground line-clamp-2">{t.description}</p>
                </button>
              ))}
            </motion.div>
          )}

          {/* Editor / Preview toggle */}
          <div className="flex items-center gap-2 border-b border-border pb-2">
            <Button
              variant={!showPreview ? "default" : "ghost"}
              size="sm"
              className="gap-1.5 h-7 text-xs"
              onClick={() => setShowPreview(false)}
            >
              <Edit3 className="h-3 w-3" /> Write
            </Button>
            <Button
              variant={showPreview ? "default" : "ghost"}
              size="sm"
              className="gap-1.5 h-7 text-xs"
              onClick={() => setShowPreview(true)}
            >
              <Eye className="h-3 w-3" /> Preview
            </Button>
            {category && (
              <Badge variant="secondary" className="ml-auto text-[10px]">{category}</Badge>
            )}
          </div>

          {!showPreview ? (
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="min-h-[350px] font-mono text-sm"
              placeholder="Write your content in Markdown..."
            />
          ) : (
            <div className="prose prose-sm max-w-none rounded-lg border border-border bg-secondary/30 p-6 min-h-[350px]">
              {body ? <ReactMarkdown>{body}</ReactMarkdown> : <p className="text-muted-foreground">Nothing to preview yet...</p>}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4 mt-4">
          <Button variant="ghost" onClick={onClose} className="gap-1.5">
            <X className="h-4 w-4" /> Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title.trim() || !body.trim()} className="gap-1.5">
            <Save className="h-4 w-4" /> Save as Draft
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
