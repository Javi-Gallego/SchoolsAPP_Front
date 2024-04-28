import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface userInfo {
  firstName: string | null;
  profilePhoto: string | null;
  schoolId: string | null;
  roles: string[] | null;
  // setUser:  (newUser: {  firstName: string,
  //                       profilePhoto: string,
  //                       schoolId: string,
  //                       roles: string[]
  //                     }
  //           ) => void;
  setFirstName: (newFirstName: string) => void;
  setProfilePhoto: (newProfilePhoto: string) => void;
  setSchoolId: (newSchoolId: string) => void;
  setRoles: (newRoles: string[]) => void;
}

export const useUserInfoStore = create<userInfo>()(
  persist(
    (set) => ({
      firstName: "",
      profilePhoto: "",
      schoolId: "",
      roles: [],
      // setUser: (newUser: { firstName: string,
      //                       profilePhoto: string,
      //                       schoolId: string
      //                       roles: string[]
      //                     }) => set({ firstName: newUser.firstName,
      //                                 profilePhoto: newUser.profilePhoto,
      //                                 schoolId: newUser.schoolId,
      //                                 roles: newUser.roles
      //                      }),
      setFirstName: (newFirstName: string) => set({ firstName: newFirstName }),
      setProfilePhoto: (newProfilePhoto: string) =>
        set({ profilePhoto: newProfilePhoto }),
      setSchoolId: (newSchoolId: string) => set({ schoolId: newSchoolId }),
      setRoles: (newRoles: string[]) => set({ roles: newRoles }),
    }),
    {
      name: "userInfo-storage",
    }
  )
);
