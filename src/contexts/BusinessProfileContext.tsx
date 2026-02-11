import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface BusinessProfile {
  businessName: string;
  industry: string;
  targetAudience: string;
  completedOnboarding: boolean;
}

const defaultProfile: BusinessProfile = {
  businessName: "",
  industry: "",
  targetAudience: "",
  completedOnboarding: false,
};

const STORAGE_KEY = "beacon_business_profile";

function loadProfile(): BusinessProfile {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultProfile;
}

function saveProfile(profile: BusinessProfile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

interface BusinessProfileContextType {
  profile: BusinessProfile;
  updateProfile: (updates: Partial<BusinessProfile>) => void;
  resetProfile: () => void;
}

const BusinessProfileContext = createContext<BusinessProfileContextType | null>(null);

export function BusinessProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<BusinessProfile>(loadProfile);

  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  const updateProfile = (updates: Partial<BusinessProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const resetProfile = () => {
    setProfile(defaultProfile);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <BusinessProfileContext.Provider value={{ profile, updateProfile, resetProfile }}>
      {children}
    </BusinessProfileContext.Provider>
  );
}

export function useBusinessProfile() {
  const ctx = useContext(BusinessProfileContext);
  if (!ctx) throw new Error("useBusinessProfile must be used within BusinessProfileProvider");
  return ctx;
}
