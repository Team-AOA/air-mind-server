const auth = (req, res, next) => {
  next();
};

const auth2 = (req, res, next) => {
  next();
};

module.exports = {
  auth,
  auth2,
};
