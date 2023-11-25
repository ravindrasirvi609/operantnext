import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import RazorpayTransaction from "@/models/transactionModel";
import { connect } from "@/dbConfig/dbConfig";

connect(); // Connect to MongoDB

// Define a function to generate the invoice HTML content
async function generateInvoiceHtml(orderId: string): Promise<string> {
  try {
    // Fetch data from RazorpayTransaction based on the provided order ID
    const transactionData = await RazorpayTransaction.findOne({
      orderId,
    }).exec();

    if (!transactionData) {
      throw new Error(`No transaction data found for order ID ${orderId}`);
    }

    const invoiceHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
    
        .invoice {
          max-width: 600px;
          margin: 20px auto;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        .invoice-header {
          text-align: center;
          background-color: #007bff;
          color: #fff;
          padding: 20px;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
    
        .invoice-details {
          padding: 20px;
        }
    
        .invoice-details p {
          margin: 5px 0;
        }
    
        .invoice-footer {
          text-align: center;
          padding: 20px;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          background-color: #007bff;
          color: #fff;
        }
      </style>
    </head>
    <body>
      <div class="invoice">
        <div class="invoice-header">
          <h1>Invoice for Order ${orderId}</h1>
          <p>Date: ${new Date().toLocaleDateString()}</p>
        </div>
        <div class="invoice-details">
          <p>Order ID: ${orderId}</p>
          <p>Payment ID: ${transactionData.paymentId}</p>
          <p>Signature: ${transactionData.signature}</p>
          <!-- Add other transaction details as needed -->
        </div>
        <div class="invoice-footer">
          <p>Thank you for your purchase!</p>
        </div>
      </div>
    </body>
    </html>
    
    `;

    return invoiceHtml;
  } catch (error) {
    console.error("Error generating invoice HTML:", error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    // Extract order ID from the request body
    const requestBody = await req.json();
    console.log("Request Body:", requestBody);

    // Validate request body and order ID
    if (!requestBody || !requestBody.orderId) {
      return NextResponse.json(
        { message: "Invalid request body. Missing order ID." },
        { status: 400 }
      );
    }

    const { orderId } = requestBody;

    // Generate the invoice HTML using transaction data
    const invoiceHtml = await generateInvoiceHtml(orderId);

    // Generate the invoice PDF using Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"], // Add this line for running in certain environments
    });
    const page = await browser.newPage();
    await page.setContent(invoiceHtml);
    const pdfBuffer = await page.pdf();
    console.log("PDF generated successfully", pdfBuffer);

    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Disposition": `attachment; filename="invoice_${orderId}.pdf"`,
        "Content-Type": "application/pdf",
      },
    });
  } catch (err) {
    console.error("Error generating invoice PDF:", err);
    return new NextResponse(
      "An error occurred while generating the invoice. Please try again.",
      {
        status: 500,
      }
    );
  }
}
