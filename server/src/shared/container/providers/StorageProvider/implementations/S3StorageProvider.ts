import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'
import aws, { S3 } from 'aws-sdk'
import fs from 'fs'
import mime from 'mime'
import path from 'path'
import IStorageProvider from '../models/IStorageProvider'

export default class S3StorageProvider implements IStorageProvider {
  private client: S3

  constructor(){
    this.client = new aws.S3({
      region: 'us-east-1'
    })
  }

  async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file)

    const fileContent = await fs.promises.readFile(originalPath)
    /** return: image/png */
    const ContentType = mime.getType(originalPath)

    if(!ContentType) throw new AppError('file not found.')

    this.client.putObject({
      Bucket: uploadConfig.config.s3.bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType
    })
    return file
  }
  async deleteFile(file: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: uploadConfig.config.s3.bucket,
      Key: file ,
    }).promise()
  }

}
