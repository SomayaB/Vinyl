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

const getByAlbumId = (albumId) => {
  return db.any(`
    SELECT reviews.id, reviews.title, reviews.content, reviews.date_posted, users.name AS author FROM reviews
    JOIN users
    ON reviews.user_id = users.id
    WHERE album_id = $1
    `, albumId)
  .catch(error => {
    console.error(error.message, "The argument is:::", albumId);
    throw error;
  });
};

module.exports = {
  deleteById,
  getByAlbumId
};
