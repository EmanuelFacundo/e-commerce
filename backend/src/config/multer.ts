import multer from "multer"
import path from "path"
import crypto from "crypto"

export default {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: multer.diskStorage({
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
