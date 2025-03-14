import { Customer } from "@_types/customer";

export const apiFetch = async <T>(
  path: string,
  method: "GET" | "PATCH" = "GET",
  body?: { customer: Customer }
): Promise<T> => {
  try {
    const res = await fetch(`http://localhost:1323/${path}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: method !== "GET" && body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch ${path}: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
