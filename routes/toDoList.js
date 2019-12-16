const express = require("express");
const router = express.Router();
const Item = require("../models/schema");
const { User } = require("../models/users");
const mongoose = require("mongoose");
let ObjectId = mongoose.Types.ObjectId;

//get all todos
router.get("/items", (req, res) => {
  User.findById(req.session.user_id, async (err, user) => {
    const arr = [];
    let todos = user.todos;
    //search the todos array in user to find the 
    for (let todo of todos) {
      await Item.findById(todo, (err, item) => {
        if (err) {
          console.log(err);
        }
        arr.push(item);
      });
    }
    res.send({data: arr});
  }); 
});

//get individual item
router.get("/items/:id", (req, res) => {
  let todoId = req.params.id;
  User.findById(req.session.user_id, async (err, user) => {
    console.log("this is the ussserrrr", user);
    //search the todos array in user to find the todo item
      await Item.findById(todoId, (err, item) => {
        if (err) {
          console.log(err);
        }
        res.status(200).send({data: item});
      });
  }); 
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

  //create new item and push the id to the todos array of the user. save the user to add the new todo id to the todos array in user
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
      });
    });
   });
  });

//delete item
router.delete("/items/:id", (req, res) => {
  let todoId = req.params.id;
  User.findById(req.session.user_id, async (err, user) => {
    if (err) console.log(err);
    //search the todos array in user to find the todo item
      await Item.deleteOne(({ "_id" : todoId }), (err, item) => { 
        if (err) {
          console.log(err);
        }
        for (let i = 0; i < user.todos.length; i++) {
            if (user.todos[i]._id == todoId) {
              user.todos.splice(i, 1);
            }
        }
        console.log('after deletion', user.todos);
        res.status(200).send({data: "item deleteeeddd"});
        user.save((err) => {
          if (err) {
            console.log(err);
          }
        });
      });
  }); 
});

//edit item

router.put("/items/:id", (req, res) => { 
  let todoId = req.params.id;
  User.findById(req.session.user_id, async (err, user) => {
    if (err) console.log(err);
      await Item.findOneAndUpdate({"_id" : todoId }, req.body, { new: true } ).then((item, err) => {
        if (err) {
          console.log(err);
        }
        res.send({ data: item });
      });
  }); 
});

module.exports = router;