import { table, tableValidateToCreate } from "../../models/tableModel.js"
import { getByPublicId } from "../../models/authModel.js"


const create = async (req, res, next) => {
    try {

        console.log("req.userLogged:", req.userLogged);
        if (!req.userLogged || !req.userLogged.public_id) {
            return res.status(400).json({ error: "Usuário não autenticado!" });
        }

        const body = req.body

        const tableValidated = tableValidateToCreate(body)


        if (!tableValidated.success) {
            console.log("Erros de validação:", tableValidated.error.errors);
            return res.status(400).json({
                error: "Dados da avaliação inválidos!",
                details: tableValidated.error.errors
            });
        }


        const user = await getByPublicId(req.userLogged.public_id)


        if (!user)
            return res.status(401).json({
                error: "Public ID Inválido!"
            })

        const tableData = {
            ...tableValidated.data,
            user_id: user.public_id
        };


        const result = await table(tableData);


        if (!result)
            return res.status(401).json({
                error: "Erro ao criar conta!"
            })

        return res.json({
            success: "Conta criada com sucesso!",
            body: result
        })
    } catch (error) {
        next(error)
    }
}

export default create