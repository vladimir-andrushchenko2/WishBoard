const { Joi, celebrate } = require('celebrate');

const validateGetUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validatePostUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^(http|https):\/\/[^ "]+$/),
    about: Joi.string().min(2).max(30),
  }),
});

const validatePatchUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validatePatchUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^(http|https):\/\/[^ "]+$/),
  }),
});

module.exports = {
  validateGetUser,
  validatePostUser,
  validateLogin,
  validatePatchUser,
  validatePatchUserAvatar,
};
