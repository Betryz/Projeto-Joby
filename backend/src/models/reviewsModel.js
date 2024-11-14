import {PrismaClient} from '@prisma/client'
import {z} from 'zod'

const prisma = new PrismaClient()



const reviewSchema = z.object({
    id: z.number({
            invalid_type_error: "O id deve ser um valor numérico",
            required_error: "O id é obrigatório"
        })
        .positive({message: "O id deve ser um número positivo maior que 0"}),
     
    user_id: z.number({
            invalid_type_error: "O user_id deve ser um valor numérico",
            required_error: "O user_id é obrigatório"
        }),
        movieId: z.number({
            invalid_type_error: "O movieId deve ser um valor numérico",
            required_error: "O movieId é obrigatório"
        }).positive({ message: "O movieId deve ser um número positivo maior que 0" }),
    
        comment: z.string({
            required_error: "O comment é obrigatório",
            invalid_type_error: "O comment deve ser um texto"
        }).min(1, { message: "O comment não pode estar vazio" }),
    
        rating: z.number({
            invalid_type_error: "O rating deve ser um valor numérico",
            required_error: "O rating é obrigatório"
        }).int().min(0, { message: "O rating deve ser pelo menos 0" }).max(5, { message: "O rating deve ser no máximo 5" }),
    
        createdAt: z.date().default(() => new Date()) 

        
     
})


export const reviewValidateToCreate = (reviews) => {
    const partialReviewSchema = reviewSchema.partial({id: true, user_id: true})
    return partialReviewSchema.safeParse(reviews)
}


export const review = async (reviews) => {
    const result = await prisma.reviews.create({
         data: reviews
    })
    return result
}



