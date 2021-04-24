import { v4 as uuid } from 'uuid'
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import IAppointmentsRepository from "../IAppointmentsRepository";
import { isEqual } from 'date-fns';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment => isEqual(date, appointment.date))

    return findAppointment
  }
  async create({ date, provider_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, {
      id: uuid(),
      provider_id,
      date
    })
    this.appointments.push(appointment)
    return appointment
  }
}

export default FakeAppointmentsRepository
