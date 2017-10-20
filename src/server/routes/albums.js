const router = require('express').Router();
const Albums = require('../../models/albums');
const Reviews = require('../../models/reviews');
const { humanReadableDate } = require('../utils');


router.get('/:albumID', (request, response) => {
  const albumID = request.params.albumID;
  let page = request.query.page || 1;
  page = Number(page);
  const offset = (page - 1) * 10;
  Albums.getById(albumID)
  .then(album => {
    console.log('album ID', album.id);
    Reviews.getByAlbumId(album.id, offset)
    .then(reviews => {
      response.render('albums/show', {album, reviews, humanReadableDate, page});
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
