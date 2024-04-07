import { Repository } from "typeorm";
import { Reply } from "../entities/Reply";
import { AppDataSource } from "../data-source";

export default new class ReplyServices {
  private readonly replyRepository: Repository<Reply> =
    AppDataSource.getRepository(Reply);

  async find(reqQuery: any): Promise<any> {
    try {
      const threadId = parseInt(reqQuery.thread_id as string);
      
      const replies = await this.replyRepository.find({
        relations: ["users"],
        where: {
          thread: {
            id: threadId,
          },
        },
        order: {
          id: "DESC",
        },
      });
      
      return replies;
    } catch (err) {
      throw new Error("Something wrong in server!");
    }
  }

  async create(reqBody: any, loginSession: any): Promise<any> {
    try {
      const reply = this.replyRepository.create({
        content: reqBody.content,
        users: {
          id: loginSession.user.id,
        },
        thread: {
          id: reqBody.thread_id,
        },
      });

      const response = await this.replyRepository.save(reply);

      return response;
    } catch (err) {
      throw new Error("Something wrong in server!");
    }
  }
}