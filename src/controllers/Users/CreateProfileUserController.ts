import type { Request, Response } from 'express';
import CreateUserProfileService from '../../services/Users/CreateUserProfileService';

class CreateUserProfileController {
  async handle(request: Request, response: Response) {
    const {
      bio, birthday, surname, relationship,
    } = request.body;

    const profile = await CreateUserProfileService.execute({
      bio,
      birthday,
      relationship,
      surname,
      userId: 1,
    });

    response.json(profile);
  }
}

export default new CreateUserProfileController();
