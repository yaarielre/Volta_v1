import { apiRequest } from "./api";
import { API_ENDPOINTS } from "../constants/api";
import type { AuthTokens, LoginInput, RegisterInput } from "../types/auth";
import { secureStorage } from "./storage";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const authService = {
  async login(input: LoginInput): Promise<AuthTokens> {
    const tokens = await apiRequest<AuthTokens>(API_ENDPOINTS.AUTH.LOGIN, {
      method: "POST",
      body: input,
    });
    await secureStorage.set(ACCESS_TOKEN_KEY, tokens.accessToken);
    await secureStorage.set(REFRESH_TOKEN_KEY, tokens.refreshToken);
    return tokens;
  },

  async register(input: RegisterInput): Promise<AuthTokens> {
    const tokens = await apiRequest<AuthTokens>(API_ENDPOINTS.AUTH.REGISTER, {
      method: "POST",
      body: input,
    });
    await secureStorage.set(ACCESS_TOKEN_KEY, tokens.accessToken);
    await secureStorage.set(REFRESH_TOKEN_KEY, tokens.refreshToken);
    return tokens;
  },

  async refresh(): Promise<AuthTokens | null> {
    const refreshToken = await secureStorage.get(REFRESH_TOKEN_KEY);
    if (!refreshToken) return null;

    try {
      const tokens = await apiRequest<AuthTokens>(API_ENDPOINTS.AUTH.REFRESH, {
        method: "POST",
        body: { refreshToken },
      });
      await secureStorage.set(ACCESS_TOKEN_KEY, tokens.accessToken);
      await secureStorage.set(REFRESH_TOKEN_KEY, tokens.refreshToken);
      return tokens;
    } catch {
      await this.logout();
      return null;
    }
  },

  async logout(): Promise<void> {
    const refreshToken = await secureStorage.get(REFRESH_TOKEN_KEY);
    if (refreshToken) {
      try {
        await apiRequest(API_ENDPOINTS.AUTH.LOGOUT, {
          method: "POST",
          body: { refreshToken },
        });
      } catch {
        // ignore logout errors
      }
    }
    await secureStorage.delete(ACCESS_TOKEN_KEY);
    await secureStorage.delete(REFRESH_TOKEN_KEY);
  },

  async getStoredAccessToken(): Promise<string | null> {
    return secureStorage.get(ACCESS_TOKEN_KEY);
  },

  async getStoredRefreshToken(): Promise<string | null> {
    return secureStorage.get(REFRESH_TOKEN_KEY);
  },
};
