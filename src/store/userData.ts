import { create } from "zustand";
import { persist } from "zustand/middleware";

interface userInfo {
  id: number;
  firstName: string;
  roleName: string;
  stageId: number;
  courseId: number;
  setUserId: (newId: number) => void;
  setUserFirstName: (newFirstName: string) => void;
  setUserRoleName: (newRoleName: string) => void;
  setUserStageId: (newStageId: number) => void;
  setUserCourseId: (newCourseId: number) => void;
  deleteCourseStage: () => void;
  resetUser: () => void;
}

export const useUserInfoStore = create<userInfo>()(
  persist(
    (set) => ({
      id: 0,
      firstName: "",
      roleName: "",
      courseId: 0,
      stageId: 0,
      setUserId: (newId: number) => set({ id: newId }),
      setUserFirstName: (newFirstName: string) => set({ firstName: newFirstName }),
      setUserRoleName: (newRoleName: string) => set({ roleName: newRoleName }),
      setUserStageId: (newStageId: number) => set({ stageId: newStageId }),
      setUserCourseId: (newCourseId: number) => set({ courseId: newCourseId }),
      deleteCourseStage: () => 
        set({ 
          courseId: 0,
          stageId: 0,
        }),
      resetUser: () =>
        set({
          id: 0,
          firstName: "",
          roleName: "",
          courseId: 0,
          stageId: 0,
        }),
    }),
    {
      name: "userInfo-storage",
    }
  )
);
