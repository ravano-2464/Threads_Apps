import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { Repository } from "typeorm"
import { User } from "../entities/User"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { registerSchema, loginSchema } from "../utils/validator/Auth"

export default new class AuthServices {
  private readonly AuthRepository: Repository<User> = AppDataSource.getRepository(User)

  async register(reqBody: any): Promise<any> {
    
      const { error, value } = registerSchema.validate(reqBody)

      if (error) throw new Error(error.details[0].message)

      const isCheckEmail = await this.AuthRepository.count({
        where: {
          email: value.email
        }
      })

      if (isCheckEmail > 0) {
        throw new Error("Email is already registered!")
      }

      const hashedPassword = await bcrypt.hash(value.password, 10)

      const user = this.AuthRepository.create({
        full_name: value.full_name,
        username: value.username,
        email: value.email,
        password: hashedPassword
      })

      const createdUser = await this.AuthRepository.save(user)
      return {
        message: "Register success!",
        user: user,
      };
      
   
  }

  async login(reqBody: any): Promise<any> {
    try {
      const { error, value } = loginSchema.validate(reqBody)

      const isCheckEmail = await this.AuthRepository.findOne({
        where: {
          email: value.email
        }
      })

      if (!isCheckEmail) {
        throw new Error("Email not found")
      }

      const isCheckPassword = await bcrypt.compare(value.password, isCheckEmail.password)

      if (!isCheckPassword) {
        throw new Error("Incorrect password")
      }

      const user = this.AuthRepository.create({
        id: isCheckEmail.id,
        full_name: isCheckEmail.full_name,
        email: isCheckEmail.email,
        username: isCheckEmail.username,
        description: isCheckEmail.description,
        image: isCheckEmail.image
      })

      const token = await jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "1h" })

      return {
        token
      }
    } catch (err) {
      throw new Error("Something went wrong on the server!");
    }
  }

  async check(loginSession: any): Promise<any> {
    try {
      const user = await this.AuthRepository.findOne({
        where: {
          id: loginSession.user.id
        }
      })

      return {
        message: "Token is valid!",
        user: user,
      };
    } catch (err) {
      throw new Error("Something went wrong on the server!");
    }
  }
}