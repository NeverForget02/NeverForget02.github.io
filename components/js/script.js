'use strict';
$(document).ready(function(){
  var initNumber = 1,
    itemSwipe = $('.slide'),
    interval,
    list = $(".content-product"),
    numToShow = 6,
    load_more = $("#loadMore"),
    return_top = $("#return"),
    numInList = list.length,
    slideImage = $(".slide-image img");

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
      console.log("hola");
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

    function loadProducts(){
      list.hide();
      list.slice(0, numToShow).show();

      load_more.on("click",function(){
          var showing = list.filter(':visible').length;
          list.slice(showing - 1, showing + numToShow).fadeIn();
          $('html,body').animate({
              scrollTop: $(this).offset().top
          }, 1500);
          if (showing >= (numInList-numToShow)) {
              load_more.hide();
              return_top.css("display","block");
          }
      });
      return_top.on("click", function () {
         $('body,html').animate({
              scrollTop: 0
          }, 600);
          return false;
          });
    }
    function sliderProduct(){
      var controlsImage="";
      for(var i =0;i<slideImage.length;i++){
        controlsImage = '<li class="image-control" id="item'+i+'">'+$(".img"+i).html()+'</li>';
        console.log(controlsImage);
         $("#controls-product").append(controlsImage);
      }
      $(".image-control:first").addClass("active-image");
    }

    sliderProduct();
    loadProducts();

    $("#controls-product").on("click","li",function(){
        var li_id=$(this).attr("id");
        for(var i = 0;i<slideImage.length;i++){
          if(li_id == ('item'+i)){
            $('.main-img').removeClass('main-img');
            $(".img"+i).addClass('main-img');
            $(".active-image").removeClass("active-image");
            $(this).addClass("active-image");
          }
        }
      });

})
