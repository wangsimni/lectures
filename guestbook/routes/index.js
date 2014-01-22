
module.exports = function(app) {
	app.get('/', function(req, res) {
		app.getConnection(function(err, conn) {
			conn.query('SELECT * FROM articles ORDER BY articleId DESC', function(err, rows) {
				res.render('index.jade', { result: rows });
				conn.release();
			});
		});
	});

	app.get('/write', function(req, res) {
		var data = { body: req.query.body, author: req.query.author };
		app.getConnection(function(err, conn) {
			conn.query('INSERT INTO articles SET ?', data, function(err, rows) {
				// res.redirect('/');
				res.end('complete');
				conn.release();
			});
		});
	});
};
