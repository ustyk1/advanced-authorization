const Router = require('express').Router;
const router = new Router();
const {body} = require('express-validator');

const controller = require('../controllers/auth-controller');
const authMiddleware = require('../middleware/auth-middleware');

//endpoints
router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({min:3, max: 16}),
  controller.registration
);
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.get('/activate/:link', controller.activate);
router.get('/refresh', controller.refresh);
router.get('/users', authMiddleware, controller.getUsers); //тільки для авторизованих юзерів

module.exports = router;
