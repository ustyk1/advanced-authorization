const {validationResult} = require('express-validator');
const ApiError = require('../exeptions/api-error');

const userService = require('../services/user-service');

class authController {

  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return next(ApiError.BadRequest('Помилка при валідації', errors.array()));
      }

      const { userName, email, password, confirmPassword, phone } = req.body;
      const userData = await userService.registration(userName, email, password, confirmPassword, phone);
      console.log('userData', userData);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      //httpsSecure: true
      return res.status(200).json({ message: 'Користувач успішно зареєстрований', userData });

    } catch (error) {
        next(error);
      // res.status(400).json({ message: 'Registration error' })
    }
  }

  async login(req, res, next) {
    try {
      const {email, password} = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);

    } catch (error) {
      next(error);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL_REACT);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  }


  async getUsers(req, res, next) {
    try {
      // const userRole = new Role();
      // const adminRole = new Role({value: 'ADMINISTRATOR'});
      // await userRole.save();
      // await adminRole.save();

      res.json('server work')
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new authController();
