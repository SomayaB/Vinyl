const setDefaultReponseLocals = (request, response, next) => {
  response.locals.isLoggedIn = false;
  next();
};

module.exports = {
  setDefaultReponseLocals
};
