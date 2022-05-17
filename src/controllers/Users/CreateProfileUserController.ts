import type { Request, Response } from 'express';
import CreateUserProfileService from '../../services/Users/CreateUserProfileService';

class CreateUserProfileController {
  async handle(request: Request, response: Response) {
    const {
      bio, birthday, surname, relationship,
    } = request.body;
    const { userId } = request;

    const profile = await CreateUserProfileService.execute({
      bio,
      birthday,
      relationship,
      surname,
      userId,
    });

    response.json(profile);
  }
}

export default new CreateUserProfileController();
