const User = require('../models/user');
const AuthToken = require('../models/auth_token');

exports.login = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });

    if (user) {
      if (await user.comparePassword(req.body.password)) {
        let authToken = user.generateToken();
        res.status(200).send({ message: 'Login success', user: user, auth: authToken });
      } else {
        res.status(401).send({ message: 'Login failed.' })
      }
    } else {
      res.status(422).send({ message: 'Username / password is invalid.' })
    }
  } catch (err) {
    console.error(err);
    res.status(422).send({ message: 'Authoziration failed'});
  }

}

exports.logout = async (req, res) => {
  try {
    let auth = await AuthToken.findOne({ body: req.headers.authorization });

    if (auth == null) throw "AuthToken not found.";
    await auth.remove();
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
