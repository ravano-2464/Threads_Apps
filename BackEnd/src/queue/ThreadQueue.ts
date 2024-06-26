import { Request, Response } from "express";
import { createThreadSchema } from "../utils/validator/Thread";
import MessageQueue from "../libs/rabbitmq"

type QueuePayload = {
  content: string,
  image: string,
  user: number
}

export default new class ThreadQueue {
  async create(req: Request, res: Response) {
    try {
      const loginSession: any = res.locals.loginSession

      const data = {
        content: req.body.content,
        image: res.locals.filename || null
      }

      const { error, value } = createThreadSchema.validate(data)
      if(error) return res.status(400).json({ error })

      const payload: QueuePayload = {
        content: value.content,
        image: value.image,
        user: loginSession.user.id
      }      

      const errorQueue = await MessageQueue.MessageSend(process.env.THREAD, payload)
      if(errorQueue) return res.status(500).json({ message: "something error while sending message queue" })

      return res.status(201).json({
        message: "Thread is queued !",
        data: payload
      })
    } catch (err) {
      return res.status(500).json({ message: "error in threadqueue method"})
    }
  }
}