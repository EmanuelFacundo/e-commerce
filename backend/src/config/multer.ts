import multer from "multer"
import path from "path"
import crypto from "crypto"
import multerS3 from "multer-s3"
import aws from "aws-sdk"

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"))
    }, 
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, err.message)

        const fileName = `${hash.toString('hex')}-${file.originalname}`

        cb(null, fileName)
      })
    }
  }),
  s3: multerS3({
    s3: new aws.S3(), // Já reconhece as variáveis de ambientes 
    bucket: 'testimages-upload', // nome do bucket
    contentType: multerS3.AUTO_CONTENT_TYPE, // Definido pra não fazer o Download automático, basicamente mostrando o tipo do arquivo para o navegador
    acl: 'public-read', // Para todo mundo visualizar os arquivos
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, err.message)

        file.key = `${hash.toString('hex')}-${file.originalname}`

        cb(null, file.key)
      })
    }
  })
}

export default {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
  fileFilter: (req: any, file: Express.Multer.File, cb: (arg0: Error, arg1?: boolean) => void) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif"
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null,true)
    } else {
      cb(new Error("Tipo de arquivo invalido."))
    }
  }
}
