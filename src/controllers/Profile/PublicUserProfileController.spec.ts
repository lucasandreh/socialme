import request from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../../app';
import CreateUserService from '../../services/Users/CreateUserService';
import deleteProfileJest from '../../utils/DeleteProfileJest';
import deleteUserJest from '../../utils/DeleteUserJest';
import CreateUserProfileService from '../../services/Profile/CreateUserProfileService';

interface UserInterface {
    username: string
    password: string
    name: string,
    profilePic: string
}

describe('Controller profile público de usuário', () => {
  let userData: UserInterface;
  let userId: number;

  beforeAll(async () => {
    userData = {
      name: 'Jest',
      username: faker.internet.userName(),
      password: 'jest123',
      profilePic: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    };

    const user = await CreateUserService.execute(userData);
    userId = user.id;
    await CreateUserProfileService.execute({
      userId,
      bio: 'Teste Jest',
      birthday: new Date('2022-05-25'),
      relationship: '',
      surname: '',
    });
  });

  afterAll(async () => {
    await deleteProfileJest(userId);
    await deleteUserJest(userData.username);
  });

  it('Deve ser capaz de retornar profile de usuário', async () => {
    const response = await request(app)
      .get(`/user/profile/${userData.username}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('profile');
  });

  it('Deve retornar erro caso o perfil do usuário não exista', async () => {
    const createdUser = await CreateUserService.execute({
      name: 'Jest',
      username: faker.internet.userName(),
      password: 'jest123',
      profilePic: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    });

    const response = await request(app)
      .get(`/user/profile/${createdUser.username}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('perfil do usuário não existe');

    await deleteUserJest(createdUser.username);
  });

  it('Deve retornar erro caso usuário não exista', async () => {
    const response = await request(app)
      .get('/user/profile/jesttest123');

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('usuário não existe');
  });
});
