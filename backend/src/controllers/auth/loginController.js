import { userValidateToLogin, getByEmail } from "../../models/authModel.js";
import { createSession } from "../../models/sessionModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../../config.js";

const login = async  (req, res, next ) => {
   
    try{

        const login = req.body;

        const loginValidated = userValidateToLogin(login)


        if(loginValidated?.error)
            return res.status(401).json({
                error: "Erro ao logar!",
            })

         const { email, pass } = loginValidated.data

         const user = await getByEmail(email)


         if(!user)
            return res.status(401).json({
                error: "Email ou senha inválida! (email)",
            })


         const passIsValid = bcrypt.compareSync(pass, user.pass)


         if(!passIsValid)
            return res.status(401).json({
                error: "Email ou senha inválida! (senha)",
            })

            const token = jwt.sign({public_id: user.public_id, name: user.name}, SECRET_KEY, {expiresIn: 60 *  5})
            

            await createSession(user.id, token)


    
        return res.json({
            success: "Conta criada com sucesso!",
            acessToken: token,
            user: {
                public_id: user.public_id,
                name: user.name,
                avatar: user.avatar,
                email: user.email
            }
        })
    } catch(error) {
        next(error)
    }



}

export default login