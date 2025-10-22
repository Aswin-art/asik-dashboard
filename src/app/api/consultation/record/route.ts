import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const video = formData.get("video") as File;
    const sessionId = formData.get("sessionId") as string;

    if (!video || !sessionId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Convert video to buffer
    const bytes = await video.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/recordings directory
    const uploadDir = join(process.cwd(), "public", "recordings");
    const filePath = join(uploadDir, `${sessionId}.webm`);

    // Create directory if it doesn't exist
    const { mkdir } = await import("fs/promises");
    await mkdir(uploadDir, { recursive: true });

    // Write file
    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      videoUrl: `/recordings/${sessionId}.webm`,
    });
  } catch (error) {
    console.error("Error uploading recording:", error);
    return NextResponse.json({ error: "Failed to upload recording" }, { status: 500 });
  }
}
