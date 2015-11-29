'use strict';
var initNumber = 1,
    itemSwipe = $('.slide'),
    interval;

function startSlider(){
	interval = setInterval(function(){
		nextImage();
	}, 5000);
};
function pauseSlider() {
  clearInterval(interval);
}

function createControls(){
	var li_controls="",
			controlsContent= $("#slider-controls");
	for(var i = 0;i<itemSwipe.length;i++){
		li_controls+='<li class="controls-item" id="'+i+'"></li>';
	}
	controlsContent.append(li_controls);
	$(".controls-item:first").addClass("active-control");
}

$("#slider-controls").on("click","li",function(){
	var li_id=$(this).attr("id");
	for(var i = 0;i<itemSwipe.length;i++){
		if(li_id == i){
	    $('.active').removeClass('active');
	    $(".slide"+i).addClass('active');
	    $(".active-control").removeClass("active-control");
	    $(this).addClass("active-control");
	    initNumber=i+1;
		}
	}
});

$("#prev").on("click",function(){
	prevImage();
});

$("#next").on("click",function(){
	nextImage();
});

function nextImage(){
	if(initNumber != itemSwipe.length){
    $('.active').removeClass("active").next('.slide').addClass('active');
    $(".active-control").removeClass("active-control").next(".controls-item").addClass("active-control");
    initNumber=initNumber+1;
  }else{
    $('.active').removeClass('active');
    $('.slide:first').addClass('active');
    $(".active-control").removeClass("active-control");
    $(".controls-item:first").addClass("active-control");
    initNumber=1;
  }
};

function prevImage(){
	if(initNumber != 1){
    $('.active').removeClass('active').prev('.slide').addClass('active');
    $(".active-control").removeClass("active-control").prev(".controls-item").addClass("active-control");
    initNumber=initNumber-1;
  }else{
    $('.active').removeClass('active')
    $('.slide:last').addClass('active');
    $(".active-control").removeClass("active-control");
    $(".controls-item:last").addClass("active-control");
    initNumber=itemSwipe.length;
  }
}
createControls(); 
startSlider();

$( "#slider" )
  .on( "mouseenter", function() {
    pauseSlider();
  })
  .on( "mouseleave", function() {
    startSlider();
  });