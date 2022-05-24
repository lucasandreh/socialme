import CreateUserService from './CreateUserService';

describe('Criar usuário', () => {
  it('Deve ser possível criar um novo usuário', async () => {
    const user = await CreateUserService.execute({
      name: 'Jest',
      username: 'test_jest',
      password: 'jest123',
      profilePic: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    });

    expect(user).toHaveProperty('id');
  });

  it('Não deve ser possível cadastrar um usuário existente', async () => {
    const userData = {
      name: 'Jest 2',
      username: 'test_jest2',
      password: 'jest123',
      profilePic: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    };
    await CreateUserService.execute(userData);

    await expect(CreateUserService.execute(userData)).rejects.toEqual(new Error('usuário já cadastrado'));
  });
});
