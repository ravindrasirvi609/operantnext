import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

const uploadMiddleware = async (req: NextRequest) => {
  if (
    req.method !== "POST" ||
    !req.headers.get("content-type")?.startsWith("multipart/form-data")
  ) {
    return NextResponse.next();
  }

  const formData = await req.formData();
  const files = formData.getAll("file");

  for (const file of files) {
    const fileName = file instanceof File ? file.name : "";
    const fileData = await new Blob([file]).arrayBuffer(); // Convert to ArrayBuffer
    const filePath = `./public/assets/uploads/${fileName}`;

    await fs.promises.writeFile(filePath, Buffer.from(fileData), "binary");
  }

  return NextResponse.next();
};

export default uploadMiddleware;
