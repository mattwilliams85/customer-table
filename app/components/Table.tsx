import { Customer } from "@_types/customer";
import { formatDate } from "@utils/helpers";
import Link from "next/link";

const headers = ["ID", "EMAIL", "LAST UPDATED"];

const Table = ({ customers }: { customers: Customer[] }) => {
  return (
    <table className="w-full rounded-2xl shadow-xl overflow-hidden md:leading-14 text-md text-[#45568a]">
      <thead>
        <tr className="bg-[#f0f3fd] text-sm border-b-1 border-gray-200">
          {headers.map((column, i) => (
            <th
              scope="col"
              className={`px-4 sm:px-8 pb-4 pt-5 ${
                i === headers.length - 1 ? "text-right" : "text-left"
              }`}
              key={column}
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {!!customers.length ? (
          customers.map((customer) => (
            <tr
              className="border-b border-gray-200 text-center"
              key={customer.id}
            >
              <td className="px-4 sm:px-8 py-4 text-left">{customer.id}</td>

              <td className="px-4 sm:px-8 py-4 text-left underline ">
                <Link
                  href={`/customers/${customer.id}`}
                  className="hover:text-[#2a4fbe] transition-colors"
                >
                  {customer.attributes.email}
                </Link>
              </td>
              <td className="px-4 sm:px-8 py-4  text-right text-[#818eb4]">
                {formatDate(customer.last_updated)}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3} className="p-2 text-center">
              No customers found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
