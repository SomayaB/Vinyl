const router = require('express').Router();
const db = require('../../models/albums');


router.get('/:albumID', (req, res) => {
  const albumID = req.params.albumID;

  db.getAlbumsByID(albumID)
  .then(albums => {
    const album = albums[0];
    res.render('album', {album});
  })
  .catch(error => {
    res.status(500).render('error', {error});
  });
});

module.exports = router;
