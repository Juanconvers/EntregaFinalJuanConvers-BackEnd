import jwt from 'jsonwebtoken'

export const generateToken = (user) => {

    
    const token = jwt.sign({ user }, "coder", { expiresIn: '12h' })
    return token
}

/*
        1°: Objeto de asociacion del token (Usuario)
        2°: Clave privada del cifrado
        3°: Tiempo de expiracion
    */
