import { Post } from '@prisma/client';
import prisma from '../../utils/Prisma';

class ListUserPostService {
  async execute({ userId } : {userId: number}) : Promise<Post[]> {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
    });

    return posts;
  }
}

export default new ListUserPostService();
