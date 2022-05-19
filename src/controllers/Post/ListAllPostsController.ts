import type { Request, Response } from 'express';
import ListAllPostsService from '../../services/Posts/ListAllPostsService';

class ListAllPostsController {
  async handle(request: Request, response: Response) {
    const posts = await ListAllPostsService.execute();

    response.json(posts);
  }
}

export default new ListAllPostsController();
