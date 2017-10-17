const router = require('express').Router();
const { createSession } = require('../utils');
const { comparePasswords } = require('../../utils');
const Users = require('../../models/users');

router.get('/sign-up', (request, response) => {
  if(request.session.user) {
    const id = request.session.user.id;
    response.redirect(`/users/${id}`);
  } else {
    response.render('authentication/signup');
  }
});


router.post('/sign-up', (request, response) => {
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


router.get('/sign-in', (request, response) => {
  if(request.session.user) {
    const id = request.session.user.id;
    response.redirect(`/users/${id}`);
  }
    response.render('authentication/signin');
  }
);


router.post('/sign-in', (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  Users.findByEmail(email)
  .then(user => {
    comparePasswords(password, user.encrypted_password)
    .then(passwordsMatch => {
      if(passwordsMatch) {
        createSession(request, response, user);
        request.session.save(error => {
          if(error) {
            console.error(error);
          } else {
            response.redirect(`/users/${user.id}`);
          }
        });
      } else {
        response.render('authentication/signin', {warning: 'Incorrect email or password'});
      }
    });
  })
  .catch(error => {
    response.render('authentication/signin', {warning: 'Incorrect email or password'});
  });
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
