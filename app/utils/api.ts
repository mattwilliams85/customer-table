export const apiFetch = async <T>(
  path: string,
  options?: RequestInit
): Promise<T> => {
  try {
    const res = await fetch(`http://localhost:1323/${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch ${path}: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
