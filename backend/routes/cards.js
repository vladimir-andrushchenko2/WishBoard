const router = require('express').Router();
const {
  getCards, postCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

const { validatePostCard, validateDeleteCard } = require('../validation');

router.get('/', getCards);
router.post('/', validatePostCard, postCard);
router.delete('/:cardId', validateDeleteCard, deleteCard);
router.put('/:cardId/likes', putLike);
router.delete('/:cardId/likes', deleteLike);

module.exports = router;
