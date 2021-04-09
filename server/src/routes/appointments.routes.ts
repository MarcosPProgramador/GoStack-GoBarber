import { Router } from 'express'
import AppointmentsController from '../controllers/AppointmentsController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()

appointmentsRouter.use(ensureAuthenticated)
appointmentsRouter.get('/', appointmentsController.index)
appointmentsRouter.post('/', appointmentsController.store)

export default appointmentsRouter
