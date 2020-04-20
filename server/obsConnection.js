const ObsSocket = require('obs-websocket-js');
const config = require('../config');

const obsConnection = {
    socket: null,

    state: {
        status: 'disconnected',
        stream: {
            active: false,
            time: 0
        },
        record: {
            active: false,
            time: 0
        }
    },

    init(){
        this.connect();

        setInterval(() => {
            if(this.state.status === 'disconnected'){
                this.connect();
            }
        }, 1000);
    },

    connect(){
        this.socket = new ObsSocket();

        this.socket.connect({ address: config.obs.host+':'+config.obs.port, password: config.obs.password })
            .catch(() => {
                this.state.status = 'disconnected';
            });

        this.socket.on('ConnectionClosed', data => {
            this.state.status = 'disconnected';
        });

        this.socket.on('AuthenticationSuccess', data => {
            this.state.status = 'subscribing';
            this.subscribeToHeartbeat();
        });

        this.socket.on('Heartbeat', data => {
            this.onHeartbeat(data);
        });
    },

    subscribeToHeartbeat(){
        this.socket.send('SetHeartbeat', { enable: true })
            .then(()=>{
                this.state.status = 'subscribed';
            })
            .catch(()=>{
                this.state.status = 'disconnected';
            });
    },

    onHeartbeat(data){
        this.state = {
            ...this.state,
            stream: {
                active: data['streaming'],
                time: data['total-stream-time'] || 0,
            },
            record: {
                active: data['recording'],
                time: data['total-record-time'] || 0,
            }
        };
    }
};

module.exports = obsConnection;
