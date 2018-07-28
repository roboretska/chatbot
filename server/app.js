const express = require('express');
const app = express();
const http = require('http').Server(app);
const Facade = require('./Facade');
const io = require('socket.io')(http);

const messages = [];
const usernames = [];
const MAX_AMOUNT = 100;


app.use(express.static("../client/view"));

io.on('connection', (socket) => {
    let user = {};
    console.log('Connection is opened');
    socket.on('new user', (nicknames) => {
        user = nicknames;
        usernames.push(nicknames);
        usernames.forEach(item => {
            if (item.nickname === nicknames.nickname) {
                item.connectionStatus = 'just connected';
                setTimeout(function () {
                    item.connectionStatus = 'connected';
                    io.emit('new users', usernames);
                }, 60000);
            }
        });
        io.emit('new users', usernames);

        // io.emit('user connected', 'just added')
    });
    socket.emit('users list', usernames);


    socket.on('chat message', (message) => {

        if (messages.length >= MAX_AMOUNT) {
            messages.shift();
        }
        messages.push(message);
        io.emit('chat message', message);
        console.log("Working correctly");


        var handler = {
            get: function (target, name) {
                const test = new Facade(target);
                    test.getMessage();
            }
        };

        const aaa = new Proxy(message, handler);
        console.log(aaa.text);

    });
        socket.emit('chat history', messages);

        socket.on('user typing', user => {
            io.emit('is typing', `@${user} is typing...`)
        });

        socket.on('disconnect', () => {
            usernames.forEach(item => {
                if (item.nickname === user.nickname) {
                    item.connectionStatus = 'just disconnected';
                    setTimeout(function () {
                        item.connectionStatus = 'disconnected';
                        io.emit('new users', usernames);
                    }, 60000);
                }
            });
            io.emit('new users', usernames);

            console.log("Disconected");
        });
    });
    http.listen(8080, () => {
        console.log('Server is working now on port 8080');
    });

