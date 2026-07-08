import { API_BASE_URL } from "../constants/api";

interface RequestConfig {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  authenticated?: boolean;
}

let getAccessToken: (() => Promise<string | null>) | null = null;
let onUnauthorized: (() => void) | null = null;

export function configureApi(config: {
  getAccessToken: () => Promise<string | null>;
  onUnauthorized: () => void;
}) {
  getAccessToken = config.getAccessToken;
  onUnauthorized = config.onUnauthorized;
}

export async function apiRequest<TResponse = unknown>(
  endpoint: string,
  { method = "GET", body, headers = {}, authenticated = false }: RequestConfig = {}
): Promise<TResponse> {
  const url = `${API_BASE_URL}${endpoint}`;

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (authenticated && getAccessToken) {
    const token = await getAccessToken();
    if (token) {
      requestHeaders["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    method,
    headers: requestHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401 && onUnauthorized) {
    onUnauthorized();
  }

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data as TResponse;
}
