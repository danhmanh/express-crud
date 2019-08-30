const User = require('../models/user');
const AuthToken = require('../models/auth_token');
const bcrypt = require('bcrypt');
const randomstring = require('randomstring');

exports.login = async (req, res) => {
  let user = await User.findOne({ username: req.body.username });

  if (user) {
    let isMatched = await bcrypt.compare(req.body.password, user.password);
    if (isMatched) {
      createToken(user);
      res.status(200).send({ message: 'Login success', user: user, auth_token: user.auth_tokens });
    }
  } else {
    res.status(422).send({ message: 'Username / password is invalid.' })
  }
}

exports.logout = async (req, res) => {
  try {
    let auth = await AuthToken.findOne({ body: req.headers.authorization });

    if (auth == null) throw "AuthToken not found.";
    await auth.remove();
    pry = require('pryjs')
    eval(pry.it)
    res.send({ message: 'Logout successfully.' });
  } catch (err) {
    res.status(422).send({ message: err });
  }
}

async function createToken(user) {
  let auth_token = new AuthToken({
    body: randomstring.generate(),
    user: user._id
  });
  await auth_token.save();

  user.auth_tokens.push(auth_token);
  await user.save();
}
