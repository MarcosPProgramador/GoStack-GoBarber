import ShowProfileService from "@modules/users/services/ShowProfileService";
import UpdateProfileService from "@modules/users/services/UpdateProfileService";
import { Request, Response } from "express";
import { container } from "tsyringe";


export default class ProfileController {
  async show(request: Request, response: Response): Promise<Response> {
    const showProfile = container.resolve(ShowProfileService)

    const user_id = request.user.id

    const user = await showProfile.execute({
      user_id
    })
    const userWithoutPassword = {
      ...user,
      password: undefined
    }
    return response.status(200).json(userWithoutPassword)
  }
  async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      old_password,
      password
    } = request.body
    const user_id = request.user.id

    const updateProfile = container.resolve(UpdateProfileService)

    const updatedUser = await updateProfile.execute({
      name,
      email,
      user_id,
      old_password,
      password
    })
    const updatedUserWithoutPassword = {
      ...updatedUser,
      password: undefined
    }

    return response.status(200).json(updatedUserWithoutPassword)
  }
}
