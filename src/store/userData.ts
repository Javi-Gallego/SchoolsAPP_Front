import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface userInfo {
    firstName: string | null;
    profilePhoto: string | null;
    schoolId: string | null;
    setUser: (newUser: { firstName: string,
        profilePhoto: string,
        schoolId: string
      }) => void;
}

export const useUserInfoStore = create<userInfo>(
        (set) => ({
            firstName: null,
            profilePhoto: null,
            schoolId: null,
            setUser: (newUser: { firstName: string,
                                  profilePhoto: string,
                                  schoolId: string
                                }) => set({ firstName: newUser.firstName,
                                             profilePhoto: newUser.profilePhoto,
                                             schoolId: newUser.schoolId
                                 }),
        })
);