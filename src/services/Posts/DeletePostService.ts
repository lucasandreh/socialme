import prisma from '../../utils/Prisma';

class DeletePostService {
  async execute({ postId, userId } : {postId:number, userId: number}) : Promise<string> {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error('publicação não existe');
    }

    if (post.authorId !== userId) {
      throw new Error('usuário sem permissão para deletar');
    }

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return 'publicação deletada';
  }
}

export default new DeletePostService();
