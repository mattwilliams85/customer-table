"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "@utils/api";
import { Customer } from "@_types/customer";
import { LuPencil, LuTrash, LuCirclePlus } from "react-icons/lu";
import { formatLabel, formatDate } from "@utils/helpers";

const Profile = ({ customer }: { customer: Customer | null }) => {
  const [editableCustomer, setEditableCustomer] = useState(customer);
  const [editMode, setEditMode] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [customKey, setCustomKey] = useState("");
  const [customValue, setCustomValue] = useState("");

  useEffect(() => {
    setIsChanged(JSON.stringify(editableCustomer) !== JSON.stringify(customer));
  }, [editableCustomer, customer]);

  if (!editableCustomer) return <p>No customer found.</p>;

  const updateAttribute = (field: string, value: string) => {
    setEditableCustomer((prev) =>
      prev
        ? { ...prev, attributes: { ...prev.attributes, [field]: value } }
        : prev
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { customer: updatedCustomer } = await apiFetch<{
      customer: Customer;
    }>(`customers/${customer?.id}`, "PATCH", { customer: editableCustomer });
    setEditableCustomer(updatedCustomer);
    setEditMode(false);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold flex items-center">
        Attributes
        {!editMode && (
          <button
            type="button"
            onClick={() => setEditMode(true)}
            className="ml-4 p-2 text-[20px] cursor-pointer focus:ring focus:ring-indigo-400 rounded"
            aria-label="Edit attributes"
          >
            <LuPencil />
          </button>
        )}
      </h2>
      <form onSubmit={handleSubmit} className="mt-4">
        {["id", "created_at"].map((key) => (
          <div key={key}>
            <label
              className="block mb-1 mt-4 text-sm font-medium"
              htmlFor={key}
            >
              {formatLabel(key)}
            </label>
            <span id={key} className="text-gray-700 text-lg font-light">
              {key === "id"
                ? customer?.id
                : formatDate(customer?.attributes.created_at)}
            </span>
          </div>
        ))}
        {Object.entries(editableCustomer.attributes).map(([key, value]) =>
          value && !["id", "created_at"].includes(key) ? (
            <div key={key} className="mt-4">
              <label className="block mb-1 text-sm font-medium" htmlFor={key}>
                {formatLabel(key)}
              </label>
              {editMode ? (
                <div className="flex items-center gap-2">
                  <input
                    id={key}
                    className="border p-2 rounded w-full max-w-[515px] focus:ring focus:ring-indigo-400"
                    value={value as string}
                    onChange={(e) => updateAttribute(key, e.target.value)}
                    aria-label={`Edit ${key}`}
                  />
                  {key !== "email" && (
                    <button
                      type="button"
                      onClick={() => updateAttribute(key, "")}
                      className="p-2 text-red-600 hover:text-red-800 focus:ring focus:ring-red-400 rounded cursor-pointer"
                      aria-label={`Delete ${key}`}
                    >
                      <LuTrash className="text-xl" />
                    </button>
                  )}
                </div>
              ) : (
                <span className="text-gray-700 text-lg font-light">
                  {value as string}
                </span>
              )}
            </div>
          ) : null
        )}
        {editMode && (
          <div className="mt-10">
            <label className="text-sm font-medium">Add Attribute</label>
            <div className="flex gap-4 mt-1">
              <input
                placeholder="Name"
                className="border p-2 rounded w-full max-w-[250px] focus:ring focus:ring-indigo-400"
                value={customKey}
                onChange={(e) => setCustomKey(e.target.value)}
                aria-label="New attribute name"
              />
              <input
                placeholder="Value"
                className="border p-2 rounded w-full max-w-[250px] focus:ring focus:ring-indigo-400"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                aria-label="New attribute value"
              />
              <button
                type="button"
                onClick={() =>
                  customKey &&
                  customValue &&
                  (updateAttribute(customKey, customValue),
                  setCustomKey(""),
                  setCustomValue(""))
                }
                className="p-2 text-indigo-800 hover:text-indigo-900 focus:ring focus:ring-indigo-400 rounded"
                aria-label="Add new attribute"
              >
                <LuCirclePlus className="text-2xl" />
              </button>
            </div>
            <div className="mt-8 flex gap-4">
              <button
                type="button"
                onClick={() => (
                  setEditableCustomer(customer), setEditMode(false)
                )}
                className="bg-white w-45 text-black p-2 border rounded cursor-pointer hover:text-indigo-900 hover:border-indigo-900 transition-colors focus:ring focus:ring-indigo-400"
                aria-label="Cancel editing"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isChanged}
                className={`p-2 rounded transition-colors w-45 focus:ring ${
                  isChanged
                    ? "bg-indigo-800 text-white hover:bg-indigo-900 focus:ring-indigo-400"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed focus:ring-gray-400"
                }`}
                aria-label="Submit changes"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
