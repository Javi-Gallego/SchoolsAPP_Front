import { create } from "zustand";

interface School {
    id: number;
    name: string;
    address: string;
    phone: number;
    logo: string;
    web: string;
}

interface SchoolState {
  school: School;

  setSchool: (school: School) => void;
  reset: (by: number) => void;
}

export const useBearStore = create<SchoolState>()(
  
  (set) => ({
    school: {
        id: 0,
        name: "",
        address: "",
        phone: 0,
        logo: "",
        web: ""
    },

    setSchool: (schoolInfo: School) =>
      set(({ school: schoolInfo })),
    reset: () =>
      set(({school: {
                    id: 0,
                    name: "",
                    address: "",
                    phone: 0,
                    logo: "",
                    web: ""
                  }
      })),
  })

);
