const router = require('express').Router();
const Albums = require('../../models/albums');


router.get('/:albumID', (request, response) => {
  const albumID = request.params.albumID;

  Albums.getAlbumsByID(albumID)
  .then(albums => {
    const album = albums[0];
    response.render('album', {album});
  })
  .catch(error => {
    response.status(500).render('error', {error});
  });
});

module.exports = router;
