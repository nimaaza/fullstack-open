const mongoose = require('mongoose');

const url = process.env.MONGODB_URL;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(result =>
    console.log('connected to MongoDB'))
  .catch(error =>
    console.log('error connecting to MongoDB:', error));

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
});

noteSchema.set('toJSON', {
  transform: (document, returnedDocument) => {
    returnedDocument.id = returnedDocument._id.toString();
    delete returnedDocument._id;
    delete returnedDocument.__v;
  }
});

module.exports = mongoose.model('Note', noteSchema);
