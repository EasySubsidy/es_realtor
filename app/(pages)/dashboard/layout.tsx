"use client";

import { Sidebar } from "@/app/_components";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex overflow-hidden bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-5 overflow-y-auto">{children}</div>
    </div>
  );
}
