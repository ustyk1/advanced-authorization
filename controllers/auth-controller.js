const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcrypt');


const userService = require('../services/user-service');

class authController {

  async registration(req, res, next) {
    try {
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
      
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {

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
