import { create } from "zustand";
import { persist } from "zustand/middleware";

// School {
//   id: 1,
//   name: 'El Drac',
//   address: 'Calle Mendez Nuñez 21-23',
//   phone: 961559664,
//   logo: '/uploads/schools/escola-el-drac-logo.png',
//   web: 'https://escolaeldrac.com/'
// }
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
