import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import User from "@modules/users/infra/typeorm/entities/User";
import { v4 as uuid } from 'uuid';
import IUsersRepository from "../IUsersRepository";

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = []
  async findByEmail(email: string): Promise<User | undefined> {
    const findUserByEmail = this.users.find(user => user.email === email)

    return findUserByEmail
  }

  async findById(id: string | number): Promise<User | undefined> {
    const findUserById = this.users.find(user => user.id === id)

    return findUserById
  }
  async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, {
      id: uuid(),
      ...userData
    })

    this.users.push(user)

    return user

  }
  async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id)

    this.users[findIndex] = user

    return user
  }

}
export default FakeUsersRepository
