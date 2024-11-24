import { create } from "zustand";

export const useWatchlistStore = create((set) => ({
    watchlist: [], 

    addToWatchlist: (newItem) => 
        set((state) => ({ watchlist: [newItem, ...state.watchlist] })),

    setWatchlist: (newList) => set({ watchlist: newList }),
}));
