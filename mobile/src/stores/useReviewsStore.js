import { create } from "zustand"

export const useReviewsStore = create((set) => ({
    reviews: [],
    addReviews: (newReviews) => set((state) => ({ reviews: [newReviews, ...state.reviews]})),
    setReviews: (newReviews) => set({ reviews: newReviews }),
   
}))