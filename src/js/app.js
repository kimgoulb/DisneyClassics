var winW = $(window).width(),
    winH = $(window).height(),
    winCenter = winH / 2, // center point of screen
    winPadding = 120; // padding at top and bottom fo screen to show other soundtracks

var soundtracks = $('.soundtrack'),
    soundtrack_h = winH - (winPadding * 2),
    soundtrack_max_padding = 20, //10,
    soundtrack_pos = soundtracks[0].getBoundingClientRect(),
    soundtrack_dist_to_travel = ((winH - winPadding) + (soundtrack_h/2)) - winCenter,
    soundtrack_padding = ( (soundtrack_pos.top + (soundtrack_h/2) - winCenter) / soundtrack_dist_to_travel ) * soundtrack_max_padding,
    soundtrack_center_pos,
    current_soundtrack = 0,
    soundtrack_bgs = $('.st-bg'),
    soundtrack_bg_img = '';

var setHeights = function(){
  $('.intro-wrapper').height(winH);

  soundtracks.height(soundtrack_h);
  // soundtracks.find('.img-wrapper').width(soundtrack_h);
}

var animateList = function(){
  $.each(soundtracks, function(s,soundtrack){
    soundtrack_pos = soundtrack.getBoundingClientRect();
    soundtrack_center_pos = soundtrack_pos.top + ($(soundtrack).height() / 2);
    soundtrack_dist_to_travel = ((winH - winPadding) + (soundtrack_h/2)) - winCenter;
    soundtrack_padding = ( (soundtrack_pos.top + (soundtrack_h/2) - winCenter) / soundtrack_dist_to_travel ) * soundtrack_max_padding;
    
    // x / 10 = y - 350 / 500 //// x / 10 = top + (sh/2) - (wh/2) / (wh-winPadding+sh/2) - (wh/2)
    if (soundtrack_pos.top < (winH - winPadding) && soundtrack_pos.bottom > winPadding) {
      
       // use positive number
      soundtrack_padding = (soundtrack_padding < 0) ? soundtrack_padding * -1 : soundtrack_padding;
      
      // stick at max(10) and min(0)
      if (soundtrack_padding <= 0) {
        soundtrack_padding = 0;
      } else if (soundtrack_padding >= soundtrack_max_padding) {
        soundtrack_padding = soundtrack_max_padding;
      }

      // set size of image
      // $(soundtrack).find('.img-wrapper img').css({ height: 100 - soundtrack_padding + '%'  });
      $(soundtrack).find('.st-img').css({ 
        '-webkit-transform': 'scale('+ (100 - soundtrack_padding)/100 + ')',
        'transform': 'scale('+ (100 - soundtrack_padding)/100+ ')'
      });
       console.log((100 - soundtrack_padding)/100);

      // if soundtrack is 65%+ in view...change image and set current
      if (current_soundtrack !== s && soundtrack_padding < (soundtrack_max_padding * .35)) {
        console.log(s);
        // soundtrack_bg_img = $(soundtrack).find('.img-wrapper img').attr('src').replace('main','bg');
        soundtrack_bg_img = $(soundtrack).find('.st-img').attr('data-bg-image');
        $('.st-bg').fadeTo(400, .5, 'easeOutQuad', function(){
          $('.st-bg').css('background-image','url('+soundtrack_bg_img+')');
          $('.st-bg').fadeTo(400, 1,'easeInQuad');
        });
        
        current_soundtrack = s;

      }
      
      // if (s === current_soundtrack) {
      //   console.log(soundtrack_bgs[current_soundtrack]);
      //   $(soundtrack_bgs[current_soundtrack]).fadeTo(100, 1 - (soundtrack_padding/soundtrack_max_padding));
      // } else if (s > current_soundtrack) {
      //   $(soundtrack_bgs[s]).fadeTo(100,1);
      // } else if (s < current_soundtrack) {
      //   $(soundtrack_bgs[s]).fadeTo(100,0);
      // }

      // console.log(s,soundtrack_padding);
    }
    
  });
}

var resized = function(){
  winW = $(window).width(),
  winH = $(window).height(),
  winCenter = winH / 2;
  soundtrack_h = winH - (winPadding * 2)
      
  setHeights();
}

var scrolled = function(){
  animateList();
}

$(window).on("resize", resized);
$(window).on("scroll", scrolled);

$(document).on("ready", function(){
  setHeights();
  animateList();
});