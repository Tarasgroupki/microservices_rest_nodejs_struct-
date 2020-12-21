// const jwt = require('jsonwebtoken');
import jsonwebtoken from 'jsonwebtoken';
// const User = require('../../models/user');
const { secretJwtKey } = require('../../config/config');
const { admin } = require('../../config/config');

export function adminMiddleware() {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      let loginFound;
      req.userData = jsonwebtoken.verify(token, secretJwtKey);

      for (let i = 0; i < admin.length; i++) {
        loginFound = admin[i].login === req.userData.userLogin;
      }
      // - user checking
      if (req.userData.type === 'admin' && loginFound) {
        return next();
      }
      return res.status(401).json({
        message: 'Auth failed',
      });
    } catch (e) {
      return res.status(401).json({
        message: 'Auth failed',
        e,
      });
    }
  };
}
