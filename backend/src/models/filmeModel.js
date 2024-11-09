import {PrismaClient} from '@prisma/client'


const prisma = new PrismaClient()


export const movie = async (filme) => {
    const result = await prisma.filme.create({
         data: filme
    })
    return result
}