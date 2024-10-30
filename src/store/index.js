import { create } from "zustand";
import { createAuthSlice } from "./slices/auth-slice";
import { persist } from "zustand/middleware";
export const useAppStore = create()((...a) => ({
  ...createAuthSlice(...a),
}));
export const useStore = create(
  persist(
    (set) => ({
      user_id: null,
      setUserId: (id) => set({ user_id: id }),
      clearUserId: () => set({ user_id: null }),
    }),
    {
      name: "user_id", // Tên key trong local storage
      getStorage: () => localStorage, // Sử dụng local storage
    }
  )
);
