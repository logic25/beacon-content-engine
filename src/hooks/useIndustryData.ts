import { useMemo } from "react";
import { useBusinessProfile } from "@/contexts/BusinessProfileContext";
import { mapIndustryToKey, industryProfiles, IndustryProfile, InsightData } from "@/data/industryProfiles";
import {
  mockTopics,
  mockConversations,
  mockMostAsked,
  mockContentCandidates,
  mockSuggestions,
  mockFailedQueries,
  mockApprovedCorrections,
  mockPublishedContent,
  mockMetrics,
  mockDailyUsage,
  mockSlashCommands,
  mockTopUsers,
  mockRoadmap,
  mockGeneratedContent,
} from "@/data/mockData";

// Build the accounting profile from existing mock data
const accountingInsights: InsightData[] = [
  { id: 1, title: "Failed queries up 40% this week", description: "2 failed queries this week vs. typical 1.2/week average. Both related to missing knowledge base entries.", type: "warning", iconName: "AlertTriangle" },
  { id: 2, title: "Tax planning questions spike on Mondays", description: "62% of tax-related queries come in on Mondays. Consider pre-loading updates in the Monday digest.", type: "trend", iconName: "Calendar" },
  { id: 3, title: "3 corrections pending for 5+ days", description: "Suggestions from Sarah M., Mike T., and David L. are waiting for review in the Feedback queue.", type: "warning", iconName: "Clock" },
  { id: 4, title: "Response time improved 8.5%", description: "Average response time dropped to 2.3s from 2.5s last month. P95 is now 4.1s.", type: "success", iconName: "TrendingDown" },
  { id: 5, title: "Tax Planning is your #1 topic", description: "25% of all queries are tax-related. Your tax planning blog post has 2,156 views — consider a follow-up.", type: "info", iconName: "TrendingUp" },
];

const accountingProfile: IndustryProfile = {
  topics: mockTopics,
  conversations: mockConversations,
  mostAsked: mockMostAsked,
  contentCandidates: mockContentCandidates,
  suggestions: mockSuggestions,
  failedQueries: mockFailedQueries,
  approvedCorrections: mockApprovedCorrections,
  publishedContent: mockPublishedContent,
  insights: accountingInsights,
};

// Fill in the accounting profile
industryProfiles.accounting = accountingProfile;

export function useIndustryData() {
  const { profile } = useBusinessProfile();

  return useMemo(() => {
    const key = mapIndustryToKey(profile.industry || "");
    const industryData = industryProfiles[key] || accountingProfile;

    return {
      // Industry-specific data
      topics: industryData.topics,
      conversations: industryData.conversations,
      mostAsked: industryData.mostAsked,
      contentCandidates: industryData.contentCandidates,
      suggestions: industryData.suggestions,
      failedQueries: industryData.failedQueries,
      approvedCorrections: industryData.approvedCorrections,
      publishedContent: industryData.publishedContent,
      insights: industryData.insights,

      // Shared data (same across all industries)
      metrics: mockMetrics,
      dailyUsage: mockDailyUsage,
      slashCommands: mockSlashCommands,
      topUsers: mockTopUsers,
      roadmap: mockRoadmap,
      generatedContent: mockGeneratedContent,

      // Current industry key
      industryKey: key,
    };
  }, [profile.industry]);
}
