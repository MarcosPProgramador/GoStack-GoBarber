import AppError from "@shared/errors/AppError"
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider"
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository"
import AuthenticateUserService from "./AuthenticateUserService"
import CreateUserService from "./CreateUserService"

describe('AuthenticateUser', () => {
  it('should be able to authenticate a user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })
  it('should not be able to authenticate with non-existent user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)

    const responsePromise = authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(responsePromise).rejects.toBeInstanceOf(AppError)
  })
  it('should not be able to authenticate with an invalid user password', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567'
    })

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)

    const responsePromise = authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(responsePromise).rejects.toBeInstanceOf(AppError)
  })
})
