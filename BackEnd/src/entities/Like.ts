import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from "typeorm";
import { Thread } from "./Thread";
import { User } from "./User";

@Entity({ name: "likes" })
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Thread, (thread) => thread.likes, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  thread: Thread

  @ManyToOne(() => User, (user) => user.likes, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  user: User
}