const db = require('./db/queries/albums');

const getAlbums = () => {
  return db.getAlbums();
};

const getAlbumByID = (albumId) => {
  return db.getAlbumByID(albumId);
};


module.exports = {
  getAlbums,
  getAlbumByID,
};
