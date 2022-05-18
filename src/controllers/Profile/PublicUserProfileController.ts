import type { Request, Response } from 'express';
import PublicUserProfileService from '../../services/Profile/PublicUserProfileService';

class PublicUserProfileController {
  async handle(request: Request, response: Response) {
    const { username } = request.params;

    const profile = await PublicUserProfileService.execute({ username });

    response.json(profile);
  }
}

export default new PublicUserProfileController();
