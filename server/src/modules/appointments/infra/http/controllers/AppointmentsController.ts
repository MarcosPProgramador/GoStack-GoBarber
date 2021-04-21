import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService"
import { parseISO } from "date-fns"
import { Request, Response } from "express"
import AppointmentsRepository from "../../typeorm/repositories/AppointmentsRepository"

class AppointmentsController {
  async index(request: Request, response: Response)/* : Promise<Response> */ {
    /*
      const appointmentsRepository = new AppointmentsRepository()
      const appointments = await appointmentsRepository.find()
      return response.status(200).json(appointments)
    */
  }
  async store(request: Request, response: Response): Promise<Response> {
    const appointmentsReposirory = new AppointmentsRepository()

    const { provider_id, date } = request.body
    const parsedDate = parseISO(date)

    const createAppointmentService = new CreateAppointmentService(appointmentsReposirory)
    const appointment = await createAppointmentService.execute({
      provider_id,
      date: parsedDate,
    })

    return response.status(200).json(appointment)
  }

}
export default AppointmentsController
