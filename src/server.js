const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const config = require('./config/config.js').getConfig();

const app = express();

require('pug');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.locals.basedir = path.join(__dirname, '/views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  db.getAlbums()
  .then(albums => {
    res.render('index', {albums});
  })
  .catch(error => {
    res.status(500).render('error', {error});
  });
});

app.get('/albums/:albumID', (req, res) => {
  const albumID = req.params.albumID;

  db.getAlbumsByID(albumID)
  .then(albums => {
    const album = albums[0];
    res.render('album', {album});
  })
  .catch(error => {
    res.status(500).render('error', {error});
  });
});

app.use((req, res) => {
  res.status(404).render('not_found');
});

const port = config.get("server").get("port");
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`);
});
