const db = require('./db/queries/reviews');

const deleteById = (id) => {
  return db.deleteById(id);
};

const getByAlbumId = (albumId) => {
  return db.getByAlbumId(albumId);
};

module.exports = {
  deleteById,
  getByAlbumId
};
