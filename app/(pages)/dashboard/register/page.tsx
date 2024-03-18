import Dashboard from "../page";
import { RegisterTenantForm } from "./RegisterForm";

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
