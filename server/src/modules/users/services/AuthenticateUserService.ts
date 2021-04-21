import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import User from '../infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository'


interface RequestDTO {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
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
class AuthenticateUserService {
  constructor(private usersRepository: IUsersRepository) { }

  /**
   * execute
   */
  async execute({ email, password }: RequestDTO): Promise<Response> {


    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new AppError('Incorrect email/password combination.', 401)

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) throw new AppError('Incorrect email/password combination.', 401)

    const { expiresIn, secret } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return {
      user,
      token,
    }
  }
}
export default AuthenticateUserService
