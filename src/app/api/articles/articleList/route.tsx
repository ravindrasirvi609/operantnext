import { connect } from "@/dbConfig/dbConfig";
import Article from "@/models/articalModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
  try {
    const articles = await Article.find({});
    return NextResponse.json(articles);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message });
  }
}
