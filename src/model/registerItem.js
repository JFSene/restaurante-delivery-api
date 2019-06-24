import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let ResgisterItemSchema = new Schema({
  title: String,
  description: String,
  size: String,
});

module.exports = mongoose.model('NewItem', ResgisterItemSchema);