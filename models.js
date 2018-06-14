const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const articlesSchema = new Schema({
  title: String,
  articleURL: String,
  imageURL: String,
  description: String,
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