"use client";

import { useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase";
import { useRouter } from "next/navigation";
import { Header, Sidebar } from "@/app/_components";

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
    <div className="h-screen flex flex-col m-0">
      <Header user={user} />
      <div className="flex overflow-hidden bg-gray-100 h-full">
        <Sidebar />
        <div className="flex flex-grow p-5">{children}</div>
      </div>
    </div>
  );
};

export default Dashboard;
