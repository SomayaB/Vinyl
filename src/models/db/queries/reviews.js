const db = require("../../db/index");

const deleteById = (id) => {
  return db.query(`
    DELETE FROM reviews
    WHERE id=$1
    `, id)
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

module.exports = {
  deleteById
};
