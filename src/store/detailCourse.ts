import { create } from "zustand";
import { persist } from "zustand/middleware";

interface detailCourse {
  id: number;
  courseName: string;
  stageId: number;
  stageName: string;
  year: string;
  tutorId: number;
  setCourseId: (newId: number) => void;
  setCourseName: (newName: string) => void;
  setCourseStageId: (newStageId: number) => void;
  setStageName: (newStageName: string) => void;
  setYear: (newYear: string) => void;
  setTutorId: (newTutorId: number) => void;
  resetCourse: () => void;
}

export const useDetailCourseStore = create<detailCourse>()(
  persist(
    (set) => ({
      id: 0,
      courseName: "",
      stageId: 0,
      stageName: "",
      year: "",
      tutorId: 0,
      setCourseId: (newId: number) => set({ id: newId }),
      setCourseName: (newName: string) => set({ courseName: newName }),
      setCourseStageId: (newStageId: number) => set({ stageId: newStageId }),
      setStageName: (newStageName: string) => set({ stageName: newStageName }),
      setYear: (newYear: string) => set({ year: newYear }),
      setTutorId: (newTutorId: number) => set({ tutorId: newTutorId }),
      resetCourse: () =>
        set({
          id: 0,
          courseName: "",
          stageId: 0,
          year: "",
          tutorId: 0,
        }),
    }),
    {
      name: "detail-course-storage",
    }
  )
);
