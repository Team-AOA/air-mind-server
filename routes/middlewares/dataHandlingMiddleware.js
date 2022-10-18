const Node = require('../../models/Node');

async function getNodeData(req, res, next) {
  try {
    const { nodeId } = req.params;

    res.locals.nodesNestedObject = await Node.findById(nodeId);

    next();
  } catch (err) {
    err.message = `Error during getting nodes in dataHandlingMiddleware.js : ${err.message}`;

    next(err);
  }
}

function makePlainObject(req, res, next) {
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
  } catch (err) {
    err.message = `Error during making plain object in dataHandlingMiddleware.js : ${err.message}`;

    next(err);
  }
}

module.exports = {
  getNodeData,
  makePlainObject,
};
