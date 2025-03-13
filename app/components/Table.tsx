import { Customer } from "@_types/customer";

const columns = ["ID", "Email", "Last Updated"];

const Table = ({ customers }: { customers: Customer[] }) => (
  <table className="w-full border-collapse border border-gray-300">
    <thead>
      <tr className="bg-gray-200">
        {columns.map((column) => (
          <th className="border border-gray-300 px-4 py-2" key={column}>
            {column}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {!!customers.length ? (
        customers.map((customer) => (
          <tr key={customer.id} className="border-t text-center">
            <td className="p-2">{customer.id}</td>
            <td className="p-2">{customer.attributes.email}</td>
            <td className="p-2">
              {new Date(customer.last_updated).toLocaleString()}
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

export default Table;
