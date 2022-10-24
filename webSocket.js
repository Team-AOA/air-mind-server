const { Server } = require('socket.io');

const webSocket = server => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  io.on('connection', socket => {
    console.log('socket connected');

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
      console.log(updatedContent);
      io.to(mindMapId).emit('receiveContent', nodeId, updatedContent);
    });

    socket.on(
      'nodePositionChange',
      (mindMapId, nodeId, updatedPositionX, updatedPositionY) => {
        console.log('updatedPositionX', updatedPositionX);
        io.to(mindMapId).emit(
          'receivePosition',
          nodeId,
          updatedPositionX,
          updatedPositionY,
        );
      },
    );

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
