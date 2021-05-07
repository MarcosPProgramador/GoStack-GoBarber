import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ListProvidersService from './ListProvidersService'

let fakeUsersRepository: FakeUsersRepository
let listProviders: ListProvidersService

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    listProviders = new ListProvidersService(
      fakeUsersRepository
    )
  })
  it('should be able to list all providers except the user', async () => {
    const primaryUser = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })
    const secondaryUser = await fakeUsersRepository.create({
      name: 'John thr',
      email: 'johnthr@example.com',
      password: '123456'
    })

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Fou',
      email: 'johnfou@example.com',
      password: '123456'
    })

    const providers = await listProviders.execute({
      user_id: loggedUser.id
    })

    expect(providers).toEqual([primaryUser, secondaryUser])
  })
})
