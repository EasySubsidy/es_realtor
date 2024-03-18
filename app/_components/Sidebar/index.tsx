// components/Sidebar.tsx
import { User } from "@firebase/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { sidebarColumns } from "./sidebarColumns";

type SidebarProps = {
  user: User | null;
};

export const Sidebar: FC<SidebarProps> = (props) => {
  const pathname = usePathname();

  const isActive = (path: string) => path === pathname;

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen">
      <nav className="p-5">
        <ul>
          {sidebarColumns.map((column) => {
            return (
              <li key={column.title} className="mb-3">
                <Link href={column.path}>
                  <p
                    className={`flex items-center p-2 rounded-lg ${
                      isActive(column.path)
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    <span className="ml-3">{column.title}</span>
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
