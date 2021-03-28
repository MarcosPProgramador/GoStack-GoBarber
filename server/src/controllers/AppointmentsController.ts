import { parseISO } from "date-fns";
import { Request, Response } from "express";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentsRepository = new AppointmentsRepository();

class AppointmentsController {
  /**
   * index
   */
  public index(request: Request, response: Response) {
    const appointments = appointmentsRepository.all();

    return response.status(200).json(appointments);
  }
  /**
   * store
   */
  public store(request: Request, response: Response) {
    try {
      const { provider, date } = request.body;
      const parsedDate = parseISO(date);

      const createAppointmentService = new CreateAppointmentService(
        appointmentsRepository
      );
      const appointment = createAppointmentService.execute({
        provider,
        date: parsedDate,
      });

      return response.status(200).json(appointment);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
export default AppointmentsController;
