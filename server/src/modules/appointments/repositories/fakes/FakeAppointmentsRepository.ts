import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindByDateDTO from "@modules/appointments/dtos/IFindByDateDTO";
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import { getDate, getMonth, getYear, isEqual } from 'date-fns';
import { v4 as uuid } from 'uuid';
import IAppointmentsRepository from "../IAppointmentsRepository";

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  async findAllInDayFromProvider({ provider_id, year, month, day }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter((appointment) => {
      return (
        appointment.provider_id === provider_id &&
        getYear(appointment.date) === year &&
        getMonth(appointment.date) + 1 === month &&
        getDate(appointment.date) === day

      )
    })
    return appointments
  }
  async findAllInMonthFromProvider({ provider_id, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      )
    })
    return appointments
  }
  async findByDate({
    provider_id,
    date
  }: IFindByDateDTO): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date) &&
      provider_id === appointment.provider_id
    )

    return findAppointment
  }
  async create({ date,user_id, provider_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, {
      id: uuid(),
      provider_id,
      user_id,
      date
    })
    this.appointments.push(appointment)
    return appointment
  }
}

export default FakeAppointmentsRepository
