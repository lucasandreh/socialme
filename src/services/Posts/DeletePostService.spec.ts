import { faker } from '@faker-js/faker';
import { Post, User } from '@prisma/client';
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

describe('Deletar publicação', () => {
  let userData: UserInterface;
  let user: User;
  let post: Post;

  beforeEach(async () => {
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

  afterEach(async () => {
    await deleteUserJest(userData.username);
  });

  it('Deve ser capaz de deletar uma publicação', async () => {
    const deletePost = await DeletePostService.execute({
      userId: user.id,
      postId: post.id,
    });

    expect(deletePost).toEqual('publicação deletada');
  });

  it('Deve retornar erro caso a publicação não exista', async () => {
    await expect(DeletePostService.execute({
      userId: user.id,
      postId: 0,
    })).rejects.toEqual(new Error('publicação não existe'));

    await DeletePostService.execute({
      userId: user.id,
      postId: post.id,
    });
  });

  it('Deve retornar erro caso o usuário não tenha permissão', async () => {
    await expect(DeletePostService.execute({
      userId: 0,
      postId: post.id,
    })).rejects.toEqual(new Error('usuário sem permissão para deletar'));

    await DeletePostService.execute({
      userId: user.id,
      postId: post.id,
    });
  });
});
