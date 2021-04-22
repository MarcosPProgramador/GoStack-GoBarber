import CreateUserService from "@modules/users/services/CreateUserService"
import { Request, Response } from "express"
import { container } from "tsyringe"

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body


    const userCreate = container.resolve(CreateUserService)

    const user = await userCreate.execute({
      name,
      email,
      password,
    })

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      updated_at: user.updated_at,
      created_at: user.created_at,
    }
    return response.status(200).json(userWithoutPassword)
  }

}

export default UsersController
