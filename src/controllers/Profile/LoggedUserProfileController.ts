import type { Request, Response } from 'express';
import ListUserPostService from '../../services/Posts/ListUserPostService';
import LoggedUserProfileService from '../../services/Profile/LoggedUserProfileService';

class LoggedUserProfileControler {
  async handle(request: Request, response: Response) {
    const { userId } = request;

    const profile = await LoggedUserProfileService.execute({ userId });
    const posts = await ListUserPostService.execute({ userId });

    response.json({
      profile,
      posts,
    });
  }
}

export default new LoggedUserProfileControler();
