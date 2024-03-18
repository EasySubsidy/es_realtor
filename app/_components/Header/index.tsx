import Image from "next/image";
import Link from "next/link";

import "./header.css";
import { app } from "@/firebase";
import { useToast } from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { User, getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import path from "path";

type HeaderProps = {
  user: User | null;
};

export const Header: FC<HeaderProps> = (props) => {
  const { user } = props;
  const toast = useToast();
  const auth = getAuth(app);
  const pathName = usePathname();

  const goToPage = (path: string) => {
    window.location.href = path;
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
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
        {user ? (
          <p
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#000",
              textAlign: "center",
            }}
          >
            {user.email} <br />
            さんようこそ
          </p>
        ) : (
          // ユーザー情報が存在しない場合、ログインボタンを表示
          <Link href="/login">
            <div className="flex flex-col items-center gap-2">
              {/* <Image src="/login.svg" alt="login" width={24} height={24} /> */}
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  // color: "#000000",
                  textAlign: "center",
                }}
              >
                ログイン
              </p>
            </div>
          </Link>
        )}

        {pathName.startsWith("/dashboard") ? (
          <button className="header-button" onClick={handleSignOut}>
            <div className="flex flex-col items-center gap-2">
              {/* <Image src="/menu.svg" alt="menu" width={24} height={24} /> */}
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  // color: "#000000",
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
