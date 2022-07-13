

//viewport
const ua = navigator.userAgent;
if((ua.indexOf('iPhone') > 0) || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)){
  $('head').prepend('<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=2,shrink-to-fit=no" />');


} else {
  $('head').prepend('<meta name="viewport" content="width=1024">');

}

  var ww = window.innerWidth;

  if (ww > 768) {
    // PCのとき実行

    $(window).on("scroll", function() {
      documentHeight = $(document).height();
      scrollPosition = $(this).height() + $(this).scrollTop();
      footerHeight =  $("footer").outerHeight();

      if (documentHeight - scrollPosition <= footerHeight - 90) {
        $(".gotop").css({
          position: "absolute",
          bottom: footerHeight - 90
        });
      } else {
        $(".gotop").css({
          position: "fixed",
          bottom: 40
        });
      }
    });
    //OC 参加申し込みボタン
    $(window).on("scroll", function() {
      documentHeight = $(document).height();
      scrollPosition = $(this).height() + $(this).scrollTop();
      footerHeight =  $("footer").outerHeight();

      if (documentHeight - scrollPosition <= footerHeight - 30) {
        $(".ocsanka").css({
          position: "absolute",
          bottom: footerHeight - 30
        });
      } else {
        $(".ocsanka").css({
          position: "fixed",
          bottom: 70
        });
      }
    });



    //mega menu
    $('.sideMenu__megamenu > li').hover(function(){
      $(this).children('.sideMenu__megamenuChild').stop().fadeToggle();
      //$(this).toggleClass('current');
  });



  } else {
    $('header .spBtn').click(function () {
      $(this).toggleClass('open');
      $('.navWrap').fadeToggle();
    });

    //mega menu
    $('header .sideMenu__megamenu .open').click(function () {
      $(this).toggleClass('opened');
      $(this).next('.sideMenu__megamenuChild').stop().slideToggle();
    });
  }
    //OC ポイント詳細表示用
    $(function(){
      $('.detailBt').click(function(){
        $(this).toggleClass('selected');
        $($(this).parent().attr('data-content')).slideToggle();
      });
    });



