import { Repository } from "typeorm"
import { Thread } from "../entities/Thread"
import { AppDataSource } from "../data-source"
import cloudinary from "../libs/cloudinary"
import { request } from "http"

export default new class ThreadWorker{
  private readonly ThreadRepository: Repository<Thread> = AppDataSource.getRepository(Thread)

  async create(queueName: string, connection: any) {
    try {
      const channel = await connection.createChannel()
      await channel.assertQueue(queueName)
      await channel.consume(queueName, async (message) => {
        try {
          if(message !== null) {
            const payload = JSON.parse(message.content.toString())

            let isEmptyImage = null
            console.log(payload)
            if(payload.image !== null) {
              console.log(payload.image)
              const cloudinaryResponse = await cloudinary.destination(payload.image)
              isEmptyImage = cloudinaryResponse
            }
            console.log(isEmptyImage)
  
  
            const thread = this.ThreadRepository.create({
              content: payload.content,
              image: isEmptyImage,
              users: {
                id: payload.user
              }
            })
  
            const threadResponse = await this.ThreadRepository.save(thread)

            // request to server
            const req = request({
              hostname: "localhost",
              port: 5000,
              path: "/api/v1/new-thread",
              method: "GET",
            });
  
            req.on("error", (error) => {
              console.error("Error sending request:", error);
            });

            console.log("sending request")

            req.end();
            console.log("(Worker) : Thread is create", threadResponse);
            
            channel.ack(message)
          }
        } catch (err) {
          console.log("(Worker) : Thread is failed");
        }
      })
    } catch (err) {
      console.log("(Worker) : Error while consume queue from thread");
    }
  }
}