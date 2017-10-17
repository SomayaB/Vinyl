const router = require('express').Router();
const Reviews = require('../../models/reviews');

router.delete('/:id', (request, response) => {
  const id = request.params.id;
  Reviews.deleteById(id)
  .then(() => {
    const userId = request.session.user.id;
    response.redirect(`/users/${userId}`);
  })

  .catch(error => {
    console.error(error.message);
    throw error;
  });
});

module.exports = router;
