import upload from '../config/multer.js'

export const insertImg = (req, res) => {
    try {
        res.status(200).send("Imagen cargada exitosamente")
    } catch (e) {
        res.status(500).send("Error al cargar la imagen. Revisar")
    }
}