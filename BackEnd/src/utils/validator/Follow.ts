import * as Joi from "joi"

export const createFollowingSchema = Joi.object({
  userLogin: Joi.number(),
  followingId: Joi.number()
})