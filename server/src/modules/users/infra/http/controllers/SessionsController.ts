import AuthenticateUserService from "@modules/users/services/AuthenticateUserService"
import { Request, Response } from "express"
import UsersRepository from "../../typeorm/repositories/UsersRepository"

class SessionsController {
  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body
    const usersRepository = new UsersRepository()
    const authenticateUser = new AuthenticateUserService(usersRepository)

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    })

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }

    return response.status(200).json({ user: userWithoutPassword, token })
  }
}
export default SessionsController
