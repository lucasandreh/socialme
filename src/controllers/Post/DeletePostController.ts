import type { Request, Response } from 'express';
import DeletePostService from '../../services/Posts/DeletePostService';

class DeletePostController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const { postId } = request.params;

    const deletePost = await DeletePostService.execute({
      userId,
      postId: Number(postId),
    });

    response.json(deletePost);
  }
}

export default new DeletePostController();
