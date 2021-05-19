import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider"
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository"
import ListProviderAppointmentsService from "./ListProviderAppointmentsService"

let listProviderAppointments: ListProviderAppointmentsService
let fakeAppointmentsRepository: FakeAppointmentsRepository
let fakeCacheProvider: FakeCacheProvider

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeCacheProvider = new FakeCacheProvider()
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider
    )
  })
  it('should be able to list all appointments from a provider', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2021, 4, 12, 13)
    })
    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2021, 4, 12, 13)
    })
    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider-id',
      day: 12,
      month: 5,
      year: 2021
    })
    expect(appointments).toEqual([appointment1, appointment2])
  })
  it('should be able to list all appointments from a provider by cache provider', async () => {
    const primaryAppointment = await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2021, 4, 12, 13)
    })
    const secondaryAppointment = await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2021, 4, 12, 13)
    })
    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider-id',
      day: 12,
      month: 5,
      year: 2021
    })
    await listProviderAppointments.execute({
      provider_id: 'provider-id',
      day: 12,
      month: 5,
      year: 2021
    })


    expect(appointments).toEqual([primaryAppointment, secondaryAppointment])

  })
})
