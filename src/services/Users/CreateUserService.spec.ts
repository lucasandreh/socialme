import deleteUserJest from '../../utils/DeleteUserJest';
import CreateUserService from './CreateUserService';

interface UserInterface {
    username: string
    password: string
    name: string,
    profilePic: string
}

describe('Criar usuário', () => {
  let userData: UserInterface;

  beforeAll(() => {
    userData = {
      name: 'Jest 2',
      username: 'test_jest2',
      password: 'jest123',
      profilePic: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    };
  });

  afterEach(async () => {
    await deleteUserJest(userData.username);
  });

  it('Deve ser possível criar um novo usuário', async () => {
    const user = await CreateUserService.execute(userData);

    expect(user).toHaveProperty('id');
  });

  it('Não deve ser possível cadastrar um usuário existente', async () => {
    await CreateUserService.execute(userData);

    await expect(CreateUserService.execute(userData)).rejects.toEqual(new Error('usuário já cadastrado'));
  });
});
