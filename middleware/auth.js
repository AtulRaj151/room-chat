const jwt = require('jsonwebtoken')
const { UserModel } = require('../model/User')

const SECRET_KEY = process.env.AUTH_SECRET_KEY;

const auth = {
  decode: async (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(400).json({ success: false, message: 'No access token provided' });
      }
      const accessToken = req.headers.authorization.split(' ')[1];
      try {
        const decoded = jwt.verify(accessToken, SECRET_KEY);
        req.userId = decoded.userId;
        req.userType = decoded.type;
        return next();
      } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
      }
  },
  encode: async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.getByUserName(username);
        if(!user || user.password !== password) {
           return res.status(401).json({ success: false, message: "invalid username"})
        }
        const payload = {
          userId: user._id,
          userType: user.type,
        };
        const authToken = jwt.sign(payload, SECRET_KEY);
        req.authToken = authToken;
        next();
      } catch (error) {
        return res.status(400).json({ success: false, message: error.error });
      }
    }
}

module.exports = auth