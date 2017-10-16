const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./server/routes');
const config = require('./config/config.js').getConfig();

const app = express();

require('pug');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.locals.basedir = path.join(__dirname, '/views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', routes);

app.use((req, res) => {
  res.status(404).render('not_found');
});

const port = config.get("server").get("port");
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`);
});
