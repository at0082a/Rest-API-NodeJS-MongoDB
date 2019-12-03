const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ItemSchema = new Schema ({
    title: String,
    description: String,
    status: String,
    duedate: Date,
    subtasks: [ { type: String, required: false} ]
  }, { versionKey: false 
});

const Item = mongoose.model('item', ItemSchema);

module.exports = Item;