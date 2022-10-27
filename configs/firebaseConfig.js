const admin = require('firebase-admin');

// const serviceAccount = require('./serviceAccountKey.json');
// eslint-disable-next-line no-useless-escape
const serviceAccount = process.env.FIREBASE_SERVICE_KEY;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
