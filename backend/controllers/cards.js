const Card = require('../models/card');
const { NotFound, ForbiddenError } = require('../customErrors');
const { CARD_NOT_FOUND_MSG } = require('../constants');
const makeCatchForController = require('../utils/makeCatchForControllers');

function getCards(req, res, next) {
  Card.find({})
    .sort({ createdAt: -1 })
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(makeCatchForController(next));
}

async function postCard(req, res, next) {
  const { name, link } = req.body;
  const { _id: owner } = req.user;

  let card;
  try {
    card = await Card.create({ name, link, owner });
    card = await card.populate('owner');
  } catch (err) {
    makeCatchForController(next)(err);
  }

  return res.status(201).send({ data: card });
}

function deleteCard(req, res, next) {
  Card.findById(req.params.cardId)
    .populate(['owner', 'likes'])
    .then(async (card) => {
      if (!card) {
        throw new NotFound(CARD_NOT_FOUND_MSG);
      }

      if (card.owner.id !== req.user._id) {
        throw new ForbiddenError('You can\'t delete other people\'s cards');
      }

      await Card.deleteOne({ _id: card._id });

      return res.send({ data: card });
    })
    .catch(makeCatchForController(next));
}

function updateCardDecorator(makeUpdateObjWithReqCallback) {
  return (req, res, next) => {
    Card.findByIdAndUpdate(
      req.params.cardId,
      makeUpdateObjWithReqCallback(req),
      { new: true },
    )
      .populate(['owner', 'likes'])
      .then((card) => {
        if (!card) {
          throw new NotFound(CARD_NOT_FOUND_MSG);
        }

        res.send({ data: card });
      })
      .catch(makeCatchForController(next));
  };
}

const putLike = updateCardDecorator((req) => ({ $addToSet: { likes: req.user._id } }));

const deleteLike = updateCardDecorator((req) => ({ $pull: { likes: req.user._id } }));

module.exports = {
  getCards, postCard, deleteCard, putLike, deleteLike,
};
