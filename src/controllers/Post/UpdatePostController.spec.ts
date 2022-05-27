import { faker } from '@faker-js/faker';
import request from 'supertest';
import { Post } from '@prisma/client';
import app from '../../app';
import AuthenticateUserService from '../../services/Users/AuthenticateUserService';
import CreateUserService from '../../services/Users/CreateUserService';
import deleteUserJest from '../../utils/DeleteUserJest';
import DeletePostService from '../../services/Posts/DeletePostService';
import CreatePostService from '../../services/Posts/CreatePostService';

interface UserInterface {
    username: string
    password: string
    name: string,
    profilePic: string
}

interface TokenInterface {
    token: string
}

describe('Controller para atualizar publicação', () => {
  let userData: UserInterface;
  let userId: number;
  let auth: TokenInterface;
  let post: Post;

  beforeAll(async () => {
    userData = {
      name: 'Jest',
      username: faker.internet.userName(),
      password: 'jest123',
      profilePic: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    };

    const user = await CreateUserService.execute(userData);
    userId = user.id;
    auth = await AuthenticateUserService.execute({
      username: userData.username,
      password: userData.password,
    });
    post = await CreatePostService.execute({
      userId: user.id,
      content: 'Jest Test',
    });
  });

  afterAll(async () => {
    await DeletePostService.execute({
      postId: post.id,
      userId,
    });
    await deleteUserJest(userData.username);
  });

  it('Deve ser capaz de atualizar uma publicação', async () => {
    const response = await request(app)
      .put(`/post/update/${post.id}`)
      .set('Authorization', `bearer ${auth.token}`)
      .send({
        content: 'Jest test 2',
        userId,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Deve retornar erro caso publicação não exista', async () => {
    const response = await request(app)
      .put('/post/update/0')
      .set('Authorization', `bearer ${auth.token}`)
      .send({
        content: 'Jest test 2',
        userId,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('publicação não existe');
  });

  it('Deve retornar erro caso usuário não seja autorizado', async () => {
    const createdUser = await CreateUserService.execute({
      name: 'Jest',
      username: faker.internet.userName(),
      password: 'jest123',
      profilePic: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    });

    const authentication = await AuthenticateUserService.execute({
      username: createdUser.username,
      password: 'jest123',
    });
    const response = await request(app)
      .put(`/post/update/${post.id}`)
      .set('Authorization', `bearer ${authentication.token}`)
      .send({
        content: 'Jest test 2',
        userId,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('usuário sem autorização para edição');

    await deleteUserJest(createdUser.username);
  });
});
