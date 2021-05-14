import AuthenticateUserService from "@modules/users/services/AuthenticateUserService"
import { classToClass } from "class-transformer"
import { Request, Response } from "express"
import { container } from "tsyringe"

export default class SessionsController {
  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body
    const authenticateUser = container.resolve(AuthenticateUserService)

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    })

    return response.status(200).json({ user: classToClass(user), token })
  }
}
