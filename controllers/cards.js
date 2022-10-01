const Card = require('../models/cards');

const DATA_ERROR_CODE = 400;
const NOT_FOUND_ERROR = 404;
const SERVER_ERROR_CODE = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => { res.send({ cards }); })
    .catch(() => { res.status(SERVER_ERROR_CODE).send({ message: 'Ошибка сервера' }); });
};

module.exports.createCard = (req, res) => {
  const { name, link, owner = req.user._id  } = req.body;
  Card.create({ name, link, owner})
    .then((card) => { res.send({ card }); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(DATA_ERROR_CODE)
          .send({ message: 'Ошибка валидации' });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: 'Ошибка сервера' });
    });
};

// module.exports.createCard = (req, res) => {
//   const { name, link, owner = req.user._id } = req.body;
//   Card.create({ name, link, owner })
//     .then((card) => {
//       res.send({ card });
//     })
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         return res.status(DATA_ERROR_CODE).send({
//           message: 'Ошибка валидации',
//         });
//       }
//       return res
//         .status(SERVER_ERROR_CODE)
//         .send({ message: 'Ошибка сервера' });
//     });
// };

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR)
          .send({ message: 'Карточка не найдена' });
      }
      return res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(DATA_ERROR_CODE)
          .send({ message: 'Ошибка валидации' });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: 'Ошибка сервера' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        return res.status(NOT_FOUND_ERROR)
          .send({ message: 'Карточка не найдена' });
      }
      return res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(DATA_ERROR_CODE)
          .send({ message: 'Ошибка валидации' });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: 'Ошибка сервера' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR)
          .send({ message: 'Карточка не найдена' });
      }
      return res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(DATA_ERROR_CODE)
          .send({ message: 'Ошибка валидации' });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: 'Ошибка сервера' });
    });
};
