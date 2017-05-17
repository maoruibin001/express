/**
 * Created by lenovo on 2017/5/17.
 */
var express = require('express');


var app = express();

app.use(express.static('../public/', {redirect: true}));

app.listen(8908, function() {
    console.log('server start at: localhost:8908');
})