import { getDeviceFingerprint } from "./fingerprintProvider";

const API_URL = import.meta.env.VITE_API_URL as string;

const getAuthToken = (): string | null => {
  return localStorage.getItem("auth_token");
};

interface RequestParams {
  [key: string]: string | number | boolean;
}

export const apiClient = {
  async get<T>(endpoint: string, params: RequestParams = {}): Promise<T> {
    const url = new URL(`${API_URL}${endpoint}`);
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, String(params[key])),
    );

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const token = getAuthToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const fingerprint = await getDeviceFingerprint();
    headers["X-Device-Fingerprint"] = fingerprint;

    const response = await fetch(url.toString(), {
      method: "GET",
      headers,
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    return response.json() as Promise<T>;
  },

  async post<T>(endpoint: string, data: unknown = {}): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const token = getAuthToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    return response.json() as Promise<T>;
  },

  async put<T>(endpoint: string, data: unknown = {}): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const token = getAuthToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    return response.json() as Promise<T>;
  },

  async delete<T>(endpoint: string): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const token = getAuthToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    return response.json() as Promise<T>;
  },
};
