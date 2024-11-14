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
        })
        .positive({message: "O user_id deve ser um número positivo maior que 0"}),

        
     
})


export const reviewValidateToCreate = (reviews) => {
    const partialReviewSchema = reviewSchema.partial({id: true, user_id: true})
    return partialReviewSchema.safeParse(reviews)
}


export const reviews = async (reviews) => {
    const result = await prisma.reviews.create({
         data: reviews
    })
    return result
}



