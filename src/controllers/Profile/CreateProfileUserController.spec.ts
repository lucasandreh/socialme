import request from 'supertest';
import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';
import app from '../../app';
import deleteUserJest from '../../utils/DeleteUserJest';
import CreateUserService from '../../services/Users/CreateUserService';
import AuthenticateUserService from '../../services/Users/AuthenticateUserService';
import deleteProfileJest from '../../utils/DeleteProfileJest';

interface UserInterface {
    name: string
    username: string
    password: string,
    profilePic?: string
}

interface TokenInterface {
    token: string
}

describe('Controller de criação do profile', () => {
  let userData: UserInterface;
  let auth: TokenInterface;
  let user: User;

  beforeEach(async () => {
    userData = {
      name: 'Jest2',
      username: faker.internet.userName(),
      password: 'jest123',
      profilePic: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    };

    user = await CreateUserService.execute(userData);
    auth = await AuthenticateUserService.execute({
      username: userData.username,
      password: userData.password,
    });
  });

  afterEach(async () => {
    await deleteProfileJest(user.id);
    await deleteUserJest(userData.username);
  });

  it('Deve ser capaz de criar um perfil para o usuário', async () => {
    const response = await request(app)
      .post('/user/create/profile')
      .set('Authorization', `bearer ${auth.token}`)
      .send({
        bio: 'Jest test',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });
});
