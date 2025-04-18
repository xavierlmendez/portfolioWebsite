import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./ui/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xavier's Portfolio Website",
  description: "Created and maintained by Xavier Mendez",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="bg-[#0F172A] min-h-screen flex flex-col text-white">
           <NavBar/>
          <main className="rounded-2xl shadow-2xl mx-auto max-w-7xl px-6 bg-[#1E293B] text-white w-full flex-grow mb-10">
            {children}
          </main>
        </div>
        <footer className="row-start-3 bg-[#1E293B] text-white flex gap-6 flex-wrap items-center justify-center">
          test footer
        </footer>
      </body>
    </html>
  );
}
