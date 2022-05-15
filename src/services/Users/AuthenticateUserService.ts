import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface UserInterface {
    username: string
    password: string
}

class AuthenticateService {
  async execute({
    username,
    password,
  } : UserInterface) : Promise<string> {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return 'usuário ou senha incorretos';
    }

    const verifyPassword = await compare(password, user.password);

    if (!verifyPassword) {
      return 'usuário ou senha incorretos';
    }

    const token = sign(
      { id: user.id },
      'bc88da3d876998150651dcb1b26c1be2',
      {
        subject: user.username,
        expiresIn: '10m',
      },
    );

    return token;
  }
}

export default new AuthenticateService();
