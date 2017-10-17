const router = require('express').Router();
const Users = require('../../models/users');

router.get('/:id', (request, response) => {
  const id = request.params.id;
  Users.findById(id)
  .then(user => {
    const humanReadableDate = user.date_joined.toDateString();
    response.render('users/show', {user, humanReadableDate});
  })
  .catch(error => {
    console.error(error.message);
    throw error;
  });
});

module.exports = router;
