function getRespParams() {
    if($(document).scrollTop() > $(".header_site").height()) {
        $(".btn_top").fadeIn(300);
    } else {
        $(".btn_top").fadeOut(300);
    }
}

function getWrapperOffset() {
    if(bodyWidth <= 900) {
        $(".wrapper").css({
            "padding-top" : "auto"
        });
        $(".wrapper").css({
            "padding-top" : $("#headerSite").height() + "px"
        });
        // console.log($("#headerSiteResp").height());
    } else {
        $(".wrapper").css({
            "padding-top" : 0
        });
    }
}

var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

$(window).resize(function() {
    bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;
    getRespParams();
    getWrapperOffset();
});

$(document).scroll(function() {
    getRespParams();
});

$(document).ready(function() {
    getRespParams();
    getWrapperOffset();

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

    if( $(".brand_slider").length > 0 ) {
        $(".brand_slider").not(".slick-initialized").slick({
            dots: false,
            arrows: true,
            // autoplay: true,
            autoplaySpeed: 4000,
            speed: 2000,
            variableWidth: true,
            slidesToShow: 1,
            slidesToScroll: 3,
            rows: 2,
            prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">'+
                        '<path d="M6.12335 0L0 6.0001L6.12335 12L7.95277 10.1267L3.74133 6.0001L7.95277 1.8733L6.12335 0Z" fill="#262728"/>'+
                        '</svg></button>',
            nextArrow: '<button class="slick-next" aria-label="Next" type="button"><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">'+
                        '<path d="M1.87665 0L8 6.0001L1.87665 12L0.0472331 10.1267L4.25867 6.0001L0.0472331 1.8733L1.87665 0Z" fill="#262728"/></svg></button>',
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
    $(document).on("click", ".close, .popup_bg, .close_2", function(e) {
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
    if($("#date1").length > 0) {
        new AirDatepicker('#date1', {});
    }
    if($("#date2").length > 0) {
        new AirDatepicker('#date2', {
            position: 'bottom right'
        });
    }
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

    $("#respBtn").on("click", function(e) {
        e.preventDefault();
        if($("#respNav").is(":hidden")) {
            $("#respNav").fadeIn(300);
        } else {
            $("#respNav").fadeOut(300);
        }        
    });

    $("#respSearchBtn").on("click", function(e) {
        e.preventDefault();
        $("#respSearch").toggleClass("active");
    });

    $(".filters_dr_btns a").on("click", function(e) {
        e.preventDefault();
        id=$(this).attr("href");
        $(".respDr").slideUp(300);
        if($(id).is(":hidden")) {
            $(id).slideDown(300);
        } else {
            $(id).slideUp(300);
        }
    });

    $(this).keydown(function(eventObject){
      if (eventObject.which == 27) {
        $("#respNav").fadeOut(300);
        $("#respSearch").removeClass("active");
      }
    });

    // ------------

    $(".time_btn").on("click", function(e) {
        e.preventDefault();
        if($("#searchTimeNav").is(":hidden")) {
            $("#searchTimeNav").fadeIn(300);
        } else {
            $("#searchTimeNav").fadeOut(300);
        }
    });

    $(".search_time_nav_bg, .search_time_nav .close").on("click", function(e) {
        e.preventDefault();
        $("#searchTimeNav").fadeOut(300);
    });

    $(this).keydown(function(eventObject){
      if (eventObject.which == 27) {
        $("#searchTimeNav").fadeOut(300);
      }
    });

    // ------------

    $(".resetBtn").on('click', function(e) {
        e.preventDefault();
        parent = $(this).closest("form");
        jQuery(parent)[0].reset();
        parent.find(".p_val").text("");
    });

    // ------------

    $(".hide_link").on("click", function(e) {
        e.preventDefault();
        parent = $(this).closest(".hide_box");
        sl = parent.find(".hideSl");
        if(sl.is(":hidden")) {
            sl.slideDown(300);
            parent.removeClass("hide");
        } else {
            sl.slideUp(300);
            parent.addClass("hide");
        }
    });

    // ------------

    if($('.popup_slider').length > 0) {
        $('.popup_slider').not(".slick-initialized").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          fade: true,
          asNavFor: '.popup_slider_miniature',
          prevArrow: '<button class="slick-prev popup_arrow" aria-label="Previous" type="button"><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">'+
                        '<path d="M6.12335 0L0 6.0001L6.12335 12L7.95277 10.1267L3.74133 6.0001L7.95277 1.8733L6.12335 0Z" fill="#262728"/>'+
                        '</svg></button>',
            nextArrow: '<button class="slick-next popup_arrow" aria-label="Next" type="button"><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">'+
                        '<path d="M1.87665 0L8 6.0001L1.87665 12L0.0472331 10.1267L4.25867 6.0001L0.0472331 1.8733L1.87665 0Z" fill="#262728"/></svg></button>',
        });
    }
    if($('.popup_slider_miniature').length > 0) {
        $('.popup_slider_miniature').not(".slick-initialized").slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          asNavFor: '.popup_slider',
          dots: false,
          arrows: false,
          focusOnSelect: true,
          variableWidth: true
        });
    }

    // ------------

    $(".tab_radio").each(function() {
        if($(this).is(":checked")) {
            attr = $(this).attr("id");
            $("[for = '"+attr+"']").addClass("active");
        }
    });

    $(".tab_link").on("click", function(e) {
        parent = $(this).closest(".tabs_links");
        parent.find(".tab_link").removeClass("active");
        $(this).addClass("active");
    });

    // ------------

    $(".hide_block_wrapp .blue_pill").on("click", function(e) {
        e.preventDefault();
        parent = $(this).closest(".hide_block_wrapp");
        sl = parent.find(".hide_block");
        if(sl.is(":hidden")) {
            sl.slideDown(300);
        } else {
            sl.slideUp(300);
        }
    });

    // ------------

    $(".rest_pill").on('click', function(e) {
        e.preventDefault();
        parent = $(this).closest("form");
        jQuery(parent)[0].reset();
        parent.find(".p_val").text("");
    });

    // ------------

    $(".showBlocks").on('click', function(e) {
        e.preventDefault();
        parent = $(this).closest(".tab");
        sl = parent.find(".hideBlock");
        if(sl.is(":hidden")) {
            sl.slideDown(300);
        } else {
            sl.slideUp(300);
        }
    });

    // ------------

    $("[data-chname]").on('click', function(e) {
        e.preventDefault();
        val = $(this).attr("data-valoption");
        ch = $("[name='"+$(this).attr("data-chname")+"']");
        if(val == 1 || val == true) {
            $(ch).prop("checked", true);
        } else {
            $(ch).prop("checked", false);
        }
    });

    // ------------

    $(".opt_ch").on("change", function(e) {
        e.preventDefault();
        $(".card_table").toggleClass("opt");
    });

    // ------------

    $(".dr_t_btn").on('click', function(e) {
        e.preventDefault();
        parent = $(this).closest(".row_wrapp");
        sl = parent.find(".balance_table_main_row_dr");
        if(sl.is(":hidden")) {
            sl.slideDown(300);
            parent.addClass("active");
        } else {
            sl.slideUp(300);
            parent.removeClass("active");
        }
    });

    // ------------

    if($(".chart_miniuature").length > 0) {
        $(".chart_miniuature").each(function() {
            var chart = $(this);
            var data = {
              series: [5, 3]
            };
            var sum = function(a, b) { return a + b };
            new Chartist.Pie(this, data, {
              labelInterpolationFnc: function(value) {
                return Math.round(value / data.series.reduce(sum) * 100) + '%';
              }
            });
        });
    }

    // ------------

    $(".sort_title").on("click", function(e) {
        e.preventDefault();
        var sortArr = [];
        var total;
        $(this).toggleClass("up");
        parentTable = $(this).closest(".sortTable");
        sortBox = parentTable.find(".sortBox");
        sortBox.find(".sortRow").removeClass("novisible");
        cellIndex = $(this).closest(".cell").index();        
        sortBox.find(".sortRow").each(function() {
            sortVal = $(this).find(".cell:eq("+cellIndex+") [data-sortval]").attr("data-sortval");
            sortArr.push(sortVal);
        });
        if($(this).hasClass("up")) {
            sortRes = sortArr.sort();
        } else {
            sortRes = sortArr.sort((a, b) => b - a);
        }
        var counter = 0;
        sortRes.forEach(function(entry) {
            sortBox.find(".sortRow").each(function() {
                sortVal = $(this).find(".cell:eq("+cellIndex+") [data-sortval]").attr("data-sortval");
                if(sortVal == entry) {
                    $(this).appendTo(sortBox);
                }
            });
        });
        if($(".showRows").length > 0) {        
            visibleRow = sortBox.attr("data-visiblerows");
            counter = 0;
            sortBox.find(".sortRow").each(function() {
                counter++;
                if(counter > visibleRow) {
                    $(this).addClass("novisible");
                }
            });
        }
    });

    $(".t_input").on("keyup", function() {
        var input, filter, ul, li, a, i, txtValue;
        input = this;
        parentTable = $(this).closest(".sortTable");
        cellIndex = $(this).closest(".cell").index();
        ul = parentTable.find(".sortBox");
        li = ul.find(".sortRow");
        filter = input.value.toUpperCase();
        parentTable.find(".sortRow").each(function() {
            a = $(this).find(".cell:eq("+cellIndex+")").attr("data-filter");
            if (a.toUpperCase().indexOf(filter) > -1) {
                $(this).removeClass("hide");
            } else {
                $(this).addClass("hide");
            }
        });
    });

    // ------------

    $(".showRows").on("click", function(e) {
        e.preventDefault();
        parent = $(this).closest(".sortTable");
        parent.find(".sortRow").removeClass("novisible");
        $(this).remove();
    });

    // ------------

    $('.right_table_rows a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      var hrefAttr = $(this).attr("href");
      $(this).addClass("active");
      if($(hrefAttr).length == 0) {
        location.href='/'+hrefAttr;
      } else {
          if( hrefAttr.length > 0 && hrefAttr != "#" ) {
              $('html, body').stop().animate({
                  'scrollTop': $(hrefAttr).offset().top-10
              }, 500);
          }
      }
    });

    // ------------

    $("#rightTableLink").on('click', function (e) {
      e.preventDefault();
      $("#rightTableParent").toggleClass("visible");
    });

    $("#rightTable .close").on('click', function (e) {
      e.preventDefault();
      parent = $(this).closest("#rightTableParent");
      parent.removeClass("visible");
    });

    $(this).keydown(function(eventObject){
      if (eventObject.which == 27) {
        $("#rightTableParent").removeClass("visible");
      }
    });

    $(document).mouseup(function(e) {
      hide_element = $("#rightTableParent");
      if (!hide_element.is(e.target)
          && hide_element.has(e.target).length === 0) {
          hide_element.removeClass("visible");
        }
    });


    // ------------

    // var counter=0;
    // var mapZoom;
    // var lat;
    // var long;
    // $(".map").each(function() {
    //     counter++;
    //     $(this).attr("id", 'map'+counter);
    // });
    // var counter=0;
    // $(".map").each(function() {
    //     ymaps.ready(function () {
    //         counter++;      
    //         mapZoom = $("#map"+counter).attr("data-zoom");
    //         lat = $("#map"+counter).attr("data-lat");
    //         long = $("#map"+counter).attr("data-long");   
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