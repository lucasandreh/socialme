import request from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../../app';
import deleteUserJest from '../../utils/DeleteUserJest';
import CreateUserService from '../../services/Users/CreateUserService';

interface UserInterface {
    name: string
    username: string
    password: string,
    profilePic?: string
}

describe('Controller de autenticação de usuário', () => {
  let userData: UserInterface;

  beforeEach(async () => {
    userData = {
      name: 'Jest2',
      username: faker.internet.userName(),
      password: 'jest123',
      profilePic: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    };

    await CreateUserService.execute(userData);
  });

  afterEach(async () => {
    await deleteUserJest(userData.username);
  });

  it('Deve retornar o token de autenticação do usuário', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({
        username: userData.username,
        password: userData.password,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('Deve retornar erro se o usurname esteja errado', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({
        username: 'jest123',
        password: userData.password,
      });

    expect(response.status).toBe(400);
  });

  it('Deve retornar erro se a senha esteja errada', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({
        username: userData.username,
        password: '123',
      });

    expect(response.status).toBe(400);
  });
});
