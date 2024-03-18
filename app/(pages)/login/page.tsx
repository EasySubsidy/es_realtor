"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "@/firebase";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import Home from "@/app/page";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const auth = getAuth(app);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "ログインに成功しました。",
        status: "success",
        position: "top",
      });
      router.push("/dashboard"); // ログイン成功後にリダイレクト
    } catch (error) {
      toast({
        title: "ログインに失敗しました。",
        status: "error",
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Home>
      <div className="w-full bg-gray-100 flex flex-col justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-96">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">ログイン</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                パスワード
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLoading ? "ログイン中..." : "ログイン"}
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <a
              href="/signup" // 新規登録ページのパスに変更してください
              className="text-blue-500 hover:text-blue-700"
            >
              新規登録はこちら
            </a>
          </div>
        </div>
      </div>
    </Home>
  );
};

export default LoginPage;
