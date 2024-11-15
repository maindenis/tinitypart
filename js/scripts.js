function getRespParams() {
    if($(document).scrollTop() > $(".header_site").height()) {
        $(".btn_top").fadeIn(300);
    } else {
        $(".btn_top").fadeOut(300);
    }
}

var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

$(window).resize(function() {
    getRespParams();
});

$(document).scroll(function() {
    getRespParams();
});

$(document).ready(function() {
    getRespParams();

    if( $(".slider").length > 0 ) {
        $(".slider").not(".slick-initialized").slick({
            dots: true,
            arrows: true,
            // autoplay: true,
            autoplaySpeed: 4000,
            speed: 2000,
            variableWidth: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            centerMode: true,
            appendDots: $(".slider_dots"),
            appendArrows: $(".slider_arrows"),
            // fade: true,
            responsive: [
                {
                  breakpoint: 1125,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
                },
                // {
                //   breakpoint: 540,
                //   settings: {
                //     slidesToShow: 1,
                //     slidesToScroll: 1
                //   }
                // }
              ]
        });
    }

    // --------------

    $(".eye").on("click", function() {
        parent = $(this).closest(".password_input");
        input = parent.find("input");
        if(input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    $('.btn_top').on('click', function (e) {
        e.preventDefault();
        $('html, body').stop().animate({
          'scrollTop': 0
        }, 500);
    });

    // --------------

    $(".confCh").each(function() {
        parent = $(this).closest("form");
        submitBtn = parent.find("[type='submit']");
        if($(this).prop("checked")) {
            submitBtn.removeClass("noactive");
        } else {
            submitBtn.addClass("noactive");
        }
    });

    $(".confCh").on("change", function(e) {
        e.preventDefault();
        parent = $(this).closest("form");
        submitBtn = parent.find("[type='submit']");
        if($(this).prop("checked")) {
            submitBtn.removeClass("noactive");
        } else {
            submitBtn.addClass("noactive");
        }
    });

    // -----------------

   $(document).on("click", "[data-popup-link]",  function(e) {
      e.preventDefault();
      popupName = $(this).attr("data-popup-link");
      div = document.createElement('div');
      div.style.overflowY = 'scroll';
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.visibility = 'hidden';
      document.body.appendChild(div);
      scrollWidth = div.offsetWidth - div.clientWidth;
      document.body.removeChild(div);
      topCoord = $(document).scrollTop();
      $("body").addClass("fixed");
      $("body").css({
          "top" :  -1 * topCoord + "px",
          "padding-right" : scrollWidth + "px"
      });
      $(".popup_bg").fadeIn(300);
      $("[data-popup]").each(function() {
        popupNameActive = $(this).attr('data-popup');
        if(popupNameActive != popupName) {
            $(this).fadeOut(300);
        }
      });
      $("[data-popup = '"+ popupName +"']").fadeIn(300);
    });
    $(document).on("click", ".close, .popup_bg", function(e) {
      e.preventDefault();
      curTop = $("body").css("top");
      curTop = Math.abs(parseInt(curTop, 10));
      $("body").removeClass("fixed");
      if (curTop !== 0) {
          $("html").scrollTop(curTop);
      }
      $("body").attr("style", "");
      $("[data-popup]").fadeOut(300);
      $(".popup_bg").fadeOut(300);
    });
    $(this).keydown(function(eventObject){
      if (eventObject.which == 27 && $("body").hasClass("fixed")) {
        curTop = $("body").css("top");
        curTop = Math.abs(parseInt(curTop, 10));
        $("body").removeClass("fixed");
        if (curTop !== 0) {
            $("html").scrollTop(curTop);
        }
        $("body").attr("style", "");      
        $(".popup_bg").fadeOut(300);
        $("[data-popup]").fadeOut(300);
      }
    });
    $(document).on("mouseup", function(e) {
      if($(".popup").is(":visible")) {
        e.preventDefault();
        hide_element = $(".popup_content");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
            curTop = $("body").css("top");
            curTop = Math.abs(parseInt(curTop, 10));
            $("body").removeClass("fixed");
            if (curTop !== 0) {
                $("html").scrollTop(curTop);
            }
            $("body").attr("style", "");    
            $(".popup_bg").fadeOut(300);
            $("[data-popup]").fadeOut(300);
        }
      }
    });

    // --------------

    $(".dr_title").on("click", function(e) {
      e.preventDefault();
      parent = $(this).closest(".dr_parent");
      sl = parent.find(".dr_content");
      if(sl.is(":hidden")) {
        parent.addClass("active");
        sl.slideDown(300);
      } else {               
        sl.slideUp(300);
        parent.removeClass("active");
      }
    });

    // -------------

    $(".respmenubtn").click(function(e) {
      e.preventDefault();
      if( $("#resp_nav").is(":hidden") ) {
          $("#resp_nav").fadeIn(300);
          $(this).addClass("active");
      } else {
          $("#resp_nav").fadeOut(300);
          $(this).removeClass("active");
      }
    });
    
    $(this).keydown(function(eventObject){
        if (eventObject.which == 27 &&
            $("#resp_nav").is(":visible") &&
            bodyWidth <= 767) {
                $("#resp_nav").fadeOut(300);
                $(".respmenubtn").removeClass("active");
        }
    });

    // -------------

    if($("[type='tel']").length > 0) {
        $("[type='tel']").inputmask({"mask": "+7 (999) 999-99-99"});
    }

    // -------------

    $('input[type="file"]').on('change', function() {
        parent = $(this).closest(".input_file_wrapp");
        parent.find(".filenametext").text(this.files[0].name);
    });

    // -------------

    $(".resetPill").on("click", function(e) {
        e.preventDefault();
        form = $(this).closest("form");
        form.find("input, textarea, select").val("");
    });

    // -------------

    $('#regSelect').on('change', function() {
        valActive = $(this).val();
        valFirst = $(this).attr("data-firstval");
        if(valActive != valFirst && valActive != "") {
            $(".first").css({
                "display" : "none"
            });
            $(".second").css({
                "display" : "block"
            });
        } else {
            $(".first").css({
                "display" : "block"
            });
            $(".second").css({
                "display" : "none"
            });
        }
    });

    // var counter=0;
    // var mapZoom;
    // var lat;
    // var long;
    // $(".map").each(function() {
    //     counter++;
    //     $(this).attr("id", 'map'+counter);
    //     mapZoom = $("#map"+counter).attr("data-zoom");
    //     lat = $("#map"+counter).attr("data-lat");
    //     long = $("#map"+counter).attr("data-long");
    //     ymaps.ready(function () {        
    //         var myMap = new ymaps.Map('map'+counter, {
    //             center: [long, lat],
    //             zoom: mapZoom
    //         }, {
    //             searchControlProvider: 'yandex#search'
    //         });
    //         myPlacemark1 = new ymaps.Placemark([long, lat], {
    //             hintContent: ''
    //         }, {
    //         });
    //         myMap.geoObjects.add(myPlacemark1);        
    //     });
    // });

});