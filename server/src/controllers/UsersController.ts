

import { Request, Response } from 'express'
import CreateUserService from '../services/CreateUserService'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'

class UsersController {
  /**
   * store
   */
  async store(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const userCreate = new CreateUserService()

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

  /**
   * patch
   */
  async patch(request: Request, response: Response): Promise<Response> {



    const updateUserAvatar = new UpdateUserAvatarService()

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
