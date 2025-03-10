
"use client";

import Navbar from "@/components/navbar";
import "@/app/globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
