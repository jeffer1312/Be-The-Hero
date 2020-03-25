const express = require('express');
const routes = express.Router();


//controladores
const ongsController = require('./controllers/ongsController')
const incidentsController = require('./controllers/incidentsController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')


//rotas
routes.post('/sessions', SessionController.create)
routes.get('/ongs', ongsController.index);
routes.post('/ongs', ongsController.create);
routes.get('/profile', ProfileController.index)
routes.get('/incidents', incidentsController.index)
routes.post('/incidents', incidentsController.create)
routes.delete('/incidents/:id', incidentsController.delete)



module.exports = routes;