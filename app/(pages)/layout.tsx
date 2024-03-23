"use client";

import { Header } from "@/app/_components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col bg-white">
      <Header />
      {children}
    </div>
  );
}
