import { movie} from "../../models/filmeModel.js"


const filme = async (req, res, next) => {
    try{
        const filme = req.body

    
        const result = await movie(filme)

        if(!result)
            return res.status(401).json({
                error: "Erro ao criar conta!"
            })

        return res.json({
            success: "Conta criada com sucesso!",
            filme: result
        })
    } catch(error) {
        next(error)
    }
}

export default filme