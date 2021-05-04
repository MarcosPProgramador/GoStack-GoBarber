import { v4 as uuid } from 'uuid'
import UserTokens from "@modules/users/infra/typeorm/entities/UserTokens";
import IUserTokensRepository from "../IUserTokensRepository";

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserTokens[] = []

  async generate(user_id: string): Promise<UserTokens> {
    const userTokens = new UserTokens()
    Object.assign(userTokens, {
      id: uuid(),
      token: uuid(),
      user_id,
      updated_at: new Date(),
      created_at: new Date()
    })

    this.userTokens.push(userTokens)

    return userTokens
  }
  async findByToken(token: string): Promise<UserTokens | undefined> {
    const userTokens = this.userTokens.find(userToken => userToken.token === token)

    return userTokens
  }
}


export default FakeUserTokensRepository
