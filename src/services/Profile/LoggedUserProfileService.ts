import { Profile } from '@prisma/client';
import prisma from '../../utils/Prisma';

class LoggedUserProfileService {
  async execute({ userId } : {userId: number}) : Promise<Profile> {
    const profile = await prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) {
      throw new Error('O perfil do usuário não existe');
    }

    return profile;
  }
}

export default new LoggedUserProfileService();
