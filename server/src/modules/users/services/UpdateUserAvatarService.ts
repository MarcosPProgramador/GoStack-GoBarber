import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'
import fs from 'fs'
import path from 'path'
import User from '../infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository'


interface RequestDTO {
  user_id: string
  avatarFileName: string
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
class UpdateUserAvatarService {
  constructor(private usersRepository: IUsersRepository) { }
  /**
   * execute
   */
  public async execute({ user_id, avatarFileName }: RequestDTO): Promise<User> {


    const user = await this.usersRepository.findById(user_id)


    if (!user) throw new AppError('Only autheticated users can change avatar.', 401)

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      try {
        const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)
        if (userAvatarFileExists) {
          await fs.promises.unlink(userAvatarFilePath)
        }
      } catch (err) {
        console.log(err);

      }
    }
    user.avatar = avatarFileName

    await this.usersRepository.save(user)

    return user
  }
}
export default UpdateUserAvatarService
