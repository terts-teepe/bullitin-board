const pg = require('pg');
const connectionString = 'postgres://' + 'terts-teepe' + '@localhost/bullitin';



//client moet data aan messages tabel kunnen toevoegen.
exports.newPost = function(data) {

	pg.connect(connectionString, (err, client, done) => {
		if(err){
			done();
			pg.end();
			throw err;
		}
		//const query = client.query('INSERT INTO messages (title, author, body) VALUES (firstmessage, terts, Wow I am storing a message into my database!)')
		const query = client.query("INSERT INTO messages (title, body, author) VALUES($1, $2, $3)", [data.title, data.body, data.author]);

		query.on('error', (err) => {
			throw err;
		});
		query.on('end', () => {
			console.log('data ', data);
			done();
			console.log('done with posting');
			pg.end()
		});
	}); 
}

exports.getAllPosts = function(callback){
	const results = [];
	// connection to database
	pg.connect(connectionString, (err, client, done) => {
		if(err){
			done();
			pg.end();
			throw err;
		}

		const query = client.query('SELECT * FROM messages ORDER BY id DESC');

		query.on('row', (row) => {
			results.push(row);
		});
		query.on('error', (err) => {
			throw err;
		});
		query.on('end', () => {
			done();
			callback(results);
			pg.end()
		});
	});
}










//client moet alle data uit messages tabel kunnen ophalen.