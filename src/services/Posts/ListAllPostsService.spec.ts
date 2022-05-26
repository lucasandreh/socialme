import ListAllPostsService from './ListAllPostsService';

describe('Listar todas as publicações', () => {
  it('Deve ser capaz de listar todas as publicações', async () => {
    const posts = await ListAllPostsService.execute();

    expect(posts).toHaveProperty('posts');
  });
});
