const Node = require('../../models/Node');
const MindMap = require('../../models/MindMap');

const getNodeData = async (req, res, next) => {
  try {
    const { nodeId } = req.params;

    res.locals.nodesNestedObject = await Node.findById(nodeId);

    next();
  } catch (error) {
    error.message = `Error during getting nodes in function getNodeData of dataHandlingMiddleware.js : ${error.message}`;

    next(error);
  }
};

const putNodeData = async (req, res, next) => {
  try {
    const { nodeId } = req.params;
    const node = req.body;

    const updatedNode = await Node.findByIdAndUpdate(nodeId, node, {
      returnOriginal: false,
      timestamps: {
        createdAt: true,
        updatedAt: false,
      },
    });
    res.locals.updatedNode = updatedNode;

    next();
  } catch (error) {
    error.message = `Error during putting node in function putNodeData of dataHandlingMiddleware.js${error.message}`;

    next(error);
  }
};

const postNodeData = async (req, res, next) => {
  try {
    const { nodeId, mindMapId } = req.params;
    const parentNode = await Node.findById(nodeId);
    const childNode = await Node.create(req.body);
    const { _id: childId } = childNode;
    const { _id: parentId } = parentNode;

    childNode.mindMap = mindMapId;
    childNode.parent = parentId;
    parentNode.children.push(childId);

    await childNode.save();
    await parentNode.save();

    res.locals.childNode = childNode;
    next();
  } catch (error) {
    error.message = `Error during creating node in function postNodeData of dataHandlingMiddleware.js${error.message}`;

    next(error);
  }
};

const deleteMindMapData = async (req, res, next) => {
  try {
    const { mindMapId } = req.params;

    await Node.deleteMany({ mindMap: mindMapId });
    await MindMap.deleteOne({ _id: mindMapId });

    res.status(204);
    return;
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const makePlainObject = (req, res, next) => {
  try {
    const nestedObjectQueue = [res.locals.nodesNestedObject];
    const plainObject = {};
    let nodeCount = req.query.max || 30;

    while (nestedObjectQueue.length > 0 && nodeCount > 0) {
      const tempObject = nestedObjectQueue.shift();

      if (tempObject.children) nestedObjectQueue.push(...tempObject.children);

      tempObject.children = tempObject.children.map(child => child.id);

      plainObject[tempObject.id] = tempObject;

      nodeCount -= 1;
    }

    res.locals.nodesPlainObject = plainObject;

    next();
  } catch (error) {
    error.message = `Error during making plain object in function makePlainObject of dataHandlingMiddleware.js : ${error.message}`;

    next(error);
  }
};

const getMindMapData = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const max = req.query.max || 15;
    const access =
      req.query.access === 'mixed'
        ? ['public', 'private']
        : req.query.access || 'public';

    res.locals.mindMapsList = await MindMap.find({
      author: userId,
      access,
    })
      .sort({ date: -1 })
      .limit(max);

    next();
  } catch (error) {
    error.message = `Error during getting mindMaps in function getMindMapData of dataHandlingMiddleware.js : ${error.message}`;

    next(error);
  }
};

module.exports = {
  getNodeData,
  putNodeData,
  postNodeData,
  makePlainObject,
  getMindMapData,
  deleteMindMapData,
};
