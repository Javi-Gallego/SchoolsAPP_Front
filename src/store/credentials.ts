import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Child{
  id: number;
  firstName: string;
  lastName: string;
  secondLastName: string;
  profilePhoto: string;
}

export interface CourseInterface{
 id: number;
  name: string;
  stageId: number;
  tutorId: number;
  year: number;
}

interface Auth {
  token: string;
  id: number;
  firstName: string;
  profilePhoto: string;
  schoolId: number;
  roles: string[];
  schoolLogo: string;
  children: Child[];
  courses: CourseInterface[];
  setToken: (newToken: string) => void;
  setId: (newId: number) => void;
  setFirstName: (newFirstName: string) => void;
  setProfilePhoto: (newProfilePhoto: string) => void;
  setSchoolId: (newSchoolId: number) => void;
  setRoles: (newRoles: string[]) => void;
  setSchoolLogo: (newSchoolLogo: string) => void;
  setChildren: (newChildren: Child[]) => void;
  setCourses: (newCourses: CourseInterface[]) => void;
  logout: () => void;
}

export const useAuthStore = create<Auth>()(
  persist(
    (set) => ({
      token: "",
      id: 0,
      firstName: "",
      profilePhoto: "",
      schoolId: 0,
      roles: [],
      schoolLogo: "",
      children: [],
      courses: [],
      setToken: (newToken: string) => set({ token: newToken }),
      setId: (newId: number) => set({ id: newId }),
      setFirstName: (newFirstName: string) => set({ firstName: newFirstName }),
      setProfilePhoto: (newProfilePhoto: string) =>
        set({ profilePhoto: newProfilePhoto }),
      setSchoolId: (newSchoolId: number) => set({ schoolId: newSchoolId }),
      setRoles: (newRoles: string[]) => set({ roles: newRoles }),
      setSchoolLogo: (newSchoolLogo: string) =>
        set({ schoolLogo: newSchoolLogo }),
      setChildren: (newChildren: Child[]) => set({ children: newChildren }),
      setCourses: (newCourses: CourseInterface[]) => set({ courses: newCourses }),
      logout: () =>
        set({
          token: "",
          firstName: "",
          profilePhoto: "",
          schoolId: 0,
          roles: [],
          schoolLogo: "",
          children: [],
        }),
    }),
    { name: "auth-storage" }
  )
);
