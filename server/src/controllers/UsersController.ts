import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";

class UsersController {
  /**
   * store
   */
  async store(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;

      const userCreate = new CreateUserService();

      const user = await userCreate.execute({
        name,
        email,
        password,
      });
      const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        updated_at: user.updated_at,
        created_at: user.created_at,
      };

      return response.status(200).json(userWithoutPassword);
    } catch ({ statusCode, message }) {
      return response.status(statusCode).json({ message });
    }
  }
}
export default UsersController;
