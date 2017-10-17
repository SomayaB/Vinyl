const createSession = (request, response, user) => {
  request.session.user = user;
};

const humanReadableDate = (date) => {
  return date.toDateString();
};


module.exports = {
  createSession,
  humanReadableDate
};
