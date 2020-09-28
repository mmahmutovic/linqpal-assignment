const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const errorHandler = require('../_helpers/error-handler');
const db = require('../db/db');

const saltRounds = 10;
const { User } = db;

async function auth(req, res) {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) return errorHandler(res, new Error('Unable to find the user, either userId is invalid or you have made an unauthorized request!'), 'Unable to find the user, either userId is invalid or you have made an unauthorized request!', 401);
    const { password } = user;
    const isMatch = await new Promise((resolve, reject) => {
      bcrypt.compare(req.body.password, password, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
    if (!isMatch) return errorHandler(res, new Error('Password is incorrect'), 'Username and password does not match', 401);
    // create a jwt token that is valid for 7 days
    const token = jwt.sign({
      sub: user.id,
    },
    process.env.secret, {
      expiresIn: '7d',
    });

    return res.status(200).json({
      user: {
        username: user.username,
      },
      token,
    });
  } catch (error) {
    return errorHandler(res, error, 'Internal Server Error!', 500);
  }
}

async function getExternalUsers(req, res) {
  try {
    const users = await User.find({ externalUser: true });
    return res.status(200).json(users);
  } catch (error) {
    return errorHandler(error, req, res);
  }
}

async function createExternalUser(req, res) {
  const user = new User(req.body);
  user.externalUser = true;

  // Encrypting SSN
  const hmac = crypto.createHmac(process.env.algorithm, process.env.hmacKey);
  hmac.update(user.ssn);
  const hash = hmac.digest('hex');
  user.ssn = hash;

  user.save();
  res.status(200).json(user);
}

async function createInternalUser(req, res) {
  try {
    const { username } = req.body;
    const { password } = req.body;
    if (!username || !password) {
      return errorHandler(res, new Error('Username or password empty!'), 'Enter username and password!', 404);
    }
    if (await User.findOne({ username })) {
      return errorHandler(res, new Error('Username taken!'), 'User already exists with that username', 404);
    }
    const hashed = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
    const user = new User({ username, password: hashed, externalUser: false });
    await user.save();
    return res.status(200).json({ user });
  } catch (error) {
    return errorHandler(error, req, res);
  }
}
module.exports = {
  auth,
  getExternalUsers,
  createExternalUser,
  createInternalUser,
};
