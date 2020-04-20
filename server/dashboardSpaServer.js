const express = require('express');
const path = require('path');
const app = express();
const config = require('../config');
const ip = require("ip");

const dashboardSpaServer = {
    init(){
        app.use(express.static(__dirname + '/../'));

        app.get('*', function (request, response) {
            response.sendFile(path.resolve(__dirname, '../dashboard/index.html'));
        });

        app.listen(config.dashboard.port);

        console.log("Visit the dashboard at http://"+ip.address()+":"+config.dashboard.port);
    }
};

module.exports = dashboardSpaServer;
