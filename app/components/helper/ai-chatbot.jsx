"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BsStars } from "react-icons/bs";
import { IoClose, IoSend } from "react-icons/io5";

const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "Hi! I'm Kenzan's AI assistant. Ask me anything about his skills, experience, or projects!",
};

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Only send conversation history (exclude initial greeting for API)
      const apiMessages = updatedMessages
        .filter((m) => m !== INITIAL_MESSAGE)
        .map(({ role, content }) => ({ role, content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I'm having trouble responding right now. Please try again later.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="chatbot-toggle"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <IoClose size={24} />
        ) : (
          <BsStars size={24} />
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="flex items-center gap-2">
              <BsStars size={20} className="text-[#ff6b9d]" />
              <span className="font-semibold text-sm">Kenzan&apos;s AI Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <IoClose size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chatbot-bubble ${
                  msg.role === "user" ? "chatbot-bubble-user" : "chatbot-bubble-bot"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="chatbot-bubble chatbot-bubble-bot">
                <span className="chatbot-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-area">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Kenzan..."
              className="chatbot-input"
              maxLength={300}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="chatbot-send"
              aria-label="Send message"
            >
              <IoSend size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
