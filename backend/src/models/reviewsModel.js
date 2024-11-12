import {PrismaClient} from '@prisma/client'


const prisma = new PrismaClient()


export const reviews = async (reviews) => {
    const result = await prisma.reviews.create({
         data: reviews
    })
    return result
}