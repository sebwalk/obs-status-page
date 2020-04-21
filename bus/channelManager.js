const onChange = require('on-change');

class ChannelManager {
    constructor(){
        this._channels = [];
        this.state = {};
        this.config = {};
        this.tickInterval = 0;
    }

    withChannels(channels){
        this._channels.push(...channels);
        return this;
    }

    withConfig(config = {}){
        this.config = config;
        return this;
    }

    enableTick(interval = 1000){
        this.tickInterval = interval;
        return this;
    }

    disableTick(){
        this.tickInterval = 0;
        return this;
    }

    initWith(state = {}){
        this.state = state;
        this.init();
    }

    init(){
        this._channels.forEach(channel => {
            channel.state = this.state;
            channel.init();
        })
    }

    tick(){
        this._channels.forEach(channel => {
            channel.tick();
        })
    }

    get state(){
        return this._state;
    }

    set state(state){
        this._state = onChange(state, () => {
            this._channels.forEach(channel => {
                channel.stateChange();
            })
        })
    }

    get config(){
        return this._config;
    }

    set config(config){
        this._config = config;

        this._channels.forEach(channel => {
            channel.config = this._config;
        })
    }

    get tickInterval(){
        return this._tickInterval;
    }

    set tickInterval(interval){
        if(this._interval){
            clearInterval(this._interval);
        }

        this._tickInterval = interval;

        if(this._tickInterval > 0){
            this._interval = setInterval(() => this.tick(), this._tickInterval);
        }
    }
}

module.exports = ChannelManager;
