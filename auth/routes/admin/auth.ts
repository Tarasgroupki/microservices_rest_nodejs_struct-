import * as express from 'express';
import bcrypt from 'bcrypt';
import { adminMiddleware } from '../middleware/admin';
import jsonwebtoken from 'jsonwebtoken';
const { secretJwtKey, admin } = require('../../config/config');

const app = express.Router();

app.get('/profile', adminMiddleware(), async (req, res, next) => {
  try {
    res.send({
      status: 'ok',
      user: { login: 'Login', password: '1234sstr' },
      token: 'uuefweuofjoewjfoiewf',
    });
  } catch (err) {
    next(err);
  }
});

app.post('/login', express.json(), async (req, res, next) => {
  try {
    let loginFound;
    let admI;

    for (let i = 0; i < admin.length; i++) {
      if (admin[i].login === req.body.login) {
        loginFound = true;
        admI = i;
      } else {
        loginFound = false;
      }
    }

    if (loginFound) {
      // login
      const isMatch = await bcrypt.compare(
        req.body.password,
        admin[admI].password,
      );

      if (isMatch) {
        const token = jsonwebtoken.sign(
          {
            type: 'admin',
            userLogin: admin[admI].login,
          },
          secretJwtKey,
          {
            expiresIn: '10h',
          },
        );
        return res.send({
          token,
          message: 'Authorization is successfully!',
        });
      }
      return res.send({
        message: 'Incorrect Password !',
      });
    }
    res.send({
      status: 'Not Found!',
    });
  } catch (err) {
    next(err);
  }
});

export default app;
