require('dotenv').config();

const express = require('express');
const Person = require('./models/person');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use(morgan((tokens, request, response) => {
  let logMessage = [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, 'content-length'), '-',
    tokens['response-time'](request, response), 'ms'
  ];

  if (tokens.method(request, response) === 'POST') {
    logMessage.push(JSON.stringify(request.body));
  }

  return logMessage.join(' ');
}));

const isNameAlreadyTaken = (person) =>
  persons.find(p => p.name === person.name);

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => response.json(persons));
});

app.get('/info', (request, response) => {
  const html = `<p>Phonebook has info for ${persons.length} people </p>
                <p>${(new Date()).toString()}</p>`;
  response.send(html);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => console.log(error.message));
});

app.post('/api/persons', (request, response) => {
  if (!request.body.name || !request.body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    });
  }

  const person = new Person({
    name: request.body.name,
    number: request.body.number
  });

  person.save().then(person => response.json(person));
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
