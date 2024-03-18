"use client";

import { useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase";
import { useRouter } from "next/navigation";
import { RegisterForm } from "@/app/(pages)/dashboard/Register.tsx/RegisterForm";
import { Header } from "@/app/_components/Header";
import { AppProps } from "next/app";
import { child } from "firebase/database";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="w-full h-full">
      <Header user={user} />
      {children}
    </div>
  );
};

export default Dashboard;
