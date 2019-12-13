const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    duedate: { type: Date, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
});

const Item = mongoose.model('item', ItemSchema);

module.exports = Item;