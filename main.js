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

app.use(express.static('map'));

app.get('/', (req, res) => {
    res.sendFile( __dirname + "/map/" + "index.html" );
});

const interval = setInterval(() => {
    const curpl = [];
    
    for (let i = 0; i < jcmp.players.length; i++) {
        // NOTE maybe the position size has to be adjusted
        curpl.push({name: jcmp.players[i].name, x: Math.floor(jcmp.players[i].position.x), y: Math.floor(jcmp.players[i].position.y)});
    }

    io.emit('updateMap', curpl);
}, 1000);