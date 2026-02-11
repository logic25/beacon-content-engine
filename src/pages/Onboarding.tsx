import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Users, Target, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBusinessProfile } from "@/contexts/BusinessProfileContext";

const industries = [
  "Accounting & Tax",
  "Architecture & Engineering",
  "Consulting",
  "Financial Advisory",
  "Insurance",
  "IT Services",
  "Law Firm",
  "Marketing Agency",
  "Real Estate",
  "Recruiting & Staffing",
  "Other",
];

export default function OnboardingPage() {
  const { updateProfile } = useBusinessProfile();
  const [step, setStep] = useState(0);
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [customIndustry, setCustomIndustry] = useState("");
  const [targetAudience, setTargetAudience] = useState("");

  const handleComplete = () => {
    updateProfile({
      businessName,
      industry: industry === "Other" ? customIndustry : industry,
      targetAudience,
      completedOnboarding: true,
    });
  };

  const canProceed = [
    businessName.trim().length > 0,
    industry.length > 0 && (industry !== "Other" || customIndustry.trim().length > 0),
    targetAudience.trim().length > 0,
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary">
            <span className="text-xl font-bold text-primary-foreground">B</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome to Beacon</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Let's set up your content intelligence engine in 30 seconds.
          </p>
        </div>

        {/* Progress dots */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step ? "w-8 bg-primary" : i < step ? "w-2 bg-primary/60" : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Your Business</h2>
                  <p className="text-xs text-muted-foreground">What's your firm called?</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="businessName" className="text-sm font-medium">Business Name</Label>
                  <Input
                    id="businessName"
                    placeholder="e.g. Apex Advisory Group"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="mt-1.5"
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Industry</h2>
                  <p className="text-xs text-muted-foreground">This helps Beacon tailor content ideas to your niche.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {industries.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setIndustry(ind)}
                    className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-all text-left ${
                      industry === ind
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/40 hover:bg-secondary"
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
              {industry === "Other" && (
                <div className="mt-3">
                  <Input
                    placeholder="Describe your industry"
                    value={customIndustry}
                    onChange={(e) => setCustomIndustry(e.target.value)}
                    autoFocus
                  />
                </div>
              )}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Target Audience</h2>
                  <p className="text-xs text-muted-foreground">Who does your firm serve?</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="audience" className="text-sm font-medium">Describe your ideal clients</Label>
                  <Input
                    id="audience"
                    placeholder="e.g. Small business owners and startups in the US"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="mt-1.5"
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div className="mt-6 flex items-center justify-between">
            {step > 0 ? (
              <Button variant="ghost" size="sm" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            ) : (
              <div />
            )}
            {step < 2 ? (
              <Button
                size="sm"
                onClick={() => setStep(step + 1)}
                disabled={!canProceed[step]}
                className="gap-1.5"
              >
                Continue
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleComplete}
                disabled={!canProceed[step]}
                className="gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Launch Beacon
              </Button>
            )}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          You can change these settings anytime from the sidebar.
        </p>
      </motion.div>
    </div>
  );
}
