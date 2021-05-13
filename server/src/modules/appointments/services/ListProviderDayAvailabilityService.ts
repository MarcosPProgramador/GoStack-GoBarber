import AppError from "@shared/errors/AppError"
import { getHours, isAfter } from "date-fns"
import { inject, injectable } from "tsyringe"
import IAppointmentsRepository from "../repositories/IAppointmentsRepository"

interface IRequest {
  provider_id: string,
  year: number
  month: number
  day: number
}

type IResponse = Array<{
  hour: number,
  available: boolean
}>
@injectable()
export default class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) { }
  async execute({
    provider_id,
    year,
    month,
    day
  }: IRequest): Promise<IResponse> {
    const appointmentsInDay = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      year,
      month,
      day
    })
    const hourStart = 8
    const numberOfAppointmentsOnDay = 10

    const eachHourArray = Array.from(
      { length: numberOfAppointmentsOnDay },
      (_, key) => key + hourStart
    )


    const compareCurrentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointmentsInDay.find(
        appointment => getHours(appointment.date) === hour,
      );

      const compareDateSendByUser = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDateSendByUser, compareCurrentDate),
      };
    });
    return availability
  }
}
