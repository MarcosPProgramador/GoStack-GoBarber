import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository"
import ListProviderAppointmentsService from "./ListProviderAppointmentsService"

let listProviderAppointments: ListProviderAppointmentsService
let fakeAppointmentsRepository: FakeAppointmentsRepository
describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderAppointments = new  ListProviderAppointmentsService(fakeAppointmentsRepository)
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
})
