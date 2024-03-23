"use client";

import { Header } from "@/app/_components";
import { ReactNode } from "react";
import { AuthProvider } from "@/app/_context";

export default function Home({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <div className="h-screen flex flex-col m-0 bg-white">
        <Header />
        <div className="flex overflow-hidden bg-gray-100 h-full">
          {children}
        </div>
      </div>
    </AuthProvider>
  );
}
