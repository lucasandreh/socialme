import { faker } from '@faker-js/faker';
import { Post, User } from '@prisma/client';
import deleteUserJest from '../../utils/DeleteUserJest';
import CreateUserService from '../Users/CreateUserService';
import CreatePostService from './CreatePostService';
import DeletePostService from './DeletePostService';
import UpdatePostService from './UpdatePostService';

interface UserInterface {
    username: string
    password: string
    name: string,
    profilePic: string
}

describe('Atualizar publicação', () => {
  let userData: UserInterface;
  let user: User;
  let post: Post;

  beforeAll(async () => {
    userData = {
      name: 'Jest',
      username: faker.internet.userName(),
      password: 'jest123',
      profilePic: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    };
    user = await CreateUserService.execute(userData);
    post = await CreatePostService.execute({
      userId: user.id,
      content: 'Jest content',
    });
  });

  afterAll(async () => {
    await DeletePostService.execute({
      userId: user.id,
      postId: post.id,
    });
    await deleteUserJest(userData.username);
  });

  it('Deve ser capaz de atualizar uma publicação', async () => {
    const updatedPost = await UpdatePostService.execute({
      userId: user.id,
      postId: post.id,
      content: 'Jest content atualizado',
    });

    expect(updatedPost).toHaveProperty('id');
  });

  it('Deve retornar erro caso a publicação não exista', async () => {
    await expect(UpdatePostService.execute({
      userId: user.id,
      postId: 0,
      content: 'Jest content atualizado',
    })).rejects.toEqual(new Error('publicação não existe'));
  });

  it('Deve retornar erro caso o usuário não tenha permissão', async () => {
    await expect(UpdatePostService.execute({
      userId: 0,
      postId: post.id,
      content: 'Jest content atualizado',
    })).rejects.toEqual(new Error('usuário sem autorização para edição'));
  });
});
