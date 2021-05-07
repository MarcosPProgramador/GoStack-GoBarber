import { injectable, inject } from 'tsyringe'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
interface IRequest {
  provider_id: string,
  month: number,
  year: number
}
type IResponse = Array<{
  day: number,
  available: boolean
}>
@injectable()
export default class ListProviderMonthlyAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) { }
  async execute({ }: IRequest): Promise<IResponse> {
    // const apointmentsInMonth = this.appointmentsRepository.
    return [{ day: 1, available: false }]
  }
}

