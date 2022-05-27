import { faker } from '@faker-js/faker';
import request from 'supertest';
import app from '../../app';
import DeletePostService from '../../services/Posts/DeletePostService';
import AuthenticateUserService from '../../services/Users/AuthenticateUserService';
import CreateUserService from '../../services/Users/CreateUserService';
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

describe('Controller para criação de publicações', () => {
  let userData: UserInterface;
  let userId: number;
  let postId: number;
  let auth: TokenInterface;

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
  });

  afterAll(async () => {
    await DeletePostService.execute({
      postId,
      userId,
    });
    await deleteUserJest(userData.username);
  });

  it('Deve ser capaz de criar uma publicação', async () => {
    const response = await request(app)
      .post('/post/create')
      .set('Authorization', `bearer ${auth.token}`)
      .send({
        content: 'Jest test',
        userId,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');

    postId = response.body.id;
  });
});
