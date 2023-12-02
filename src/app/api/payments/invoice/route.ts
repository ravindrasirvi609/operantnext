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

    // const invoiceHtml = `
    // <!DOCTYPE html>
    // <html lang="en">
    // <head>
    //   <meta charset="UTF-8">
    //   <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //   <style>
    //     body {
    //       font-family: 'Arial', sans-serif;
    //       margin: 0;
    //       padding: 0;
    //       background-color: #f4f4f4;
    //     }
    
    //     .invoice {
    //       max-width: 600px;
    //       margin: 20px auto;
    //       background-color: #fff;
    //       border-radius: 8px;
    //       box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    //     }
    
    //     .invoice-header {
    //       text-align: center;
    //       background-color: #007bff;
    //       color: #fff;
    //       padding: 20px;
    //       border-top-left-radius: 8px;
    //       border-top-right-radius: 8px;
    //     }
    
    //     .invoice-details {
    //       padding: 20px;
    //     }
    
    //     .invoice-details p {
    //       margin: 5px 0;
    //     }
    
    //     .invoice-footer {
    //       text-align: center;
    //       padding: 20px;
    //       border-bottom-left-radius: 8px;
    //       border-bottom-right-radius: 8px;
    //       background-color: #007bff;
    //       color: #fff;
    //     }
    //   </style>
    // </head>
    // <body>
    //   <div class="invoice">
    //     <div class="invoice-header">
    //       <h1>Invoice for Order ${orderId}</h1>
    //       <p>Date: ${new Date().toLocaleDateString()}</p>
    //     </div>
    //     <div class="invoice-details">
    //       <p>Order ID: ${orderId}</p>
    //       <p>Payment ID: ${transactionData.paymentId}</p>
    //       <p>Signature: ${transactionData.signature}</p>
    //       <!-- Add other transaction details as needed -->
    //     </div>
    //     <div class="invoice-footer">
    //       <p>Thank you for your purchase!</p>
    //     </div>
    //   </div>
    // </body>
    // </html>
    
    // `;

    const invoiceHtml = `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1, width=device-width" />

    <style>
    .bill-to {
      font-weight: 600;
    }
    .bill-to,
    .bill-to1 {
      position: relative;
      letter-spacing: 0.02em;
      line-height: 140%;
    }
    .contact {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: var(--gap-11xs);
    }
    .bill-to6 {
      position: relative;
      font-size: var(--font-size-3xs-6);
      letter-spacing: 0.02em;
      line-height: 120%;
    }
    .payment {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: var(--gap-11xs);
    }
    .ashishsharma-biolink-1-icon {
      position: relative;
      width: 72px;
      height: 72px;
      object-fit: cover;
    }
    .footer {
      position: absolute;
      bottom: 0;
      left: 0;
      border-top: 0.5px solid var(--color-darkgray);
      box-sizing: border-box;
      width: 612px;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
      padding: var(--padding-base) var(--padding-5xl);
      gap: var(--gap-5xl);
    }
    .title {
      position: relative;
      letter-spacing: -0.05em;
      line-height: 119%;
      font-weight: 600;
    }
    .from {
      margin: 0;
    }
    .subject {
      position: relative;
      font-size: var(--font-size-4xs);
      letter-spacing: 0.02em;
      line-height: 140%;
    }
    .sender {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding: var(--padding-5xl);
      gap: var(--gap-9xs);
    }
    .invoice-number-title,
    .issue-date-title {
      position: relative;
      letter-spacing: -0.03em;
      line-height: 120%;
      font-weight: 600;
      display: flex;
      align-items: center;
      width: 41.8px;
    }
    .issue-date-title {
      width: 46.6px;
    }
    .invoice-number-title-parent {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: var(--gap-8xs);
    }
    .invoice-number {
      position: relative;
      line-height: 120%;
    }
    .invoice-number-parent {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-start;
      gap: var(--gap-8xs);
      text-align: right;
    }
    .header,
    .invoice-details {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
    }
    .invoice-details {
      align-self: stretch;
      border-left: 0.5px solid var(--color-darkgray);
      justify-content: flex-start;
      padding: var(--padding-5xl);
      gap: var(--gap-17xl);
      font-size: var(--font-size-3xs-6);
    }
    .header {
      border-bottom: 0.5px solid var(--color-darkgray);
      box-sizing: border-box;
      width: 612px;
      justify-content: space-between;
    }
    .bill-to8,
    .total-due-title,
    .total-due-title1 {
      position: relative;
      letter-spacing: 0.02em;
      line-height: 140%;
      display: flex;
      align-items: center;
      width: 338px;
    }
    .total-due-title,
    .total-due-title1 {
      line-height: 120%;
      font-weight: 600;
      width: 200.3px;
    }
    .total-due-title1 {
      font-size: 27.55px;
      letter-spacing: -0.05em;
      line-height: 119%;
    }
    .total-due {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-start;
      gap: var(--gap-base);
      text-align: right;
      font-size: var(--font-size-2xs-6);
    }
    .client {
      width: 611.6px;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      padding: var(--padding-5xl) var(--padding-5xl) var(--padding-xs);
      box-sizing: border-box;
      font-size: var(--font-size-4xs);
    }
    .charges {
      position: relative;
      letter-spacing: 0.12em;
      line-height: 120%;
      text-transform: uppercase;
    }
    .deliverables,
    .quantity {
      border: 0.5px solid var(--color-darkgray);
      box-sizing: border-box;
      flex-direction: column;
      padding: var(--padding-xs) var(--padding-base);
    }
    .deliverables {
      width: 338.5px;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
    }
    .quantity {
      width: 113.5px;
    }
    .charges1,
    .index1,
    .quantity {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
    }
    .charges1 {
      border: 0.5px solid var(--color-darkgray);
      box-sizing: border-box;
      width: 113.5px;
      flex-direction: column;
      padding: var(--padding-xs) var(--padding-base);
      text-align: right;
    }
    .index1 {
      flex-direction: row;
      padding: 0 var(--padding-5xl);
      font-size: 7.95px;
    }
    .description,
    .title1 {
      position: relative;
      line-height: 120%;
    }
    .title1 {
      font-weight: 500;
    }
    .description {
      font-size: 7.95px;
      letter-spacing: 0.02em;
      display: none;
      opacity: 0.8;
    }
    .deliverables1,
    .title-description {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .title-description {
      justify-content: flex-start;
      gap: var(--gap-5xs);
    }
    .deliverables1 {
      align-self: stretch;
      border: 0.5px solid var(--color-darkgray);
      box-sizing: border-box;
      width: 338.5px;
      justify-content: center;
      padding: var(--padding-base);
    }
    .quantity3 {
      position: relative;
      letter-spacing: 0.12em;
      line-height: 120%;
      text-transform: uppercase;
      font-weight: 500;
    }
    .quantity2 {
      align-self: stretch;
      border: 0.5px solid var(--color-darkgray);
      box-sizing: border-box;
      width: 113.5px;
      flex-direction: column;
      justify-content: center;
      padding: var(--padding-base);
    }
    .charges2,
    .item,
    .quantity2 {
      display: flex;
      align-items: flex-start;
    }
    .charges2 {
      align-self: stretch;
      border: 0.5px solid var(--color-darkgray);
      box-sizing: border-box;
      width: 113.5px;
      flex-direction: column;
      justify-content: center;
      padding: var(--padding-base);
      text-align: right;
    }
    .item {
      flex-direction: row;
      justify-content: flex-start;
      padding: 0 var(--padding-5xl);
    }
    .description2 {
      align-self: stretch;
      position: relative;
      font-size: var(--font-size-4xs-5);
      letter-spacing: 0.02em;
      line-height: 12.5px;
      opacity: 0.8;
    }
    .charges4,
    .quantity6,
    .title-description2 {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }
    .title-description2 {
      gap: var(--gap-5xs);
    }
    .charges4,
    .quantity6 {
      border: 0.5px solid var(--color-darkgray);
      box-sizing: border-box;
      width: 113.5px;
      padding: var(--padding-base);
    }
    .charges4 {
      text-align: right;
    }
    .spacer {
      align-self: stretch;
      width: 338px;
    }
    .amount,
    .title5 {
      position: relative;
      line-height: 120%;
      font-weight: 500;
      display: flex;
      align-items: center;
      width: 90.7px;
      flex-shrink: 0;
    }
    .amount {
      color: var(--color-gray);
      text-align: right;
      width: 102.9px;
    }
    .total-row {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      justify-content: flex-start;
      gap: 1.91px;
    }
    .total-child {
      align-self: stretch;
      position: relative;
      border-top: 0.5px solid var(--color-darkgray);
      box-sizing: border-box;
      height: 0.5px;
    }
    .amount2,
    .title7 {
      position: relative;
      line-height: 120%;
      font-weight: 600;
      display: flex;
      align-items: center;
      width: 90.7px;
      flex-shrink: 0;
    }
    .amount2 {
      color: var(--color-gray);
      text-align: right;
      width: 102.9px;
    }
    .total7 {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      justify-content: flex-start;
      gap: 1.91px;
      font-size: var(--font-size-2xs-6);
    }
    .total6 {
      background-color: var(--color-white);
      border: 0.5px solid var(--color-darkgray);
      flex-direction: column;
      align-items: flex-start;
      padding: 15.24130630493164px;
      gap: var(--gap-3xs);
    }
    .auto-layout,
    .items-list,
    .total5,
    .total6 {
      display: flex;
      justify-content: flex-start;
    }
    .total5 {
      flex-direction: row;
      align-items: center;
      padding: 0 var(--padding-5xl);
      font-size: 9.53px;
      color: var(--color-black);
    }
    .auto-layout,
    .items-list {
      flex-direction: column;
      align-items: flex-start;
    }
    .items-list {
      padding: var(--padding-xs) 0 var(--padding-5xl);
      font-size: var(--font-size-2xs-6);
    }
    .auto-layout {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 24.96px;
    }
    .property-1default,
    .property-1variant2 {
      position: absolute;
      top: 20px;
      left: 20px;
      background-color: var(--color-white);
      width: 612px;
      height: 792px;
      overflow: hidden;
    }
    .property-1variant2 {
      top: 832px;
    }
    .invoice {
      position: relative;
      border-radius: 5px;
      border: 1px dashed #9747ff;
      box-sizing: border-box;
      width: 100%;
      height: 1644px;
      overflow: hidden;
      text-align: left;
      font-size: var(--font-size-4xs);
      color: var(--color-gray);
      font-family: var(--font-manrope);
    }
    
    </style>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap"
    />
  </head>
  <body>
    <div class="invoice">
      <div class="property-1default">
        <div class="footer">
          <div class="contact">
            <div class="bill-to">Contact:</div>
            <div class="bill-to1">Phone: +91 8107199052</div>
            <div class="bill-to1">Email: sirviravirandra609@gmail.com</div>
          </div>
          <div class="payment">
            <div class="bill-to">Payment:</div>
            <div class="bill-to1">Payable to Ravindra Choudhary</div>
            <div class="bill-to1">Account number, Bank</div>
            <div class="bill-to6">*Please make payment before due date</div>
          </div>
          <img
            class="ashishsharma-biolink-1-icon"
            alt=""
            src="./public/ashishsharmabiolink-1@2x.png"
          />
        </div>
        <div class="auto-layout">
          <div class="header">
            <div class="sender">
              <div class="title">Invoice</div>
              <div class="subject">
                <p class="from">
                  <b>From:</b>
                </p>
                <p class="from">Operant Pharmacy Federation</p>
                <p class="from">Pali Rajsthan</p>
              </div>
            </div>
            <div class="invoice-details">
              <div class="invoice-number-title-parent">
                <div class="invoice-number-title">Invoice #</div>
                <div class="issue-date-title">Issue Date</div>
                <div class="invoice-number-title">Due Date</div>
              </div>
              <div class="invoice-number-parent">
                <div class="invoice-number">DES00100</div>
                <div class="invoice-number">${new Date().toLocaleDateString()}</div>
                <div class="invoice-number">${new Date().toLocaleDateString()}</div>
              </div>
            </div>
          </div>
          <div class="client">
            <div class="contact">
              <div class="bill-to">Bill To:</div>
              <div class="bill-to8">Client Name</div>
              <div class="bill-to8">Client Address</div>
              <div class="bill-to8">
                Phone: [enter phone number], Email: [enter email address]
              </div>
            </div>
            <div class="total-due">
              <div class="total-due-title">Total Due:</div>
              <div class="total-due-title1">₹0</div>
            </div>
          </div>
          <div class="items-list">
            <div class="index1">
              <div class="deliverables">
                <b class="charges">deliverables</b>
              </div>
              <div class="quantity">
                <b class="charges">Quantity</b>
              </div>
              <div class="charges1">
                <b class="charges">charges</b>
              </div>
            </div>
            <div class="item">
              <div class="deliverables1">
                <div class="title-description">
                  <div class="title1">Hero section stock image</div>
                  <div class="description">
                    Third round of feedback requested by the client
                  </div>
                </div>
              </div>
              <div class="quantity2">
                <div class="quantity3">01</div>
              </div>
              <div class="charges2">
                <div class="quantity3">₹30,000</div>
              </div>
            </div>
            <div class="item">
              <div class="deliverables1">
                <div class="title-description">
                  <div class="title1">Hero section stock image</div>
                  <div class="description">
                    Third round of feedback requested by the client
                  </div>
                </div>
              </div>
              <div class="quantity2">
                <div class="quantity3">01</div>
              </div>
              <div class="charges2">
                <div class="quantity3">₹30,000</div>
              </div>
            </div>
            <div class="item">
              <div class="deliverables1">
                <div class="title-description2">
                  <div class="title1">Responsive web pages designs</div>
                  <div class="description2">
                    Add more specific details in bullet points or numbers list
                  </div>
                </div>
              </div>
              <div class="quantity6">
                <div class="quantity3">01</div>
              </div>
              <div class="charges4">
                <div class="quantity3">₹1,50,000</div>
              </div>
            </div>
            <div class="item">
              <div class="deliverables1">
                <div class="title-description">
                  <div class="title1">Font: Helvetica</div>
                  <div class="description">
                    Third round of feedback requested by the client
                  </div>
                </div>
              </div>
              <div class="quantity2">
                <div class="quantity3">01</div>
              </div>
              <div class="charges2">
                <div class="quantity3">₹60,000</div>
              </div>
            </div>
            <div class="total5">
              <div class="spacer"></div>
              <div class="total6">
                <div class="total-row">
                  <div class="title5">Subtotal</div>
                  <div class="amount">₹0.00</div>
                </div>
                <div class="total-row">
                  <div class="title5">Discount (0%)</div>
                  <div class="amount">₹0.00</div>
                </div>
                <div class="total-child"></div>
                <div class="total7">
                  <div class="title7">Total</div>
                  <div class="amount2">₹21,000.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="property-1variant2">
        <div class="footer">
          <div class="contact">
            <div class="bill-to">Contact:</div>
            <div class="bill-to1">Phone: +91 8107199052</div>
            <div class="bill-to1">Email: sirviravirandra609@gmail.com</div>
          </div>
          <div class="payment">
            <div class="bill-to">Payment:</div>
            <div class="bill-to1">Payable to Ravindra Choudhary</div>
            <div class="bill-to1">Account number, Bank</div>
            <div class="bill-to6">*Please make payment before due date</div>
          </div>
          <img
            class="ashishsharma-biolink-1-icon"
            alt=""
            src="./public/ashishsharmabiolink-1@2x.png"
          />
        </div>
        <div class="auto-layout">
          <div class="header">
            <div class="sender">
              <div class="title">Invoice</div>
              <div class="subject">
                <p class="from">
                  <b>From:</b>
                </p>
                <p class="from">Your name - UI/UX Design & Development</p>
                <p class="from">Your Address</p>
              </div>
            </div>
            <div class="invoice-details">
              <div class="invoice-number-title-parent">
                <div class="invoice-number-title">Invoice #</div>
                <div class="issue-date-title">Issue Date</div>
                <div class="invoice-number-title">Due Date</div>
              </div>
              <div class="invoice-number-parent">
                <div class="invoice-number">DES00100</div>
                <div class="invoice-number">April 17, 2023</div>
                <div class="invoice-number">April 25, 2023</div>
              </div>
            </div>
          </div>
          <div class="client">
            <div class="contact">
              <div class="bill-to">Bill To:</div>
              <div class="bill-to8">Client Name</div>
              <div class="bill-to8">Client Address</div>
              <div class="bill-to8">
                Phone: [enter phone number], Email: [enter email address]
              </div>
            </div>
            <div class="total-due">
              <div class="total-due-title">Total Due:</div>
              <div class="total-due-title1">₹0</div>
            </div>
          </div>
          <div class="items-list">
            <div class="index1">
              <div class="deliverables">
                <b class="charges">deliverables</b>
              </div>
              <div class="quantity">
                <b class="charges">Quantity</b>
              </div>
              <div class="charges1">
                <b class="charges">charges</b>
              </div>
            </div>
            <div class="item">
              <div class="deliverables1">
                <div class="title-description">
                  <div class="title1">Hero section stock image</div>
                  <div class="description">
                    Third round of feedback requested by the client
                  </div>
                </div>
              </div>
              <div class="quantity2">
                <div class="quantity3">01</div>
              </div>
              <div class="charges2">
                <div class="quantity3">₹30,000</div>
              </div>
            </div>
            <div class="item">
              <div class="deliverables1">
                <div class="title-description">
                  <div class="title1">Hero section stock image</div>
                  <div class="description">
                    Third round of feedback requested by the client
                  </div>
                </div>
              </div>
              <div class="quantity2">
                <div class="quantity3">01</div>
              </div>
              <div class="charges2">
                <div class="quantity3">₹30,000</div>
              </div>
            </div>
            <div class="item">
              <div class="deliverables1">
                <div class="title-description2">
                  <div class="title1">Responsive web pages designs</div>
                  <div class="description2">
                    Add more specific details in bullet points or numbers list
                  </div>
                </div>
              </div>
              <div class="quantity6">
                <div class="quantity3">01</div>
              </div>
              <div class="charges4">
                <div class="quantity3">₹1,50,000</div>
              </div>
            </div>
            <div class="item">
              <div class="deliverables1">
                <div class="title-description">
                  <div class="title1">Font: Helvetica</div>
                  <div class="description">
                    Third round of feedback requested by the client
                  </div>
                </div>
              </div>
              <div class="quantity2">
                <div class="quantity3">01</div>
              </div>
              <div class="charges2">
                <div class="quantity3">₹60,000</div>
              </div>
            </div>
            <div class="total5">
              <div class="spacer"></div>
              <div class="total6">
                <div class="total-row">
                  <div class="title5">Subtotal</div>
                  <div class="amount">₹0.00</div>
                </div>
                <div class="total-row">
                  <div class="title5">Discount (0%)</div>
                  <div class="amount">₹0.00</div>
                </div>
                <div class="total-child"></div>
                <div class="total7">
                  <div class="title7">Total</div>
                  <div class="amount2">₹21,000.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

    `
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
