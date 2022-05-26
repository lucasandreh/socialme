import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';
import deleteUserJest from '../../utils/DeleteUserJest';
import CreateUserService from '../Users/CreateUserService';
import CreatePostService from './CreatePostService';
import DeletePostService from './DeletePostService';

interface UserInterface {
    username: string
    password: string
    name: string,
    profilePic: string
}

describe('Criar publicação', () => {
  let userData: UserInterface;
  let user: User;
  let postId: number;

  beforeAll(() => {
    userData = {
      name: 'Jest2',
      username: faker.internet.userName(),
      password: 'jest123',
      profilePic: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    };
  });

  beforeEach(async () => {
    user = await CreateUserService.execute(userData);
  });

  afterEach(async () => {
    await DeletePostService.execute({
      userId: user.id,
      postId,
    });
    await deleteUserJest(userData.username);
  });

  it('Deve ser capaz de criar uma publicação', async () => {
    const post = await CreatePostService.execute({
      userId: user.id,
      content: 'Publicação jest',
    });
    postId = post.id;
    expect(post).toHaveProperty('id');
  });
});
