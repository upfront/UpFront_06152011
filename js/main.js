//Setting Up the stage and assigning the three touch events

$(function(){
	
	/*** ------------------------------------------------------------ ***/
	
	var BROWSER	= {
		w			: $(window).width(),
		h			: $(window).height(),
		touch		: $('body')[0]
	};
	
	/*** ------------------------------------------------------------ ***/
	
	var BALL = {
		dom		: $('#ball'),
		touch 	: $('#ball')[0],
		w			: $('#ball').css('width', BROWSER.w/6),
		h			: $('#ball').css('height', BROWSER.w/6),
		x			: $('#ball').css('left', (BROWSER.w/2 - 80)),
		y			: $('#ball').css('top', BROWSER.h - 200)
	};
	
	BALL.touch.addEventListener('touchstart', touch_start, false);
	BALL.touch.addEventListener('touchmove', touch_move, false);
	BALL.touch.addEventListener('touchend', touch_end, false);

	/*** ------------------------------------------------------------ ***/

	function touch_start(){
		console.log('touch started');
	}
	
	function touch_move(){
		console.log('touch moving');
	}
	
	function touch_end(){
		console.log('touch ends');
	}
	
});