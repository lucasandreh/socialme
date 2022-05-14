import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import CreateUserService from '../../services/Users/CreateUserService';

const prisma = new PrismaClient();

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, username, password } = request.body;

    const userExist = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (userExist) {
      response.status(400).json({
        message: 'usuário já cadastrado',
      });
    } else {
      await CreateUserService.execute({
        name,
        username,
        password,
      }).then((user) => {
        response.json(user);
      }).catch(() => {
        response.status(400).json({
          message: 'erro ao cadastrar usuário',
        });
      });
    }
  }
}

export default new CreateUserController();
