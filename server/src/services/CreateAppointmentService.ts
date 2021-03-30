import { startOfHour } from "date-fns";
import AppError from "../errors/AppError";
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
      throw new AppError("Bad Request", 400);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate
    );
    if (findAppointmentInSameDate)
      throw new AppError("This appointment is already booked", 401);

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });
    return appointment;
  }
}

export default CreateAppointmentService;
