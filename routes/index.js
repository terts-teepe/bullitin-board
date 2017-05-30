var express = require('express')
var router = express.Router()
const db = require('../models/database.js')

router.get('/', (request, response) => {
	db.getAllPosts((allPosts) => {
		response.render('index', {
			posts: allPosts
		});
	});
});



router.get('/message', (request, response) => {
	response.render('message');
});



router.post('/postingmessage', (req, res) => {
	const anotherPost = {
		title: req.body.title,
		author: req.body.author,
		body: req.body.body
	};
	console.log(db.newPost);
	db.newPost(anotherPost);
	res.redirect('/');
});

module.exports = router;