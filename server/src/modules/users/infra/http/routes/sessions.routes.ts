import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import SessionsController from '../controllers/SessionsController'

const sessionsRouter = Router()
const sessionsController = new SessionsController()

sessionsRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.when('email', {
        is: Joi.string(),
        then: Joi.string().required()
      })
    }
  })
,sessionsController.authenticate)

export default sessionsRouter
