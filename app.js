const hbs = require('hbs');
const express = require('express');
const app = express();
const port = 80;
const server = app.listen(port);
const sockets = require('socket.io');
const io = sockets(server);
const fs = require('fs');
const ytdl = require('ytdl-core');
const youtubedl = require('youtube-dl-exec');
const path = require('path');

hbs.registerPartials(__dirname + '/views/templates', function (err) { });
app.set('view engine', 'hbs');
app.set('views'.__dirname + "/views");

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {

    res.render('index', {

        title: 'Inicio'
    });

    io.sockets.on('connect', function (socket) {

        socket.on('url', function (data) {

            const dir = path.join(require('os').homedir(), 'Desktop', 'Descargas de Youtube MP3');

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }

            youtubedl(data, { dumpSingleJson: true }).then(output => {
                let file = path.join(dir, output['title'] + ".mp3");

                ytdl(data, { filter: 'audioonly' })

                    .pipe(fs.createWriteStream(file).on('finish', function () {

                        socket.emit('file');
                    }));
            });

        });
    });
});

app.use((req, res) => {

    res.status(404).redirect("/");
});

