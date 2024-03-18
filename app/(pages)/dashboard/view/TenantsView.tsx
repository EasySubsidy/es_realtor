"use client";

import { useAuth } from "@/app/_context";
import { useEffect, useState } from "react";
import { getTenants } from "@/app/_usecase/tenant/getTenants";
import { Tenant } from "@/app/_entity";
import Image from "next/image";

export const TenantsView: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tenants.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(tenants.length / itemsPerPage);
  const { currentUser } = useAuth();

  const fetchTenants = async () => {
    if (currentUser) {
      try {
        const tenants = await getTenants(currentUser.uid);
        if (!tenants) {
          throw new Error("Tenants not found");
        }
        setTenants(tenants);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchTenants();
  });

  return (
    <div className="text-black w-full h-full mx-auto bg-white p-8 rounded-lg shadow flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-semibold mb-8 text-black">物件一覧</h2>
        {currentItems.length === 0 ? (
          <p>登録している物件がありません</p>
        ) : (
          <div className="rounded-lg overflow-hidden">
            {currentItems.map((tenant) => (
              <div key={tenant.title} className="flex bg-gray-200 p-2 gap-4">
                <Image
                  src={tenant.images[0]}
                  alt={tenant.title}
                  priority={true}
                  width={120}
                  height={50}
                  className="rounded-lg"
                />
                <div className="flex flex-col gap-1">
                  <h2 className="text font-semibold">{`物件名: ${tenant.title}`}</h2>
                  <p>{`住所: ${tenant.location.address}`}</p>
                  <p className="text-lg font-semibold">
                    {`賃料: ${tenant.rent}` + "円"}
                  </p>
                </div>
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
