const router = require('express').Router();
const Reviews = require('../../models/reviews');
const Albums = require('../../models/albums');
const { isAuthorized } = require('../middlewares');

router.delete('/reviews/:id', isAuthorized, (request, response) => {
  const id = request.params.id;
  Reviews.getById(id)
  .then(review => {
    if (request.session.user.id !== review.user_id) {
      const previousPage = request.headers.referer;
      response.status(403);
      response.render('not-authorized', {previousPage, warning: 'You can only delete your own posts.'});
    } else {
      Reviews.deleteById(id)
      .then(() => {
        const userId = request.session.user.id;
        response.redirect(`/users/${userId}`);
      })
      .catch(error => {
      console.log(error);
      });
    }
  })
  .catch(error => {
    console.error(error.message);
    throw error;
  });
});

router.get('/albums/:albumId/reviews/new', (request, response) => {
  const albumId = request.params.albumId;
  console.log('albumId:::', albumId);
  Albums.getById(albumId)
  .then(album => {
    response.render('reviews/new', {album});
  })
  .catch(error => {
    console.error(error.message);
    throw error;
  });
});

module.exports = router;
