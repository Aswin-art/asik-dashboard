import { NextRequest, NextResponse } from "next/server";
import { StreamChat } from "stream-chat";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const apiSecret = process.env.STREAM_API_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const { userId, userName } = await request.json();

    if (!userId || !userName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create token for both chat and video
    const chatClient = StreamChat.getInstance(apiKey, apiSecret);
    const token = chatClient.createToken(userId);

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error generating token:", error);
    return NextResponse.json({ error: "Failed to generate token" }, { status: 500 });
  }
}
