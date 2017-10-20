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

const getByAlbumId = (albumId, offset) => {
  return db.any(`
    SELECT reviews.id, reviews.content, reviews.date_posted, users.name AS author FROM reviews
    JOIN users
    ON reviews.user_id = users.id
    WHERE album_id = $1
    ORDER BY reviews.id ASC
    OFFSET $2
    LIMIT 10
    `, [albumId, offset])
  .catch(error => {
    console.error(error.message, "Arguments:::", arguments);
    throw error;
  });
};

const getById = (id) => {
  return db.oneOrNone(`
    SELECT * FROM reviews
    WHERE id = $1
    `, id)
  .catch(error => {
    console.error(error.message, "The argument is:::", id);
    throw error;
  });
};


const getAllInfoByUserId = (userId) => {
  return db.query(`
    SELECT reviews.id, reviews.content, reviews.date_posted, reviews.album_id, albums.title AS album_title FROM reviews
    JOIN albums
    ON reviews.album_id = albums.id
    WHERE reviews.user_id = $1
    `, userId)
  .catch(error => {
    console.error(error.message, "The argument is:::", userId);
    throw error;
  });
};

const create = (newReview) => {
  return db.oneOrNone(`
    INSERT INTO
      reviews (content, user_id, album_id)
    VALUES
      ($1, $2, $3)
    RETURNING
      *
    `, [ newReview.content, newReview.userId, newReview.albumId ])
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

const getAll = () => {
  return db.any(`
    SELECT reviews.id, reviews.content, reviews.date_posted, reviews.album_id, albums.title AS album_title, users.name AS author
    FROM reviews
    JOIN albums
    ON reviews.album_id = albums.id
    JOIN users
    ON reviews.user_id = users.id
    ORDER BY reviews.id DESC
    LIMIT 3
  `)
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

module.exports = {
  deleteById,
  getByAlbumId,
  getById,
  getAllInfoByUserId,
  create,
  getAll
};
