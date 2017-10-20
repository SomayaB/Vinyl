const router = require('express').Router();
const Albums = require('../../models/albums');
const Reviews = require('../../models/reviews');
const relativeDate = require('relative-date');

router.get('/:albumID', (request, response) => {
  const albumID = request.params.albumID;
  let page = request.query.page || 1;
  page = Number(page);
  const offset = (page - 1) * 10;
  Albums.getById(albumID)
  .then(album => {
    Reviews.getByAlbumId(album.id, offset)
    .then(reviews => {
      response.render('albums/show', {album, reviews, relativeDate, page});
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
