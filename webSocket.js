const { Server } = require('socket.io');

const webSocket = server => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  io.on('connection', socket => {
    socket.on('userSand', jsonData => {
      const data = JSON.parse(jsonData);
      const { mindMapId } = data;

      io.to(mindMapId).emit('broadcast', jsonData);
    });

    socket.on('colorChange', (mindMapId, nodeId, color) => {
      io.to(mindMapId).emit('receiveColor', nodeId, color);
    });

    socket.on('titleChange', (mindMapId, nodeId, title) => {
      io.to(mindMapId).emit('receiveTitle', nodeId, title);
    });

    socket.on('contentChange', (mindMapId, nodeId, updatedContent) => {
      io.to(mindMapId).emit('receiveContent', nodeId, updatedContent);
    });

    socket.on('addNode', (id, headId, userId, mindMapId, nodeId) => {
      socket.broadcast
        .to(mindMapId)
        .emit('receiveAddNode', id, headId, userId, mindMapId, nodeId);
    });

    socket.on('deleteNode', (nodeId, nodeData, userId, mindMapId) => {
      socket.broadcast
        .to(mindMapId)
        .emit('receiveDeleteNode', nodeId, nodeData, userId, mindMapId);
    });

    socket.on(
      'nodePositionChange',
      (mindMapId, nodeId, updatedPositionX, updatedPositionY) => {
        io.to(mindMapId).emit(
          'receivePosition',
          nodeId,
          updatedPositionX,
          updatedPositionY,
        );
      },
    );

    // 폴드기능 작업중
    socket.on('fold', (temp, userId, isFold, mindMapId, nodeId, setFold) => {
      socket.broadcast
        .to(mindMapId)
        .emit('receiveFold', temp, userId, isFold, mindMapId, nodeId, setFold);
    });

    socket.on('mindMapTitleChange', (mindMapId, mindMapData, value) => {
      io.to(mindMapId).emit('receiveMindMapTitleChange', mindMapData, value);
    });

    socket.on('joinMindMap', mindMapId => {
      socket.join(mindMapId);
    });

    socket.on('leaveMindMap', mindMapId => {
      socket.leave(mindMapId);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};

module.exports = webSocket;
