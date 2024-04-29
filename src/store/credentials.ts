import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Auth {
  token: string;
  firstName: string;
  profilePhoto: string;
  schoolId: number;
  roles: string[];
  schoolLogo: string;
  setToken: (newToken: string) => void;
  setFirstName: (newFirstName: string) => void;
  setProfilePhoto: (newProfilePhoto: string) => void;
  setSchoolId: (newSchoolId: number) => void;
  setRoles: (newRoles: string[]) => void;
  setSchoolLogo: (newSchoolLogo: string) => void;
  logout: () => void;
}

export const useAuthStore = create<Auth>()(
  persist(
    (set) => ({
      token: "",
      firstName: "",
      profilePhoto: "",
      schoolId: 0,
      roles: [],
      schoolLogo: "",
      setToken: (newToken: string) => set({ token: newToken }),
      setFirstName: (newFirstName: string) => set({ firstName: newFirstName }),
      setProfilePhoto: (newProfilePhoto: string) =>
        set({ profilePhoto: newProfilePhoto }),
      setSchoolId: (newSchoolId: number) => set({ schoolId: newSchoolId }),
      setRoles: (newRoles: string[]) => set({ roles: newRoles }),
      setSchoolLogo: (newSchoolLogo: string) =>
        set({ schoolLogo: newSchoolLogo }),
      logout: () =>
        set({
          token: "",
          firstName: "",
          profilePhoto: "",
          schoolId: 0,
          roles: [],
        }),
    }),
    { name: "auth-storage" }
  )
);
