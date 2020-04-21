const app = new Vue({
    el: '#app',
    data: {
        ws: null,
        state: null
    },
    computed: {
        mode(){
            if(this.state === null){
                return 'disconnected';
            }
            if( ! this.state.obs.connected){
                return 'disconnected';
            }
            if(this.state.obs.stream.active){
                return 'streaming';
            }
            if(this.state.obs.record.active){
                return 'recording';
            }
            return 'standby';
        },
        seconds(){
            if(this.state === null){
                return 0;
            }

            switch(this.mode){
                case 'streaming':
                    return this.state.obs.stream.time;
                case 'recording':
                    return this.state.obs.record.time;
                default:
                    return 0;
            }

        },
        timer(){
            let totalSeconds = this.seconds;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;

            minutes = String(minutes).padStart(2, "0");
            hours = String(hours).padStart(2, "0");
            seconds = String(seconds).padStart(2, "0");
            return hours + ":" + minutes + ":" + seconds;
        }
    },
    created(){
        this.ws = new WebSocket("ws://"+window.location.hostname+":3333");

        this.ws.onmessage = msg => {
            this.state = JSON.parse(msg.data);
        }
    }
})


