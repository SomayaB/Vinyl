const router = require('express').Router();
const Users = require('../../models/users');
const Reviews = require('../../models/reviews');
const { humanReadableDate } = require('../utils');

router.get(['/users/:id', '/profile'], (request, response) => {
  const id = request.session.user.id;
  Users.findById(id)
  .then(user => {
    const dateJoined = humanReadableDate(user.date_joined);
    Reviews.getAllInfoByUserId(user.id)
    .then(reviews => {
      response.render('users/show', {user, reviews, dateJoined, humanReadableDate});
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
