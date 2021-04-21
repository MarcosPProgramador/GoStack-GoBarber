import CreateUserService from "@modules/users/services/CreateUserService"
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService"
import { Request, Response } from "express"
import UsersRepository from "../../typeorm/repositories/UsersRepository"

class UsersController {
  async store(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const usersRepository = new UsersRepository()

    const userCreate = new CreateUserService(usersRepository)

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
  async updateAvatar(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository()
    const updateUserAvatar = new UpdateUserAvatarService(usersRepository)

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    })
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      updated_at: user.updated_at,
      created_at: user.created_at,
    }
    return response.status(200).json(userWithoutPassword)
  }
}

export default UsersController
