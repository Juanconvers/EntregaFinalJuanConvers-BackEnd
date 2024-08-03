import userModel from "../models/user.js"
import { sendEmailRecoverPassword } from "../utils/nodemailer.js";
import jwt from 'jsonwebtoken'
import {validatePassword, createHash} from "../utils/bcrypt.js"

export const login = async (req, res) => {
    try {
        if(!req.user){
            return res.status(401).send("Usuario o contraseña invalidos")
        }
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        }
        res.status(200).send("Usuario logueado correctamente")
    } catch (e) {
        res.status(500).send("Error al loguear usuario")
    }
}

export const register = async (req, res) => {
    try {
        if(!req.user){
            return res.status(400).send("El usuario ya existe en la app")
        }
        res.status(200).send("Usuario creado adecuadamente")
    } catch (e) {
        res.status(500).send("Error al registrar al usuario")
    }
}

export const logout = async (req, res) => {
    req.session.destroy(function (e) {
        if (e) {
            console.log(e)
        } else {
            res.status(200).redirect("/")
        }
    })
}

export const sessionGithub = async (req, res) => {
    console.log(req)
    req.session.user = {
        email: req.user.email,
        first_name: req.user.name
    }
    res.redirect('/')
}
 
export const testJWT = async (req, res) => {
    console.log("Desde testJWT" + req.user)
    if (req.user.rol == 'User')
        res.status(403).send("Usuario no autorizado")
    else
        res.status(200).send(req.user)
}

export const recoverPassword = async (req, res) => {
   const { token } = req.params
   const { newPassword } = req.body

   try{
        const validateToken = jwt.verify( token.substr(6,),"coder")
        const user = await userModel.find({email: validateToken.userEmail})
        if(user){
            if(!validatePassword(newPassword, user.password)){
                const hashPassword = createHash(newPassword)
                user.password = hashPassword
                const resultado = await userModel.findByIdAndUpdate(user._id, user)
                console.log(resultado)
                res.status(200).send("Contraseña modificada correctamente")
            }else{
                //iguales contraseñas coinciden
                res.status(400).send("La contraseña no puede ser identificada")

            }
        }else{ 
            res.status(404).send("Usuario no encontrado")
        }
   }catch (e){
        console.log(e)
        if(e?.message == 'jwt.expired'){
            res.status(400).send("El tiempo para recuperar la contraseña ha expirado. Use nuevo token")
        }
        res.status(500).send(e)
   }
    
}

export const sendEmailPassword = async (req, res) => {
    
    
    try{
        const {email} = req.body
        const user = await userModel.find({email: email}) 
        
        if (user){
            const token = jwt.sign({userEmail: email}, "coder", {expiresIn: '1h'})
            const resetLink = `http://localhost:11000/api/session/reset-password?token=${token}`
            sendEmailRecoverPassword(email, resetLink)
            res.status(200).send("Email enviado satisfactoriamente") 
        }else{
            res.status(404).send("Usuario No encontrado")
        }
    }catch (e){
        res.status(500).send(e)
    }

}


// sessionRouter.get('/current', passport.authenticate('jwt'), (req, res) => {
//     console.log(req)
//     res.status(200).send("Usuario Logueado Perfectamente")
// })

