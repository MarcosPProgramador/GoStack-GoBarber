import AppError from '@shared/errors/AppError'
import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'
import User from '../infra/typeorm/entities/User'
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
    private usersRepository: IUsersRepository
  ) { }


  async execute({ name, email, password }: IRequestDTO): Promise<User> {


    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (checkUserExists) throw new AppError('User already exists', 409)

    const hashedPassword = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })


    return user
  }
}
export default CreateUserService
