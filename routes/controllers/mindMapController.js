function endOfGetMindMapReq(req, res, next) {
  if (res.locals.mindMapsList) {
    const responseBody = {};

    responseBody.result = 'ok';
    responseBody.mindmaps = res.locals.mindMapsList;
    responseBody.count = res.locals.mindMapsList.length;

    res.status(200).json(responseBody);
    return;
  }

  const error = new Error(
    'Error : no list transferred in mindMapController.js',
  );
  error.status = 500;
  next(error);
}

module.exports = {
  endOfGetMindMapReq,
};
