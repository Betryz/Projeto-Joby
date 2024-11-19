import { create } from "zustand"

export const useWatchlistStore = create((set) => ({
    watchlists: [],
    addWatchlist: (newWatchlist) => set((state) => ({ watchlists: [newWatchlist, ...state.watchlists]})),
    setWatchlist: (newWatchlist) => set({ watchlists: newWatchlist }),
   
}))