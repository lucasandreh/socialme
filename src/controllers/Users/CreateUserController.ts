import { Request, Response } from 'express';
import CreateUserService from '../../services/Users/CreateUserService';

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, username, password } = request.body;

    const user = await CreateUserService.execute({
      name,
      username,
      password,
    });
    response.json(user);
  }
}

export default new CreateUserController();
