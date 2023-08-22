const User = require("../models/User");
const bcrypt = require("bcrypt");
const Role = require("../models/Role");
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exeptions/api-error');

class UserService {
  async registration(userName, email, password, confirmPassword, phone) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`Користувач за поштою ${email} уже зареєстрований`);
    }

    const hashPassword = await bcrypt.hash(password, 4);
    const activationLink = uuid.v4();

    // const userRole = await Role.findOne({ value: 'ADMINISTRATOR' }); // шукаємо в базі
    const userRole = await Role.findOne({ value: 'USER' }); // шукаємо в базі

    const userData = {
      userName,
      email,
      password: hashPassword,
      confirmPassword: hashPassword,
      roles: [userRole.value],
      phone,
      activationLink
    }

    const user = await User.create(userData);
    await mailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`);

    const userDto = new UserDto(user);
    console.log('userDto', userDto)
    const tokens = tokenService.generateTokens({...userDto});

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: {...userDto, userName, phone} }
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest('Користувач не знайдений');
    }

    const isPasswordEquels = await bcrypt.compare(password, user.password);
    if (!isPasswordEquels) {
      throw ApiError.BadRequest('Невірний пароль');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: {...userDto, userName: user.userName, phone: user.phone} }
  }

  async logout(refreshToken) {
    const token = tokenService.removeToken(refreshToken);
    return token;
  }

  async activate(activationLink) {
    const user = await User.findOne({activationLink});
    if (!user) {
      throw ApiError.BadRequest('Не коректне посилання активації');
    }

    user.isActivated = true;
    await user.save();
  }

  async refresh(req, res) {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  async getUsers(req, res) {
    try {
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserService();
