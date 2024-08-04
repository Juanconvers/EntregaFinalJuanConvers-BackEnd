import multer from "multer";
import { __dirname } from "../path.js";

const storageProds = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/public/img/products`)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`)
    }
})

const storageDocs = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/docs`)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`)
    }
})

const storageProfiles = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/public/img/profiles`)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`)
    }
})

export const uploadProds = multer({ storage: storageProds })
export const uploadDocs = multer({ storage: storageDocs })
export const uploadProfiles = multer({ storage: storageProfiles })



// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, `${__dirname}/public/img`)
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}${file.originalname}`)
//     }
// })

// const upload = multer({ storage: storage })

// export default upload