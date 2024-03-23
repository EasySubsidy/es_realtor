"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { paths } from "@/app/_consts";
import { useAuth } from "./_context";

export default function Home() {
  const { currentUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentUser === null) {
        // currentUser が null の場合、ログインページに遷移
        router.push(paths.login);
      } else if (currentUser) {
        // currentUser が存在する場合、テナントビューページに遷移
        router.push(paths.tenantsView);
      }
    }, 300); // 300ミリ秒遅延させる

    return () => clearTimeout(timeoutId);
  }, [currentUser]);

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <div className="animate-spin rounded-full h-80 w-80 border-t-2 border-b-2 border-green-800"></div>
    </div>
  );
}
