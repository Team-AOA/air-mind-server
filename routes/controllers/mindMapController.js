const MindMap = require('../../models/MindMap');

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

const getPublicMindMaps = async (req, res, next) => {
  try {
    const { max } = req.query;
    const publicMindMaps = await MindMap.find({ access: 'public' }).limit(max);
    const responseBody = {};

    responseBody.data = publicMindMaps;

    res.status(200).json(responseBody);
    return;
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  endOfGetMindMapReq,
  getPublicMindMaps,
};
