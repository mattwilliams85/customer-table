import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import TopNav from "./components/TopNav";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Customer Manager",
  description: "Take home assignment for customer.io",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <TopNav />
        <div className="mx-auto max-w-[1028px] pt-8 pb-20">{children}</div>
      </body>
    </html>
  );
}
