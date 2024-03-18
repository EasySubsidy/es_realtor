type SidebarColumn = {
  title: string;
  path: string;
};

export const sidebarColumns: SidebarColumn[] = [
  {
    title: "テナント登録",
    path: "/dashboard/register",
  },
  {
    title: "テナント編集",
    path: "/dashboard/edit",
  },
];
