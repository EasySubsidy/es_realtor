"use client";

import { Header } from "@/app/_components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex flex-col m-0 bg-white">
      <Header />
      {children}
    </div>
  );
}
