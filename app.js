var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());
var Genre = require('./models/genre');
var Book = require('./models/book');

mongoose.connect('mongodb://localhost/bookstore');

var db = mongoose.connection;
//some master comment here from master
//some comment here from branch-1
app.get('/', function (req, res) {
	res.send('Please make use of /api/student');
});



app.get('/api/student', function (req, res) {
	res.send('Hello World!');
});


app.get('/api/genres', function (req, res) {
	Genre.getGenres(function (err, genres) {
		if (err) {
			throw err;
		}
		res.json(genres);
	})
});
app.post('/api/genres', function (req, res) {
	var genre = req.body;
	Genre.addGenre(genre, function (err, genre) {
		if (err) {
			throw err;
		}
		res.json(genre);
	})
});

app.put('/api/genres/:_id', function (req, res) {
	var id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(id, genre, {}, function (err, genre) {
		if (err) {
			throw err;
		}
		res.json(genre);
	})
});
app.delete('/api/genres/:_id', function (req, res) {
	var id = req.params._id;
	Genre.removeGenre(id, function (err, genre) {
		if (err) {
			throw err;
		}
		res.json(genre);
	})
});
app.get('/api/books', function (req, res) {
	Book.getBooks(function (err, books) {
		if (err) {
			throw err;
		}
		res.json(books);
	})
});

app.get('/api/books/:_id', function (req, res) {
	Book.getBookById(req.params._id, function (err, book) {
		if (err) {
			throw err;
		}
		res.json(book);
	})
});


// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.post('/api/student', function (req, res) {
	var body = req.body;
	console.log(body);
	res.send('Request body is:' + JSON.stringify(body.name));
});

app.put('/api/student/:id', function (req, res) {
	var id = req.params.id;
	var body = req.body;
	res.send('Request id is:' + JSON.stringify(id) + " and body is:" + JSON.stringify(body));

});

app.delete('/api/student/:id', function (req, res) {
	var id = req.params.id;
	res.send('Request id is:' + JSON.stringify(id));
});

app.listen(3000);
console.log('Running on 300');