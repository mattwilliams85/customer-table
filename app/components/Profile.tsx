import { Customer } from "@_types/customer";

interface PropTypes {
  customer: Customer | null;
  error?: string;
}

const Profile = ({ customer, error }: PropTypes) => {
  if (error) return <p>Error: {error}</p>;
  if (!customer) return <p>No customer found.</p>;

  return (
    <div>
      <h1>Customer Info</h1>
      <p>
        <strong>ID:</strong> {customer.id}
      </p>
      <p>
        <strong>Last Updated:</strong> {customer.last_updated}
      </p>
      <h2>Attributes</h2>
      <p>
        <strong>Company:</strong> {customer.attributes.company}
      </p>
      <p>
        <strong>Created At:</strong> {customer.attributes.created_at}
      </p>
      <p>
        <strong>Email:</strong> {customer.attributes.email}
      </p>
      <p>
        <strong>Last Name:</strong> {customer.attributes.last_name}
      </p>
    </div>
  );
};

export default Profile;
