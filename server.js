const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {

});

app.get('/api/v1/items', (request, response) => {
  database('item').select()
    .then(items => {
      response.status(200).json(items)
    })
    .catch(error => {
      response.status(500).json({ error })
    });
})

app.post('/api/v1/items', (request, response) => {
  const newItem = request.body;

  for (let requiredParameter of ['name', 'reason', 'cleanliness']) {
    if(!newItem[requiredParameter]) {
      return response.status(422).json({
        error: `Missing required parameter ${requiredParameter}`
      });
    };
  };

  database('item').insert(newItem, 'id')
    .then(item => {
      response.status(201).json({ id: item[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    });
})

app.put('/api/v1/items/:id', (request, response) => {
  database('item').where('id', request.params.id)
  .update({
    cleanliness: request.body,
  }, '*')
  .then((data) => response.status(201).json(data))
  .catch((error) => response.status(500).json(error))
})

app.listen(app.get('port'), () => {
  console.log('Express running');
});

module.exports = app