const express = require("express");
const router = express.Router();
const Item = require("../models/schema");

//get all items
router.get("/items", (req, res) => {
  try { 
      let filterparams = {};
      let sortparams = {};
    
      for (let query in req.query) {
        if (query === "sortBy") {
          sortparams = req.query.sortBy;
        } else {
          filterparams[query] = req.query[query];
        }
      }
      Item.find(filterparams).sort(sortparams)
      .then((items, err) => {
        if (err) {
          console.log(err);
        }
        res.status(200).send({ data: items });
      });

  } catch (error) {
      res.status(400).send(error);
  }
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
  try { 
      Item.create(req.body).then((item, err) =>  {
        if (err) {
          console.log(err);
        }
        res.status(200).send({ data: item });
      });
  } catch (error) {
      res.status(400).send(error);
  }
});

//delete item
router.delete("/items/:id", (req, res) => {
  try {
      let { id } = req.params;
      Item.deleteOne({ "_id" : id }).then((item, err) => {
        if (err) {
          console.log(err);
        }
        res.send('item deleted');
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

module.exports = router;