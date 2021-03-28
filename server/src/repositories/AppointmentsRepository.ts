import Appointment from "../models/Appointment";
import { isEqual } from "date-fns";

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];
  constructor() {
    this.appointments = [];
  }
  create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
  all(): Appointment[] {
    return this.appointments;
  }
  findByDate(date: Date): Appointment | null {
    const appointment = this.appointments.find((appointment) =>
      isEqual(date, appointment.date)
    );
    return appointment || null;
  }
}
export default AppointmentsRepository;
