const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const api = require('./routes/api');

const app = express();

app.set('port', process.env.PORT || 3001);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api', api);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
