import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const keyId = process.env.RAZORPAY_KEY ?? "";
    console.log("keyId", keyId);
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const payment_capture = 1;
    const amount = 1;
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };
    try {
      const response = await razorpay.orders.create(options);
      const data = {
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      };
      return NextResponse.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

