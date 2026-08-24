import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
    });

    return NextResponse.json({ reply: response.text });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process AI chat' }, { status: 500 });
  }
}
