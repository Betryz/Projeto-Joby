import { create } from "zustand"

export const useTableStore = create((set) => ({
    tablet: [],
    addTable: (newTable) => set((state) => ({ tablet: [newTable, ...state.tablet]})),
    setTable: (newTable) => set({ tablet: newTable }),
   
}))