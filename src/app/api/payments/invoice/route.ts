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
      <html>
        <head>
          <style>
            /* Your CSS styles */
            body {
              font-family: Arial, sans-serif;
            }
            .invoice-header {
              text-align: center;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <div class="invoice-header">
            <h1>Invoice for Order ${orderId}</h1>
          </div>
          <div class="invoice-details">
            <p>Order ID: ${orderId}</p>
            <p>Payment ID: ${transactionData.paymentId}</p>
            <p>Signature: ${transactionData.signature}</p>
            <!-- Add other transaction details as needed -->
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
