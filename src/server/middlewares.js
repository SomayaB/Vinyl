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

const isAuthorized = (request, response, next) => {
  if(!request.session.user) {
    const previousPage = request.headers.referer;
    response.render('not-authorized', {previousPage, warning: 'You must be signed in to perform this action.'});
  } else {
    next();
  }
};

module.exports = {
  setDefaultReponseLocals,
  isLoggedIn,
  isAuthorized
};
