import { Post } from '@prisma/client';
import prisma from '../../utils/Prisma';

interface PostInterface {
    userId: number
    content: string
}

class CreatePostService {
  async execute({
    userId,
    content,
  } : PostInterface) : Promise<Post> {
    const post = await prisma.post.create({
      data: {
        authorId: userId,
        content,
      },
    });

    return post;
  }
}

export default new CreatePostService();
