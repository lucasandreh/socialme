import type { Request, Response } from 'express';
import AuthenticateService from '../../services/Users/AuthenticateUserService';

class AuthenticateController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const result = await AuthenticateService.execute({
      username,
      password,
    });

    response.json({
      response: result,
    });
  }
}

export default new AuthenticateController();
