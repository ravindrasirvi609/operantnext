import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import RazorpayTransaction from "@/models/transactionModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    // Fetch transactions for the user
    const transactions = await RazorpayTransaction.find({ user: userId });

    // Respond with the transactions
    return NextResponse.json(
      {
        message: "Transactions fetched successfully",
        transactions: transactions.map((transaction) => transaction.toObject()), // Convert to plain JavaScript objects
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
