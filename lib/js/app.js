$(document).ready(function() {

	/*
	 *  Main Player
	 */
	var EmigaPlayer = $("#emigaplayer");

	/*
	 *  Create Instance
	 */
	$("#loading").hide();
	$("#emigaplayer_poster").show();
	$("#emigaplayer_lyrics").hide();

	/*
	 *  Main Player
	 */
	$(".emiga").show();

	/*
	 *  Wait loading and block disabled button
	 */
	$('#emigaplayer_progress').prop("disabled", false);
	$('#emigaplayer_increaseVolume').prop("disabled", false);
	$('#emigaplayer_restart').prop("disabled", false);
	$('#emigaplayer_play').prop("disabled", false);
	$('#emigaplayer_decreaseVolume').prop("disabled", false);
	$('#emigaplayer_end').prop("disabled", false);

	/*
	 *  Player Seconds Generator
	 */
	$("#emigaplayer_progress")[0].max = EmigaPlayer[0].duration;
	EmigaPlayer[0].currentTime = 0;

	/*
	 *  When ended go back to poster
	 */
	EmigaPlayer[0].addEventListener("ended", function() {
		$("#emigaplayer_poster").show();
		$("#emigaplayer_lyrics").hide();
		$("#emigaplayer_play")[0].click();
		EmigaPlayer[0].currentTime = 0;
	}, false);

	/*
	 *  Change Scrool music seconds
	 */
	EmigaPlayer[0].addEventListener("timeupdate", function() {
		$("#emigaplayer_progress").val(EmigaPlayer[0].currentTime);
	});

	/*
	 *  On Change Scrool music seconds
	 */
	$("#emigaplayer_progress").change(function(){
		EmigaPlayer[0].currentTime = $("#emigaplayer_progress").val();
	});


	/*
	 *  Play Button
	 */
	$("#emigaplayer_play").click(function() {

		/*
		 *  Pause Button
		 */
		  if($("#emigaplayer_play").hasClass("clicked")){
		  	$("#emigaplayer_play").html(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play-circle"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>`);
		  	$("#emigaplayer_play").removeClass("clicked");
		  	EmigaPlayer[0].pause();
		  }

		/*
		 *  Play Button
		 */
		  else {
		  	$("#emigaplayer_play").html(`<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`);
		  	$("#emigaplayer_play").addClass("clicked");
		  	EmigaPlayer[0].play();
		  }

	});	

	/*
	 *  Listen now button on poster
	 */
	$("#emigaplayer_listenNow").click(function() {

		/*
		 *  Pause Button
		 */
		if($("#emigaplayer_play").hasClass("clicked")){
		  	$("#emigaplayer_play").html(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play-circle"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>`);
		  	$("#emigaplayer_play").removeClass("clicked");
		}

		/*
		 *  Play Button
		 */
		else {
		  	$("#emigaplayer_play").html(`<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`);
		  	$("#emigaplayer_play").addClass("clicked");
		  	EmigaPlayer[0].play();
		}

		/*
		 *  Handle transition
		 */		
		$("#emigaplayer_poster").hide();
		$("#emigaplayer_lyrics").show();
	});


	/*
	 *  Close Player
	 */
	$("#emigaplayer_close").click(function() {

		/*
		 *  Pause Button
		 */
		if($("#emigaplayer_play").hasClass("clicked")){
		  	$("#emigaplayer_play").html(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play-circle"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>`);
		  	$("#emigaplayer_play").removeClass("clicked");
		  	EmigaPlayer[0].pause();
		}

		/*
		 *  Play Button
		 */		
		else {
		  	$("#emigaplayer_play").html(`<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`);
		  	$("#emigaplayer_play").addClass("clicked");
		}

		/*
		 *  Handle transition
		 */
		$("#emigaplayer_poster").show();
		$("#emigaplayer_lyrics").hide();

		/*
		 *  Create Alert
		 */
		new Noty({
	  		timeout:500,
	  		theme: 'bootstrap-v4',
			text: 'Player Closed',
	  	}).show();
	});


	/*
	 *  Increase Volume
	 */
	$("#emigaplayer_increaseVolume").click(function() {

		/*
		 *  Volume Limit
		 */
		if(EmigaPlayer[0].volume < 0.9) {
			/*
			 *  Block disabled button
			 */
		  	$('#emigaplayer_increaseVolume').prop("disabled", false);

		  	EmigaPlayer[0].volume += 0.1;
			/*
			 *  Create Alert
			 */
		  	new Noty({
		  		timeout:500,
		  		theme: 'bootstrap-v4',
			    text: 'Volume level: '+parseFloat(EmigaPlayer[0].volume).toFixed(1),
			}).show();
		}

		/*
		 *  Block Button
		 */
	  	else {
	  		$('#emigaplayer_increaseVolume').prop("disabled", true);
	  	}

		/*
		 *  Volume Limit
		 */
	  	if(EmigaPlayer[0].volume > 0.1) {
	  		
	  		$('#emigaplayer_decreaseVolume').prop("disabled", false);
	 	}

		/*
		 *  Block Button
		 */
	  	else {

	  		$('#emigaplayer_decreaseVolume').prop("disabled", true);
	  	}
	});	

	/*
	 *  Decrease Volume
	 */
	$("#emigaplayer_decreaseVolume").click(function() {

		/*
		 *  Volume Limit
		 */
	  	if(EmigaPlayer[0].volume > 0.1) {
			/*
			 *  Block Button
			 */	  		
	  		$('#emigaplayer_decreaseVolume').prop("disabled", false);
	  		
	  		EmigaPlayer[0].volume -= 0.1;

			/*
			 *  Create Alert
			 */
		  	new Noty({
		  		timeout:500,
		  		theme: 'bootstrap-v4',
			    text: 'Volume level: '+parseFloat(EmigaPlayer[0].volume).toFixed(1),
			}).show();
	  	}

		/*
		 *  Block Button
		 */
	  	else {
	  		$('#emigaplayer_decreaseVolume').prop("disabled", true);
	  	}

		/*
		 *  Volume Limit
		 */
	  	if(EmigaPlayer[0].volume < 0.9) {
	  		$('#emigaplayer_increaseVolume').prop("disabled", false);
	  	}

		/*
		 *  Block Button
		 */
	  	else {
	  		$('#emigaplayer_increaseVolume').prop("disabled", true);
	  	}
	});	


	/*
	 *  Skip Backward
	 */
	$("#emigaplayer_restart").click(function() {
		/*
	 	 *  Limit Seconds
	     */
	  	EmigaPlayer[0].currentTime = 0;
		/*
	 	 *  Create Alert
	     */	  	
	  	new Noty({
	  		timeout:500,
	  		theme: 'bootstrap-v4',
			text: 'Skipped to backward',
	  	}).show();
	});		

	/*
	 *  Skip Forward
	 */
	$("#emigaplayer_end").click(function() {
		/*
	 	 *  Limit Seconds
	     */	  	
	  	EmigaPlayer[0].currentTime = EmigaPlayer[0].duration;
		/*
	 	 *  Create Alert
	     */	  
		new Noty({
		  	timeout:500,
		  	theme: 'bootstrap-v4',
			text: 'Skipped to upward',
		}).show();
	});	

	/*
	 *  Action Handlers
	 */
	if('mediaSession' in navigator) { 
		const EmigaMediaHandlers = [
			['play',   () => { 
				if ( $('#emigaplayer_poster').css('display') == 'none' || $('#emigaplayer_poster').css("visibility") == "hidden"){
    			  	$("#emigaplayer_play").html(`<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`);
			  		$("#emigaplayer_play").addClass("clicked");
			  		EmigaPlayer[0].play();
				}
				else {
					/*
				 	 *  Create Alert
				     */	  
					new Noty({
					  	timeout:500,
					  	theme: 'bootstrap-v4',
						text: 'Please click to listen now',
					}).show();					
				}
			}],
			['pause',  () => { 
				if ( $('#emigaplayer_poster').css('display') == 'none' || $('#emigaplayer_poster').css("visibility") == "hidden"){
					$("#emigaplayer_play").html(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play-circle"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>`);
			  		$("#emigaplayer_play").removeClass("clicked");
			  		EmigaPlayer[0].pause();
			  	}
				else {
					/*
				 	 *  Create Alert
				     */	  
					new Noty({
					  	timeout:500,
					  	theme: 'bootstrap-v4',
						text: 'Please click to listen now',
					}).show();					
				}
			}]
		];

		for (const [action, handler] of EmigaMediaHandlers) {
			try {
				navigator.mediaSession.setActionHandler(action, handler);
			} 
			
			catch (error) {
			    console.log(`The media session action "${action}" is not supported yet.`);
			}
		} 
	}	
});