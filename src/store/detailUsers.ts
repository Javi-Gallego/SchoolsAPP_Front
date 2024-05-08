import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface userInDetail {
  address: string;
  birthday: Date;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  parentid: [] | [{
        parentId: number,
        studentId: number,
        student: {
          address: string;
          birthday: Date;
          email: string;
          firstName: string;
          id: number;
          lastName: string;
          phone: number | null;
          profilePhoto: string;
          roles: string[];
          schoolId: number;
          secondLastName: string;
        }
}];
  phone: number | null;
  profilePhoto: string;
  roles: string[];
  schoolId: number;
  secondLastName: string;
  studentid: [] | [{
        parentId: number,
        studentId: number,
        parent: {
          address: string;
          birthday: Date;
          email: string;
          firstName: string;
          id: number;
          lastName: string;
          phone: number | null;
          profilePhoto: string;
          roles: string[];
          schoolId: number;
          secondLastName: string;
        }
}];
}
interface DetailUser {
  detailedUser: userInDetail;
  setDetailedUser: (newUser: userInDetail) => void;
  deleteDetailedUser: () => void;
}

export const useDetailUserStore = create<DetailUser>()(
  persist(
    (set) => ({
      detailedUser: {
        address: "",
        birthday: new Date(),
        email: "",
        firstName: "",
        id: 0,
        lastName: "",
        parentid: [],
        phone: null,
        profilePhoto: "",
        roles: [""],
        schoolId: 0,
        secondLastName: "",
        studentid: [],
      },
      setDetailedUser: (newUser: userInDetail) =>
        set({ detailedUser: newUser }),
      deleteDetailedUser: () =>
        set({
          detailedUser: {
            address: "",
            birthday: new Date(),
            email: "",
            firstName: "",
            id: 0,
            lastName: "",
            parentid: [],
            phone: null,
            profilePhoto: "",
            roles: [""],
            schoolId: 0,
            secondLastName: "",
            studentid: [],
          },
        }),
    }),
    { name: "detail-user-storage" }
  )
);
