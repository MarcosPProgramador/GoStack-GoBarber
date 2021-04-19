

import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'
import UsersController from '../controllers/UsersController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const usersRouter = Router()
const usersController = new UsersController()

const upload = multer(uploadConfig)

usersRouter.post('/', usersController.store)
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), usersController.patch)

export default usersRouter
