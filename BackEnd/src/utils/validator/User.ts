import * as Joi from 'joi'

export const updateUserSchema = Joi.object().keys({
  username: Joi.string().allow(null).optional(),
  full_name: Joi.string().allow(null).optional(),
  email: Joi.string().allow(null).optional(),
  // password: Joi.string().allow(null).optional(),
  image: Joi.string().allow(null).optional(),
  description: Joi.string().allow(null).optional()
})