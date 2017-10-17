const router = require('express').Router();
const Users = require('../../models/users');
const { humanReadableDate } = require('../utils');

router.get(['/users/:id', '/profile'], (request, response) => {
  const id = request.session.user.id;
  Users.findInfoByUserId(id)
  .then(user => {
    const dateJoined = humanReadableDate(user[0].date_joined);
    response.render('users/show', {user, dateJoined, humanReadableDate});
  })
  .catch(error => {
    console.error(error.message);
    throw error;
  });
});

module.exports = router;
