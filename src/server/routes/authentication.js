const router = require('express').Router();
const { createSession } = require('../utils');
const Users = require('../../models/users');

router.get('/signup', (request, response) => {
  if(request.session.user) {
    const id = request.session.user.id;
    response.redirect(`/users/${id}`); //TODO create route
  } else {
    response.render('authentication/signup');
  }
});

router.post('/signup', (request, response) => {
  const name = request.body.name;
  const email = request.body.email;
  const password = request.body.password;
  if (name.length === 0 || email.length === 0) {
    response.render('authentication/signup', {warning: 'You must enter both a name and an email address.'});
  } else {
    Users.findByEmail(email)
    .then(user => {
      if (user) {
        response.render('authentication/signup', {warning: 'That email already exists. Please use another.'});
      } else {
        Users.create(name, email, password)
        .then(newUser => {
          createSession(request, response, newUser);
          request.session.save(error => {
            if (error) {
              console.error(error);
              throw error;
            } else {
              response.redirect(`/users/${newUser.id}`);
            }
          });
        });
      }
    })
    .catch(error => {
      console.error(error);
    });
  }
});

router.get('/signout', (request, response) => {
  request.session.destroy((error) => {
    response.redirect('/');
    if(error) {
      console.error(error);
    }
  });
});


module.exports = router;
