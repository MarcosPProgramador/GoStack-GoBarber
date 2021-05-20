import ListProviderAppointmentsService from "@modules/appointments/services/ListProviderAppointmentsService"
import { classToClass } from "class-transformer"
import { Request, Response } from "express"
import { container } from "tsyringe"

export default class ProviderAppointmentsController {
  async index(request: Request, response: Response) : Promise<Response>  {
    const provider_id = request.user.id
    const { day, month, year } = request.query

    const listProviderAppointments = container.resolve(ListProviderAppointmentsService)

    const appointments = await listProviderAppointments.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
      day: Number(day),
    })
    return response.status(200).json(classToClass(appointments))
  }
}
