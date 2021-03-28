import { startOfHour } from "date-fns";
import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  /**
   * execute
   */
  public execute({ provider, date }: RequestDTO): Appointment {
    if (!provider || String(date) === "Invalid Date")
      throw new Error("Bad Request");

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate
    );
    if (findAppointmentInSameDate)
      throw new Error("This appointment is already booked");

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });
    return appointment;
  }
}

export default CreateAppointmentService;
