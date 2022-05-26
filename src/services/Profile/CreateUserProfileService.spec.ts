import { faker } from '@faker-js/faker';
import deleteProfileJest from '../../utils/DeleteProfileJest';
import deleteUserJest from '../../utils/DeleteUserJest';
import CreateUserService from '../Users/CreateUserService';
import CreateUserProfileService from './CreateUserProfileService';

interface UserInterface {
    username: string
    password: string
    name: string,
    profilePic: string
}

describe('Criar dados do perfil de usuário', () => {
  let userData: UserInterface;
  let userId: number;

  beforeAll(async () => {
    userData = {
      name: 'Jest',
      username: faker.internet.userName(),
      password: 'jest123',
      profilePic: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    };
  });

  beforeEach(async () => {
    const user = await CreateUserService.execute(userData);
    userId = user.id;
  });

  afterEach(async () => {
    await deleteProfileJest(userId);
    await deleteUserJest(userData.username);
  });

  it('Deve ser capaz de criar um perfil para o usuário', async () => {
    const profile = await CreateUserProfileService.execute({
      userId,
      bio: 'Teste Jest',
      birthday: new Date('2022-05-25'),
      relationship: '',
      surname: '',
    });

    expect(profile).toHaveProperty('id');
  });

  it('Deve ser capaz de editar um perfil já existente', async () => {
    await CreateUserProfileService.execute({
      userId,
      bio: 'Teste Jest',
      birthday: new Date('2022-05-25'),
      relationship: '',
      surname: '',
    });
    const profile = await CreateUserProfileService.execute({
      userId,
      bio: 'Teste Jest 2',
      birthday: new Date('2022-05-25'),
      relationship: '',
      surname: '',
    });

    expect(profile).toHaveProperty('id');
  });
});
