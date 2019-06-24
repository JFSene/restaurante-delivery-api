import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let ResgisterItemSchema = new Schema({
  title: String,
  description: String,
  availableSizes: [String],
  imgURL: String,
  price: String,
  observations: String,
  additionals: [String]
});

module.exports = mongoose.model('NewItem', ResgisterItemSchema);