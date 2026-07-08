import { Platform } from "react-native";
import Constants from "expo-constants";

function getHost(): string {
  if (Platform.OS === "android") {
    return "10.0.2.2";
  }

  const debuggerHost = Constants.expoGoConfig?.debuggerHost;

  if (debuggerHost) {
    const ip = debuggerHost.split(":")[0];
    return ip;
  }

  console.log("🔍 Falling back to localhost");
  return "localhost";
}

export const API_BASE_URL = `http://${getHost()}:4000/api`;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
  },
} as const;
