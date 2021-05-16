import crypto from 'crypto'
import multer, {StorageEngine} from 'multer'
import path from 'path'
interface IUploadsConfig {
  driver: 'disk' | 's3'
  tmpFolder: string,
  uploadsFolder: string
  multer: {
    storage: StorageEngine
  }
  config: {
    disk: {}
    aws: {
      bucket: string
    }
  }
}
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        const hash = crypto.randomBytes(10).toString('hex')
        const originalName = file.originalname.replace(' ', '-')

        const fileName = `${hash}-${originalName}`

        callback(null, fileName)
      },
    }),

  },
  config: {
    disk: {},
    aws: {
      bucket: 'aws'
    }
  }
} as IUploadsConfig
