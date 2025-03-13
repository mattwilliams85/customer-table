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
  console.log(customers);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Table customers={customers} />
      </Suspense>
    </div>
  );
};

export default CustomersList;
