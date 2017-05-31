

simpleTicker
------------

*A simple ticker plugin for animating lists of text*


----------

**Usage**
<pre>
$(document).ready(function(){

  $('ul.yourListContainer').ticker();

  $('ul.yourOtherListContainer').ticker({
    // Your settings here
    speed: 2000;
  });

});
</pre>

----------

**Settings**
Option | Type | Default | Description
------ | ---- | ------- | -----------
autoplay | boolean | true | Enables cycling through list
speed | integer | 5000 | Auto play speed in milliseconds
transitionAnimation | string | 'marquee' | Transition animation
transitionSpeed | integer | 500 | Transition animation speed


----------
**Transition Animations**
Option Value | Description
------------ | -----------
'fade' | Fade out current item, fade in next item
'marquee' | Animates width of current item to 0%, animates width of next item from 0% to 100%
'slide' | Slides out current item to the left, slides in next item from right to left
'slide-up' | Slides out current item upwards, slides in next item upwards




