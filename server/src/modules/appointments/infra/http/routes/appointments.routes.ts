import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { Router } from 'express'
import {Segments, Joi, celebrate} from 'celebrate'
import AppointmentsController from '../controllers/AppointmentsController'
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController'

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()
const providerAppointmentsController = new ProviderAppointmentsController()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/me',providerAppointmentsController.index)
appointmentsRouter.post('/', celebrate({
  [Segments.BODY]: {
    provider_id: Joi.string().uuid().required(),
    date: Joi.string()
  }
}), appointmentsController.create)

export default appointmentsRouter
