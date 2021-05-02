import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import User from '../infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository'


interface IRequest {
  email: string
}
injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {

  }
  async execute({ email }: IRequest): Promise<void> {
    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (!checkUserExists) throw new AppError('User does not exists.')

    this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido com sucesso.')

  }
}

export default SendForgotPasswordEmailService
