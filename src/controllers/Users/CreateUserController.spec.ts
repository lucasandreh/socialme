import request from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../../app';
import deleteUserJest from '../../utils/DeleteUserJest';

interface UserInterface {
    username: string
    password: string
    name: string,
}

describe('Contoller de criação de usuário', () => {
  let userData: UserInterface;

  beforeAll(() => {
    userData = {
      name: 'Jest Supertest',
      username: faker.internet.userName(),
      password: '123456',
    };
  });

  afterEach(async () => {
    await deleteUserJest(userData.username);
  });

  it('Deve ser capaz de criar um novo usuário', async () => {
    const response = await request(app)
      .post('/user/create')
      .send(userData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Deve retornar erro ao criar usuário já existente', async () => {
    await request(app)
      .post('/user/create')
      .send(userData);

    const response = await request(app)
      .post('/user/create')
      .send(userData);

    expect(response.status).toBe(400);
  });
});
