import React, { useState } from "react";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const sendPrompt = async () => {
    if (!prompt.trim()) return;
    const userMsg = { from: "user", text: prompt };
    setMessages((m) => [...m, userMsg]);
    setPrompt("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMsg.text }),
      });

      if (!res.ok) throw new Error(`AI endpoint returned ${res.status}`);

      const data = await res.json();
      const reply = data?.reply ?? data?.text ?? null;

      if (reply) {
        const aiMsg = { from: "ai", text: reply };
        setMessages((m) => [...m, aiMsg]);
      } else {
        const fallback = {
          from: "ai",
          text: `Sorry, I couldn't understand the AI response.`,
        };
        setMessages((m) => [...m, fallback]);
      }
    } catch (err) {
      const aiText = `AI (offline): I received "${userMsg.text}" — try wiring your /api/ai endpoint to an AI service.`;
      const aiMsg = { from: "ai", text: aiText };
      setMessages((m) => [...m, aiMsg]);
      console.error("AI request failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendPrompt();
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.title}>PitchCraft Assistant</div>
          <div className={styles.subtitle}>
            One input to get a short business-pitch suggestion
          </div>
        </header>

        <section className={styles.chatArea} aria-live="polite">
          {messages.length === 0 && (
            <div className={styles.empty}>
              Type something to get started — e.g. "food delivery for offices"
            </div>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={m.from === "user" ? styles.userMsg : styles.aiMsg}
            >
              {m.text}
            </div>
          ))}
        </section>

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            sendPrompt();
          }}
        >
          <textarea
            className={styles.input}
            placeholder="Enter your idea, product, or problem..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
          />
          <div className={styles.controls}>
            <button type="submit" className={styles.sendBtn} disabled={loading}>
              {loading ? "Thinking…" : "Send"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
