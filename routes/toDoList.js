const express = require("express");
const router = express.Router();
const Item = require("../models/schema");
const { User } = require("../models/users");
const mongoose = require("mongoose");
let ObjectId = mongoose.Types.ObjectId;

router.get("/items", async (req, res) => {
  let findUser = await User.findById(req.session.user_id );
  res.send({data: findUser});
});

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
  User.findById(req.session.user_id, (err, user) => {
      if (err) throw new Error(err);  
      console.log("this is the second userrr", user);
  //     // We create an object containing the data from our post request
    const newToDo = 
    {
      title: req.body.title,
      description: req.body.description,
      duedate: req.body.duedate,
      status: req.body.status,
      author: new ObjectId(req.session.user_id)
    };

    console.log(typeof(newToDo));

  Item.create(newToDo, (err, todo) =>  {
    if (err) {
      console.log(err);
    }
    user.todos.push(newToDo);
    user.save((err) => {
      return res.status(200),send({data: todo});
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