import {PrismaClient} from '@prisma/client'


const prisma = new PrismaClient()




export const reviews = async (reviews, public_id, id ) => {
    const result = await prisma.reviews.create({
        data: {
            ...reviews,
            user: { connect: { public_id: public_id } },
            movie: { connect: { id: id } }
        }
    })
    
    return result
}