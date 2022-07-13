
$(function() {
  //top アコーディオン
  $('.search__tabBox .ac_btn').on('click',function(){
    $(this).toggleClass("open");
    $(this).next('.search__tabBox .ac_content').slideToggle();
  });

  //オンライン
  //アコーディオン
  $('.faq__content .ac_btn').on('click',function(){
    $(this).toggleClass("open");
    $(this).next('.faq__content .ac_content').slideToggle();
  });
  
  $('.exhibition .live .inner ul li span').on('click',function(){
    $('.exhibition .live .inner ul li span').removeClass("active");
    $(this).addClass("active");
    var tabContents = $(this).data("type");
    $('.exhibition .live .inner .tab').removeClass("active");
    $(tabContents).addClass("active");
    return false;
  });
});

