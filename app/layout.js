
"use client";

import Navbar from "@/components/navbar";
import "@/app/globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main>{children}</main>
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
