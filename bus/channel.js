class Channel {
    get name(){
        return "Unnamed Channel";
    }

    init(){
        //
    }

    tick(){
        //
    }

    stateChange(){
        //
    }

    log(message){
        console.log('['+this.name+']', message);
    }

    set state(state){
        this._state = state;
    }

    get state(){
        return this._state || {};
    }

    set config(config){
        this._config = config;
    }

    get config(){
        return this._config;
    }
}

module.exports = Channel;
