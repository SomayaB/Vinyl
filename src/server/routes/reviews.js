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
        response.status(500).render('error', {error});
      });
    }
  })
  .catch(error => {
    response.status(500).render('error', {error});
  });
});

router.get('/albums/:albumId/reviews/new', (request, response) => {
  const albumId = request.params.albumId;
  Albums.getById(albumId)
  .then(album => {
    response.render('reviews/new', {album});
  })
  .catch(error => {
    response.status(500).render('error', {error});
  });
});

router.post('/albums/:albumId/reviews/new', isAuthorized, (request, response) => {
  const content = request.body.content;
  const userId = request.session.user.id;
  const albumId = request.params.albumId;
  const rating = request.body.rating;
  const previousPage = request.headers.referer;
  console.log('rating:::', rating);

  if (content.length === 0) {
    response.render('not-authorized', {previousPage, warning: 'Your review cannot be empty.'});
  } else {
    const newReview = {
      content,
      userId,
      albumId,
      rating
    };
    Reviews.create(newReview)
    .then(review => {
      response.redirect(`/albums/${review.album_id}`);
    })
    .catch(error => {
      response.status(500).render('error', {error});
    });
  }
});

module.exports = router;
