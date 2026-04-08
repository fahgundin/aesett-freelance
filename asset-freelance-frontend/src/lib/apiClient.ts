import { API_BASE_URL } from "@/config/api";

interface RequestOptions extends Omit<RequestInit, "headers"> {
  headers?: Record<string, string>;
}

function getAuth() {
  const stored = sessionStorage.getItem("admin_auth");
  if (!stored) return null;
  return JSON.parse(stored) as { accessToken: string; csrfToken: string };
}

export async function apiRequest(path: string, options: RequestOptions = {}) {
  const auth = getAuth();
  const headers: Record<string, string> = {
    ...options.headers,
  };

  if (auth) {
    headers["Authorization"] = `Bearer ${auth.accessToken}`;
    headers["X-CSRF-Token"] = auth.csrfToken;
  }

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = headers["Content-Type"] || "application/json";
  }

  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });

  if (res.status === 401) {
    sessionStorage.removeItem("admin_auth");
    window.location.href = "/admin";
    throw new Error("Sessão expirada");
  }

  return res;
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await apiRequest(path);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const isFormData = body instanceof FormData;
  const res = await apiRequest(path, {
    method: "POST",
    body: isFormData ? (body as FormData) : JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `POST ${path} failed: ${res.status}`);
  }
  return res.json();
}

export async function apiPatch<T>(path: string, body: unknown): Promise<T> {
  const res = await apiRequest(path, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`PATCH ${path} failed: ${res.status}`);
  return res.json();
}

export async function apiDelete(path: string): Promise<void> {
  const res = await apiRequest(path, { method: "DELETE" });
  if (!res.ok && res.status !== 204) throw new Error(`DELETE ${path} failed: ${res.status}`);
}
