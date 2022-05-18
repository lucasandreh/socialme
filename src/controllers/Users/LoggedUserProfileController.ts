import type { Request, Response } from 'express';
import UserProfileService from '../../services/Users/UserProfileService';

class LoggedUserProfileControler {
  async handle(request: Request, response: Response) {
    const { userId } = request;

    const profile = await UserProfileService.execute({ userId });

    response.json(profile);
  }
}

export default new LoggedUserProfileControler();
