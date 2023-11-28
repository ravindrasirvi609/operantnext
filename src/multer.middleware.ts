import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

const processFileUpload = async (formData:any) => {
  const files = formData.getAll("profileImage");

  for (const file of files) {
    const fileName = file instanceof File ? file.name : "";
    const fileData = await new Blob([file]).arrayBuffer();
    const filePath = `./public/assets/uploads/${fileName}`;

    await fs.promises.writeFile(filePath, Buffer.from(fileData), "binary");
  }
};

const uploadMiddleware = async (req: any) => {
  try {
    if (
      req.method !== "POST" ||
      !req.headers.get("content-type")?.startsWith("multipart/form-data")
    ) {
      return NextResponse.next();
    }

    const formData = await req.formData();
    await processFileUpload(formData);

    return NextResponse.next();
  } catch (error) {
    console.error("Error in uploadMiddleware:", error);
    return new NextResponse("Error processing file upload", { status: 500 });
  }
};

export default uploadMiddleware;
