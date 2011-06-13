//Understanding multi-touch


$(function(){
		
	/*** ------------------------------------------------------------ ***/

	var BROWSER	= {
		w 			: $(window).width(),
		h 			: $(window).height(),
		touch		: $('body')[0]
	};

	BROWSER.touch.addEventListener('touchstart', touch_stage, false);
	function touch_stage(){ 
		event.preventDefault();
		for(var i=0; i<event.touches.length; i++){
			console.log('Touch ' +  i + ' x: ' + event.touches[i].pageX);
			console.log('Touch ' +  i + ' y: ' + event.touches[i].pageY);
		}
	}
	
	/*** ------------------------------------------------------------ ***/
	
	var Sounds = {
		kick_1 : new Audio('sounds/kick_01.wav'),
		kick_2 : new Audio('sounds/kick_02.wav')
	}
	
	/*** ------------------------------------------------------------ ***/
	
	var BALL = {
		dom		: $('#ball'),
		touch 	: $('#ball')[0],
		setup_w	: $('#ball').css('width', BROWSER.w/6),
		setup_h	: $('#ball').css('height', BROWSER.w/6),
		setup_x	: $('#ball').css('left', (BROWSER.w/2 - 80)),
		setup_y	: $('#ball').css('top', BROWSER.h - 200),
		w			: $('#ball').width(),
		h			: $('#ball').height(),
		x			: parseFloat($('#ball').css('left')),
		y			: parseFloat($('#ball').css('top')),
		x_now		: 0,
		y_now		: 0,
		time		: 1000,
		friction	: 200,
		bounce	: 200
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
		
		TOUCH.t_start = new Date().getTime();
		TOUCH.x_start = event.targetTouches[0].pageX;
		TOUCH.y_start = event.targetTouches[0].pageY;
		
		BALL.dom.stop();
		clearInterval(hit_test);
		BALL.time = 1000;
	}
	
	function touch_move(){
		TOUCH.x_end = event.targetTouches[0].pageX;
		TOUCH.y_end = event.targetTouches[0].pageY;
	}
	
	function touch_end(){
		var random_snd = Math.round(Math.random()*1);
		if(random_snd == 1) Sounds.kick_1.play();
		else Sounds.kick_2.play();
		
		TOUCH.t_end 	= new Date().getTime();

		var time 		= TOUCH.t_end - TOUCH.t_start;
		var x_distance = TOUCH.x_end - TOUCH.x_start;
		var y_distance = TOUCH.y_end - TOUCH.y_start;
		
		BALL.x			+= x_distance/time * BALL.friction;
		BALL.y			+= y_distance/time * BALL.friction;

		animate_ball();
		
		hit_test = setInterval(function(){
			BALL.x_now 	= parseFloat(BALL.dom.css('left'));
			BALL.y_now	= parseFloat(BALL.dom.css('top'));
			
			var re_route = false;
			if(BALL.x_now > BROWSER.w - BALL.w){
				re_route = true;
				BALL.x = BROWSER.w - (BALL.x - BROWSER.w) - BALL.w - BALL.bounce;
			}
			
			if(BALL.x_now < 0) {
				re_route = true;
				BALL.x *= -1;
				BALL.x += BALL.bounce
			}
			
			if(BALL.y_now > BROWSER.h - BALL.h) {
				re_route = true;
				BALL.y = BROWSER.h - (BALL.y - BROWSER.h) - BALL.h - BALL.bounce;
			}
			
			if(BALL.y_now < 0) {
				re_route = true;
				BALL.y *= -1;
				BALL.y += BALL.bounce;
			}
			
			if(re_route == true) {
				BALL.dom.stop();
				animate_ball();
			}
			
			BALL.time -=13;
		}, 13);

	}
	
	function animate_ball(){
		BALL.dom.animate({
			top: BALL.y,
			left: BALL.x
		}, BALL.time, 'easeOutQuint', function(){
			BALL.time = 1000;
			clearInterval(hit_test);
		});
	}
	
});

var hit_test;