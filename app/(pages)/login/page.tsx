"use client";

import { useAuth } from "@/app/_context";
import { LoginForm } from "./LoginForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { paths } from "@/app/_consts";

export default function LoginPage() {
  const { currentUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentUser) {
        // currentUser が null の場合、ログインページに遷移
        router.push(paths.tenantsView);
      }
    }, 300); // 300ミリ秒遅延させる

    () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="flex flex-grow">
      <LoginForm />
    </div>
  );
}
