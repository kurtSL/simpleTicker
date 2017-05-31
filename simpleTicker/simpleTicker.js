/*

          $$\                         $$\        $$$$$$$$\ $$\           $$\
          \__|                        $$ |       \__$$  __|\__|          $$ |
 $$$$$$$\ $$\ $$$$$$\$$$$\   $$$$$$\  $$ | $$$$$$\  $$ |   $$\  $$$$$$$\ $$ |  $$\  $$$$$$\   $$$$$$\
$$  _____|$$ |$$  _$$  _$$\ $$  __$$\ $$ |$$  __$$\ $$ |   $$ |$$  _____|$$ | $$  |$$  __$$\ $$  __$$\
\$$$$$$\  $$ |$$ / $$ / $$ |$$ /  $$ |$$ |$$$$$$$$ |$$ |   $$ |$$ /      $$$$$$  / $$$$$$$$ |$$ |  \__|
 \____$$\ $$ |$$ | $$ | $$ |$$ |  $$ |$$ |$$   ____|$$ |   $$ |$$ |      $$  _$$<  $$   ____|$$ |
$$$$$$$  |$$ |$$ | $$ | $$ |$$$$$$$  |$$ |\$$$$$$$\ $$ |   $$ |\$$$$$$$\ $$ | \$$\ \$$$$$$$\ $$ |
\_______/ \__|\__| \__| \__|$$  ____/ \__| \_______|\__|   \__| \_______|\__|  \__| \_______|\__|
                            $$ |
                            $$ |
                            \__|

Version  : 1.1.0
Author   : Kurt Lagare

Limitations:
  -No controls i.e. Previous and Next Arrow
  -Limited Animation

Usage:
$(document).ready(function(){

  $('ul.yourListContainer').ticker();

  $('ul.yourOtherListContainer').ticker({
    // Your settings here
    speed: 2000;
  });

});

Versions:
  1.0.0 - Ticker with Slide Horizontal, Vertical, Marquee, and Fade Animations. Marquee animation is not responsive on resize

*/
(function($) {
  'use strict';

  $.fn.ticker = function(settings) {

    var defaults = {
      autoplay: true, // Autoplay boolean
      random: false, // Randomize next item
      speed: 5000, // Autoplay speed in milliseconds
      // Transition Animations:
      // 'slide-h' - Slide Horizontally
      // 'slide-v' - Slide Vertically
      // 'fade' - Fade
      transitionAnimation: 'slide-h',
      transitionSpeed: 500, // Transition speed in milliseconds
    };

    var options = $.extend(defaults, settings);

    return this.each(function() {

      var obj = $(this);
      var list = obj.children();

      obj.css('overflow', 'hidden');

      // Autoplay speed needs to be greater than transition speed
      if (options.speed == options.transitionSpeed) {
        options.speed = options.transitionSpeed + 500;
      }

      var looper = setInterval(function() {

        list = obj.children();
        list.not(':first').hide();

        var current_li = list.eq(0);
        var next_li = options.random ? list.eq(Math.random() * list.length) : list.eq(1);

        if (current_li.get(0) === next_li.get(0) && options.random) {
          next_li = list.eq(Math.random() * list.length);
        }

        // Slide Horizontally
        if (options.transitionAnimation == 'slide-h') {
          current_li.animate({
            width: '0'
          }, options.transitionSpeed, function() {
            current_li.remove().appendTo(obj).css({
              'width': '100%',
              'display': 'none'
            });
            next_li.css({
              'width': '0',
              'display': 'block'
            });
            next_li.animate({
              width: '100%'
            }, options.transitionSpeed);
          });
        }

        // Slide Vertically
        else if (options.transitionAnimation == 'slide-v') {
          current_li.slideUp(options.transitionSpeed);
          next_li.slideDown(options.transitionSpeed, function() {
            current_li.remove().appendTo(obj);
          });
        }

        // Fade
        else if (options.transitionAnimation == 'fade') {
          current_li.fadeOut(options.transitionSpeed, function() {
            obj.css('height', next_li.height());
            next_li.fadeIn(options.transitionSpeed);
            current_li.remove().appendTo(obj);
          });
        }

        // Marquee
        else if (options.transitionAnimation == 'marquee') {
          var li_width = current_li.width();
          var left_padding = parseInt(obj.css('padding-left'), 10);
          var right_padding = parseInt(obj.css('padding-right'), 10);
          var left_offset = li_width + left_padding;
          current_li.css({
            'position': 'absolute',
            'width': li_width
          })
          current_li.animate({
            left: '-' + left_offset
          }, options.transitionSpeed);


          next_li.css({
            'left': left_offset + right_padding,
            'position': 'absolute',
            'width': li_width,
            'display': 'block'
          });
          next_li.animate({
            left: left_padding
          }, options.transitionSpeed, function() {
            current_li.remove().appendTo(obj).css({
              'left': left_offset + right_padding
            });
          });

        }

      }, options.speed); // end looper

    }); // end return

  }; // end ticker

})(jQuery);
