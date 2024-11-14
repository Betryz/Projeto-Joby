import { reviews, reviewValidateToCreate } from "../../models/reviewsModel.js"
import {getByPublicId } from "../../models/authModel.js" 


const avalia = async (req, res, next) => {
    try{

        console.log("req.userLogged:", req.userLogged); 
        if (!req.userLogged || !req.userLogged.public_id) {
            return res.status(400).json({ error: "Usuário não autenticado!" });
        }

        const body = req.body

        const reviewValidated = reviewValidateToCreate(body)



        const user = await getByPublicId(req.userLogged.public_id)
        

      
       

        reviewValidated.data.user_id = user.id
        const result = await reviews(reviewValidated.data)


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