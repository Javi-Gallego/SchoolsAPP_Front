import {  create } from "zustand";
import { persist } from "zustand/middleware";

interface PersonState {
    firstName: string;
    lastName: string;

    setFirstName: (newFirstName: string) => void;
    setLastName: (newLastName: string) => void;
}

export const useUserInfoStore = create<PersonState>() (
    persist(
    (set) => ({
            
        firstName: "",
        lastName: "",

        setFirstName: (value: string) => set( state => ({ firstName: value })),
        setLastName: (value: string) => set( state => ({ lastName: value })),
    }), { name: "person-storage"}
    )
);