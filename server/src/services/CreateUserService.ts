import { getRepository } from "typeorm";
import { hash } from "bcryptjs";
import AppError from "../errors/AppError";
import User from "../models/User";

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  async execute({ name, email, password }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({ email });

    if (checkUserExists) throw new AppError("User already exists", 409);

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    
    await usersRepository.save(user);
    
    return user;
  }
}
export default CreateUserService;
