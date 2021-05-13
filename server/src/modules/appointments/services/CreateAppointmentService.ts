import AppError from '@shared/errors/AppError'
import { getHours, isBefore, startOfHour,format } from 'date-fns'
import { inject, injectable } from 'tsyringe'
import Appointment from '../infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

interface RequestDTO {
  provider_id: string
  user_id: string
  date: Date
}
/**
 *
 * SOLID
 *
 * [x] Single Responsability Principle
 * [ ] Open-Closed Principle
 * [x] Liskov Substitution Principle
 * [ ] Interface Segregation Principle
 * [x] Dependency Inversion Principle
 *
 */
@injectable()
class CreateAppointmentService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository
  ) { }

  /**
   * execute
   */

  async execute({ provider_id, user_id, date }: RequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    if(isBefore(appointmentDate, Date.now()))
      throw new AppError(`you can't create an appointment at a past date.`)

    if(user_id === provider_id)
      throw new AppError(`you can't create an appointment with yourself.`)

    if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17)
      throw new AppError('you can only create an appointment between at 8am and 5pm.')

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate)
    if (findAppointmentInSameDate) throw new AppError('this appointment is already booked.')

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    })

    const user = await this.usersRepository.findById(user_id)

    if(!user) throw new AppError('user does not exist.')

    const dateFormatted = format(appointmentDate, `dd/MM/yyyy 'às' HH:mm'h'`)

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `${user.name} marcou um novo agendamento para o dia ${dateFormatted}`
    })

    return appointment
  }
}

export default CreateAppointmentService
