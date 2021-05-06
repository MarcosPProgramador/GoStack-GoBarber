import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string
  name: string
  email: string
  old_password?: string
  password?: string
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  async execute({
    name,
    email,
    user_id,
    old_password,
    password

  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) throw new AppError('User does not exists.', 409)

    const checkUserEmail = await this.usersRepository.findByEmail(email)

    if (checkUserEmail && checkUserEmail.id !== user.id) {
      throw new AppError('This email is already being used.', 409)
    }

    user.name = name
    user.email = email


    if (password && !old_password) throw new AppError('You need to inform the old password to set a new password.', 409)

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password
      )

      if (!checkOldPassword) throw new AppError('Old password does not match.', 409)

      user.password = await this.hashProvider.generateHash(password)
    }

    await this.usersRepository.save(user)

    return user


  }

}

