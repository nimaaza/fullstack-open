const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URL;
console.log('connecting to MongoDB...');
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(result => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB:', error.message));

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  number: { type: String, required: true }
});
personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (document, transformedDocument) => {
    transformedDocument.id = transformedDocument._id.toString();
    delete transformedDocument._id;
    delete transformedDocument.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);
