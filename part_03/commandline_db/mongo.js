const mongoose = require('mongoose');

const password = process.argv[2];
const dbName = 'phonebook-app';
const url = `mongodb+srv://nimaza:${password}@cluster0.ng4ya.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});
const Person = mongoose.model('Person', personSchema);

if (process.argv[3]) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  });

  person.save().then(result => {
    console.log('added', process.argv[3], 'number', process.argv[4], 'to phonebook');
    mongoose.connection.close();
  });
} else {
  Person.find({}).then(result => {
    console.log('phonebook:');
    result.forEach(person => {
      console.log(person.name, person.number);
    });

    mongoose.connection.close();
  });
}
