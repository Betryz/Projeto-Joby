import { create } from "zustand"

export const useReviewsStore = create((set) => ({
    reviu: [],
    addReviews: (newReviews) => set((state) => ({ reviu: [newReviews, ...state.reviu]})),
    setReviews: (newReviews) => set({ reviu: newReviews }),
   
}))