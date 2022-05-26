import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';
import ListUserPostService from './ListUserPostService';
import deleteUserJest from '../../utils/DeleteUserJest';
import CreateUserService from '../Users/CreateUserService';

interface UserInterface {
    username: string
    password: string
    name: string,
    profilePic: string
}

describe('Listar publicações de um usuário', () => {
  let userData: UserInterface;
  let user: User;

  beforeAll(async () => {
    userData = {
      name: 'Jest2',
      username: faker.internet.userName(),
      password: 'jest123',
      profilePic: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    };

    user = await CreateUserService.execute(userData);
  });

  afterAll(async () => {
    await deleteUserJest(userData.username);
  });

  it('Deve ser capaz de listar todas as publicações de um usuário', async () => {
    const posts = await ListUserPostService.execute({
      userId: user.id,
    });

    expect(posts).toHaveProperty('posts');
  });
});
