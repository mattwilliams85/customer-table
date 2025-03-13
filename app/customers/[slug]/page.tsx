import { Suspense } from "react";
import { Customer } from "@_types/customer";
import { apiFetch } from "@utils/api";
import Profile from "@components/Profile";

interface ParamsType {
  params: {
    slug: string;
  };
}

const getCustomers = async (params: { slug: string }) => {
  const { customer } = await apiFetch<{ customer: Customer[] }>(
    `customers/${params.slug}`
  );
  return customer;
};

const CustomersList = async ({ params }: ParamsType) => {
  const customer = await getCustomers(params);
  console.log(customer);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Profile customer={customer} />
      </Suspense>
    </div>
  );
};

export default CustomersList;
