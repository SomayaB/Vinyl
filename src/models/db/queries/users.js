const db = require("../../db/index");

const create = (name, email, password) => {
  return db.oneOrNone(`
    INSERT INTO
      users (name, email, encrypted_password)
    VALUES
      ($1, $2, $3)
    RETURNING
      *
    `, [ name, email, password ])
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

const findByEmail = (email) => {
  return db.oneOrNone(`
    SELECT * FROM users
    WHERE email = $1
    `, email)
  .catch(error => {
    console.error(error.message, "The argument is:::", email);
    throw error;
  });
};

const findById = (id) => {
  return db.oneOrNone(`
    SELECT * FROM users
    WHERE id = $1
    `, id)
  .catch(error => {
    console.error(error.message, "The argument is:::", id);
    throw error;
  });
};

const findInfoByUserId = (userId) => {
  return db.query(`
    SELECT users.id, users.name, users.email, users.date_joined,
      reviews.id AS review_id, reviews.title AS review_title, reviews.content AS review_content, reviews.date_posted AS review_date_posted,
      albums.id AS album_Id, albums.title AS album_title
    FROM reviews
      JOIN albums
      ON reviews.album_id = albums.id
      JOIN users
      ON reviews.user_id = users.id
      WHERE user_id = $1
      ORDER BY reviews.id DESC
    `, userId)
  .catch(error => {
    console.error(error.message, "The argument is:::", userId);
    throw error;
  });
};

module.exports = {
  create,
  findByEmail,
  findById,
  findInfoByUserId
};
