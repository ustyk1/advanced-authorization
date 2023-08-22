const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})

    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({user: userId});

    //логіниться не вперше
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    //логіниться вперше
    const token = Token.create({user: userId, refreshToken});

    return token;
  }

  async removeToken(refreshToken) {
      const tokenData = await Token.deleteOne({ refreshToken });
      return tokenData;
  }
}

module.exports = new TokenService();
