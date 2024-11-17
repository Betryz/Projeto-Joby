import { create } from "zustand"

export const useTableStore = create((set) => ({
    table: [],
    addTable: (newTable) => set((state) => ({ table: [newTable, ...state.table]})),
    setTable: (newTable) => set({ table: newTable }),
   
}))