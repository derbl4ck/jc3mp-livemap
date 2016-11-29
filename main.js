/**
 * @overview livemap
 * @author Lukas 'derbl4ck' Berwanger
 * @copyright (c) derbl4ck
 * @license See LICENSE file
 */

'use strict';

console.log('[livemap] System started');

const express = require('express');
const app = express();
const config = require('./config');

const server = app.listen(config.webPort, () => {
    const host = server.address().address
    const port = server.address().port

  console.log("[livemap] listening at http://%s:%s", host, port);
});

const io = require('socket.io').listen(server);

app.use(express.static( __dirname + "/map/"));

app.get('/', (req, res) => {
    res.sendFile( __dirname + "/map/" + "index.html" );
});

const interval = setInterval(() => {
    const curpl = [];
    
    for (let i = 0; i < jcmp.players.length; i++) {
        /**
         * Note
         * 
         * X value is working perfectly
         * Y value only works with max Zoom level (6)
         */
        curpl.push({name: jcmp.players[i].name, x: Math.floor(jcmp.players[i].position.x)/120, y: (-(Math.floor(jcmp.players[i].position.z)/80))});
    }

    io.emit('updateMap', curpl);
}, 1000);

io.on('connection', function (socket) {
    console.log(`[livemap] New viewer connected! (Socket ID: ${socket.id})`);
});
