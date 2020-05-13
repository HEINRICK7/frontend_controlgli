const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');
const ResultController = require('./controllers/ResultController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

routes.post('/results', ResultController.store);
routes.get('/results', ResultController.index);
routes.delete('/results/:id', ResultController.destroy);

routes.get('/profile', ProfileController.index);

routes.post('/session', SessionController.store);

module.exports = routes;