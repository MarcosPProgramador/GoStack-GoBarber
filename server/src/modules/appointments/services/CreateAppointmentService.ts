import AppError from '@shared/errors/AppError'
import { startOfHour } from 'date-fns'
import Appointment from '../infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface RequestDTO {
  provider_id: string
  date: Date
}
/**
 *
 * SOLID
 *
 * [x] Single Responsability Principle
 * [ ] Open-Closed Principle
 * [ ] Liskov Substitution Principle
 * [ ] Interface Segregation Principle
 * [x] Dependency Inversion Principle
 *
 */

class CreateAppointmentService {

  constructor(private appointmentsRepository: IAppointmentsRepository) { }

  /**
   * execute
   */

  async execute({ provider_id, date }: RequestDTO): Promise<Appointment> {
    if (!provider_id || String(date) === 'Invalid Date') throw new AppError('Bad Request', 400)


    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate)
    if (findAppointmentInSameDate) throw new AppError('This appointment is already booked')

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    })

    return appointment
  }
}

export default CreateAppointmentService
