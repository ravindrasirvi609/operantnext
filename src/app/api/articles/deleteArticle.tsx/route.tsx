import { connect } from "@/dbConfig/dbConfig";
import Article from "@/models/articalModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function DELETE(req: NextRequest) {
  try {
    const { slug } = await req.json();
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" });
    }

    const article = await Article.findOneAndDelete({ slug });

    if (!article) {
      return NextResponse.json({ error: "Article not found" });
    }

    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message });
  }
}
