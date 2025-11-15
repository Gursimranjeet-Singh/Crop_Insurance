import React, { useState, useRef, useEffect } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

 
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {

      const payload = messages
        .map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        }))
        .concat({ role: "user", content: input });

      const res = await fetch("https://turbo-potato-9pr6jrjjgppf74xx-3000.app.github.dev/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });

      const data = await res.json();
      const botMessage = { sender: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage = { sender: "bot", text: "Failed to connect to server." };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f7f9f7" 
    }}>

      <div style={{
        backgroundColor: "#1f6212", 
        color: "white",
        padding: "1rem",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "1.2rem"
      }}>
        Krishi Chatbot - Ask about Crops & Farming
      </div>


      <div style={{
        flex: 1,
        padding: "1rem",
        overflowY: "auto"
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: m.sender === "user" ? "flex-end" : "flex-start",
            marginBottom: "0.5rem"
          }}>
            <div style={{
              backgroundColor: m.sender === "user" ? "#d9f0d9" : "#ffffff",
              color: "#000",
              padding: "0.5rem 1rem",
              borderRadius: "10px",
              maxWidth: "60%",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{
        display: "flex",
        padding: "0.5rem",
        borderTop: "1px solid #ccc",
        backgroundColor: "#eaf2e6"
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "0.5rem 1rem",
            borderRadius: "20px",
            border: "1px solid #ccc",
            outline: "none"
          }}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: "0.5rem",
            padding: "0.5rem 1rem",
            borderRadius: "20px",
            border: "none",
            backgroundColor: "#1f6212",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
