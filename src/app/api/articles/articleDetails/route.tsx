import { connect } from "@/dbConfig/dbConfig";
import Article from "@/models/articalModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Slug is required" });
    }

    const article = await Article.findOne({ id });

    if (!article) {
      return NextResponse.json({ error: "Article not found" });
    }

    return NextResponse.json(article);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message });
  }
}
