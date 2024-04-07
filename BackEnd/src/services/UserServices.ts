import { Repository } from "typeorm"
import { User } from "../entities/User"
import { AppDataSource } from "../data-source"
import { Follow } from "../entities/Follow"

export default new class UserSevices {
  private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User)
  private readonly FollowRepository: Repository<Follow> = AppDataSource.getRepository(Follow)

  async find(id: number) : Promise<any>  {
    try {
      const arr = await this.UserRepository.find()

      const following = await this.FollowRepository.find({
        where: {
          followers: {
            id
          }
        },
        relations: ['following']
      })

      return await this.matchFollowing(arr, following)
    } catch (err) {
      throw new Error("Something wrong in find service users !");
    }
  }

  async findOne(id: number) : Promise<object | string> {
    try {
      const arr = await this.UserRepository.findOne({ 
        where: { id },
        select: {
          id: true,
          email: true,
          description: true,
          full_name: true,
          username: true,
          image: true
        }
      })

      return arr
    } catch (err) {
      throw new Error("Something wrong in find service users !");
    }
  }

  async update(data: any) : Promise<object | string> {
    try {
      const arr = await this.UserRepository.save(data)
      return arr
    } catch (err) {
      throw new Error("Something wrong in find service users !");
    }
  }

  private matchFollowing(user: any, following: any) : any {
    return user.map((item: any) => {
      const isFollowing = !!following.find((itemFind: any) => itemFind.following.id == item.id)

      return {
        ...item,
        isFollowing
      }
    })
  }
}