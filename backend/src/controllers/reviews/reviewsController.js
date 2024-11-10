import { reviews } from "../../models/reviewsModel.js"


const avalia = async (req, res, next) => {
    try{
        const body = req.body

    
        const result = await reviews(body)

        if(!result)
            return res.status(401).json({
                error: "Erro ao criar conta!"
            })

        return res.json({
            success: "Conta criada com sucesso!",
            body: result
        })
    } catch(error) {
        next(error)
    }
}

export default avalia