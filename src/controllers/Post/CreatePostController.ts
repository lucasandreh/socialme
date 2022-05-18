import type { Request, Response } from 'express';
import CreatePostService from '../../services/Posts/CreatePostService';

class CreatePostController {
  async handle(request: Request, response: Response) {
    const { content } = request.body;
    const { userId } = request;

    const post = await CreatePostService.execute({
      userId,
      content,
    });

    response.json(post);
  }
}

export default new CreatePostController();
