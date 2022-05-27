import request from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../../app';
import CreateUserService from '../../services/Users/CreateUserService';
import AuthenticateUserService from '../../services/Users/AuthenticateUserService';
import deleteUserJest from '../../utils/DeleteUserJest';

interface UserInterface {
    username: string
    password: string
    name: string,
    profilePic: string
}

interface TokenInterface {
    token: string
}

describe('Controller para listagem de todas as publicações', () => {
  let userData: UserInterface;
  let auth: TokenInterface;

  beforeAll(async () => {
    userData = {
      name: 'Jest',
      username: faker.internet.userName(),
      password: 'jest123',
      profilePic: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    };

    await CreateUserService.execute(userData);
    auth = await AuthenticateUserService.execute({
      username: userData.username,
      password: userData.password,
    });
  });

  afterAll(async () => {
    await deleteUserJest(userData.username);
  });

  it('Deve ser capaz de retornar a lista de todas as publicações', async () => {
    const response = await request(app)
      .get('/post/all')
      .set('Authorization', `bearer ${auth.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('posts');
  });
});
