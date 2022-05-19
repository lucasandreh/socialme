import { Post } from '@prisma/client';
import prisma from '../../utils/Prisma';

interface UpdatePostInterface {
    userId: number
    postId: number
    content: string
}

class UpdatePostService {
  async execute({
    userId,
    postId,
    content,
  } : UpdatePostInterface) : Promise<Post> {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error('publicação não existe');
    }

    if (post.authorId !== userId) {
      throw new Error('usuário sem autorização para edição');
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        content,
      },
    });

    return updatedPost;
  }
}

export default new UpdatePostService();
