import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "@/app/_context";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { paths } from "@/app/_consts";

// Zod schema for form validation
const schema = z.object({
  email: z.string().email({ message: "無効なメールアドレスです" }),
  password: z
    .string()
    .min(6, { message: "パスワードは6文字以上である必要があります" }),
});

type LoginFormData = z.infer<typeof schema>;

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const router = useRouter();
  const { currentUser, login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async ({
    email,
    password,
  }) => {
    setIsLoading(true);
    try {
      await login(email, password);
      toast({
        title: "ログインに成功しました。",
        status: "success",
        position: "top",
      });
      router.push(paths.tenantsView); // ログイン成功後にリダイレクト
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
    <div className="w-full bg-gray-100 flex flex-col justify-center items-center text-black">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">ログイン</h2>
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
              {isLoading ? "ログイン中..." : "ログイン"}
            </button>
          </div>
        </form>
        <div className="flex gap-1 mt-4 text-center justify-center">
          <p>新規登録は</p>
          <Link href="/signup" className="text-blue-500 hover:text-blue-700">
            こちら
          </Link>
        </div>
      </div>
    </div>
  );
};
