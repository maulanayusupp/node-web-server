const express = require('express');

const PORT = 3000;

var app = express();

/* middleware */
app.use(express.static(__dirname + '/public'));

/* route */
app.get('/', (req, res) => {
	res.send('<h1>Node Web Server!</h1>');
});

app.get('/about', (req, res) => {
	res.send({
		name: 'Maulana Yusup Abdullah',
		likes: [
			'Adventure',
			'Breathing'
		]
	});
});

app.listen(PORT, () => {
	console.log('Server is up on port ' + PORT)
});

