"use client";

import { Messages } from "openai/resources/chat/completions.mjs";
import { useState } from "react";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{user: string; bot?: string}[]>([]);

    const sendMessage = async () => {
        const actualInput = input + "Make your response be at most 50 words long, nothing longer than that";
        if (!input.trim()) return
        setMessages([...messages, { user: input}])
        setInput("");

        const res = await fetch('api/chat', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: actualInput })
        });

        const data = await res.json()
        setMessages([...messages, { user: input, bot: data.reply }])
    }

  return (
    <div className="flex flex-col h-2/5 border rounded">
        <div className="flex-1 overflow-y-auto mb-2">
            {messages.map((msg, i) => (
                <div key={i}>
                    <p><strong>You:</strong> {msg.user} </p>
                    {msg.bot && <p><strong>Jobina:</strong> {msg.bot}</p>}
                </div>
            ))}
        </div>

        <div className="flex gap-2 p-2 border-t">
            <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask something..."
            className="flex-1 border rounded px-2 py-1"
            />

            <button
            onClick={sendMessage}
            type="button"
            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded px-4 py-2"
            >
            Send
            </button>
        </div>
        
    </div>
  );
}
