

$(document).ready(function(){

  //console.log('// home');

  //alert( $(window).width() +'x'+$(window).height()+'\n[ '+$(document).width() +'x'+$(document).height()+' ]');
console.log('calling royalSlider method');
  $(".royalSlider").royalSlider({



    autoScaleSlider: 		false,				// false 	Automatically updates slider height based on base width.
    autoScaleSliderWidth: 	800,				// 800 	Base slider width. Slider will autocalculate the ratio based on these values.
    autoScaleSliderHeight: 	400,				// 400 	Base slider height
    imageScaleMode: 		'fit-if-smaller',	// 'fit-if-smaller' 	Scale mode for images. "fill", "fit", "fit-if-smaller" or "none"
    imageAlignCenter: 		true,				// true 	Aligns image to center of slide.
    imageScalePadding: 		4,					// 4 Distance between image and edge of slide (doesn't work with 'fill' scale mode).
    controlNavigation:		'bullets',			// 'bullets' 	Navigation type, can be 'bullets', 'thumbnails' or 'tabs'
    arrowsNav: 				false,				// true Direction arrows navigation.
    arrowsNavAutoHide: 		true,				// true	Auto hide arrows.
    arrowsNavHideOnTouch:	false,				// false Hides arrows completely on touch devices.
    slidesSpacing: 			0, 					// 8 Spacing between slides in pixels.
    startSlideId: 			0, 					// 0 Start slide index
    loop: 					true, 				// false 	Makes slider to go from last slide to first.
    loopRewind: 			false, 				// false Makes slider to go from last slide to first with rewind. Overrides prev option
    randomizeSlides: 		false, 				// false Randomizes all slides at start.
    numImagesToPreload: 	4, 					// 4 Number of slides to preload on sides. If you set it to 0, only one slide will be kept in the display list at once.
    slidesOrientation: 		'horizontal', 		// 'horizontal' Can be 'vertical' or 'horizontal'.
    transitionType: 		'move', 			// 'move' - 'move' or 'fade'
    transitionSpeed: 		600, 				// 600 Slider transition speed, in ms.
    easeInOut: 				'easeInOutSine', 	//'easeInOutSine' Easing function for simple transition. Read more in the easing section of the documentation.
    easeOut: 				'easeOutSine',		// 'easeOutSine'	Easing function of animation after ending of the swipe gesture. Read more in the easing section of the documentation.
    controlsInside: 		true, 				// true If set to true adds arrows and fullscreen button inside rsOverflow container, otherwise inside root slider container..
    navigateByClick: 		true, 				// true 	Navigates forward by clicking on slide.
    sliderDrag: 			true, 				// true Mouse drag navigation over slider.
    sliderTouch: 			true, 				// true Touch navigation of slider.
    keyboardNavEnabled: 	true, 				//false Navigate slider with keyboard left and right arrows.
    fadeinLoadedSlide: 		true, 				// true Fades in slide after it's loaded.
    allowCSS3OnWebkit: 		true, 				// true Allows usage of CSS3 transition in WebKit browsers. Might be useful if you're experiencing font-rendering problems, or other WebKit-related bugs.
    globalCaption: 			true, 				// true Adds global caption element to slider, read more in the global caption section of documentation.
    addActiveClass: 		false, 				// false 	Adds rsActiveSlide class to current slide before transition.
    minSlideOffset: 		10, 				// 10 Minimum distance in pixels to show next slide while dragging. Added in version 9.1.7.
    autoHeight: 			false, 				// false	Scales and animates height based on current slide.
    //Please note: if you have images in slide that don't have rsImg class) or don't have fixed size, use $(window).load() instead of $(document).ready() before initializing slider.
    //Also, autoHeight doesn't work with properties like autoScaleSlider, imageScaleMode and imageAlignCenter.
    slides:					null, 				// Overrides HTML of slides, used for creating of slides from HTML that is not attached to DOM. More info in knowledge base.
    autoPlay: {
      // autoplay options go here
      enabled: true,
      pauseOnHover: false,
      stopAtAction: false,
      delay: 16000
    }

  });

});