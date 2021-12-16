const express = require('express');

const users = require('./users/router');
const recipes = require('./recipes/router');
const login = require('./login');

const root = express.Router({ mergeParams: true });

users(root);
recipes(root);
login(root);

module.exports = (app) => {
  app.use('/', root);
};