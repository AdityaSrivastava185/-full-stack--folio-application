import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const aiStreamResponse = streamText({
      model: groq("openai/gpt-oss-120b"),
      prompt: `Summarise the following note in plain, easy-to-understand text.
      Rules 
      - Do not use Markdown.
      - Do not use **bold**, headings, bullet points, numbered lists, or special formatting.
      - Write naturally in short paragraphs.
      - Keep the summary concise and easy to read max 10 lines only.
      Note - ${prompt}`,
    });
    return aiStreamResponse.toUIMessageStreamResponse();
  } catch (error) {
    return NextResponse.json(
      "Something went wrong while generating the summary of the note",
      {
        status: 500,
      },
    );
  }
}
