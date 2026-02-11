import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { conversations, documents, corrections, mostAskedQuestions } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are the AI Cross-Reference Engine for Beacon, a content intelligence platform for professional service firms.

Your job: Analyze the intersection of team conversations, Knowledge Base documents, approved corrections, and question trends to generate actionable content ideas tailored to the firm's industry and audience.

For each idea, provide:
- A specific, SEO-friendly title
- Content type: "blog_post", "newsletter", or "training_material"
- Confidence score (0.0-1.0) based on data strength
- Estimated impact: "high", "medium", or "low"
- Clear reasoning citing specific data points
- Sources that informed this idea (reference the conversation/document/correction/trend by name)
- A suggested outline (4-6 bullet points)

Focus on:
1. Topics the team asks about repeatedly (knowledge gaps = content opportunities)
2. Recent corrections (if the team got it wrong, clients probably do too)
3. Cross-references between conversations and documents (patterns = thought leadership)
4. Timely industry updates that affect the firm's client base

Generate 3-5 high-quality content ideas relevant to the firm's specific industry and audience.`;

    const userPrompt = `Here's the current platform data to analyze:

## Most Asked Questions (Last 30 Days)
${mostAskedQuestions?.map((q: { question: string; timesAsked: number }, i: number) => `${i + 1}. "${q.question}" — asked ${q.timesAsked} times`).join("\n") || "No data"}

## Recent Team Conversations
${conversations?.map((c: { userName: string; question: string; topic: string; confidence: number }) => `- ${c.userName}: "${c.question}" [Topic: ${c.topic}, Confidence: ${Math.round(c.confidence * 100)}%]`).join("\n") || "No data"}

## Knowledge Base Documents (Top Referenced)
${documents?.map((d: { title: string; category: string; referenceCount: number; type: string }) => `- "${d.title}" [${d.category}] — ${d.referenceCount} references, type: ${d.type}`).join("\n") || "No data"}

## Approved Corrections
${corrections?.map((c: { whatWasWrong: string; correctionApplied: string; approvedBy: string }) => `- Was wrong: "${c.whatWasWrong}" → Now correct: "${c.correctionApplied}" (approved by ${c.approvedBy})`).join("\n") || "No data"}

Analyze these data points, find cross-references and patterns, and generate content ideas.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "return_content_ideas",
                description: "Return generated content ideas based on cross-reference analysis",
                parameters: {
                  type: "object",
                  properties: {
                    ideas: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          title: { type: "string", description: "SEO-friendly content title" },
                          type: { type: "string", enum: ["blog_post", "newsletter", "training_material"] },
                          confidence: { type: "number", description: "0.0-1.0 confidence score" },
                          estimatedImpact: { type: "string", enum: ["high", "medium", "low"] },
                          reasoning: { type: "string", description: "Why this content matters, citing specific data" },
                          sources: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                type: { type: "string", enum: ["conversation", "document", "correction", "trend"] },
                                label: { type: "string" },
                              },
                              required: ["type", "label"],
                              additionalProperties: false,
                            },
                          },
                          suggestedOutline: {
                            type: "array",
                            items: { type: "string" },
                            description: "4-6 outline items",
                          },
                        },
                        required: ["title", "type", "confidence", "estimatedImpact", "reasoning", "sources", "suggestedOutline"],
                        additionalProperties: false,
                      },
                    },
                  },
                  required: ["ideas"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: { type: "function", function: { name: "return_content_ideas" } },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits in Settings → Workspace → Usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      throw new Error("No tool call response from AI");
    }

    const parsed = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-content-ideas error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
