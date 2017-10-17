const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./server/routes');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const config = require('./config/config.js').getConfig();

const app = express();

require('pug');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.locals.basedir = path.join(__dirname, '/views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  store: new pgSession({
    conString: `postgres://${config.getIn(["db", "host"])}:${config.getIn(["db", "port"])}/${config.getIn(["db", "name"])}`
  }),
  secret: config.get("server").get("secret"),
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1 * 24 * 60 * 60 * 1000}
}));

app.use('/', routes);

app.use((req, res) => {
  res.status(404).render('not_found');
});

const port = config.get("server").get("port");
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`);
});
