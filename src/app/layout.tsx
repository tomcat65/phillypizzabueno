import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Philly Pizza Bueno",
  description: "The best pizza in Philadelphia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-background font-sans antialiased"
        )}
        suppressHydrationWarning
      >
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
