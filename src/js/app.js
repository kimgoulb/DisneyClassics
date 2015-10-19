var winW = $(window).width(),
    winH = $(window).height();

var soundtracks = $('.soundtrack');
    soundtrack_pos = soundtracks[0].getBoundingClientRect();

var setHeights = function(){
  $('.intro-wrapper').height(winH);
  soundtracks.height(winH - 200);
}

var animateList = function(){
  $.each(soundtracks, function(s,soundtrack){
    soundtrack_pos = soundtrack.getBoundingClientRect();

    if (soundtrack_pos.top < winH) {
      console.log(soundtrack_pos.top,winH);
    }
    
  });
}

var resized = function(){
  setHeights();
}

var scrolled = function(){
  animateList();
}

$(window).on("resize", resized);
$(window).on("scroll", scrolled);

$(document).on("ready", function(){
  setHeights();
});