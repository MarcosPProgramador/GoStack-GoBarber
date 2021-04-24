import AppError from '@shared/errors/AppError'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'


describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository()
    const createAppointmentService = new CreateAppointmentService(fakeAppointmentsRepository)

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '1'
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('1')

  })


  it('should not be able to create two appointments at the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository()
    const createAppointmentService = new CreateAppointmentService(fakeAppointmentsRepository)

    const appointmentDate = new Date(2005, 8, 12, 2)

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '1'
    })

    const appointmentPromise = createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '1'
    })

    expect(appointmentPromise).rejects.toBeInstanceOf(AppError)

  })
})

