import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import AppError from '@shared/errors/AppError'
import path from 'path'
import { inject, injectable } from 'tsyringe'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserTokensRepository from '../repositories/IUserTokensRepository'


interface IRequest {
  email: string
}
@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) { }
  async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new AppError('User does not exists.', 409)

    const { token } = await this.userTokensRepository.generate(user.id)

    const forgotPasswordTemplatePath = path.resolve(__dirname, '..', 'views', 'forgotPasswordEmailView.hbs')

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        address: user.email,
      },
      subject: 'Recuperação de senha.',
      templateData: {
        file: forgotPasswordTemplatePath,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`
        }
      }
    })


  }
}

export default SendForgotPasswordEmailService
