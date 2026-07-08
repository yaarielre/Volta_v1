import { create } from "zustand";
import { authService } from "../services/auth";
import type { LoginInput, RegisterInput, User } from "../types/auth";

function decodeToken(token: string): { userId: string; role: string } | null {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (input) => {
    const tokens = await authService.login(input);
    const decoded = decodeToken(tokens.accessToken);
    if (!decoded) throw new Error("Token inválido");

    set({
      user: { id: decoded.userId, role: decoded.role as User["role"], email: input.email, name: "" },
      isAuthenticated: true,
    });
  },

  register: async (input) => {
    const tokens = await authService.register(input);
    const decoded = decodeToken(tokens.accessToken);
    if (!decoded) throw new Error("Token inválido");

    set({
      user: { id: decoded.userId, role: decoded.role as User["role"], email: input.email, name: input.name },
      isAuthenticated: true,
    });
  },

  logout: async () => {
    await authService.logout();
    set({ user: null, isAuthenticated: false });
  },

  restoreSession: async () => {
    try {
      const token = await authService.getStoredAccessToken();
      if (!token) {
        set({ isLoading: false });
        return;
      }

      const decoded = decodeToken(token);
      if (!decoded || !decoded.userId) {
        set({ isLoading: false });
        return;
      }

      set({
        user: { id: decoded.userId, role: decoded.role as User["role"], email: "", name: "" },
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      set({ isLoading: false });
    }
  },
}));
