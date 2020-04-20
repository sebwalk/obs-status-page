const WebSocket = require('ws');
const config = require('../config');

const dashboardSocket = {
    wss: null,

    init(){
        this.wss = new WebSocket.Server({
            port: config.socket.port
        });

        this.wss.on('connection', ws => {
            console.log('Dashboard connected');

            ws.on('close', () => {
                console.log('Dashboard disconnected');
            });
        });
    },

    broadcast(data){
        this.wss.clients.forEach(client => {
            client.send(JSON.stringify(data));
        });
    }
};

module.exports = dashboardSocket;
