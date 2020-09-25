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
    if (!user) errorHandler("Username doesn't exists", req, res);
    const { password } = user;
    const isMatch = await new Promise((resolve, reject) => {
      bcrypt.compare(req.body.password, password, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
    if (!isMatch) errorHandler('Password is incorrect', req, res);
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
    return errorHandler(error, req, res);
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
      return errorHandler('Please enter username and password', req, res);
    }
    if (await User.findOne({ username })) {
      return errorHandler('User already exists with that username', req, res);
    }
    const user = new User({ username, password, externalUser: false });

    user.password = await new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });
    });
    // save user
    await user.save();
    return res.status(200).json({ user, password });
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
