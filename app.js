// Language: javascript
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');

const { PORT = 3000 } = process.env;

const app = express();

app.use((reg, res, next) => {
  req.user = {
    _id: '633460047ca70724038e111e',
  };

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(require('./routes/cards'));
app.use(require('./routes/users'));

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

// подключиться к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});


