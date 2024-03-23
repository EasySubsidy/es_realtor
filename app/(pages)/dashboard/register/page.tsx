import { RegisterTenantForm } from "./RegisterForm";
import { useAuth } from "@/app/_context";

export default function RegisterTenantPage() {
  return (
    <div className="w-full overflow-scroll">
      <RegisterTenantForm />
    </div>
  );
}
