import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Thread } from "./Thread";
import { Like } from "./Like";
import { Follow } from "./Follow";
import { Reply } from "./Reply";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Thread, (thread) => thread.users, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  threads: Thread[]

  @OneToMany(() => Like, (likes) => likes.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  }) 
  likes: Like[]

  @OneToMany(() => Follow, (follow) => follow.followers, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  followers: Follow[]

  @OneToMany(() => Follow, (follow) => follow.following, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  following: Follow[]

  @OneToMany(() => Reply, (reply) => reply.users, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  replies: Reply[];
}