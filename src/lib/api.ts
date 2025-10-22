/* eslint-disable @typescript-eslint/no-explicit-any */
export type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  body?: any;
  headers?: Record<string, string>;
  authToken?: string | null;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

async function apiRequest<T>({ method = "GET", path, body, headers = {}, authToken }: ApiOptions): Promise<T> {
  if (!BASE_URL) {
    throw new Error("API base URL is not configured. Set NEXT_PUBLIC_API_URL in .env");
  }

  const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const res = await fetch(url, {
    method,
    headers: {
      // Only set JSON content-type when not sending FormData
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      Accept: "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...headers,
    },
    body: body ? (isFormData ? (body as FormData) : JSON.stringify(body)) : undefined,
    // Ensure credentials aren't sent by default; adjust if backend uses cookies
    credentials: "omit",
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await res.json().catch(() => ({})) : ((await res.text()) as any);

  if (!res.ok) {
    const message = (isJson && (data?.message || data?.error)) || res.statusText || "Request failed";
    const error: any = new Error(message);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data as T;
}

export const api = {
  get: <T>(path: string, opts: Omit<ApiOptions, "method" | "path"> = {}) =>
    apiRequest<T>({ method: "GET", path, ...opts }),
  post: <T>(path: string, body?: any, opts: Omit<ApiOptions, "method" | "path" | "body"> = {}) =>
    apiRequest<T>({ method: "POST", path, body, ...opts }),
  put: <T>(path: string, body?: any, opts: Omit<ApiOptions, "method" | "path" | "body"> = {}) =>
    apiRequest<T>({ method: "PUT", path, body, ...opts }),
  patch: <T>(path: string, body?: any, opts: Omit<ApiOptions, "method" | "path" | "body"> = {}) =>
    apiRequest<T>({ method: "PATCH", path, body, ...opts }),
  delete: <T>(path: string, opts: Omit<ApiOptions, "method" | "path"> = {}) =>
    apiRequest<T>({ method: "DELETE", path, ...opts }),
};
