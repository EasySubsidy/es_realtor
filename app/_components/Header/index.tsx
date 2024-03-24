import Image from "next/image";
import Link from "next/link";

import "./header.css";
import { useToast } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/_context";
import { paths } from "@/app/_consts";

export const Header = () => {
  const { currentUser, logout } = useAuth();
  const toast = useToast();
  const pathName = usePathname();

  const handleSignOut = async () => {
    try {
      await logout();
      toast({
        title: "ログアウトしました。",
        status: "success",
        position: "top",
      });
    } catch (error) {
      toast({
        title: "ログアウト中にエラーが発生しました。",
        status: "error",
        position: "top",
      });
      console.error(error);
    }
  };

  return (
    <div className="flex flex-row items-center justify-between h-[80px] w-full bg-[#619191]">
      <div className="flex flex-row items-center gap-4 p-16">
        {/* <Image
          src="/header_logo.svg"
          alt="logo"
          width={80}
          height={80}
          style={{ backgroundColor: "transparent" }}
        /> */}
        <div className="title flex flex-row items-center">
          <p
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#fff",
              textAlign: "center",
            }}
          >
            テナント管理
          </p>
        </div>
      </div>
      <div
        className="flex flex-row items-center gap-8 mr-[32px]
      "
      >
        {/* ユーザー情報が存在する場合、ユーザーネームを表示 */}
        {currentUser ? (
          <p
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#fff",
              textAlign: "center",
            }}
          >
            {currentUser.email} <br />
            さんようこそ
          </p>
        ) : // ユーザー情報が存在せず、パスがルートの場合、ログインボタンを表示
        pathName === "/" ? (
          <Link href={paths.login}>
            <div className="flex flex-col items-center gap-2">
              {/* <Image src="/login.svg" alt="login" width={24} height={24} /> */}
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                ログイン
              </p>
            </div>
          </Link>
        ) : null}

        {pathName.startsWith(paths.dashboard) ? (
          <button className="header-button" onClick={handleSignOut}>
            <div className="flex flex-col items-center gap-2">
              {/* <Image src="/menu.svg" alt="menu" width={24} height={24} /> */}
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                サインアウト
              </p>
            </div>
          </button>
        ) : null}
      </div>
    </div>
  );
};
