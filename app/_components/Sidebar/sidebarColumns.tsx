import { paths } from "@/app/_consts";

type SidebarColumn = {
  title: string;
  path: string;
};

export const sidebarColumns: SidebarColumn[] = [
  {
    title: "テナント登録",
    path: paths.tenantRegister,
  },
  {
    title: "テナント一覧",
    path: paths.tenantsView,
  },
];
