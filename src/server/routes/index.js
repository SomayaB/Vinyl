const router = require('express').Router();
const db = require('../../models/albums');
const albums = require('./albums');
const middlewares = require('../middlewares');

router.use(middlewares.setDefaultReponseLocals);

router.get('/', (req, res) => {
  db.getAlbums()
  .then(albums => {
    res.render('index', {albums});
  })
  .catch(error => {
    res.status(500).render('error', {error});
  });
});

router.use('/albums', albums);


module.exports = router;
