const admin = require('../../configs/firebaseConfig');

const authWithoutError = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const decodeValue = await admin.auth().verifyIdToken(token);

    if (decodeValue) {
      req.user = decodeValue;
      return next();
    }

    throw new Error('Authentication Error');
  } catch (error) {
    req.user = null;
    return next();
  }
};

module.exports = authWithoutError;
