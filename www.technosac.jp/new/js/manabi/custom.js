//タブ
$(function() {
  $(".tabLabel").on("click",function(){
    var index = $('.tabLabel').index(this);
    $('.tabPanel').removeClass('on');
    $('.tabPanel').eq(index).addClass('on');
    $('.tabLabel').removeClass('on');
    $(this).addClass('on')
  });

  //リンク位置
  //別ページから
  $(window).on('load', function() {
    var id    = location.hash;
    var speed = 0;
    var headerHeight = $('header').height();
    if ( '' != id ) {
      if(id.match('air')){
        $('.tabLabel').removeClass('on');
        $('.tabPanel').removeClass('on');
        $('.tabLabel.air').addClass('on');
        $('.tabPanel.air').addClass('on');
      }

      var pos = jQuery( id ).offset().top - headerHeight - 20;
      $('html, body').animate({ scrollTop: pos }, speed );
    }
    console.log(pos);
  });

  $(".ac_btn").on("click",function(){
    $(this).toggleClass("open");
    $(this).next('.ac_content').slideToggle();
  });




});

