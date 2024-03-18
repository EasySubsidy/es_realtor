import Dashboard from "../page";
import { TenantsView } from "./TenantsView";

const EditTenantPage = () => {
  return (
    <Dashboard>
      <div className="w-full overflow-scroll">
        <TenantsView />
      </div>
    </Dashboard>
  );
};

export default EditTenantPage;
