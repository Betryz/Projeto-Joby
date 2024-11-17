import {PrismaClient} from '@prisma/client'
import {z} from 'zod'

const prisma = new PrismaClient()


const tableSchema = z.object({
    id: z.number({
        invalid_type_error: "O id deve ser um valor numérico",
        required_error: "O id é obrigatório",
      }).positive({ message: "O id deve ser um número positivo maior que 0" }),
    
      name: z.string({
        invalid_type_error: "O nome deve ser um texto",
        required_error: "O nome é obrigatório",
      }).min(1, { message: "O nome não pode estar vazio" }).max(100, { message: "O nome pode ter no máximo 100 caracteres" }),
    
      description: z.string({
        invalid_type_error: "A descrição deve ser um texto",
        required_error: "A descrição é obrigatória",
      }).min(1, { message: "A descrição não pode estar vazia" }).max(700, { message: "A descrição pode ter no máximo 700 caracteres" }),
    
      movies: z.number({
        invalid_type_error: "O movies deve ser um valor numérico",
        required_error: "O movies é obrigatório",
      }).positive({ message: "O movies deve ser um número positivo maior que 0" }),
    
      user_id: z.number({
        invalid_type_error: "O user_id deve ser um valor numérico",
        required_error: "O user_id é obrigatório",
      }),

          
})


export const tableValidateToUpdate = (table) => {
    const partialTableSchema= tableSchema.partial({user_id: true})
    return partialTableSchema.safeParse(table)
}



export const tableValidateId = (id) => {
    const partialTableSchema = tableSchema.partial({
        movies: true,
        description: true,
        name: true,
        user_id: true,
    
    })
    return partialTableSchema.safeParse({id})
}


export const tableValidateToCreate = (table) => {
    const partialTableSchema = tableSchema.partial({id: true, user_id: true})
    return partialTableSchema.safeParse(table)
}

export const listTable = async (public_id) => {
    const table = await prisma.table.findMany({
        where: {
            user: {
                public_id
            }
        },
        include: {
            movie: true, 
            user: true   
        },
    })
    return table
}

export const deleteTable = async (id, public_id) => {
    const table = await prisma.table.delete({
        where: {
            id: id,
            user:{
                public_id
            }
        }
    })
    return review
}


export const createTable = async (tableData) => {
    const { name, description, user_id, movieIds } = tableData;

    const result = await prisma.table.create({
        data: {
            name,
            description,
            user_id,
            movies: {
                connect: movieIds?.map(id => ({ id })) || [],
            },
        },
        include: {
            movies: true, 
        },
    });

    return result;
};



export const update = async (table, public_id) => {
    const result = await prisma.table.update({
        where: {
            id: table.id,
            user: { public_id },
        },
        data: {
            name: table.name,
            description: table.description,
            movies: table.movieIds
                ? { set: table.movieIds.map(id => ({ id })) }
                : undefined, 
        },
        include: {
            movies: true, 
        },
    });

  

    return result;
};


export const list = async () => {
    const result = await prisma.table.findMany()

    return result

}


