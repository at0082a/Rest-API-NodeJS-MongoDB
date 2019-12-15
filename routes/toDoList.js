const express = require("express");
const router = express.Router();
const Item = require("../models/schema");
const { User } = require("../models/users");
const mongoose = require("mongoose");
let ObjectId = mongoose.Types.ObjectId;

router.get("/items", (req, res) => {
  User.findById(req.session.user_id, async (err, user) => {
    const arr = [];
    console.log("this is the ussserrrr", user);
    let todos = user.todos;
    for (let todo of todos) {
      await Item.findById(todo, (err, item) => {
        if (err) {
          console.log(err);
        }
        arr.push(item);
        console.log("this is arrrrr", arr);
      });
    }
    res.send({data: arr});
  }); 
});
  // User.findById(req.session.user_id).populate('todos').exec((err, user) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.status(200).json(user);
  //   }
  // });
  // .exec((err, todos) => {
  //   if (err) console.log(err);
  //   console.log("these are the todoss", todos);
  //   res.status(200).send({data: todos})
  // });

//get individual item
router.get("/items/:id", (req, res) => {
  try {
      let { id } = req.params;
      Item.findById(id).then((item, err) => {
        if (err) {
          console.log(err);
        }
        res.status(200).send({ data: item });
      });
  } catch (error) {
      res.status(400).send(error);
  }
});

//create new item
router.post("/items", (req, res) => {
  console.log(req.session.user_id);
  //get the user
  User.findById(req.session.user_id, async (err, user) => {
  if (err) throw new Error(err); 
  // We create an object containing the data from our post request
  const newToDo = 
  {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    author: req.session.user_id,
    duedate: req.body.duedate
  };
  //create new item and push the id to the todos array of the user
  await Item.create(newToDo, (err, item) =>  {
    if (err) {
      console.log(err);
    }
    console.log("this is the item iddddd", item._id);
    console.log('this is the user inside create user', user);
    res.status(200).send({ data : item });
      user.todos.push(item);
      user.save((err) => {
        if (err) {
          console.log(err);
        } 
        // res.status(200).send(newToDo);
        console.log(user);
      });
    });
   });
  });

//delete item
router.delete("/items/:id", (req, res) => {
  try {
      let { id } = req.params;
      Item.deleteOne({ "_id" : id }).then((item, err) => {
        if (err) {
          console.log(err);
        }
        res.status(200).send('item deleted');
      });
  } catch (error) {
      res.status(400).send(error);
  }
});

//edit item

router.put("/items/:id", (req, res) => { 
  try {
      let { id } = req.params;
      Item.findOneAndUpdate({"_id" : id }, req.body, { new: true } ).then((item, err) => {
        if (err) {
          console.log(err);
        }
        res.send({ data: item });
      });
  } catch (error) {
      res.status(400).send(error);
  }
});

//authentication

// router.get('/auth', passport.authenticate('basic', { session: false }), (req, res) => {
//   console.log('hiiiiii');
//   res.send('You have been authenticated' + req.user.username);
// });

module.exports = router;