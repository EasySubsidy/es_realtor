"use client";

import { useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase";
import { useRouter } from "next/navigation";
import { Header, Sidebar } from "@/app/_components";

export default function Home({ children }: { children: React.ReactNode }) {
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
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  return (
    <div className="h-screen flex flex-col m-0 bg-white">
      <Header user={user} />
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className="flex overflow-hidden bg-gray-100 h-full">
          {children}
        </div>
      )}
    </div>
  );
}
