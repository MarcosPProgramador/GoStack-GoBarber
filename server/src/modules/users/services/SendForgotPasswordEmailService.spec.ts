import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'
import AppError from '@shared/errors/AppError'

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using an email', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeMailProvider = new FakeMailProvider()

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider
    )
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'

    })
    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com'
    })

    expect(sendMail).toHaveBeenCalledWith('johndoe@example.com', "Pedido de recuperação de senha recebido com sucesso.")
  })
  it('should not be able to recover a non-existent user password', async () => {

    const fakeUsersRepository = new FakeUsersRepository()
    const fakeMailProvider = new FakeMailProvider()

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider
    )
    const user = sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com'
    })

    expect(user).rejects.toBeInstanceOf(AppError)
  })

})
// RED, GREEN, REFACTOR
