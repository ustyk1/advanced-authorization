const Router = require('express').Router;
const router = new Router();

const controller = require('../controllers/auth-controller');

//endpoints
router.post('/registration', controller.registration);
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.get('/activate/:link', controller.activate);
router.get('/refresh', controller.refresh);
router.get('/users', controller.getUsers); //тільки для авторизованих юзерів

module.exports = router;
