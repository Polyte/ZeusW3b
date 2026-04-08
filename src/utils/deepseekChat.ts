import { projectId, publicAnonKey } from "./supabase/info";
import { ZEUSLABS_SITE_KNOWLEDGE } from "../constants/siteKnowledge";

export type ChatCompletionMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const MODEL = "deepseek-chat";

function systemPrompt(): string {
  return [
    "You are the ZeusLabs website assistant (AI). Answer visitor questions using the knowledge base below.",
    "If the knowledge base does not cover something, say you are not sure and suggest they use the Contact page or official channels.",
    "Stay concise (usually 2–5 short paragraphs unless the user asks for depth). Never invent concrete prices, signed contracts, or clients not implied by the knowledge base.",
    "You are not a replacement for human sales or legal advice.",
    "",
    "--- Knowledge base ---",
    ZEUSLABS_SITE_KNOWLEDGE,
  ].join("\n");
}

/** Map floating-chat UI messages to OpenAI-compatible roles (DeepSeek-compatible). */
export function buildZeusLabsChatMessages(
  uiMessages: { sender: "customer" | "support"; message: string }[],
): ChatCompletionMessage[] {
  const rest: ChatCompletionMessage[] = uiMessages.map((m) => ({
    role: m.sender === "customer" ? "user" : "assistant",
    content: m.message,
  }));
  return [{ role: "system", content: systemPrompt() }, ...rest];
}

export async function fetchDeepseekReply(
  messages: ChatCompletionMessage[],
): Promise<string> {
  const dev = import.meta.env.DEV;
  const url = dev
    ? "/api/deepseek-chat"
    : `https://${projectId}.supabase.co/functions/v1/make-server-62ba7f16/chat/ai`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (!dev) {
    headers.Authorization = `Bearer ${publicAnonKey}`;
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.6,
      max_tokens: 1024,
    }),
  });

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
    error?: { message?: string } | string;
  };

  const errBody = data.error;
  const errMsg =
    typeof errBody === "object" && errBody?.message
      ? errBody.message
      : typeof errBody === "string"
        ? errBody
        : undefined;

  if (!res.ok) {
    throw new Error(errMsg || `AI request failed (${res.status})`);
  }

  const content = data.choices?.[0]?.message?.content;
  if (typeof content !== "string" || !content.trim()) {
    throw new Error("Empty response from AI");
  }

  return content.trim();
}
