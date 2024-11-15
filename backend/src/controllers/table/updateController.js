import { update, tableValidateToUpdate } from "../../models/tableModel.js"
import { getByPublicId } from '../../models/authModel.js'

const updateController = async (req, res, next) => {
    const {id} = req.params
    try{
        const table = req.body
        table.id = +id

        const tableValidated = tableValidateToUpdate(table)

        if(tableValidated?.error)
            return res.status(401).json({
                error: "Erro ao atualizar tabela!",
                fieldErrors: tableValidated.error.flatten().fieldErrors
            })

        const user = await getByPublicId(req.userLogged.public_id)

        if(!user)
            return res.status(401).json({
                error: "Public ID Inválido!"
            })

            tableValidated.data.user_id = user.id

        const result = await update(tableValidated.data, req.userLogged.public_id)

        if(!result)
            return res.status(401).json({
                error: "Erro ao criar atualizar!"
            })

        return res.json({
            success: "Conta atualizada com sucesso!",
            table: result
        })
    } catch(error) {
        if(error?.code === 'P2025')
            return res.status(404).json({
                error: `Conta com o id ${id}, não encontrado!`
            })
        next(error)
    }
}

export default updateController