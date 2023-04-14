const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFound } = require('../customErrors');
const makeCatchForController = require('../utils/makeCatchForControllers');
const { USER_NOT_FOUND_MSG, JWT_SECRET } = require('../environment');

function getUsers(req, res, next) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(makeCatchForController(next));
}

function getUserWithIdFromCallback(getIdFromReqCallback) {
  return (req, res, next) => {
    User.findById(getIdFromReqCallback(req))
      .then((user) => {
        if (!user) {
          throw new NotFound(USER_NOT_FOUND_MSG);
        }

        res.send({ data: user });
      })
      .catch(makeCatchForController(next));
  };
}

const getUser = getUserWithIdFromCallback((req) => req.params.userId);

const getMe = getUserWithIdFromCallback((req) => req.user._id);

function postUser(req, res, next) {
  const {
    password, ...data
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      ...data, password: hash,
    }))
    .then(({
      name, about, avatar, email, _id,
    }) => res.status(201).send({
      name, about, avatar, email, _id,
    }))
    .catch(makeCatchForController(next));
}

function updateUserWithCallback(getNewDataObjFromBodyCallback) {
  return (req, res, next) => {
    const updateOptions = {
      new: true,
      runValidators: true,
    };

    const updateData = getNewDataObjFromBodyCallback(req.body);

    User.findByIdAndUpdate(req.user._id, updateData, updateOptions)
      .then((user) => {
        if (!user) {
          throw new NotFound(USER_NOT_FOUND_MSG);
        }

        res.send({ data: user });
      })
      .catch(makeCatchForController(next));
  };
}

const patchUser = updateUserWithCallback(({ name, about }) => ({ name, about }));

const patchUserAvatar = updateUserWithCallback(({ avatar }) => ({ avatar }));

function login(req, res, next) {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      return res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      }).status(200).send({ message: 'login successfull, token is stored in cookies' });
    })
    .catch(makeCatchForController(next));
}

function logout(req, res) {
  return res.clearCookie('jwt').status(200).send({ message: 'the jwt cookie is the killedest guy in the room' });
}

module.exports = {
  getUsers, getUser, postUser, patchUser, patchUserAvatar, login, getMe, logout,
};
