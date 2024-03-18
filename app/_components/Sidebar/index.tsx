// components/Sidebar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => path === pathname;

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen">
      <nav className="p-5">
        <ul>
          <li className="mb-3">
            <Link href="/dashboard">
              <p
                className={`flex items-center p-2 rounded-lg ${
                  isActive("/dashboard") ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
              >
                <span className="ml-3">ダッシュボード</span>
              </p>
            </Link>
          </li>
          <li className="mb-3">
            <Link href="/dashboard/register">
              <p
                className={`flex items-center p-2 rounded-lg ${
                  isActive("/dashboard/register")
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }`}
              >
                <span className="ml-3">登録</span>
              </p>
            </Link>
          </li>
          <li className="mb-3">
            <Link href="/dashboard/edit">
              <p
                className={`flex items-center p-2 rounded-lg ${
                  isActive("/dashboard/edit")
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }`}
              >
                <span className="ml-3">編集</span>
              </p>
            </Link>
          </li>
          {/* 他のリンクを追加 */}
        </ul>
      </nav>
    </aside>
  );
};
