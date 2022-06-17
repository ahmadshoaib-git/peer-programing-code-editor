import Joi from "joi";

const passwordValidatorRegex = /^[ A-Za-z0-9_@#&!+-]*$/;
const registerUserReqSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .label("User name is invalid"),

  password: Joi.string()
    .pattern(new RegExp(passwordValidatorRegex))
    .required()
    .label("User password is invalid, does not match the criteria"),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("User email is invalid"),
});

const loginUserReqSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("User email is invalid"),

  password: Joi.string()
    .pattern(new RegExp(passwordValidatorRegex))
    .required()
    .label("User password is invalid, does not match the criteria"),
});

export { registerUserReqSchema, loginUserReqSchema };
