"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { paths } from "@/app/_consts";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push(paths.login);
  }, []);

  return <div className="w-screen h-screen bg-white"></div>;
}
