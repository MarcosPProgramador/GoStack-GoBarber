import AuthenticateUserService from "@modules/users/services/AuthenticateUserService"
import { Request, Response } from "express"
import { container } from "tsyringe"

class SessionsController {
  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body
    const authenticateUser = container.resolve(AuthenticateUserService)

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
