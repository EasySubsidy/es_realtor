"use client";

import { useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/app/_components";
import Home from "@/app/page";

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
    <Home>
      <Sidebar user={user} />
      <div className="flex flex-grow p-5">{children}</div>
    </Home>
  );
};

export default Dashboard;
