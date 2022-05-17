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
      throw new Error('usuário ou senha incorretos');
    }

    const verifyPassword = await compare(password, user.password);

    if (!verifyPassword) {
      throw new Error('usuário ou senha incorretos');
    }

    const token = sign(
      { id: user.id },
      `${process.env.JWT_SECRET}`,
      {
        subject: user.username,
        expiresIn: '7d',
      },
    );

    return token;
  }
}

export default new AuthenticateService();
