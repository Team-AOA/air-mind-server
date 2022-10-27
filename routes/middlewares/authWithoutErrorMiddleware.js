const admin = require('../../configs/firebaseConfig');

const authWithoutError = async (req, res, next) => {
  try {
    if (req.headers && typeof req.headers.authorization === 'string') {
      const token = req.headers.authorization.split(' ')[1];

      const decodeValue = await admin.auth().verifyIdToken(token);
      if (!decodeValue) {
        throw new Error('Verification failed!!');
      }

      req.user = decodeValue;
    }

    next();
  } catch (error) {
    error.message = `Error in authWithoutError in authWithoutErrorMiddleware.js : ${error.message}`;

    next(error);
  }
};

module.exports = authWithoutError;
