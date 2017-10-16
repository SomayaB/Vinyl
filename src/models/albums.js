const db = require('./db/queries/albums');

const getAlbums = () => {
  return db.getAlbums();
};

const getAlbumsByID = (albumId) => {
  return db.getAlbumsByID(albumId);
};


module.exports = {
  getAlbums,
  getAlbumsByID,
};
