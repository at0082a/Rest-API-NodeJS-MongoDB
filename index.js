const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/todolistitems', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

const itemRouter = require("./routes/toDoList");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes are below
app.use('/api', itemRouter);

app.listen(port, function() {
  console.log("Runnning on " + port);
});