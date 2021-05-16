import 'reflect-metadata'
import 'dotenv/config'
import '@shared/container'
import 'express-async-errors'
import '../typeorm/connection'

import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import router from './routes'
import { errors } from 'celebrate'



const app = express()

app.use(cors())
app.use(express.json())
app.use('/static', express.static(uploadConfig.tmpFolder))
app.use(router)

app.use(errors())

/**
 * Global Exception Handler
 */
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }
  console.error(err)

  return response.status(500).json({
    status: 'error',
    error: err.message,
    message: 'Internal server error',
  })
})

export default app
