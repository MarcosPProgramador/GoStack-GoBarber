import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import User from '../infra/typeorm/entities/User'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequestDTO {
  name: string
  email: string
  password: string
}
/**
 *
 * SOLID
 *
 * [x] Single Responsability Principle
 * [ ] Open-Closed Principle
 * [ ] Liskov Substitution Principle
 * [ ] Interface Segregation Principle
 * [x] Dependency Inversion Principle
 *
 */

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }


  async execute({ name, email, password }: IRequestDTO): Promise<User> {


    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (checkUserExists) throw new AppError('User already exists', 409)

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })


    return user
  }
}
export default CreateUserService
