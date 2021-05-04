import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO"
import IUsersRepository from "@modules/users/repositories/IUsersRepository"
import { getRepository, Repository } from "typeorm"
import User from "../entities/User"
/**
 * SOLID
 *
 * [ ] Single Responsability Principle
 * [ ] Open-Closed Principle
 * [x] Liskov Substitution Principle
 * [ ] Interface Segregation Principle
 * [ ] Dependency Inversion Principle
 *
 */
class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>
  constructor() {
    this.ormRepository = getRepository(User)
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email
      }
    })
    return user
  }
  async findById(id: string | number): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id
      }
    })
    return user
  }
  async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData)

    await this.ormRepository.save(user)

    return user
  }
  async save(user: User): Promise<User> {
    return await this.ormRepository.save(user)
  }
}

export default UsersRepository
