

import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import 'reflect-metadata'
import uploadConfig from './config/upload'
import './database/connection'
import AppError from './errors/AppError'
import router from './routes/router'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/static', express.static(uploadConfig.directory))
app.use(router)

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
    message: 'Internal server error',
  })
})

export default app
