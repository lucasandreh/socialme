import prisma from '../../utils/Prisma';

class ListUserPostService {
  async execute({ userId } : {userId: number}) : Promise<any> {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
    });

    return {
      posts,
    };
  }
}

export default new ListUserPostService();
