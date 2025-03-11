import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: "10mb",
  },
};

export async function POST(request) {
  const uploadDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll("files");

    for (const file of files) {
      if (file instanceof File) {
        const filePath = path.join(uploadDir, file.name);
        const fileBuffer = await file.arrayBuffer();
        fs.writeFileSync(filePath, Buffer.from(fileBuffer));
      }
    }

    return NextResponse.json({ message: "Files uploaded successfully!" });
  } catch (error) {
    console.error("Error uploading files:", error);
    return NextResponse.json(
      { message: "Error uploading files" },
      { status: 500 }
    );
  }
}
