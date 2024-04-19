import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import Navbar from "@/components/Navbar";
import cn from "../lib/utils";


export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "BookWise Reading Tracker App",
  description: "Track your reading by recording the books you are currently reading and creating a plan for them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

          
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-white font-sans antialiased",
          fontSans.variable
        )}
      >
          <Navbar />
          {children}

      </body>
      </html>
  );
}
