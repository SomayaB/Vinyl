const router = require('express').Router();
const Albums = require('../../models/albums');
const Reviews = require('../../models/reviews');
const { humanReadableDate } = require('../utils');


router.get('/:albumID', (request, response) => {
  const albumID = request.params.albumID;

  Albums.getAlbumByID(albumID)
  .then(album => {
    Reviews.getByAlbumId(album.id)
    .then(reviews => {
      response.render('albums/show', {album, reviews, humanReadableDate});
    });
  })
  .catch(error => {
    response.status(500).render('error', {error});
  });
});

module.exports = router;
