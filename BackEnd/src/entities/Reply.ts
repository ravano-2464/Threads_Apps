import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Thread } from "./Thread";

@Entity({ name: "replies" })
export class Reply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, (users) => users.replies, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  users: User;

  @ManyToOne(() => Thread, (thread) => thread.replies, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  thread: Thread;
}
