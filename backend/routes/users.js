const router = require('express').Router();
const {
  getUsers, getUser, patchUser, patchUserAvatar, getMe,
} = require('../controllers/users');
const { validateGetUser, validatePatchUser, validatePatchUserAvatar } = require('../validation');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', validateGetUser, getUser);
router.patch('/me', validatePatchUser, patchUser);
router.patch('/me/avatar', validatePatchUserAvatar, patchUserAvatar);

module.exports = router;
