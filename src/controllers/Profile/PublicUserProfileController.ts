import type { Request, Response } from 'express';
import ListUserPostService from '../../services/Posts/ListUserPostService';
import PublicUserProfileService from '../../services/Profile/PublicUserProfileService';

class PublicUserProfileController {
  async handle(request: Request, response: Response) {
    const { username } = request.params;

    const profile = await PublicUserProfileService.execute({ username });
    const posts = await ListUserPostService.execute({ userId: profile.id });

    response.json({
      profile,
      posts,
    });
  }
}

export default new PublicUserProfileController();
