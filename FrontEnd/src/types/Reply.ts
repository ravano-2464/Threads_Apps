import { IUser } from "./User"

export type ReplyPost = {
  content?: string,
  thread_id?: number
}

export type Reply = {
  id?: number,
  content?: string,
  user: IUser
}