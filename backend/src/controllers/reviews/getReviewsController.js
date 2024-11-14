import { listReviews, review } from "../../models/reviewsModel.js" 

const list = async (req, res, next) => {
    try{
        const reviews = await listReviews(req.userLogged.public_id)
        return res.json({
            message: "Avaliações listadas com sucesso!",
            reviews
        })
    } catch(error) {
        next(error)
    }
}

export default list