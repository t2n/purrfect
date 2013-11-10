/* globals exports */

/*
 * GET home page.
 */

exports.index = function(req, res) {
	res.render('index', {
		title: 'Purrfect'
	});
};

exports.score = function(req, res) {
	res.render('scores', {
		title: 'Scores'
	});
};