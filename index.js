const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require('config');

const port = process.env.PORT || 3001;
const cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000
}));

mongoose.connect('mongodb://localhost:27017/todolistitems', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

const itemRouter = require("./routes/toDoList");
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

if (!config.get('PrivateKey')) {
  console.error('FATAL ERROR: PrivateKey is not defined.');
  process.exit(1);
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes are below
app.use('/api', itemRouter);
app.use('/api', usersRouter);
app.use('/api', authRouter);

app.listen(port, function() {
  console.log("Runnning on " + port);
});