import CreateUserService from "@modules/users/services/CreateUserService"
import { classToClass } from "class-transformer"
import { Request, Response } from "express"
import { container } from "tsyringe"

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body


    const userCreate = container.resolve(CreateUserService)

    const user = await userCreate.execute({
      name,
      email,
      password,
    })

    return response.status(200).json(classToClass(user))
  }

}


