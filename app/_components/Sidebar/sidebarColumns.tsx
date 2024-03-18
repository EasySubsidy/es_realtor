type SidebarColumn = {
  title: string;
  url: string;
  authProtected: boolean;
};

export const sidebarColumns: SidebarColumn[] = [
  {
    title: "ダッシュボード",
    url: "/dashboard",
    authProtected: false,
  },
  {
    title: "テナント登録",
    url: "/dashboard/register",
    authProtected: true,
  },
  {
    title: "テナント編集",
    url: "/dashboard/edit",
    authProtected: true,
  },
  {
    title: "新規登録",
    url: "/signup",
    authProtected: false,
  },
];
