import type { Request, Response } from 'express';
import UpdatePostService from '../../services/Posts/UpdatePostService';

class UpdatePostController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const { content } = request.body;
    const { postId } = request.params;

    const post = await UpdatePostService.execute({
      userId,
      content,
      postId: Number(postId),
    });

    response.json(post);
  }
}

export default new UpdatePostController();
