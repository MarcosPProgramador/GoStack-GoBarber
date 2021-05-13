import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderMonthAvailability: ListProviderMonthAvailabilityService

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository)
  })
  it(`should be able to list the provider's one month availability`, async () => {
    const provider_id = '1'
    const user_id = '2'

    await fakeAppointmentsRepository.create({
      provider_id,
      user_id,
      date: new Date(2021, 4, 8, 8, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id,
      user_id,
      date: new Date(2021, 4, 8, 9, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id,
      user_id,
      date: new Date(2021, 4, 8, 10, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id,
      user_id,
      date: new Date(2021, 4, 8, 11, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id,
      user_id,
      date: new Date(2021, 4, 8, 12, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id,
      user_id,
      date: new Date(2021, 4, 8, 13, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id,
      user_id,
      date: new Date(2021, 4, 8, 14, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id,
      user_id,
      date: new Date(2021, 4, 8, 15, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id,
      user_id,
      date: new Date(2021, 4, 8, 16, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id,
      user_id,
      date: new Date(2021, 4, 8, 17, 0, 0)
    })

    const availability = await listProviderMonthAvailability.execute({
      provider_id,
      year: 2021,
      month: 5
    })

    expect(availability).toEqual(expect.arrayContaining([
      { day: 7, available: true },
      { day: 8, available: false },
      { day: 9, available: true },
      { day: 10, available: true },
    ]))

  })
})
