import "./globals.css";
import { Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { AuthProvider } from "@/components/AuthProvider";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OperantNext | Bridging Academia and Pharma Industry",
  description:
    "OperantNext connects academic knowledge with industry requirements in the pharmaceutical sector, empowering students and researchers for seamless transitions.",
  keywords:
    "pharma, academia, industry, education, research, career transition",
  authors: [{ name: "OperantNext Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.operantnext.com/",
    siteName: "OperantNext",
    title: "OperantNext | Bridging Academia and Pharma Industry",
    description:
      "Connecting academic knowledge with pharmaceutical industry requirements",
    images: [
      {
        url: "https://www.operantnext.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OperantNext Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OperantNext | Bridging Academia and Pharma Industry",
    description:
      "Connecting academic knowledge with pharmaceutical industry requirements",
    images: ["https://www.operantnext.com/twitter-image.jpg"],
    creator: "@OperantNext",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://www.operantnext.com/" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          nunito.variable
        )}
      >
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
