// const express = require('express');
const usersRouter = require('express').Router();

const {
  getUsers,
  createUser,
  getUserId,
  editUserProfile,
  editUserAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.post('/users', createUser);
usersRouter.get('/users/:userId', getUserId);
usersRouter.patch('/users/me', editUserProfile);
usersRouter.patch('/users/me/avatar', editUserAvatar);

module.exports = usersRouter;

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
//
// module.exports = router;
