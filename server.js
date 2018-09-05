const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

/*=================日志中间件=============================*/
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});
/*====================维护页面中间件===========================*/
/*
app.use((req, res, next) => {
    res.render('maintenance.hbs');
});
*/
/*====================静态页面中间件===========================*/
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: '主页',
        welcomeMessage: 'welcome to my website'
    })
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: '关于我们'
    });
});

/*==========================================*/
app.listen(port, () => {
    console.log('Server is up on port 3000');
});
