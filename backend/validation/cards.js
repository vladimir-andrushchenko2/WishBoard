const { Joi, celebrate } = require('celebrate');

const validatePostCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().uri().required(),
  }),
});

const validateCardIdInParams = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = { validatePostCard, validateCardIdInParams };
