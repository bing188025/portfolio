import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Kenzan's AI assistant embedded in his portfolio website. You help visitors learn about Kenzan Umezaki — a Fullstack & AI/ML Developer with nine years of professional experience.

Key facts about Kenzan:
- Name: Kenzan Umezaki
- Role: Fullstack & AI/ML Developer
- Location: Nagasaki, Japan
- Email: saar54223@gmail.com
- GitHub: https://github.com/bing188025

Experience:
1. Lead AI & Blockchain Engineer at Spherium.Finance, Singapore (Sep 2024 - Present)
2. Frontend & Applied AI Engineer at Finatext, Japan (May 2021 - Sep 2024)
3. AI-Blockchain Research Developer at Plaid, Japan (Jan 2020 - Apr 2021)
4. Senior Full-Stack & AI Systems Developer at Finatext, Japan (Jan 2018 - Dec 2019)
5. Software Engineer Intern at Plaid, Japan (Jan 2017 - Jan 2018)

Skills: Python, TypeScript, JavaScript, React, Next.js, Vue, TensorFlow, PyTorch, Docker, AWS, PostgreSQL, MongoDB, GraphQL, Git, Go, Tailwind, Firebase, Nginx, MySQL, C++, Solidity, Rust, FastAPI, LangChain

Notable Projects:
1. Autonomous LLM Agent Platform – Multi-agent orchestration for on-chain transactions, smart contract auditing, and DeFi strategies using RAG with knowledge graphs.
2. DeFi Analytics & Sentiment Engine – Real-time analytics combining on-chain data with NLP-based market sentiment analysis and Solana trading hub in Rust.
3. AI-Powered Transaction Classifier – ML models for automated financial transaction classification serving millions of daily predictions.
4. On-Chain AI Inference Engine – Research combining AI inference with blockchain execution, RL-based models for NFT game economy balancing.
5. Voice AI Agent for Customer Support – Real-time voice AI with Whisper STT, fine-tuned LLMs, and ElevenLabs speech synthesis.

Kenzan specializes in bridging cutting-edge AI research and production-grade software, with deep expertise in fintech, DeFi, and blockchain.

Instructions:
- Be friendly, concise, and professional.
- Answer questions about Kenzan's background, skills, projects, and experience.
- If asked about something unrelated to Kenzan, politely redirect the conversation.
- If asked how to contact Kenzan, share his email or suggest using the contact form on the website.
- Keep responses brief (2-4 sentences) unless more detail is requested.`;

export async function POST(request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI service is not configured. Please set up OPENAI_API_KEY." },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenAI API error:", errorData);
      return NextResponse.json(
        { error: "Failed to get AI response" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
