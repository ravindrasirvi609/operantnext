import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

// Define a function to generate the invoice HTML content
function generateInvoiceHtml(orderId: string /* ...other data... */): string {
  // Your logic to generate the invoice HTML content
  // Make sure to replace this with your actual HTML template
  const invoiceHtml = `
    <html>
      <head>
        <!-- Your HTML head content -->
      </head>
      <body>
        <!-- Your HTML body content -->
        <h1>Invoice for Order ${orderId}</h1>
        <!-- ...other invoice details... -->
      </body>
    </html>
  `;
  return invoiceHtml;
}

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      // Extract order ID from the URL query parameters
      const url = new URL(req.url);
      const orderId = url.searchParams.get("id") || "defaultOrderId"; // Replace with your logic to get the order ID
      console.log("Extracting order ID from URL", url.searchParams);

      // Generate the invoice PDF using Puppeteer
      const invoiceHtml = generateInvoiceHtml(orderId /* ...other data... */);

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(invoiceHtml);

      const pdfBuffer = await page.pdf();

      await browser.close();

      // Attach the PDF buffer to the response
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
