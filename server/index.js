const socketServer = require('./dashboardSocket');
const obsConnection = require('./obsConnection');
const dashboardSpaServer = require('./dashboardSpaServer');

socketServer.init();
obsConnection.init();
dashboardSpaServer.init();

setInterval(() => {
    socketServer.broadcast(
        obsConnection.state
    );
}, 500);