$(function() {

   //gotop
  const topBtn = $('.gotop');
  topBtn.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });
  topBtn.click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 500);
    return false;
  });

   //ocsanka
   const sankaBtn = $('.ocsanka');
   sankaBtn.hide();
   $(window).scroll(function () {
     if ($(this).scrollTop() > 100) {
       sankaBtn.fadeIn();
     } else {
       sankaBtn.fadeOut();
     }
   });



  //unker
  const headerHeight = $('.topMenu').outerHeight() + 30;
    const urlHash = location.hash;
    if(urlHash && urlHash !== '#index_cal') {

      $('body,html').stop().scrollTop(0);

      //IE判別
      var ua = window.navigator.userAgent.toLowerCase();
      var isIE = (ua.indexOf('msie') >= 0 || ua.indexOf('trident') >= 0);

      //IEだった場合
		  if (isIE) {
        setTimeout(function(){
          var target = $(urlHash);
            var position = target.offset().top-headerHeight;
            $('body,html').stop();
        },500);

      } else {
        //IE以外

        setTimeout(function(){
            var target = $(urlHash);
            var position = target.offset().top-headerHeight-20;
            $('body,html').stop().animate({scrollTop:position}, 500);
        }, 100);
      }



    }

  if($('.news__important').length == 0){
    if($('.mainV__left').length){
      $('.mainV__left').addClass('noneImportant')
    }
  }

  $('a[href^="#"]').not('a.notscroll').click(function(){
    var speed = 500;
    var headerHeight = 60;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top-headerHeight;
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
  });


  if($('.importantNews').length){
    $('.importantNews__ttl').click(function () {
      $(this).next().stop().slideToggle();
      $(this).toggleClass('open');
    });

    $('.importantNews__close span').click(function () {
      $('.importantNews__cont').stop().slideUp();
      $('.importantNews__ttl').removeClass('open');
    });

    //範囲外
    $(document).on('click touchend', function(event) {
      // 表示したポップアップ以外の部分をクリックしたとき
      if (!$(event.target).closest('.importantNews').length) {
        $('.importantNews__cont').stop().slideUp();
        $('.importantNews__ttl').removeClass('open');
      }
    });
  }

  if($('.topPage').length){
    //index left slider
    $(".mainV__left ul.top").each(function() {
      $(this).slick({
        autoplay: true,
        arrows: false,
        dots: false,
        infinite: false,
        speed: 2000,
        fade: true,
        swipe: false,
        touchMove: false,
        pauseOnHover: false,
        pauseOnFocus: false,
      })
      .on('afterChange', function(evt, slick, currentSlide) {
        // currentSlide は現在のスライドのインデックス 0 からカウント
        var slideCount = slick.slideCount - 1;
        if(slideCount === currentSlide) {
          $(this).slick('slickPause');
        }
      });
    });

    //air-eng left
    $(".mainV__left ul.mainV__topic").each(function() {
      $(this).slick({
        autoplay: true,
        arrows: true,
        dots: false,
        infinite: true,
        speed: 2000,
        fade: true,
        rows:2,
        slidesPerRow:2,
      })
    });

    //index right newsSlider
    $(".mainV__newsSlider ul").each(function() {
      $(this).slick({
        autoplay: true,
        arrows: true,
        dots: true,
        infinite: true,
        speed: 2000,
      })
    });
  }

  if($('.renewTop').length){

    //index right newsSlider
    $(".renewTop__slide ul").each(function() {
      $(this).slick({
        autoplay: true,
        arrows: true,
        dots: true,
        infinite: true,
        speed: 2000,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
            }
          }
        ]
      })
    });

    $(".renewTop__topicsList").each(function() {
      $(this).slick({
        autoplay: true,
        arrows: true,
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 3,
        variableWidth: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              dots: true,
            }
          }
        ]
      })
    });
  }

  if($('.ocTop').length){

    //index right newsSlider
    $(".ocTop__slide ul").each(function() {
      $(this).slick({
        autoplay: true,
        arrows: true,
        dots: true,
        infinite: true,
        speed: 2000,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
            }
          }
        ]
      })
    });

    $('.flow-tab li').click(function() {
      var index = $('.flow-tab li').index(this);
      $('.flowCont > div').css('display','none');
      $('.flowCont > div').eq(index).fadeIn("slow");
      $('.flow-tab li').removeClass('active');
      $(this).addClass('active')
    });

    //$("#sec03 .sec03-02 .inner2 .slide ul.flow-slide").each(function() {
    //$(this).slick({
    $(document).ready(function(){
      var slider = $('#sec03 .sec03-02 .inner2 .slide ul.flow-slide');
      slider.slick({
      autoplay: true,
      arrows: true,
      dots: true,
      infinite: true,
      speed: 2000,
      responsive: [
          {
            breakpoint: 768,
              settings: {
                arrows: false,
            }
          }
        ]
      });
      //タブ切り替えでdisplay:none;すると崩れるためsetPositionをクリック時に発火
      $('.flow-tab li').click(function () {
        slider.slick('setPosition');
      });
    });



    $(".ocTop__topicsList").each(function() {
      $(this).slick({
        autoplay: true,
        arrows: true,
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 3,
        variableWidth: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              dots: true,
            }
          }
        ]
      })
    });
    $("#calendar ul").each(function() {
      $(this).slick({
        infinite: false,
        fade: true,
        autoplay: false,
        speed: 500,
        arrows: true,
        dots: false,
        swipe: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnFocus: false,
        pauseOnHover: false,
        prevArrow:'<a id="cal_prev_btn" class="cal--button prev" href="javascript:void(0);">Prev</a>',
        nextArrow:'<a id="cal_nextv_btn" class="cal--button next" href="javascript:void(0);">Next</a>',
        responsive: [
          {
            breakpoint: 768,
            settings: {
              swipe: true
            }
          }
        ]
      })
    });
  }
  function FixedAnime() {
    var headerH = $('.oc-head').outerHeight(true);
    var scroll = $(window).scrollTop();
    if (scroll >= headerH){//headerの高さ以上になったら
        $('.ocTop__navi').addClass('fixed');//fixedというクラス名を付与
      }else{//それ以外は
        $('.ocTop__navi').removeClass('fixed');//fixedというクラス名を除去
      }
  }
  $(window).scroll(function () {
    FixedAnime();/* スクロール途中からヘッダーを出現させる関数を呼ぶ*/
  });


  $(function(){
    $('.modal-container .modal-body').hide();
    // 変数に要素を入れる
    var open = $('.modal-open'),
      close = $('.modal-close'),
      container = $('.modal-container');

    //開くボタンをクリックしたらモーダルを表示する
    open.on('click',function(){
      var target = $(this).children().data('target');
      container.addClass('active');
      $('#'+target).show();
      return false;
    });

    //閉じるボタンをクリックしたらモーダルを閉じる
    close.on('click',function(){
      container.removeClass('active');
      $('.modal-container .modal-body').hide();
    });

    //モーダルの外側をクリックしたらモーダルを閉じる
    $(document).on('click',function(e) {
      if(!$(e.target).closest('.modal-body').length) {
        container.removeClass('active');
        $('.modal-container .modal-body').hide();
      }
    });
  });

  // /OC/
  if($('.accordion').length){
    $('.accordion h3').click(function () {
      $(this).toggleClass('open');
      $(this).next().slideToggle();
    });
  }


  if($('.news__search').length){
    $('.news__search>dt').click(function () {
      $(this).toggleClass('open');
      $(this).next().slideToggle();
    });
  }
  // /prospective/
  // if($('.prospective__slider').length){
  //   $(".prospective__slider ul").each(function() {
  //     $(this).slick({
  //       autoplay: true,
  //       arrows: true,
  //       dots: true,
  //       infinite: true,
  //       speed: 2000,
  //     })
  //   });
  // }
  // /current/
  if($('.current__newsList').length){
    $('.current__newsList h3').click(function () {
      $(this).toggleClass('open');
      $(this).next().slideToggle();
    });
  }

  //graduates
  if($('.graduates__about').length){
    $('.graduates__about h2').click(function () {
      $(this).toggleClass('open');
      $(this).next().slideToggle();
    });
  }
  // common
  if($('.forPage__faq').length){
    $('.forPage__faq dt').click(function () {
      $(this).toggleClass('open');
      $(this).next().slideToggle();
    });
  }

  //ocTop
  if($('.oc--top').length){
    $(".oc__slider ul").each(function() {
      $(this).slick({
        autoplay: true,
        arrows: false,
        dots: true,
        infinite: true,
        speed: 2000,
        swipe: false,
      })
    });

    $('.oc__calendarTab li').click(function() {
      var index = $('.oc__calendarTab li').index(this);
      $('.oc__calendarCont > div').css('display','none');
      $('.oc__calendarCont > div').eq(index).fadeIn("slow");
      $('.oc__calendarTab li').removeClass('active');
      $(this).addClass('active')
    });


  }

  //gakka
  if($('.gakka__vision').length){
    $('.gakka__visionIntroTagBtn').click(function () {
      $(this).toggleClass('open');
      $('.gakka__visionCont').slideToggle();
    });
  }
  if($('.gakka__faq').length){
    $('.gakka__faq dt').click(function () {
      $(this).toggleClass('open');
      $(this).next().slideToggle();
    });
  }

  //campuslife
  if($('.studentBook').length){
    $(".modalCont").iziModal({
      loop: true,
      width: '960px',
      navigateArrows: false,
      arrowKeys: false,
      navigateCaption: false,
      radius: '0',
    });
  }


  if($('.ocLearning').length){
    $('.ocLearning__listListTitle').matchHeight();
    $('.ocLearning__listListTxt').matchHeight();
  }
  if($('.gakka__openBgInnerFlex').length){
    $('.gakka__openBgInnerFlexTitle').matchHeight();
    $('.gakka__openBgInnerFlex li figure').matchHeight();
  }


});
