"use client";

import { Sidebar } from "@/app/_components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex overflow-hidden bg-gray-100 h-full">
      <Sidebar />
      <div className="flex flex-grow p-5">{children}</div>
    </div>
  );
}
