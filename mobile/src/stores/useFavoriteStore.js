import { create } from "zustand"

export const useWatchlistStore = create((set) => ({
    watchlist: [],
    addWatchlist: (newWatchlist) => set((state) => ({ watchlist: [newWatchlist, ...state.watchlist]})),
    setWatchlist: (newWatchlist) => set({ watchlist: newWatchlist }),
   
}))