const express = require('express');

/* Express.js template engine plugin for Handlebars */
const hbs = require('hbs');

const fs = require('fs')

const PORT = 3000;

var app = express();

/* hbs - set template engine */
app.set('view engine', 'hbs');

/* hbs - partials */
hbs.registerPartials(__dirname + '/views/partials')

/* hbs - helpers */
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});
hbs.registerHelper('toTitleCase', (text) => {
	return text.toUpperCase();
});


/* static files - middleware */
// app.use(express.static(__dirname + '/public'));

/* middleware */
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});

/*app.use((req, res, next) => {
	res.render('maintenance.hbs');
});*/

/* route */
app.get('/', (req, res) => {
	// res.send('<h1>Node Web Server!</h1>');
	var pageName = {
		name: 'Welcome, Maulana Yusup Abdullah'
	}
	res.render('index.hbs', pageName)
});

app.get('/home', (req, res) => {
	// res.send('<h1>Node Web Server!</h1>');
	var pageName = {
		name: 'Welcome, Maulana Yusup Abdullah'
	}
	res.render('home.hbs', pageName)
});

app.get('/about', (req, res) => {
	var biodata = {
		name: 'Maulana Yusup Abdullah',
		likes: [
			'Adventure',
			'Breathing'
		]
	}
	res.render('about.hbs', biodata)
});

app.listen(PORT, () => {
	console.log('Server is up on port ' + PORT)
});

