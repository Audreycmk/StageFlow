import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StageFlow 聲序 - 智能表演預約平台",
  description: "探索、預約和管理現場演唱表演的一站式平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-HK" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
