"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export const LoginPage = () => {
  const { loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleLoginWithGoogle = async () => {
    try {
      await loginWithGoogle();
      router.push("/"); // ログイン成功後のリダイレクト先
    } catch (error) {
      console.error(error);
      router.push("/signup"); // ログイン失敗後のリダイレクト先
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLoginWithGoogle}>Login with Google</button>
    </div>
  );
};
