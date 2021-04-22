import crypto from 'crypto'
import multer from 'multer'
import path from 'path'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const hash = crypto.randomBytes(10).toString('hex')
      const originalName = file.originalname.replace(' ', '-')
      
      const fileName = `${hash}-${originalName}`

      callback(null, fileName)
    },
  }),
}
