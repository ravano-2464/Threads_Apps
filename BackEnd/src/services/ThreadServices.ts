import { Thread } from "../entities/Thread";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import {
  createThreadSchema,
  updateThreadSchema,
} from "../utils/validator/Thread";

export default new (class ThreadServices {
  private readonly ThreadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);

  async find(reqQuery?: any, loginSession?: any): Promise<Thread[]> {
    try {
      const limit = parseInt(reqQuery.limit as string);

      const threads = await this.ThreadRepository.find({
        relations: ["users", "likes.user", "replies"],
        order: {
          id: "DESC",
        },
        take: limit,
        select: {
          users: {
            id: true,
            username: true,
            full_name: true,
            image: true,
          },
          likes: {
            id: true,
            user: {
              id: true,
              username: true,
              full_name: true,
              image: true,
            },
          },
        },
      });

      let newResponse = threads.map((element) => ({
        ...element,
        replies_count: element.replies.length,
        likes_count: element.likes.length,
        is_liked: element.likes.some(
          (like: any) => like.user.id == loginSession.user.id
        ),
      }));

      return newResponse;
    } catch (err) {
      throw new Error("Something went wrong in server!");
    }
  }

  async findOne(id: number): Promise<any[]> {
    try {
      const thread = await this.ThreadRepository.find({
        where: {
          id: id,
        },
        relations: ["users", "replies", "likes.user"],
        order: {
          id: "DESC",
        },
      });

      return thread;
    } catch (err) {
      throw new Error("Something wrong in server!");
    }
  }

  async findOneById(id: number): Promise<any[]> {
    try {
      const thread = await this.ThreadRepository.find({
        where: {
          users: {
            id: id,
          },
        },
        relations: ["users", "replies", "likes.user"],
        select: {
          users: {
            id: true,
            username: true,
            full_name: true,
            image: true,
          },
        },
        order: {
          id: "DESC",
        },
      });

      let newResponse = thread.map((element) => ({
        ...element,
        replies_count: element.replies.length,
        likes_count: element.likes.length,
        is_liked: element.likes.some((like: any) => like.user.id == id),
      }));

      return newResponse;
    } catch (err) {
      throw new Error("Something wrong in server!");
    }
  }

  async update(id: number, reqBody: any): Promise<any> {
    try {
      const thread = await this.ThreadRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!thread) {
        throw new Error("Thread ID not found");
      }

      const { error } = updateThreadSchema.validate(reqBody);
      if (error) {
        throw new Error();
      }

      if (reqBody.content != "") {
        thread.content = reqBody.content;
      }

      if (reqBody.image != "") {
        thread.image = reqBody.image;
      }

      const response = await this.ThreadRepository.save(thread);
      return {
        message: "success updated !",
        data: response,
      };
    } catch (err) {
      throw new Error("Something wrong in server!");
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10);

      const thread = await this.ThreadRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!thread)
        return res.status(404).json({ Error: "Thread ID not found" });

      await this.ThreadRepository.delete({
        id: id,
      });

      return res.status(200).json(thread);
    } catch (err) {
      return res.status(500).json({ Error: "Error while deleting thread" });
    }
  }
})();
