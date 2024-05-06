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

    const invoiceHtml = `<!doctype html>
<html class="no-js" lang="zxx">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>OPF Event Billing</title>
    <meta name="author" content="themeholy">
    <meta name="description" content="Invar - Invoice HTML Template">
    <meta name="keywords" content="Invar - Invoice HTML Template" />
    <meta name="robots" content="INDEX,FOLLOW">

    <!-- Mobile Specific Metas -->
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Favicons - Place favicon.ico in the root directory -->
    <link rel="apple-touch-icon" sizes="57x57" href="assets/img/favicons/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="assets/img/favicons/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="assets/img/favicons/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="assets/img/favicons/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="assets/img/favicons/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="assets/img/favicons/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="assets/img/favicons/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="assets/img/favicons/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="assets/img/favicons/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="assets/img/favicons/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="assets/img/favicons/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/img/favicons/favicon-16x16.png">
    <link rel="manifest" href="assets/img/favicons/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="assets/img/favicons/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">

    <!--==============================
	  Google Fonts
	============================== -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">


    <!--==============================
	    All CSS File
	============================== -->
    <!-- Bootstrap -->
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <!-- Theme Custom CSS -->
    <link rel="stylesheet" href="assets/css/style.css">

</head>

<body>


    <!--[if lte IE 9]>
    	<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
  <![endif]-->


    <!--********************************
   		Code Start From Here 
	******************************** -->

    <div class="invoice-container-wrap">
        <div class="invoice-container">
            <main>
                <!--==============================
Invoice Area
==============================-->
                <div class="themeholy-invoice invoice_style9">
                    <div class="download-inner" id="download_section">
                        <!--==============================
	Header Area
==============================-->
                        <header class="themeholy-header header-layout7">
                            <div class="row align-items-center justify-content-between">
                                <div class="col-auto">
                                    <div class="header-logo">
                                        <a href="index.html"><img src="public/opflogo.png" alt="Operant Pharmacy Federation"></a>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <h1 class="big-title">Invoice</h1>
                                    <span><b>Invoice No: </b> ${transactionData.paymentId} </span>
                                    <span><b>Date: </b> ${transactionData.createdAt}</span>
                                </div>
                            </div>
                        </header>
                        <div class="row justify-content-between my-4">
                            <div class="col-auto">
                                <div class="invoice-left">
                                    <b>Must Read:</b>
                                    <address>
                                        Intrinsicly expedite enterprise-wide leadership skills <br>
                                        through bleeding-edge deliverables. Rapidiously <br>
                                        revolutionize corporate manufactured products.
                                    </address>
                                </div>
                            </div>
                            <div class="col-auto">
                                <div class="invoice-right">
                                    <b>Operant Pharmacy Federation:</b>
                                    <address>
                                        17, Mayank Nagar, <br>
                                        Pali, Rajasthan, India <br>
                                        +91 8107199052 <br>
                                        info@opf.org.in
                                    </address>
                                </div>
                            </div>
                        </div>
                        <table class="invoice-table table-style3">
                            <tbody>
                                <tr>
                                    <th>Student ID</th>
                                    <td>HFG326548</td>
                                    <th>Balance Due:</th>
                                    <td>$2350.00</td>
                                </tr>
                                <tr>
                                    <th>Student Name:</th>
                                    <td>Amit Mithon Becham</td>
                                    <th>Due Date:</th>
                                    <td>27/07/2022</td>
                                </tr>
                                <tr>
                                    <th>Due Date:</th>
                                    <td>Summer</td>
                                    <th>Statement For:</th>
                                    <td>2022 Spring</td>
                                </tr>
                            </tbody>
                        </table>

                        <table class="invoice-table table-stripe3">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Semester Fee</td>
                                    <td>27/07/2022</td>
                                    <td>$100.00</td>
                                </tr>
                                <tr>
                                    <td>Exam Fee</td>
                                    <td>27/07/2022</td>
                                    <td>$150.00</td>
                                </tr>
                                <tr>
                                    <td>Transport Fee</td>
                                    <td>27/07/2022</td>
                                    <td>$30.00</td>
                                </tr>
                                <tr>
                                    <td>Hostel Fee</td>
                                    <td>27/07/2022</td>
                                    <td>$50.00</td>
                                </tr>
                                <tr>
                                    <td>Book Fee</td>
                                    <td>27/07/2022</td>
                                    <td>$15.00</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="2"><b>Total Amount:</b></td>
                                    <td>$430.00</td>
                                </tr>
                            </tfoot>
                        </table>

                        <div class="row justify-content-between">
                            <div class="col-auto">
                                <b>Payment Info:</b>
                                <p class="mb-0">Credit Card No: 2456********** <br>
                                    A/C Name: Anthony Mithon</p>
                            </div>
                            <div class="col-auto">
                                <table class="total-table2">
                                    <tr>
                                        <th>Paid:</th>
                                        <td>$345.00</td>
                                    </tr>
                                    <tr>
                                        <th>Balance Due:</th>
                                        <td>$00.00</td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <p class="company-address style2">
                            <b>Invar Inc:</b> <br>
                            12th Floor, Plot No.5, IFIC Bank, Gausin Rod, Suite 250-20, Franchisco USA 2022.
                        </p>
                        <p class="invoice-note mt-3">
                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.64581 13.7917H10.3541V12.5417H3.64581V13.7917ZM3.64581 10.25H10.3541V9.00002H3.64581V10.25ZM1.58331 17.3334C1.24998 17.3334 0.958313 17.2084 0.708313 16.9584C0.458313 16.7084 0.333313 16.4167 0.333313 16.0834V1.91669C0.333313 1.58335 0.458313 1.29169 0.708313 1.04169C0.958313 0.791687 1.24998 0.666687 1.58331 0.666687H9.10415L13.6666 5.22919V16.0834C13.6666 16.4167 13.5416 16.7084 13.2916 16.9584C13.0416 17.2084 12.75 17.3334 12.4166 17.3334H1.58331ZM8.47915 5.79169V1.91669H1.58331V16.0834H12.4166V5.79169H8.47915ZM1.58331 1.91669V5.79169V1.91669V16.0834V1.91669Z" fill="#2D7CFE" />
                            </svg>

                            <b>NOTE: </b>This is computer generated receipt and does not require physical signature.
                        </p>
                        <div class="body-shape9"></div>
                        <div class="body-shape1"></div>
                    </div>
                    
                </div>
            </main>
        </div>
    </div>
    <!-- Invoice Conainter End -->

    <!--==============================
    All Js File
============================== -->
    <!-- Jquery -->
    <script src="assets/js/vendor/jquery-3.6.0.min.js"></script>
    <!-- Bootstrap -->
    <script src="assets/js/bootstrap.min.js"></script>
    <!-- PDF Generator -->
    <script src="assets/js/jspdf.min.js"></script>
    <script src="assets/js/html2canvas.min.js"></script>
    <!-- Main Js File -->
    <script src="assets/js/main.js"></script>

</body>

</html>`;
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
