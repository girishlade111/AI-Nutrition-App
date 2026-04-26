import { fetchWithRetry } from "./fetchWithRetry";

export interface GeminiPayload {
    contents: Array<{
        parts: Array<{ text: string }>;
    }>;
    systemInstruction?: {
        parts: Array<{ text: string }>;
    };
}

export interface GeminiResponse {
    candidates?: Array<{
        content: {
            parts: Array<{ text: string }>;
        };
    }>;
    error?: {
        message: string;
        code: number;
    };
}

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function callGemini(payload: GeminiPayload, apiKey?: string): Promise<string> {
    const key = apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

    if (!key) {
        throw new Error("Gemini API key is not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY.");
    }

    const url = `${GEMINI_API_BASE}?key=${key}`;

    const response = await fetchWithRetry<GeminiResponse>(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (response.error) {
        throw new Error(`Gemini API error: ${response.error.message} (code: ${response.error.code})`);
    }

    if (!response.candidates || response.candidates.length === 0) {
        throw new Error("No response candidates from Gemini API.");
    }

    const text = response.candidates[0].content.parts[0].text;
    return text;
}
