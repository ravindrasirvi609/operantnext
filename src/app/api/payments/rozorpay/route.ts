import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const keyId = process.env.RAZORPAY_KEY ?? "";
    const requestBody = await req.json();
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const payment_capture = requestBody.payment_capture;
    const amount = requestBody.amount;
    const currency = requestBody.currency;
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
