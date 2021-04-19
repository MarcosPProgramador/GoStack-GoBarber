

import { parseISO } from 'date-fns'
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

class AppointmentsController {
  /**
   * index
   */
  async index(request: Request, response: Response): Promise<Response> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointments = await appointmentsRepository.find()

    return response.status(200).json(appointments)
  }
  /**
   * store
   */
  async store(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body
    const parsedDate = parseISO(date)

    const createAppointmentService = new CreateAppointmentService()
    const appointment = await createAppointmentService.execute({
      provider_id,
      date: parsedDate,
    })

    return response.status(200).json(appointment)
  }
}
export default AppointmentsController
