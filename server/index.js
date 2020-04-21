const webserver = require('./webserver');
webserver.start();

const ChannelManager = require('../bus/channelManager');

const channelManager = new ChannelManager();

channelManager
    .withChannels([
        new (require('./channels/obs')),
        new (require('./channels/api'))
    ])

    .withConfig({
        obs: {
            host: 'localhost',
            port: 4444,
            password: '123456'
        },
        api: {
            port: 3333
        }
    })

    .enableTick(1000)

    .initWith({
        obs: {
            connected: false,
            stream: {
                active: false,
                time: 0
            },
            record: {
                active: false,
                time: 0
            }
        }
    });
