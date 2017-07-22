

//make social icon div same width as logo in mobile
const $logoWidth = $("#landscape-logo").css("width");
$(document).ready(function() {
  $("#social").css("width", $logoWidth);
});


//change the background of the portfolio menu on click
$('.project').mousedown(function() {
   $(this).parents().css(
     'background-color', '#fff',
   );
   console.log("check");
   $(this).siblings().css(
     'color', '#3C3C3B',
   );
});

$('.project').mouseup(function() {
  setTimeout(
    function() {
      $(this).parents().css(
        'background-color', '#3C3C3B',
      );
      $(this).siblings().css(
        'color', '#fff',
      );
    },
    200);
});

//lightbox gallery

const $back = $('#back');
const $next = $('#arrow-right');
const $prev = $('#arrow-left');
const $overlay = $('<div id="overlay"></div>');
const $slide = $('<div id="slide"></div>');

// add buttons to slide
$overlay.append($slide);

//array of project slides
const $projectGallery = [];

//array of src attributes of imgs inside .gallery (note to me: .map = Pass each element in the current matched set through a function, producing a new jQuery object containing the return values.)
const $projectSrcArray = $(".slide").map(function(){
  return $(this).attr("src");
});

const $projectColor = $(".slide").map(function(){
  return $(this).attr("id");
});

//populate $projectGallery
for (let i = 0; i < $projectSrcArray.length; i++) {
  $projectGallery.push({
    src: $projectSrcArray[i],
    color: $projectColor[i],
    location: i,
  });
}

// function that returns the current image Object based on the src we're looking
function findCurrentProject(arrayOfObjects, src) {
  for (var i = 0; i < arrayOfObjects.length; i++) {
    var result = arrayOfObjects[i].src.indexOf(src);
    if (result > -1) {
      return arrayOfObjects[i];
    }
  }
}

//click on project div
$(".project").click(function(event){
  //get src of first slide of the div
  const initialSlideSrc = $(this).children(".slide").attr("src");
  const initialSlideColor = $(this).children(".slide").attr("id");
  //show gallery nav icons
  $('.gallery-nav').css('display', 'block');
  // add src to slide img
  $slide.css('background-image', 'url(' + initialSlideSrc + ')');
  //recolor overlay to match slide
  $overlay.css('background', initialSlideColor);
  //append first img from div as overlay

  setTimeout(
   function() {
    $("body").append($overlay);
    $('.gallery-nav').css('display', 'block');
   },
   100);
})

function next() {
  //get current src attr from img
  const currentBgSrc = $slide.css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
    const input = currentBgSrc;
    const [ignore, projectCurrentSrc] = input.split('img/');
  //get all attrs for current img
  const currentProject = findCurrentProject($projectGallery, projectCurrentSrc);
  //to cycle from last img to 1st within the div
  if (currentProject.location === $projectGallery.length - 1) {
    const cycleToFirst = $projectGallery[0].src;
    $slide.css('background-image', 'url(' + cycleToFirst + ')');
    //set overlay to match 1st color
    const firstColor = $projectGallery[0].color;
    $overlay.css('background', firstColor);
  } else {
    //to cycle to next img
    const cycleToNext = $projectGallery[currentProject.location + 1].src;
    $slide.css('background-image', 'url(' + cycleToNext + ')');
    //set overlay to match next color
    const nextColor = $projectGallery[currentProject.location + 1].color;
    $overlay.css('background', nextColor);
  }
}

function prev() {
  //get current src attr from img
  const currentBgSrc = $slide.css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
    const input = currentBgSrc;
    const [ignore, projectCurrentSrc] = input.split('img/');

  //get all attrs for current img
  const currentProject = findCurrentProject($projectGallery, projectCurrentSrc);

  //to cycle from 1st img to last
  if (currentProject.location === 0) {
    const cycleToLast = $projectGallery[$projectGallery.length - 1].src;
    $slide.css('background-image', 'url(' + cycleToLast + ')');
    //set overlay color to match last slide
    const lastColor = $projectGallery[$projectGallery.length - 1].color;
    $overlay.css('background', lastColor);
  } else {
    //to cycle to prev img
    const cycleToPrev = $projectGallery[currentProject.location - 1].src;
    $slide.css('background-image', 'url(' + cycleToPrev + ')');
    //set overlay color to match prev slide
    const prevColor = $projectGallery[currentProject.location - 1].color;
    $overlay.css('background', prevColor);
  }
}

//when next button clicked
//capture click event

//when prev button clicked
//capture click event
$prev.on("click",function(){
  prev();
});

//when right arrow keyed
$(document).ready().keydown(function( event ) {
  if ( event.which == 39 ) {
   next();
  }
});
//when left arrow keyed
$(document).ready().keydown(function( event ) {
  if ( event.which == 37 ) {
   prev();
  }
});

// swipe left for next
$('body').swipeleft(function(e) {
    next();
});

$('body').swiperight(function(e) {
    prev();
});


// //when swipe left for next
  $('body').on('swipeleft', '#overlay', function() { next(); });
// //when swipe right for prev
  $('body').on('swiperight', '#overlay', function() { prev(); });

//hide overlay when:
//back clicked
$back.click(function(e){
   if(e.target != this) return; // only continue if the target itself has been clicked
   location.reload();
});
//esc button pressed
$(document).ready().keydown(function( event ) {
  if ( event.which == 27 ) {
    location.reload();  }

});
//
// $back.click(function(e){
//    if(e.target != this) return; // only continue if the target itself has been clicked
//    $overlay.hide();
// });
// //esc button pressed
// $(document).ready().keydown(function( event ) {
//   if ( event.which == 27 ) {
//     $overlay.hide();  }
//
// });
