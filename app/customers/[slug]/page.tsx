import { Suspense } from "react";
import { Customer } from "@_types/customer";
import { apiFetch } from "@utils/api";
import { formatDate } from "@utils/helpers";
import Profile from "@components/Profile";
import Link from "next/link";

type ParamsType = Promise<{ slug: string }>;

const getCustomers = async (id: string) => {
  const { customer } = await apiFetch<{ customer: Customer }>(
    `customers/${id}`
  );
  return customer;
};

const CustomersList = async ({ params }: { params: ParamsType }) => {
  const { slug } = await params;
  const customer = await getCustomers(slug);

  return (
    <div className="py-6 px-4 lg:px-0">
      <div className="font-bold mb-8">
        <Link href="/customers" className="underline mr-2">
          Customers
        </Link>
        {`>`}
        <span className="ml-2">Customer Details</span>{" "}
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <div className="p-10 border rounded border-gray-200 overflow-hidden">
          <h1 className="text-3xl md:text-4xl font-bold mb-1 md:mb-3 text-[#323f67] truncate">
            {customer.attributes.email}
          </h1>
          <span className="text-gray-500">
            Last Updated {formatDate(customer.last_updated)}
          </span>
          <Profile customer={customer} />
        </div>
      </Suspense>
    </div>
  );
};

export default CustomersList;
