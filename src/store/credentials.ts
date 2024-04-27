import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Auth {
    token: string;
    setToken: (newToken: string) => void;
}

export const useAuthStore = create<Auth>()(
    persist    
    ((set) => ({
        token: "",
        setToken: (newToken: string) => set({ token: newToken }),
    }), { name: "auth-storage" }
)
);