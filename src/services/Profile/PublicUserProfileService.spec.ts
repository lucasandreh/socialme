import { faker } from '@faker-js/faker';
import deleteProfileJest from '../../utils/DeleteProfileJest';
import deleteUserJest from '../../utils/DeleteUserJest';
import CreateUserService from '../Users/CreateUserService';
import CreateUserProfileService from './CreateUserProfileService';
import PublicUserProfileService from './PublicUserProfileService';

interface UserInterface {
    username: string
    password: string
    name: string,
    profilePic: string
}

describe('Retornar profile público de usuário', () => {
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
  });

  afterAll(async () => {
    await deleteProfileJest(userId);
    await deleteUserJest(userData.username);
  });

  it('Deve retornar o profile do usuário', async () => {
    await CreateUserProfileService.execute({
      userId,
      bio: 'Teste Jest',
      birthday: new Date('2022-05-25'),
      relationship: '',
      surname: '',
    });
    const profile = await PublicUserProfileService.execute({
      username: userData.username,
    });

    expect(profile).toHaveProperty('user');
  });

  it('Deve retornar erro se o usuário não existir', async () => {
    await expect(PublicUserProfileService.execute({
      username: 'jest_username_error',
    })).rejects.toEqual(new Error('usuário não existe'));
  });

  it('Deve retornar erro se o perfil não existir', async () => {
    const user = await CreateUserService.execute({
      name: 'Jest',
      username: faker.internet.userName(),
      password: 'jest123',
      profilePic: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    });

    await expect(PublicUserProfileService.execute({
      username: user.username,
    })).rejects.toEqual(new Error('perfil do usuário não existe'));

    await deleteUserJest(user.username);
  });
});
