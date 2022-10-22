const User = require('../../models/User');

const login = async (req, res, next) => {
  try {
    const { name, email, picture } = req.user;

    const foundeduser = await User.findOne({ email }).lean();
    const responseBody = {};

    if (!foundeduser) {
      const newUser = await User.create({
        userName: name,
        email,
        profile: picture,
      });
      responseBody.result = 'ok';
      responseBody.user = newUser;
      return res.status(201).json(responseBody);
    }

    responseBody.result = 'ok';
    responseBody.user = foundeduser;

    return res.status(201).json(responseBody);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports = {
  login,
};
