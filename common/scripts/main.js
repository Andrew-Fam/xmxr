$(document).ready(function(){
	$('body').on('click','.q-card.compressed',function(){
		var icon = $(this);

		if(icon.hasClass('loading')) {
			icon.removeClass('loading');
		} else {
			icon.addClass('loading');
		}
		$('.q-card').addClass('dismissed');
		$(this).removeClass('dismissed');




		setTimeout(function(){
			icon.removeClass('compressed').addClass('decompressed');
		},750, function(){
			icon.removeClass('loading');
		});
	});

	$('body').on('click','.q-card .cancel', function(){
		$('.q-card').removeClass('loading decompressed dismissed').addClass('compressed');
	});
});