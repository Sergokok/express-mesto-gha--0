const User = require('../models/users');

const DATA_ERROR_CODE = 400;
const NOT_FOUND_ERROR = 404;
const SERVER_ERROR_CODE = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(() => {
      res.status(SERVER_ERROR_CODE).send({ message: 'Ошибка сервера' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(DATA_ERROR_CODE).send({ message: 'Ошибка валидации' });
      }
      return res.status(SERVER_ERROR_CODE).send({ message: 'Ошибка сервера' });
    });
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь не найден' });
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(DATA_ERROR_CODE).send({ message: 'Ошибка валидации' });
      }
      return res.status(SERVER_ERROR_CODE).send({ message: 'Ошибка сервера' });
    });
};

module.exports.editUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(DATA_ERROR_CODE).send({ message: 'Ошибка валидации' });
      }
      return res.status(SERVER_ERROR_CODE).send({ message: 'Ошибка сервера' });
    });
};

module.exports.editUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(DATA_ERROR_CODE).send({ message: 'Ошибка валидации' });
      }
      return res.status(SERVER_ERROR_CODE).send({ message: 'Ошибка сервера' });
    });
};
