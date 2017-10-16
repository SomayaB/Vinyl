const router = require('express').Router();
const db = require('../../models/albums');
const albums = require('./albums');
const authentication = require('./authentication');
const middlewares = require('../middlewares');

router.use(middlewares.setDefaultReponseLocals);

router.use(middlewares.isLoggedIn);
router.use('/', authentication);
router.use('/albums', albums);

router.get('/', (request, response) => {
  db.getAlbums()
  .then(albums => {
    response.render('index', {albums});
  })
  .catch(error => {
    response.status(500).render('error', {error});
  });
});

module.exports = router;
