//Making use of the touch events to animate the ball

$(function(){
	
	/*** ------------------------------------------------------------ ***/
	
	var BROWSER	= {
		w 			: $(window).width(),
		h 			: $(window).height(),
		touch		: $('body')[0]
	};

	BROWSER.touch.addEventListener('touchstart', touch_stage, false);
	function touch_stage(){ event.preventDefault(); }
	
	/*** ------------------------------------------------------------ ***/
	
	var BALL = {
		dom		: $('#ball'),
		touch 	: $('#ball')[0],
		w			: $('#ball').css('width', BROWSER.w/6),
		h			: $('#ball').css('height', BROWSER.w/6),
		setup_x	: $('#ball').css('left', (BROWSER.w/2 - 80)),
		setup_y	: $('#ball').css('top', BROWSER.h - 200),
		x			: parseFloat($('#ball').css('left')),
		y			: parseFloat($('#ball').css('top'))
	};
	
	BALL.touch.addEventListener('touchstart', touch_start, false);
	BALL.touch.addEventListener('touchmove', touch_move, false);
	BALL.touch.addEventListener('touchend', touch_end, false);
	
	/*** ------------------------------------------------------------ ***/
	
	var TOUCH = {
		t_start	: 0,
		t_end		: 0,
		x_start	: 0,
		x_end		: 0,
		y_start	: 0,
		y_end		: 0
	};

	/*** ------------------------------------------------------------ ***/

	function touch_start(){
		TOUCH.x_start = event.targetTouches[0].pageX;
		TOUCH.y_start = event.targetTouches[0].pageY;
	}
	
	function touch_move(){
		TOUCH.x_end = event.targetTouches[0].pageX;
		TOUCH.y_end = event.targetTouches[0].pageY;
	}
	
	function touch_end(){
		var x_distance = TOUCH.x_end - TOUCH.x_start;
		var y_distance = TOUCH.y_end - TOUCH.y_start;
		
		BALL.x			+= x_distance;
		BALL.y			+= y_distance;
		
		BALL.dom.animate({
			top: BALL.y,
			left: BALL.x
		});
	}
	
});