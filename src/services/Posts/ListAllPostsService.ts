// import { Post } from '@prisma/client';
import prisma from '../../utils/Prisma';

class ListAllPostsService {
  async execute() : Promise<any> {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        content: true,
        author: {
          select: {
            name: true,
            username: true,
            profilePic: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    return posts;
  }
}

export default new ListAllPostsService();
