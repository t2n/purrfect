$(document).ready(function() {
	requestAnimationFrame(function() {
		$("<iframe src='http://nodeknockout.com/iframe/vanilla-eaters', class='voteko', frameborder=0, scrolling='no', allowtransparency=true, width=115, height=25></iframe>").hide().appendTo('body').delay(500).fadeIn();
	});
});