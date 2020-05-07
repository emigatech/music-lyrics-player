$(document).ready(function() {

	var EmigaPlayer = $("#emigaplayer");

	$("#loading").hide();
	$("#emigaplayer_poster").show();
	$("#emigaplayer_lyrics").hide();

	$(".emiga").show();

	$('#emigaplayer_progress').prop("disabled", false);
	$('#emigaplayer_increaseVolume').prop("disabled", false);
	$('#emigaplayer_restart').prop("disabled", false);
	$('#emigaplayer_play').prop("disabled", false);
	$('#emigaplayer_decreaseVolume').prop("disabled", false);
	$('#emigaplayer_end').prop("disabled", false);

	$("#emigaplayer_progress")[0].max = EmigaPlayer[0].duration;
	EmigaPlayer[0].currentTime = 0;

	EmigaPlayer[0].addEventListener("ended", function() {
		$("#emigaplayer_poster").show();
		$("#emigaplayer_lyrics").hide();
		$("#emigaplayer_play")[0].click();
		EmigaPlayer[0].currentTime = 0;
	}, false);

	EmigaPlayer[0].addEventListener("timeupdate", function() {
		$("#emigaplayer_progress").val(EmigaPlayer[0].currentTime);
	});

	$("#emigaplayer_progress").change(function(){
		EmigaPlayer[0].currentTime = $("#emigaplayer_progress").val();
	});

	$("#emigaplayer_play").click(function() {

	  if($("#emigaplayer_play").hasClass("clicked")){
	  	$("#emigaplayer_play").html(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play-circle"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>`);
	  	$("#emigaplayer_play").removeClass("clicked");
	  	EmigaPlayer[0].pause();
	  }
	  else {
	  	$("#emigaplayer_play").html(`<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`);
	  	$("#emigaplayer_play").addClass("clicked");
	  	EmigaPlayer[0].play();
	  }
	});	

	$("#emigaplayer_listenNow").click(function() {

		if($("#emigaplayer_play").hasClass("clicked")){
		  	$("#emigaplayer_play").html(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play-circle"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>`);
		  	$("#emigaplayer_play").removeClass("clicked");
		}
		else {
		  	$("#emigaplayer_play").html(`<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`);
		  	$("#emigaplayer_play").addClass("clicked");
		  	EmigaPlayer[0].play();
		}

		$("#emigaplayer_poster").hide();
		$("#emigaplayer_lyrics").show();
	});

	$("#emigaplayer_close").click(function() {

		if($("#emigaplayer_play").hasClass("clicked")){
		  	$("#emigaplayer_play").html(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play-circle"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>`);
		  	$("#emigaplayer_play").removeClass("clicked");
		  	EmigaPlayer[0].pause();
		}
		else {
		  	$("#emigaplayer_play").html(`<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`);
		  	$("#emigaplayer_play").addClass("clicked");
		}

		$("#emigaplayer_poster").show();
		$("#emigaplayer_lyrics").hide();

		new Noty({
	  		timeout:500,
	  		theme: 'bootstrap-v4',
			text: 'Player Closed',
	  	}).show();
	});

	$("#emigaplayer_increaseVolume").click(function() {
	  if(EmigaPlayer[0].volume < 0.9) {
	  	$('#emigaplayer_increaseVolume').prop("disabled", false);
	  	EmigaPlayer[0].volume += 0.1;
	  	new Noty({
	  		timeout:500,
	  		theme: 'bootstrap-v4',
		    text: 'Volume level: '+parseFloat(EmigaPlayer[0].volume).toFixed(1),
		}).show();
	  }
	  else {
	  	$('#emigaplayer_increaseVolume').prop("disabled", true);
	  }

	  if(EmigaPlayer[0].volume > 0.1) {
	  	$('#emigaplayer_decreaseVolume').prop("disabled", false);
	  }
	  else {
	  	$('#emigaplayer_decreaseVolume').prop("disabled", true);
	  }
	});	

	$("#emigaplayer_decreaseVolume").click(function() {
	  if(EmigaPlayer[0].volume > 0.1) {
	  	$('#emigaplayer_decreaseVolume').prop("disabled", false);
	  	EmigaPlayer[0].volume -= 0.1;
	  	new Noty({
	  		timeout:500,
	  		theme: 'bootstrap-v4',
		    text: 'Volume level: '+parseFloat(EmigaPlayer[0].volume).toFixed(1),
		}).show();
	  }
	  else {
	  	$('#emigaplayer_decreaseVolume').prop("disabled", true);
	  }
	  if(EmigaPlayer[0].volume < 0.9) {
	  	$('#emigaplayer_increaseVolume').prop("disabled", false);
	  }
	  else {
	  	$('#emigaplayer_increaseVolume').prop("disabled", true);
	  }
	});	

	$("#emigaplayer_restart").click(function() {
	  EmigaPlayer[0].currentTime = 0;
	  new Noty({
	  	timeout:500,
	  	theme: 'bootstrap-v4',
		text: 'Skipped to backward',
	  }).show();
	});		

	$("#emigaplayer_end").click(function() {
	  EmigaPlayer[0].currentTime = EmigaPlayer[0].duration;
	  new Noty({
	  	timeout:500,
	  	theme: 'bootstrap-v4',
		text: 'Skipped to upward',
	  }).show();
	});	
});