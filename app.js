const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const pug = require('pug');
const path = require('path');

app.set('views', 'views');
app.set('view engine', 'pug');

app.use('/', bodyParser()); //activates middleware of body-parser -- request.body is nu beschikbaar onder elke app.post
app.use('/', express.static('public')) //To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.

app.use(bodyParser.json());
bodyParser.urlencoded({extended: true})
app.use(require('./routes'));

app.use('/public', express.static(__dirname + '/public'));


const listener = app.listen(3000, () => {
	console.log('server had started at ', listener.address().port)
});