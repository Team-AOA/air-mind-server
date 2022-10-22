const admin = require('../../configs/firebaseConfig');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const decodeValue = await admin.auth().verifyIdToken(token);

    if (decodeValue) {
      req.user = decodeValue;
      console.log(decodeValue);
      return next();
    }

    throw new Error('Authentication Error');
  } catch (error) {
    error.status = 401;
    error.message = 'Authentication Error';

    return next(error);
  }
};

module.exports = auth;
