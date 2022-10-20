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
    });
    res.locals.updatedNode = updatedNode;

    next();
  } catch (error) {
    error.message = `Error during putting node in function putNodeData of dataHandlingMiddleware.js : ${error.message}`;

    next(error);
  }
};

const postNodeData = async (req, res, next) => {
  try {
    const { nodeId, mindMapId } = req.params;

    const childNode = await Node.create(req.body);
    childNode.mindMap = mindMapId;
    childNode.parent = nodeId;

    await childNode.save();

    const parentNode = await Node.findByIdAndUpdate(
      nodeId,
      {
        $push: { children: childNode.id },
      },
      { returnOriginal: false },
    );

    res.locals.childNode = childNode;
    res.locals.parentNode = parentNode;

    next();
  } catch (error) {
    error.message = `Error during creating node in function postNodeData of dataHandlingMiddleware.js : ${error.message}`;

    next(error);
  }
};

const postHeadNodeData = async (req, res, next) => {
  try {
    const newMindMap = res.locals.mindMap;

    const newNodeData = {};
    newNodeData.attribute = {
      cordX: 500,
      cordY: 300,
      size: 'MEDIUM',
      shape: 'RoundedRect',
      color: 'YELLOW',
      isFold: false,
    };
    newNodeData.mindMap = newMindMap.id;

    const newNode = await Node.create(newNodeData);

    newMindMap.headNode = newNode.id;

    const mindMap = await MindMap.findByIdAndUpdate(newMindMap.id, newMindMap, {
      returnOriginal: false,
    });

    res.locals.node = newNode;
    res.locals.mindMap = mindMap;

    next();
  } catch (error) {
    error.message = `Error during creating head node in postHeadNodeData of dataHandlingMiddleware.js : ${error.message}`;

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
    const { mindMapId } = req.params;

    res.locals.mindMap = await MindMap.findById(mindMapId);

    next();
  } catch (error) {
    error.message = `Error during getting mindmap in function getMindMapData of dataHandlingMiddleware.js : ${error.message}`;

    next(error);
  }
};

const postMindMapData = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const newMindMapData = {
      author: userId,
      access: 'private',
    };
    const newMindMap = await MindMap.create(newMindMapData);

    res.locals.mindMap = newMindMap;

    next();
  } catch (error) {
    error.message = `Error during posting mindmap in function postMindMapData of dataHandlingMiddleware.js : ${error.message}`;

    next(error);
  }
};

const putMindMapData = async (req, res, next) => {
  try {
    const { mindMapId } = req.params;
    const mindMap = req.body;

    const updatedMindMap = await MindMap.findByIdAndUpdate(mindMapId, mindMap, {
      returnOriginal: false,
    });
    res.locals.mindMap = updatedMindMap;

    next();
  } catch (error) {
    error.message = `Error during putting mindmap in function putMindMapData of dataHandlingMiddleware.js : ${error.message}`;

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

module.exports = {
  getNodeData,
  putNodeData,
  postNodeData,
  postHeadNodeData,
  makePlainObject,
  getMindMapData,
  postMindMapData,
  putMindMapData,
  deleteMindMapData,
};
