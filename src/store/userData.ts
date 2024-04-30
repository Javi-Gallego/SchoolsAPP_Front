import { create } from "zustand";
import { persist } from "zustand/middleware";

interface userInfo {
  id: number;
  firstName: string;
  roleName: string;
  setUserId: (newId: number) => void;
  setUserFirstName: (newFirstName: string) => void;
  setUserRoleName: (newRoleName: string) => void;
  resetUser: () => void;
}

export const useUserInfoStore = create<userInfo>()(
  persist(
    (set) => ({
      id: 0,
      firstName: "",
      roleName: "",
      setUserId: (newId: number) => set({ id: newId }),
      setUserFirstName: (newFirstName: string) => set({ firstName: newFirstName }),
      setUserRoleName: (newRoleName: string) => set({ roleName: newRoleName }),
      resetUser: () =>
        set({
          id: 0,
          firstName: "",
          roleName: "",
        }),
    }),
    {
      name: "userInfo-storage",
    }
  )
);
