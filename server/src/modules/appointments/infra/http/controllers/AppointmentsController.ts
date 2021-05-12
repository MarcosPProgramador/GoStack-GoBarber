import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService"
import { parseISO } from "date-fns"
import { Request, Response } from "express"
import { container } from "tsyringe"

class AppointmentsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body
    const user_id = request.user.id

    const parsedDate = parseISO(date)

    const createAppointmentService = container.resolve(CreateAppointmentService)
    const appointment = await createAppointmentService.execute({
      provider_id,
      user_id,
      date: parsedDate,
    })

    return response.status(201).json(appointment)
  }

}
export default AppointmentsController
