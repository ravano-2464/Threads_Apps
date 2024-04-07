import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: "follows" })
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.followers, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "followersId"})
  followers: User;
  
  @ManyToOne(() => User, (user) => user.following, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "followingId"})
  following: User;
}