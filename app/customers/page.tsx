import { Suspense } from "react";
import { Customer } from "@_types/customer";
import { apiFetch } from "@utils/api";
import Table from "@components/Table";

const getCustomers = async () => {
  const { customers } = await apiFetch<{ customers: Customer[] }>("customers");
  return customers;
};

const CustomersList = async () => {
  const customers = await getCustomers();
  return (
    <div className="py-6 px-4 lg:px-0">
      <h1 className="text-4xl font-bold mb-4 text-[#323f67]">Customers</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Table customers={customers} />
      </Suspense>
    </div>
  );
};

export default CustomersList;
