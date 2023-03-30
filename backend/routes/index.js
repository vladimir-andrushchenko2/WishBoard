const router = require('express').Router();
const { validatePostUser, validateLogin } = require('../validation');
const { NOT_FOUND_MSG } = require('../constants');
const { NotFound } = require('../customErrors');
const auth = require('../middlewares/auth');
const { postUser, login } = require('../controllers/users');

router.post('/signup', validatePostUser, postUser);
router.post('/signin', validateLogin, login);

router.use('/cards', auth, require('./cards'));
router.use('/users', auth, require('./users'));

// 404
router.all('*', auth, (req, res, next) => {
  next(new NotFound(NOT_FOUND_MSG));
});

module.exports = router;
