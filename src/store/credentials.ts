import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Child{
  id: number;
  firstName: string;
  lastName: string;
  secondLastName: string;
  profilePhoto: string;
}

interface Auth {
  token: string;
  firstName: string;
  profilePhoto: string;
  schoolId: number;
  roles: string[];
  schoolLogo: string;
  children: Child[];
  setToken: (newToken: string) => void;
  setFirstName: (newFirstName: string) => void;
  setProfilePhoto: (newProfilePhoto: string) => void;
  setSchoolId: (newSchoolId: number) => void;
  setRoles: (newRoles: string[]) => void;
  setSchoolLogo: (newSchoolLogo: string) => void;
  setChildren: (newChildren: Child[]) => void;
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
      children: [],
      setToken: (newToken: string) => set({ token: newToken }),
      setFirstName: (newFirstName: string) => set({ firstName: newFirstName }),
      setProfilePhoto: (newProfilePhoto: string) =>
        set({ profilePhoto: newProfilePhoto }),
      setSchoolId: (newSchoolId: number) => set({ schoolId: newSchoolId }),
      setRoles: (newRoles: string[]) => set({ roles: newRoles }),
      setSchoolLogo: (newSchoolLogo: string) =>
        set({ schoolLogo: newSchoolLogo }),
      setChildren: (newChildren: Child[]) => set({ children: newChildren }),
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
