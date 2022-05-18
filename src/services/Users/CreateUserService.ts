import { hash } from 'bcrypt';
import { User } from '@prisma/client';
import prisma from '../../utils/Prisma';

interface UserInterface {
    id?: number
    username: string
    password?: string
    name: string,
    profilePic?: string
}

class CreateUserService {
  async execute({
    name,
    password,
    username,
  } : UserInterface) : Promise<User> {
    const hashedPassword = await hash(password || '', 8);

    const userExist = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (userExist) {
      throw new Error('usuário já cadastrado');
    }

    const user = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        username,
        profilePic: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
      },
    });

    return user;
  }
}

export default new CreateUserService();
