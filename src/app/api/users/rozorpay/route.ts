import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";

export async function POST(req: NextRequest) {
  console.log(req);

  if (req.method === "POST") {
    const keyId = process.env.RAZORPAY_KEY ?? "";
    console.log("keyId", keyId);

    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    console.log("razorpay", razorpay);

    // Create an order -> generate the OrderID -> Send it to the Front-end
    // Also, check the amount and currency on the backend (Security measure)
    const payment_capture = 1;
    const amount = 499;
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      console.log("---------------------------------------------------", response);
      const data = {
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      };
      console.log("data", data);

      return NextResponse.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
      console.log(err);
    }
  } else {

  }
}