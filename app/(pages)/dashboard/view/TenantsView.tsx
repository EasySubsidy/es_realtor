"use client";

import { useAuth } from "@/app/_context";
import { useEffect, useState } from "react";
import { getTenants } from "@/app/_usecase/tenant/getTenants";
import { Tenant } from "@/app/_entity";
import Image from "next/image";
import { paths } from "@/app/_consts";
import { useRouter } from "next/navigation";
import { Dropdown } from "@/app/_components/DropdownMenu";
import { deleteTenant } from "@/app/_usecase/tenant/deleteTenant";

// TODO: ローディング画面の実装
export const TenantsView: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tenants.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(tenants.length / itemsPerPage);
  const { currentUser } = useAuth();

  const fetchTenants = async () => {
    if (currentUser) {
      try {
        const TenantsRes = await getTenants(currentUser.uid);
        if (!TenantsRes) {
          throw new Error("Tenants not found");
        }
        setTenants(TenantsRes);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = (tenantID: string) => {
    deleteTenant(tenantID)
      .then(() => {
        console.log("successfully deleted");
        if (currentUser) {
          getTenants(currentUser.uid).then((res) => {
            if (res) {
              setTenants(res);
            }
          });
        }
      })
      .catch((error) => {
        console.error("Failed to delete tenants", error);
        return;
      });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!currentUser) {
        // currentUser が null の場合、ログインページに遷移
        router.push(paths.login);
      }
    }, 300); // 300ミリ秒遅延させる

    () => clearTimeout(timeoutId);
    fetchTenants();
  }, []);

  return (
    <div className="text-black w-full h-full mx-auto bg-white p-8 rounded-lg shadow flex flex-col justify-between">
      <div className="">
        <h2 className="text-2xl font-semibold mb-8 text-black">物件一覧</h2>
        {currentItems.length === 0 ? (
          <p>登録している物件がありません</p>
        ) : (
          <div className="rounded-lg">
            {currentItems.map((tenant) => (
              <div
                key={tenant.title}
                className="flex bg-gray-200 py-2 pl-2 pr-4 gap-4 "
              >
                <Image
                  src={tenant.images[0]}
                  alt={tenant.title}
                  priority={true}
                  width={120}
                  height={50}
                  className="rounded-lg"
                />
                <div className="flex flex-col flex-grow gap-1">
                  <h2 className="text font-semibold">{`物件名: ${tenant.title}`}</h2>
                  <p>{`住所: ${tenant.location.address}`}</p>
                  <p className="text-lg font-semibold">
                    {`賃料: ${tenant.rent}` + "円"}
                  </p>
                </div>
                <Dropdown
                  tenantId={tenant.id}
                  uid={currentUser?.uid}
                  setTenants={setTenants}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button key={number} onClick={() => setCurrentPage(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};
