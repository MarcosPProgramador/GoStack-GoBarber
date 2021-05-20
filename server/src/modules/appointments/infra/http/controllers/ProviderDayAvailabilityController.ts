import ListProviderDayAvailabilityService from "@modules/appointments/services/ListProviderDayAvailabilityService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ProviderDayAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params
    const { month, year, day } = request.query

    const listProviderDayAvailability = container.resolve(ListProviderDayAvailabilityService)

    const availability = await listProviderDayAvailability.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
      day: Number(day),
    })

    return response.status(200).json(availability)
  }
}
