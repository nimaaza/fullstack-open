require('dotenv').config();

const express = require('express');
const Person = require('./models/person');
const cors = require('cors');
const morgan = require('morgan');
const { request, response } = require('express');

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

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' });
  }

  next(error);
};

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

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => next(error));
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

app.use(errorHandler);
