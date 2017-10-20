const db = require('./db/queries/albums');

const getAlbums = () => {
  return db.getAlbums();
};

const getById = (albumId) => {
  return db.getById(albumId);
};


module.exports = {
  getAlbums: db.getAlbums,
  getById: db.getById
};
