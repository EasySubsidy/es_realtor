import Dashboard from "../page";
import { TenantsView } from "./TenantsView";

export default function EditTenantPage() {
  return (
    <Dashboard>
      <div className="w-full overflow-scroll">
        <TenantsView />
      </div>
    </Dashboard>
  );
}
