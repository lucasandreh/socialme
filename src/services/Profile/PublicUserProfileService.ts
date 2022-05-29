// import { Profile } from '@prisma/client';
import prisma from '../../utils/Prisma';

class PublicUserProfileService {
  async execute({ username } : {username: string}) : Promise<any> {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new Error('usuário não existe');
    }

    const profile = await prisma.profile.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        surname: true,
        bio: true,
        birthday: true,
        relationship: true,
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            profilePic: true,
          },
        },
      },
    });

    if (!profile) {
      throw new Error('perfil do usuário não existe');
    }

    return profile;
  }
}

export default new PublicUserProfileService();
