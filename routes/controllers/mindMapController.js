const MindMap = require('../../models/MindMap');

const endOfGetMindMapsReq = async (req, res, next) => {
  if (res.locals.mindMapsList) {
    const responseBody = {};

    responseBody.result = 'ok';
    responseBody.mindMap = res.locals.mindMapsList;
    responseBody.count = res.locals.mindMapsList.length;

    res.status(200).json(responseBody);
    return;
  }

  const error = new Error(
    'Error : no list transferred in mindMapController.js',
  );
  error.status = 500;
  next(error);
};

const getPublicMindMaps = async (req, res, next) => {
  try {
    const max = req.query.max || 15;
    const publicMindMaps = await MindMap.find({ access: 'public' }).limit(max);
    const mindMapCount = publicMindMaps.length;
    const responseBody = {};

    responseBody.result = 'ok';
    responseBody.mindMap = publicMindMaps;
    responseBody.count = mindMapCount;

    res.status(200).json(responseBody);
    return;
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const endOfMindMapReq = (req, res, next) => {
  try {
    const responseBody = {
      result: 'ok',
      mindMap: res.locals.mindMapData,
    };

    res.status(200).json(responseBody);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  endOfGetMindMapsReq,
  getPublicMindMaps,
  endOfMindMapReq,
};
