import { Profile } from '@prisma/client';
import prisma from '../../utils/Prisma';

interface ProfileInterface {
    bio: string
    birthday: Date
    relationship: string
    surname: string
    userId: number
}

class CreateUserProfileService {
  async execute({
    bio, birthday, relationship, surname, userId,
  } : ProfileInterface) : Promise<Profile> {
    const profile = await prisma.profile.upsert({
      where: {
        userId,
      },
      create: {
        bio,
        birthday,
        relationship,
        surname,
        userId,
      },
      update: {
        bio,
        birthday,
        relationship,
        surname,
      },
    });

    return profile;
  }
}

export default new CreateUserProfileService();
