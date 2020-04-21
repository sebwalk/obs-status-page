const webserver = require('./webserver');
webserver.start();

const Bus = require('channel-bus').Bus;

const bus = new Bus();

bus
    .withChannels([
        new (require('./channels/obs')),
        new (require('./channels/api'))
    ])

    .withConfig(require('./config'))

    .enableTick(1000)

    .initWith(require('./initialState'));
