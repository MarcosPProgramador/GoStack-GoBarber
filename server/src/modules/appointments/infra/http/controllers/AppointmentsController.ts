import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService"
import { parseISO } from "date-fns"
import { Request, Response } from "express"
import { container } from "tsyringe"

class AppointmentsController {
  async index(request: Request, response: Response)/* : Promise<Response> */ {
    /*
      const appointmentsRepository = new AppointmentsRepository()
      const appointments = await appointmentsRepository.find()
      return response.status(200).json(appointments)
    */
  }
  async create(request: Request, response: Response): Promise<Response> {

    const { provider_id, date } = request.body
    const parsedDate = parseISO(date)

    const createAppointmentService = container.resolve(CreateAppointmentService)
    const appointment = await createAppointmentService.execute({
      provider_id,
      date: parsedDate,
    })

    return response.status(200).json(appointment)
  }

}
export default AppointmentsController
