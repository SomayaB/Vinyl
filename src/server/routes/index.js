const router = require('express').Router();
const Albums = require('../../models/albums');
const Reviews = require('../../models/reviews');
const users = require('./users');
const albums = require('./albums');
const reviews = require('./reviews');
const authentication = require('./authentication');
const middlewares = require('../middlewares');
const { humanReadableDate } = require('../utils');

router.use(middlewares.setDefaultReponseLocals);

router.use(middlewares.isLoggedIn);
router.use('/', authentication);
router.use('/', users);
router.use('/albums', albums);
router.use('/', reviews);

router.get('/', (request, response) => {
  Albums.getAlbums()
  .then(albums => {
    Reviews.getAll()
    .then(reviews => {
      response.render('index', {albums, reviews, humanReadableDate});
    })
    .catch(error => {
      response.status(500).render('error', {error});
    });
  })
  .catch(error => {
    response.status(500).render('error', {error});
  });
});

module.exports = router;
