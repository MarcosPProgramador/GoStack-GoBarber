import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe'

interface IRequest {
  user_id: string
}

@injectable()
export default class FindProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }
  async execute({ user_id }: IRequest): Promise<User[]> {
    const providers = await this.usersRepository.findAllProviders({
      except_user_id: user_id
    })
    return providers
  }
}
