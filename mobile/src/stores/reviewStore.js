import { create } from "zustand"

export const reviewStore = create((set) => ({
    comment: '',
    rating: '',
    createdAt: '',
    user_id: '', 
    movieId: '',

    review: (reviews) => set({...reviews}),

}))