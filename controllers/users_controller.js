const User = require('../models/user');
const AuthToken = require('../models/auth_token');

const bcrypt = require('bcrypt');
const randomstring = require('randomstring');

exports.createUser = async (req, res) => {
  try {
    let user = new User({
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 6)
    });
    await user.save();

    let auth_token = new AuthToken({
      body: randomstring.generate(),
      user: user._id
    });
    await auth_token.save();

    user.auth_tokens.push(auth_token);
    await user.save();

    res.status(200).send(user);
  } catch (err) {
    res.status(422).send(err);
  }
}

