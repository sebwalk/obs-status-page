const Channel = require('../../bus/channel');
const ObsSocket = require('obs-websocket-js');

class ObsChannel extends Channel {
    get name(){
        return "OBS";
    }

    init(){
        this._connect();
    }

    tick(){
        if( ! this.state.obs.connected){
            this._connect();
        }
    }

    _connect(){
        this._socket = new ObsSocket();

        this._socket.connect({
            address: this.config.obs.host+':'+this.config.obs.port,
            password: this.config.obs.password
        }).catch((e) => {
            this.state.obs.connected = false;
        });

        this._socket.on('ConnectionClosed', data => {
            this.state.obs.connected = false;
        });

        this._socket.on('AuthenticationSuccess', data => {
            this.log("Connected");
            this.state.obs.connected = true;

            this._socket.send('SetHeartbeat', { enable: true }).catch(()=>{
                this.state.obs.connected = false;
            });
        });

        this._socket.on('Heartbeat', data => {
            this.state.obs.stream.active = data['streaming'];
            this.state.obs.stream.time = data['total-stream-time'] || 0;
            this.state.obs.record.active = data['recording'];
            this.state.obs.record.time = data['total-record-time'] || 0;
        });
    }
}

module.exports = ObsChannel;
