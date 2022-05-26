import { faker } from '@faker-js/faker';
import deleteUserJest from '../../utils/DeleteUserJest';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

interface UserInterface {
    username: string
    password: string
    name: string,
    profilePic: string
}

describe('Autenticação de usuário', () => {
  let userData: UserInterface;

  beforeAll(() => {
    userData = {
      name: 'Jest',
      username: faker.internet.userName(),
      password: 'jest123',
      profilePic: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    };
  });

  beforeEach(async () => {
    await CreateUserService.execute(userData);
  });

  afterEach(async () => {
    await deleteUserJest(userData.username);
  });

  it('Deve retornar o token de autenticação para um usuário existente', async () => {
    const token = await AuthenticateUserService.execute({
      username: userData.username,
      password: userData.password,
    });

    expect(token).toHaveProperty('token');
  });

  it('Deve retornar erro caso o username informado não exista', async () => {
    await expect(AuthenticateUserService.execute({
      username: 'jest_error',
      password: userData.password,
    })).rejects.toEqual(new Error('usuário ou senha incorretos'));
  });

  it('Deve retornar erro caso a senha do usuário estiver errada', async () => {
    await expect(AuthenticateUserService.execute({
      username: userData.username,
      password: '123',
    })).rejects.toEqual(new Error('usuário ou senha incorretos'));
  });
});
