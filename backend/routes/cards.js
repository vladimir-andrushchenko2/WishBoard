const router = require('express').Router();
const {
  getCards, postCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

const { validatePostCard, validateCardIdInParams } = require('../validation');

router.get('/', getCards);
router.post('/', validatePostCard, postCard);
router.delete('/:cardId', validateCardIdInParams, deleteCard);
router.put('/:cardId/likes', validateCardIdInParams, putLike);
router.delete('/:cardId/likes', validateCardIdInParams, deleteLike);

module.exports = router;
