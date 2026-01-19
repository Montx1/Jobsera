import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
    const { message } = await req.json()

    if (!message) return NextResponse.json({ error: "No message provided" }, { status: 400 })

    const apiKey = process.env.GEMINI_API_KEY
    const geminiModel = "gemini-2.5-flash"
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent`;

    const body = {
        contents: [
            { role: "user", parts: [{ text: message }]}
        ]
    }

    const response = await fetch(`${url}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(body)
    });

    const data = await response.json()
    if (!response.ok) return NextResponse.json({ error: data }, { status: 500 })
    
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log(text);
    return NextResponse.json({ reply: text || "No reply" });

}