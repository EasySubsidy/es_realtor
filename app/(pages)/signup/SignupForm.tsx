"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerRealtor } from "@/app/_usecase/realtor";
import { useAuth } from "@/app/_context";
import Link from "next/link";

const schema = z.object({
  email: z.string().email({ message: "無効なメールアドレスです" }),
  password: z
    .string()
    .min(6, { message: "パスワードは6文字以上である必要があります" }),
});

export type SignupFormData = z.infer<typeof schema>;

export const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, signUp } = useAuth();

  const toast = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    setIsLoading(true);
    try {
      const userCredential = await signUp(data.email, data.password);
      toast({
        title: "確認メールを送信しました。",
        status: "success",
        position: "top",
      });
      registerRealtor(userCredential.user.uid, data);
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "エラーが発生しました。",
        status: "error",
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">サインアップ</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              {...register("email")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
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
              {...register("password")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLoading ? "処理中..." : "アカウントを作成"}
            </button>
          </div>
        </form>
        <div className="flex mt-4 text-center gap-1">
          <p>すでにアカウントをお持ちですか？</p>
          <Link
            href="/login" // ログインページのパスに変更してください
            className="text-blue-500 hover:text-blue-700"
          >
            ログイン
          </Link>
        </div>
      </div>
    </div>
  );
};
