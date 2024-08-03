import nodemailer from 'nodemailer.js'


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "juanconvers.legal@gmail.com",
        pass: ""
    }
})

export const sendEmailRecoverPassword = async(email, linkChangePassword) => {
    const mailOption = {
        from: "juanconvers.legal@gmail.com", 
        to: email,
        subject: "Recuperación de contraseña",
        text: 
        `
        Haga click en el siguiente enlace para cambiar su contraseña ${linkChangePassword}
        `,
        html:
        `
            <p>Haga click en el siguiente enlace para cambiar su contraseña: <button></p><a href=${linkChangePassword}>Reestablecer contraseña</a></button>

        ` 
       }

       transporter.sendMail(mailOption, (error, info) => {
            if(error) {
                console.log("Error al enviar correo para reestablecer contraseña")
            } else {
                console.log("Correo enviado correctamente", info.response)
            }

       })

}