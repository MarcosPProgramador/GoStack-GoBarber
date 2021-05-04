import IUserTokensRepository from "@modules/users/repositories/IUserTokensRepository";
import { getRepository, Repository } from "typeorm";
import UserTokens from "../entities/UserTokens";
/**
 *
 * SOLID
 *
 * [ ] Single Responsability Principle
 * [ ] Open-Closed Principle
 * [x] Liskov Substitution Principle
 * [ ] Interface Segregation Principle
 * [ ] Dependency Inversion Principle
 *
 */
export default class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserTokens>

  constructor() {
    this.ormRepository = getRepository(UserTokens)
  }

  async findByToken(token: string): Promise<UserTokens | undefined> {
    const userTokens = this.ormRepository.findOne({
      where: {
        token
      }
    })
    return userTokens
  }

  async generate(user_id: string): Promise<UserTokens> {
    const userTokens = this.ormRepository.create({
      user_id
    })

    await this.ormRepository.save(userTokens)


    return userTokens
  }
}

