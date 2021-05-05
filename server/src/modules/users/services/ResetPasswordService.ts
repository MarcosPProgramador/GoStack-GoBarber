import AppError from '@shared/errors/AppError'
import { addHours, isAfter } from 'date-fns'
import { inject, injectable } from 'tsyringe'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserTokensRepository from '../repositories/IUserTokensRepository'

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  async execute({ token, password }: IRequest): Promise<void> {
    const userTokens = await this.userTokensRepository.findByToken(token)

    if (!userTokens) throw new AppError('User token does not exists.', 401)

    const user = await this.usersRepository.findById(userTokens.user_id)

    if (!user) throw new AppError('User does not exists.', 409)

    const amount = 2
    const limitDate = addHours(userTokens.created_at, amount)

    if (isAfter(Date.now(), limitDate)) throw new AppError('Token expired.', 401)

    user.password = await this.hashProvider.generateHash(password)
    this.usersRepository.save(user)

  }

}

export default ResetPasswordService
