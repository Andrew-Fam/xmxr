$(document).ready(function(){
	$('.q-card').click(function(){
		var icon = $(this);
		console.log('q-card clicked');
		if(icon.hasClass('loading')) {
			icon.removeClass('loading');
		} else {
			icon.addClass('loading');
		}
	});
});