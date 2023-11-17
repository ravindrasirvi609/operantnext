import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import RazorpayTransaction from "@/models/transactionModel";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();
export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    // Extract transaction details from the request body

    const requestBody = await request.json();
    if (!requestBody) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }
    console.log("Request body", requestBody);

    const { orderId, paymentId, signature, amount, currency, status } =
      requestBody;

    // Create a new RazorpayTransaction document
    const razorpayTransaction = new RazorpayTransaction({
      orderId,
      paymentId,
      signature,
      amount,
      currency,
      status,
      user: userId,
    });

    // Save the transaction to the database
    await razorpayTransaction.save();

    // Respond with a success message
    return NextResponse.json(
      {
        message: "Razorpay transaction saved successfully",
        transaction: razorpayTransaction.toObject(), // Convert to plain JavaScript object
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
