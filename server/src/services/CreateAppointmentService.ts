

import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError'
import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface RequestDTO {
  provider_id: string
  date: Date
}

class CreateAppointmentService {
  /**
   * execute
   */

  async execute({ provider_id, date }: RequestDTO): Promise<Appointment> {
    if (!provider_id || String(date) === 'Invalid Date') throw new AppError('Bad Request', 400)

    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate)
    if (findAppointmentInSameDate) throw new AppError('This appointment is already booked')

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    })
    await appointmentsRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
