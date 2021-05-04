import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository'
import ResetPasswordService from '@modules/users/services/ResetPasswordService'
import { Response, Request } from 'express'
import { container } from 'tsyringe'

export default class ResetPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body

    const resetPassword = container.resolve(ResetPasswordService)

    await resetPassword.execute({
      token,
      password
    })

    return response.status(204).json()
  }


}
