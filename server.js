import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import acl from 'express-acl';
import auth from 'basic-auth';
import userModel from './api/models/userModel';

acl.config({
  filename: 'nacl.json',
  baseUrl: ''
});

var app = express(), port = process.env.PORT || 3000;

app.use(function(req, res, next) {
  const user = auth(req);

  req.decoded = {
    role: 'anonymous'
  };
  console.log('user is', user);
  if (user) {
    // Check if valid
    const dbUser = userModel.findOne({name: user.name}, (err, user2) => {
      if (err)
        throw err;

      if (user2.pw === user.pw && user2.role) {
        req.decoded.role = user2.role;
      }

      next()
    });
  } else {
    console.log('go next');
    next();
  }
});

app.use(acl.authorize);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/not');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

import routes from './api/routes/userRoutes';
routes(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
