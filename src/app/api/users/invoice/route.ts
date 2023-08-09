import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

// Define a function to generate the invoice HTML content
function generateInvoiceHtml(orderId: string /* ...other data... */): string {
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
            <!-- ...other invoice details... -->
          </div>
        </body>
      </html>
    `;
  return invoiceHtml;
}

export async function POST(req: NextRequest) {
  console.log("POST request", req);

  if (req.method === "POST") {
    try {
      // Extract order ID from the URL query parameters
      const url = new URL(req.url);
      const orderId = url.searchParams.get("id") || "defaultOrderId";
      console.log("Extracting order ID from URL", url.searchParams);
      // Generate the invoice PDF using Puppeteer
      const invoiceHtml = generateInvoiceHtml(orderId /* ...other data... */);
      const browser = await puppeteer.launch({
        headless: "new",
      });
      const page = await browser.newPage();
      console.log("Generated Invoice HTML:", invoiceHtml);
      await page.setContent(invoiceHtml);
      const pdfBuffer = await page.pdf();
      await browser.close();
      return new NextResponse(pdfBuffer, {
        headers: {
          "Content-Disposition": `attachment; filename="invoice_${orderId}.pdf"`,
          "Content-Type": "application/pdf",
        },
      });
    } catch (err) {
      console.error(err);
      return new NextResponse(
        "An error occurred while generating the invoice.",
        {
          status: 500,
        }
      );
    }
  }
}
