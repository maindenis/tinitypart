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
      sl = parent.children(".dr_content");
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

    $(document).on('change', 'input[type="file"]', function(e) {
        parent = $(this).closest(".inpFileWrapp");
        parent.find(".fileName").removeClass("grey");
        parent.find(".fileName").text(this.files[0].name);
    });

    $(document).on('click', '.addFile', function(e) {
        e.preventDefault();
        parent = $(this).closest(".files_list");
        templ = '<div class="file_item inpFileWrapp"><div><p class="fileName grey">Файл не выбран</p></div><div>'+
                           '<label class="file_item_btn fileBtn"><input type="file" />Выбрать файл</label>'+
                        '</div><div><button type="button" class="removeFile"></button></div></div>';
        parent.prepend(templ);
    });

    $(document).on('click', '.removeFile', function(e) {
        e.preventDefault();
        parent = $(this).closest(".file_item");
        parent.remove();
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

    // -----------------

    $(document).on("click", ".checkout_list [data-option-val]",  function(e) {
      e.preventDefault();
      parent = $(this).closest(".custom_select");
      val = $(this).html();
      text = $(this).attr("data-option-val");
      parent.find(".p_val").html(val);
      parent.find("input[type='hidden']").val(text);
      parent.removeClass("active");
      parent.find("[data-option-val]").removeClass("active");
      $(this).addClass("active");
    });

    $(document).on("click", ".custom_select .custom_select_title", function(e) {
      e.preventDefault();
      parent = $(this).closest(".custom_select");
      if(parent.hasClass("active")) {
        parent.removeClass("active");
      } else {
        $(".custom_select").removeClass("active");
        parent.addClass("active");
      }
    });

    $(document).mouseup(function(e) {
      hide_element = $(".custom_select");
      if (!hide_element.is(e.target)
          && hide_element.has(e.target).length === 0) {
          hide_element.removeClass("active");
        }
    });

    $(this).keydown(function(eventObject){
      if (eventObject.which == 27) {
        $(".custom_select").removeClass("active");
      }
    });

    // -------------

    new AirDatepicker('#date1', {});

    new AirDatepicker('#date2', {});

    // -------------

    $(".ch_childrens input").on("change", function() {
      parentBlock = $(this).closest(".checkboxes_array");
      chChildrens = parentBlock.find(".ch_childrens input");
      mainCheckbox = parentBlock.find(".main_checkbox input");
      chChildrens.each(function() {
        if (!$(this).is(":checked")) {
          mainCheckbox.prop("checked", false);
          return false;
        } else {
          mainCheckbox.prop("checked", true);
        }
      });
      getPrice(parentBlock);
    });

    $(".main_checkbox input").on("change", function() {
      parentBlock = $(this).closest(".checkboxes_array");
      chChildrens = parentBlock.find(".ch_childrens input");
      if (!$(this).is(":checked")) {
        chChildrens.prop("checked", false);
      } else {
        chChildrens.prop("checked", true);
      }
    });

    // -----------

    $(".count_box button").click(function(e) {
        e.preventDefault();
        parentBlock = $(this).closest(".count_box");
        var countInput = parentBlock.find("input");
        var countVal = countInput.val();
        if( $(this).hasClass("minus_btn") && countVal > 1 ) {
            countVal--;
        } else if( $(this).hasClass("plus_btn")) {
            countVal++;
        }
        if(countVal == "") {
            countVal = 1;
        }
        countInput.val(countVal);
    });

    // ------------

    $(".rest_btn").on("click", function(e) {
        e.preventDefault();
        parent = $(this).closest(".custom_select");
        parent.find("input").val("");
        parent.find(".p_val").text("");
    });

    // ------------

    counter = 0;
    $(".sidebar > .dropdown_item").each(function() {
        counter = 1;
        paddingLeft = parseInt($(this).children(".dr_title").css("padding-left"));
        $(this).find(".dropdown_item").each(function() {
            counter++;
            $(this).children(".dr_title").css({
                "padding-left" : paddingLeft*counter + "px"
            });
            $(this).children(".dr_content").children("ul").find("a").css({
                "padding-left" : paddingLeft*(counter+1) + "px"
            });
        });
    });

    // ------------

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