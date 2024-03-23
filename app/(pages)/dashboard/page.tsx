"use client";

import { useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/app/_components";
import Home from "@/app/page";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Dashboard = ({ children }: Props) => {
  return (
    <Home>
      <Sidebar />
      <div className="flex flex-grow p-5">{children}</div>
    </Home>
  );
};

export default Dashboard;
