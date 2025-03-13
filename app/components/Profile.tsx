"use client";

import { FormEventHandler, useState } from "react";
import { Customer } from "@_types/customer";

interface PropTypes {
  customer: Customer | null;
  error?: string;
}

const Profile = ({ customer, error }: PropTypes) => {
  const [editableCustomer, setEditableCustomer] = useState(customer);
  const [editMode, setEditMode] = useState<boolean>(false);

  if (error) return <p>Error: {error}</p>;
  if (!editableCustomer) return <p>No customer found.</p>;

  const handleChange = (field: string, value: string) => {
    setEditableCustomer((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        attributes: {
          ...prev.attributes,
          [field]: value,
        },
      };
    });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editableCustomer) return;
    fetch(`http://localhost:1323/customers/${editableCustomer.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customer: editableCustomer }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          setEditMode(false);
          setEditableCustomer(data.customer);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>{customer?.attributes.email}</h1>
      <button className="border p-2" onClick={() => setEditMode(true)}>
        Edit Mode
      </button>
      <p>
        <strong>ID:</strong> {editableCustomer.id}
      </p>
      <p>
        <strong>Last Updated:</strong> {editableCustomer.last_updated}
      </p>
      <h2>Attributes</h2>
      <form onSubmit={handleOnSubmit}>
        {Object.entries(editableCustomer.attributes).map(([key, value]) => (
          <p key={key}>
            <label className="block text-gray-500">
              {key.replace("_", " ")}
            </label>
            {editMode ? (
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-100"
                value={value as string}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            ) : (
              <span>{value as string}</span>
            )}
          </p>
        ))}
        <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Profile;
