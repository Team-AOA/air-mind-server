function endOfGetNodeReq(req, res, next) {
  if (res.locals.nodesPlainObject) {
    const responseBody = {};

    responseBody.result = 'ok';
    responseBody.node = res.locals.nodesPlainObject;
    responseBody.count = Object.keys(responseBody.node).length;

    res.status(200).json(responseBody);
    return;
  }

  const error = new Error(
    'Error : no plain object transferred in nodeController.js',
  );
  error.status = 500;
  next(error);
}

module.exports = {
  endOfGetNodeReq,
};
