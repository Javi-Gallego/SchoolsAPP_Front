import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Auth {
    token: string | null;
    setToken: (newToken: string) => void;
}

export const useAuthStore = create<Auth>(
        (set) => ({
            token: null,
            setToken: (newToken: string) => set({ token: newToken }),
        })
);

// export const useAuthStore = create<Auth>(
//     persist(
//         (set:) => ({
//             token: null,
//             setToken: (newToken: string) => set({ token: newToken }),
//         }),
//         {
//             name: "auth-storage",
//             storage: createJSONStorage(() => localStorage),
//         }
//     )
// );