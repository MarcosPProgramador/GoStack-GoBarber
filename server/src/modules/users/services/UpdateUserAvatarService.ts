import uploadConfig from '@config/upload'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import AppError from '@shared/errors/AppError'
import fs from 'fs'
import path from 'path'
import { inject, injectable } from 'tsyringe'
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
 * [x] Liskov Substitution Principle
 * [ ] Interface Segregation Principle
 * [x] Dependency Inversion Principle
 *
 */
@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }
  /**
   * execute
   */
  public async execute({ user_id, avatarFileName }: RequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id)
    if (!user) throw new AppError('Only autheticated users can change avatar.', 401)

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }
    const filename = await this.storageProvider.saveFile(avatarFileName)

    user.avatar = filename

    await this.usersRepository.save(user)

    await this.cacheProvider.invalidatePrefix('providers-list')
    await this.cacheProvider.invalidatePrefix('provider-appointments')

    return user
  }
}
export default UpdateUserAvatarService
