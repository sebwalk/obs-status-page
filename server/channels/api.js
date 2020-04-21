const Channel = require('../../bus/channel');
const WebSocket = require('ws');

class ApiChannel extends Channel {
    get name(){
        return "Websocket API";
    }

    init(){
        this._wss = new WebSocket.Server({
            port: this.config.api.port
        });

        this._wss.on('connection', (ws, req) => {
            this.log('Client at '+req.connection.remoteAddress+' connected');

            this.stateChange();

            ws.on('close', () => {
                this.log('Client disconnected');
            });
        });
    }

    stateChange(){
        this.log("Broadcast state change");
        this._wss.clients.forEach(client => {
            client.send(JSON.stringify(this.state));
        });
    }
}

module.exports = ApiChannel;
