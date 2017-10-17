const db = require('./db/queries/reviews');

const deleteById = (id) => {
  return db.deleteById(id);
};

const getByAlbumId = (albumId) => {
  return db.getByAlbumId(albumId);
};

const getById = (id) => {
  return db.getById(id);
};

const getAllInfoByUserId = (userId) => {
  return db.getAllInfoByUserId(userId);
};

const create = (newReview) => {
  return db.create(newReview);
};

const getAll = () => {
  return db.getAll();
};

module.exports = {
  deleteById,
  getByAlbumId,
  getById,
  getAllInfoByUserId,
  create,
  getAll
};
