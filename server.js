import express from 'express';
import mongoose from 'mongoose';
import Task from './api/models/todoListModel';
import bodyParser from 'body-parser';
import acl from 'express-acl';

acl.config({
  filename: 'nacl.json',
  baseUrl: ''
});

var app = express(), port = process.env.PORT || 3000;

app.use(function(req, res, next) {
  req.decoded = {
    role: 'user'
  };
  next();
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
