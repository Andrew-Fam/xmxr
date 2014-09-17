$(document).ready(function(){
	$('.q-card').click(function(){
		var icon = $(this);

		if(icon.hasClass('loading')) {
			icon.removeClass('loading');
		} else {
			icon.addClass('loading');
		}
		$('.q-card').addClass('dismissed');
		$(this).removeClass('dismissed');




		setTimeout(function(){
			icon.addClass('decompressed');
		},750, function(){
			icon.removeClass('loading');
		});
	});
});