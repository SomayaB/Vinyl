const setDefaultReponseLocals = (request, response, next) => {
  response.locals.loggedIn = false;
  next();
};

const isLoggedIn = (request, response, next) => {
  if(request.session.user) {
    response.locals.loggedIn = true;
  }
  next();
};


module.exports = {
  setDefaultReponseLocals,
  isLoggedIn
};
