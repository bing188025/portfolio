import axios from 'axios';
import { NextResponse } from 'next/server';

// GET /api/telegram/setup
// Call this once after you have sent any message to your bot.
// It returns your numeric chat ID to set as TELEGRAM_CHAT_ID in .env
export async function GET() {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    return NextResponse.json({
      success: false,
      message: 'TELEGRAM_BOT_TOKEN is not set in .env',
    }, { status: 400 });
  }

  try {
    const url = `https://api.telegram.org/bot${token}/getUpdates`;
    const res = await axios.get(url);

    if (!res.data.ok || res.data.result.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No updates found. Please send any message to your bot on Telegram first, then call this endpoint again.',
      }, { status: 404 });
    }

    // Extract unique senders from updates
    const chats = res.data.result.map((update) => ({
      chat_id: update.message?.chat?.id,
      username: update.message?.chat?.username,
      first_name: update.message?.chat?.first_name,
    })).filter((c) => c.chat_id);

    const latest = chats[chats.length - 1];

    return NextResponse.json({
      success: true,
      message: `Copy the chat_id below and set it as TELEGRAM_CHAT_ID in your .env file.`,
      chat_id: latest.chat_id,
      username: latest.username,
      first_name: latest.first_name,
      all_chats: chats,
    }, { status: 200 });
  } catch (error) {
    console.error('Telegram getUpdates error:', error.response?.data || error.message);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch updates from Telegram.',
      error: error.response?.data || error.message,
    }, { status: 500 });
  }
}
