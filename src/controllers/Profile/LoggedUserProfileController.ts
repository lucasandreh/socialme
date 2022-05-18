import type { Request, Response } from 'express';
import LoggedUserProfileService from '../../services/Profile/LoggedUserProfileService';

class LoggedUserProfileControler {
  async handle(request: Request, response: Response) {
    const { userId } = request;

    const profile = await LoggedUserProfileService.execute({ userId });

    response.json(profile);
  }
}

export default new LoggedUserProfileControler();
