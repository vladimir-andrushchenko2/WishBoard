const { Joi, celebrate } = require('celebrate');

const validatePostCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().uri().required(),
  }),
});

const validateDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = { validatePostCard, validateDeleteCard };
