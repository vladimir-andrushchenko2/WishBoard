const router = require('express').Router();
const {
  getCards, postCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

const { validatePostCard, validateDeleteCard, validateLikeChange } = require('../validation');

router.get('/', getCards);
router.post('/', validatePostCard, postCard);
router.delete('/:cardId', validateDeleteCard, deleteCard);
router.put('/:cardId/likes', validateLikeChange, putLike);
router.delete('/:cardId/likes', validateLikeChange, deleteLike);

module.exports = router;
