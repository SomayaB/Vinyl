const db = require('./db/queries/reviews');

module.exports = {
  deleteById: db.deleteById,
  getByAlbumId: db.getByAlbumId,
  getById: db.getById,
  getAllInfoByUserId: db.getAllInfoByUserId,
  create: db.create,
  getAll: db.getAll
};
