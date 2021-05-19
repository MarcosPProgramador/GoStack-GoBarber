import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import AppError from '@shared/errors/AppError'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let fakeNotificationsRepository: FakeNotificationsRepository
let fakeUsersRepository: FakeUsersRepository
let fakeCacheProvider: FakeCacheProvider

let createAppointment: CreateAppointmentService

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeNotificationsRepository = new FakeNotificationsRepository()
    fakeUsersRepository = new FakeUsersRepository()
    fakeCacheProvider = new FakeCacheProvider()
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeUsersRepository,
      fakeNotificationsRepository,
      fakeCacheProvider
    )
  })
  it('should be able to create a new appointment', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    jest.spyOn(Date,'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 11, 7).getTime()
    })

    const appointment = await createAppointment.execute({
      date: new Date(2021, 4, 11, 8),
      user_id: user.id,
      provider_id: 'provider-id'
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('provider-id')

  })


  it('should not be able to create two appointments at the same time', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })


    const appointmentDate = new Date(2021, 4, 10, 11);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4 , 10, 10).getTime()
    })

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'provider-id',
      user_id: user.id,
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4 , 10, 10).getTime()
    })
    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: 'provider-id',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);

  })
  it('should not be able to create an appointment at a past date.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 11, 9).getTime()
    })

    await expect(
      createAppointment.execute({
        provider_id: '1',
        user_id: user.id,
        date: new Date(2021, 4, 11, 8)
      })
    ).rejects.toBeInstanceOf(AppError)

  })
  it('should not be able to create an appointment with user as provider', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 11, 7).getTime()
    })
    await expect(
      createAppointment.execute({
        date: new Date(2021, 4, 11, 8),
        user_id: user.id,
        provider_id: user.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })
  it('should not be able to create an appointment with non-existent user', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 12, 15).getTime()
    })
    await expect(
      createAppointment.execute({
        date: new Date(2021, 4, 12, 17),
        provider_id: 'provider-id',
        user_id: 'user-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 9).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2021, 4, 11, 7),
        user_id: user.id,
        provider_id: 'provider-id'
      })
    ).rejects.toBeInstanceOf(AppError)

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 9).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2021, 4, 11, 18),
        user_id: user.id,
        provider_id: 'provider-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})

