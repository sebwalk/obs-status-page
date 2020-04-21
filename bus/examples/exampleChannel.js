const Channel = require('../channel');

class SampleChannel extends Channel {
    /*
    Assign a user-friendly, descriptive name for this channel.
    */
    get name(){
        return "Sample Channel";
    }

    /*
    Register event listeners, open connections, setup libraries, etc.
    Called once on launch.
     */
    init(){
        //
    }

    /*
    Poll data sources, etc
    Called regularly at the configured interval (if tick is enabled)
     */
    tick(){
        //
    }

    /*
    Push changed state to external services, calculate results, etc.
    Called every time the state object is changed (deeply watched)
     */
    stateChange(){
        //
    }
}

module.exports = SampleChannel;
