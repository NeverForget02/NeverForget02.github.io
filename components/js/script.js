'use strict';
$.fn.extend({
  
  // Define the threeBarToggle function by extending the jQuery object
  threeBarToggle: function(options){
    
    // Set the default options
    var defaults = {
      color: 'black',
      width: 30,
      height: 25,
      speed: 400,
      animate: true
    }
    var options = $.extend(defaults, options); 
    
    return this.each(function(){
      
      $(this).empty().css({'width': options.width, 'height': options.height, 'background': 'transparent'});
      $(this).addClass('tb-menu-toggle');
      $(this).prepend('<i></i><i></i><i></i>').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('tb-active-toggle');
        if (options.animate) { $(this).toggleClass('tb-animate-toggle'); }
        $('.tb-mobile-menu').slideToggle(options.speed);
      });
      $(this).children().css('background', options.color);
    });
  },
  
  // Define the accordionMenu() function that adds the sliding functionality
  accordionMenu: function(options){
    
    // Set the default options
    var defaults = {
      speed: 400
    }
    var options =  $.extend(defaults, options);

    return this.each(function(){
      
      $(this).addClass('tb-mobile-menu');
      var menuItems = $(this).children('li');
      menuItems.find('.sub-menu').parent().addClass('tb-parent');
      $('.tb-parent ul').hide();
      $('.tb-parent > a').on('click', function(event) {
        event.stopPropagation();
        event.preventDefault();
        $(this).siblings().slideToggle(options.speed);
      });
      
    });
  }
});

// Convert any element into a three bar toggle
// Optional arguments are 'speed' (number in ms, 'slow' or 'fast') and 'animation' (true or false) to disable the animation on the toggle
$('#menu-toggle').threeBarToggle({color: '#74686B', width: 40, height: 30});

// Make any nested ul-based menu mobile
// Optional arguments are 'speed' and 'accordion' (true or false) to disable the behavior of closing other sub
$('#menu').accordionMenu();
$(document).ready(function(){
  var arrayCategory=[];
    $.ajax({
      type: "GET",
        url:'js/never_forget.json',
        data:{},
      dataType: "json",
      success: function(data){
          for (var i = 0; i < data.Products.length; i++) { 
            arrayCategory.push(data.Products[i].category);
          };  
          generateContent(data.Products,arrayCategory); 
        },
      error:function(jqXHR,textStatus, errorThrown){
          console.log("Text Status:"+textStatus+"\nError:"+errorThrown);
        }
    });
    sliderFunctions();
}); 

var initNumber = 1,
    itemSwipe = $('.slide'),
    interval,
    list = $(".content-product"),
    numToShow = 6,
    load_more = $("#loadMore"),
    return_top = $("#return"),
    numInList = list.length,
    slideImage = $(".slide-image img"),
    categoryChoose = "";

function sliderFunctions(){
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

  $( "#slider" )
    .on( "mouseenter", function() {
      pauseSlider();
    })
    .on( "mouseleave", function() {
      startSlider();
    });

    function sliderProduct(){
      var controlsImage="";
      for(var i =0;i<slideImage.length;i++){
        controlsImage = '<li class="image-control" id="item'+i+'">'+$(".img"+i).html()+'</li>';
         $("#controls-product").append(controlsImage);
      }
      $(".image-control:first").addClass("active-image");
    }

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

   function gallerySwipe() {
    var contentSwipe = $('#slider');

    contentSwipe.swipe({
      swipeLeft: function() {
        nextImage();
      },
      swipeRight: function() {
        prevImage();
      },
      threshold: 0,
      triggerOnTouchEnd: false
    });
  }

    createControls();
    startSlider();
    loadProducts();
    gallerySwipe();
};
  

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
function generateContent(products, category){
  Array.prototype.unique=function(a){
    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
  });

  function printCategory(){
    var contentCategory="";
    for(var i=0;i<category.length;i++){
      if(category.unique()[i] != undefined){
        contentCategory += '<div class="content-category" id="'+category.unique()[i].toLowerCase()+'"><a href="adornos.html"><img src="img/'+category.unique()[i].toLowerCase()+'/'+category.unique()[i]+'.jpg"><div class="content-category-text"><i class="triangle"></i><p>'+category.unique()[i]+'</p></div></a></div>';
      }
    }
    $('#category').append(contentCategory);
  }
  $('#category').on("click","div", function(){
    categoryChoose=$(this).attr("id");
    console.log(categoryChoose);
    createArrayCategory();
  });
  function createArrayCategory(){
    var arrayProductsCategory=[];
    for(var i=0;i<products.length;i++){
      if(products[i].category.toLowerCase() == categoryChoose){
        arrayProductsCategory.push(products[i]);
      }
    }
    console.log(arrayProductsCategory);
    printProductsCategory(arrayProductsCategory)
  }
  function printProductsCategory(productsCategory){
    var contentProducts="";
    for(var i=0;i<productsCategory.length;i++){
        contentProducts += '<a href="#" class="content-product"><div><img src="'+productsCategory[i].img1+'" alt=""><div class="content-product-info"><i class="triangle-left"></i><h4>'+productsCategory[i].name+'</h4><span>'+productsCategory[i].price+'</span></div></div></a>';
      }
    $('#products').append(contentProducts);
  }
  function printeRecentsProducts(){
    var contentRecent="";
    for(var i=0;i<products.length;i++){
      if(i <= 2){
        contentRecent += '<a href="#" class="content-product"><div><img src="'+products[i].img1+'" alt=""><div class="content-product-info"><i class="triangle-left"></i><h4>'+products[i].name+'</h4><span>'+products[i].price+'</span></div></div></a>';
      }
    }
    $('#related').append(contentRecent);
  }
  printCategory();
  printeRecentsProducts();
}

// Search 
$( document ).ready(function() {

// Artificial custom focus action for Search Bar
var searchInput = $(".nav-search-container .search-input"),
    selectInput = $("#type");

// Focus if we click
searchInput.focus(function(){
    $(this).parent().addClass('focused');
});

searchInput.blur(function(){
   window.setTimeout(blurTester, 100);
});
selectInput.blur(function(){
    window.setTimeout(blurTester, 100);
});

function blurTester() {
  if ($(searchInput).is(":focus") ||  $(selectInput).is(":focus") ){
  }
  else if ($(searchInput).val()) {

  }
  else {
    $('.nav-search-container').removeClass('focused');
  }
}
  // Show submit on input type
  searchInput.keypress(function(){
    if($(this).val() < 1){
      $(this).parent().addClass('show-submit');
    }
  }); 
});