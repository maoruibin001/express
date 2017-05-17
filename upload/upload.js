/**
 * Created by lenovo on 2017/5/17.
 */
var fs = require('fs');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();

app.use(express.static('../public/'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({dest: '../dest'}).any());


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './upload.html'));
});

app.post('/upload', function(req, res) {
    console.log(req.files[0]);

    var dest_file = path.join(__dirname, '../public/images/', req.files[0].originalname);
    console.log(dest_file);
    fs.readFile(req.files[0].path, function(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        fs.writeFile(dest_file, data, function(error) {
            if (error) {
                console.log(error);
                return;
            }
            res.send(JSON.stringify({filename: req.files[0].originalname, msg: 'success'}))
            console.log('文件保存成功');
        })
    })
});


var server = app.listen(8807, function() {
    var port = server.address().port;
    console.log('server start at: http://localhost:' + port);
})