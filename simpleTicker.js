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

*/
(function($) {
  'use strict';

  $.fn.ticker = function(settings) {

    var defaults = {
      autoplay: true, // Autoplay boolean
      speed: 5000, // Autoplay speed in milliseconds
      // Transition Animations:
      // 'fade' - Fade
      // 'marquee' - Marquee
      // 'slide' - Slide Horizontally
      // 'slide-up' - Slide Vertically
      transitionAnimation: 'marquee',
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
        var next_li = list.eq(1);

        // Marquee
        if (options.transitionAnimation == 'marquee') {
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

        // Fade
        else if (options.transitionAnimation == 'fade') {
          current_li.fadeOut(options.transitionSpeed, function() {
            obj.css('height', next_li.height());
            next_li.fadeIn(options.transitionSpeed);
            current_li.remove().appendTo(obj);
          });
        }

        // Slide
        else if (options.transitionAnimation == 'slide') {
          var li_width = obj.width();
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

        // Slide Up
        else if (options.transitionAnimation == 'slide-up') {
          current_li.slideUp(options.transitionSpeed);
          next_li.slideDown(options.transitionSpeed, function() {
            current_li.remove().appendTo(obj);
          });
        }


      }, options.speed); // end looper

    }); // end return

  }; // end ticker

})(jQuery);
