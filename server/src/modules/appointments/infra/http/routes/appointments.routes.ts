import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { Router } from 'express'
import AppointmentsController from '../controllers/AppointmentsController'

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', appointmentsController.index)
appointmentsRouter.post('/', appointmentsController.store)

export default appointmentsRouter
