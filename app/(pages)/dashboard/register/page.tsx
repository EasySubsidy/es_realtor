import { use } from "react";
import Dashboard from "../page";
import { RegisterTenantForm } from "./RegisterForm";
import { useAuth } from "@/app/_context";

const RegisterTenantPage = () => {
  return (
    <Dashboard>
      <div className="w-full overflow-scroll">
        <RegisterTenantForm />
      </div>
    </Dashboard>
  );
};

export default RegisterTenantPage;
