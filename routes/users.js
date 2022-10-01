// const express = require('express');
const usersRouter = require('express').Router();

const {
  getUsers, createUser, getUserId, editUserProfile, editUserAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.post('/', createUser);
usersRouter.get('/:userId', getUserId);
usersRouter.patch('/me', editUserProfile);
usersRouter.patch('/me/avatar', editUserAvatar);

module.exports = usersRouter;

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
//
// module.exports = router;
