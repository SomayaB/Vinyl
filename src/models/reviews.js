const db = require('./db/queries/reviews');

const deleteById = (id) => {
  return db.deleteById(id);
};

module.exports = {
  deleteById
};
