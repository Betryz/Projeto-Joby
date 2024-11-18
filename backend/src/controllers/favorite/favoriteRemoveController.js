import { deleteWatchlist,  watchlistValidateId } from "../../models/favoriteModel.js"

const remove = async (req, res, next) => {
    const {id} = req.params
    try{
        const  watchlistSValidate =  watchlistValidateId(+id)

        if(watchlistValidate?.error)
            return res.status(401).json({
                error: "Erro ao deletar um serviço!",
                fieldErrors: watchlistValidate.error.flatten().fieldErrors
            })

        const watchlist = await deleteWatchlist(watchlistValidate.data.id, req.userLogged.public_id)

        return res.json({
            success: "Conta removida com sucesso!",
            watchlist
        }) 
    }catch(error){
        if(error?.code === 'P2025')
            return res.status(404).json({
                error: `Conta com o id ${id}, não encontrado!`
            })
        next(error)
    }
}

export default remove