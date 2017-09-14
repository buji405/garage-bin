const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {

});

app.listen(app.get('port'), () => {
  console.log('Express running');
});

module.exports = app