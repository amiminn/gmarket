import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserProfile {
  id?: number;
  nama?: string;
  email?: string;
}

interface AuthState {
  profile: UserProfile | null;
  token: string | null;
  role: string | null;
  isLogin: boolean;

  // actions
  login: (token: string, profile: UserProfile, role?: string) => void;
  logout: () => void;
  setProfile: (profile: UserProfile) => void;
  setToken: (token: string) => void;
  setRole: (role: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      profile: null,
      token: null,
      role: null,
      isLogin: false,

      // LOGIN
      login: (token, profile, role = "user") =>
        set({
          token,
          profile,
          role,
          isLogin: true,
        }),

      // LOGOUT
      logout: () =>
        set({
          token: null,
          profile: null,
          role: null,
          isLogin: false,
        }),

      // UPDATE PROFILE
      setProfile: (profile) => set({ profile }),

      // UPDATE TOKEN
      setToken: (token) => set({ token }),

      // UPDATE ROLE
      setRole: (role) => set({ role }),
    }),
    {
      name: "auth-storage", // key localStorage
    }
  )
);
