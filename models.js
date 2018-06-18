const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const articlesSchema = new Schema({
  title: {
     index: true,
      type: String,
      unique: true,
      dropDups: true
  },
  articleURL: String,
  imageURL: String,
  description: String,
  saved: {
    type: Boolean,
    default: false
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: "Notes"
  }]
});

const notesSchema = new Schema({
  description: String
});


const Articles = mongoose.model('Articles', articlesSchema, 'articles');

const Notes = mongoose.model('Notes', notesSchema, 'notes');

module.exports ={
  Articles,
  Notes
}