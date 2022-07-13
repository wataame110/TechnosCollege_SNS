
/*--------------------------------------------------------------------------*
 *  
 *  SmoothScroll JavaScript Library V2
 *  
 *  MIT-style license. 
 *  
 *  2007-2011 Kazuma Nishihata 
 *  http://www.to-r.net
 *  
 *--------------------------------------------------------------------------*/
 
new function(){

  var attr ="data-tor-smoothScroll";//for html5 , if you can't use html5 , this value change "class"
  var attrPatt = /noSmooth/;
  var d = document;//document short cut
  
  /*
   *add Event
    -------------------------------------------------*/
  function addEvent(elm,listener,fn){
    try{ // IE
      elm.addEventListener(listener,fn,false);
    }catch(e){
      elm.attachEvent(
        "on"+listener
        ,function(){
          fn.apply(elm,arguments)
        }
      );
    }
  }

  /*
   *Start SmoothScroll
    -------------------------------------------------*/
  function SmoothScroll(a){
    if(d.getElementById(a.rel.replace(/.*\#/,""))){
      var e = d.getElementById(a.rel.replace(/.*\#/,""));
    }else{
      return;
    }
    
    //Move point
    var end=e.offsetTop
    var docHeight = d.documentElement.scrollHeight;
    var winHeight = window.innerHeight || d.documentElement.clientHeight
    if(docHeight-winHeight<end){
      var end = docHeight-winHeight;
    }
    
    //Current Point
    var start=window.pageYOffset || d.documentElement.scrollTop || d.body.scrollTop || 0;
    
    end += -100;
    var flag=(end<start)?"up":"down";

    function scrollMe(start,end,flag) {
      setTimeout(
        function(){
          if(flag=="up" && start >= end){
            start=start-(start-end)/20-1;
            window.scrollTo(0,start)
            scrollMe(start,end,flag);
          }else if(flag=="down" && start <= end){
            start=start+(end-start)/20+1;
            window.scrollTo(0,start)
            scrollMe(start,end,flag);
          }else{
            scrollTo(0,end);
          }
          return ;
        }
        ,10
      );
      
    }

    scrollMe(start,end,flag);
    
  }

  /*
   *Add SmoothScroll
    -------------------------------------------------*/
  addEvent(window,"load",function(){
    var anchors = d.getElementsByTagName("a");
    for(var i = 0 ,len=anchors.length; i<len ; i++){
      if(!attrPatt.test(anchors[i].getAttribute(attr)) && 
        anchors[i].href.replace(/\#[a-zA-Z0-9_]+/,"") == location.href.replace(/\#[a-zA-Z0-9_]+/,"")){
        anchors[i].rel = anchors[i].href;
        anchors[i].href = "javascript:void(0)";
        anchors[i].onclick=function(){SmoothScroll(this)}
      }
    }
  });

}



//Rollover PCのみ
if(!navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)){
  function smartRollover() {
  	if(document.getElementsByTagName) {
  		var images = document.getElementsByTagName("img");

  		for(var i=0; i < images.length; i++) {
  			if(images[i].getAttribute("src").match("_off."))
  			{
  				images[i].onmouseover = function() {
  					this.setAttribute("src", this.getAttribute("src").replace("_off.", "_on."));
  				}
  				images[i].onmouseout = function() {
  					this.setAttribute("src", this.getAttribute("src").replace("_on.", "_off."));
  				}
  			}
  		}
  	}
  }

  if(window.addEventListener) {
  	window.addEventListener("load", smartRollover, false);
  }
  else if(window.attachEvent) {
  	window.attachEvent("onload", smartRollover);
  }


  // cross fade
  new function(){
    function setRollOver2(){
      if(!document.images){return;}
      var imgs = document.images;
      var insert = [];
      for(var i=0;i<imgs.length;i++){
        var splitname = imgs[i].src.split('_off.');
        if((splitname[1])&&(imgs[i].parentNode.tagName=='A')){
          var rolloverImg = document.createElement('img');
          rolloverImg.src = splitname[0]+'_on.'+splitname[1];
          var alpha = 0;
          rolloverImg.currentAlpha = alpha;
          rolloverImg.style.opacity = alpha/100;
          rolloverImg.style.filter = 'alpha(opacity='+alpha+')';
          rolloverImg.style.position = 'absolute';


          addEvent(rolloverImg,'mouseover',function(){setFader(this,100);});
          addEvent(rolloverImg,'mouseout',function(){setFader(this,0);});

          insert[insert.length] = {position:imgs[i],element:rolloverImg};
        }
      }
      for(var i=0;i<insert.length;i++){
        var parent = insert[i].position.parentNode;
        parent.insertBefore(insert[i].element,insert[i].position);
      }
    }


    function setFader(targetObj,targetAlpha){
      targetObj.targetAlpha = targetAlpha;
      if(targetObj.currentAlpha==undefined){
        targetObj.currentAlpha = 100;
      }
      if(targetObj.currentAlpha==targetObj.targetAlpha){
        return;
      }
      if(!targetObj.fading){
        if(!targetObj.fader){
          targetObj.fader = fader;
        }
        targetObj.fading = true;
        targetObj.fader();
      }
    }

    function fader(){
      this.currentAlpha += (this.targetAlpha - this.currentAlpha)*0.2;
      if(Math.abs(this.currentAlpha-this.targetAlpha)<1){
        this.currentAlpha = this.targetAlpha;
        this.fading = false;
      }
      var alpha = parseInt(this.currentAlpha);
      this.style.opacity = alpha/100;
      this.style.filter = 'alpha(opacity='+alpha+')';
      if(this.fading){
        var scope = this;
        setTimeout(function(){fader.apply(scope)},0.2);
      }
    }

    function addEvent(eventTarget, eventName, func){
      if(eventTarget.addEventListener){
        eventTarget.addEventListener(eventName, func, false);
      }else if(window.attachEvent){
        // IE
        eventTarget.attachEvent('on'+eventName, function(){func.apply(eventTarget);});
      }
    }

    addEvent(window,'load',setRollOver2);

  }

}//ここまでPCのみ

//TEL番号
$(function(){
    var ua = navigator.userAgent;
    if(ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0){
        $('.tel-link').each(function(){
            var str = $(this).text();
            $(this).html($('<a>').attr('href', 'tel:' + str.replace(/-/g, '')).append(str + '</a>'));
        });
    }
});



//TOPに戻る
$(function() {
    var showFlag = false;
    var topBtn = $('#gotop');    
    topBtn.css('bottom', '-100px');
    var showFlag = false;
    //スクロールが100に達したらボタン表示
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            if (showFlag == false) {
                showFlag = true;
                topBtn.stop().animate({'bottom' : '55px'}, 200); 
            }
        } else {
            if (showFlag) {
                showFlag = false;
                topBtn.stop().animate({'bottom' : '-100px'}, 200); 
            }
        }
    });
    //スクロールしてトップ
    topBtn.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});



//高さそろえ
    $(function() {
        $('.match').matchHeight();
        $('header .onlySP .main_nav li').matchHeight();
        $('.undermenu.onlySP ul li').matchHeight();
        $('div.experience_wrap div#year_schedule dl dd .box').matchHeight();
        $('.gakka_cont .gakka_list li').matchHeight();
        $('.gakka_course_list dl').matchHeight();
        $('.gakka_cont .point .box').matchHeight();
        $('.course_list div.cf  div.box div.box_inner dl').matchHeight();
        $('.course_list div.cf  div.box h4').matchHeight();
        $('.course_list div.cf  div.box p.match').matchHeight();
        $('.gakka_cont .ele_pd01').matchHeight();
        $('.gakka_cont .ele_block01').matchHeight();



        $('#ao .block01>div').matchHeight();
        $('#club .block01 div.cf div p').matchHeight();
        $('.recruit_wrap .cf .box').matchHeight();
        $('#schedule .sche_box .special').matchHeight();
        $('#schedule .sche_box .special .spetitle').matchHeight();
        $('#tour .setsumeikai').matchHeight();
    });


//SP menu
$(function() {
  $(".menu_btn").click(function() {
    $(".nav_inner").slideToggle(200);
    $(".menu_btn").toggleClass("close");
    return false;
  });
});


//狭い時のヘッダー
var windowWidth = $(window).width();
var windowSm = 999;
if (windowWidth <= windowSm) {
   $(function(){
        $("header div.inner.cf nav div.nav_inner.cf dl.menulist dt").on("click", function() {
            $(this).next("dd").slideToggle();
            $(this).toggleClass("active");
        });
    });
} else {}



//アコーディオン
$(function(){
        $(".acc").on("click", function() {
            $(this).next().slideToggle();
            $(this).toggleClass("active");
        });
    });


//ふわっと出す
$(function() {
  $('.mv').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
    if(isInView){
      $(this).stop().addClass('mv_on');
    }
    else{
      //$(this).stop().removeClass('mv_on');
    }
  });
});


//高さ取得してメインビジュアルに対応
$(window).load(function() {
	if($(window).width() <= 640){
		h = $('#mainvisual img.bg.onlySP').height();
	} else {
		h = $('#mainvisual img.bg').height();
	}
	$("#mainvisual").css("height", h + "px");
});
$(window).resize(function() {
	if($(window).width() <= 640){
		h = $('#mainvisual img.bg.onlySP').height();
	} else {
		h = $('#mainvisual img.bg').height();
	}
	$("#mainvisual").css("height", h + "px");
});



//new pc
$(function() {
 $('.stiky .news p.ttl,.stiky .news_inner p.close').on('click', function () {
  $(this).toggleClass('open');
  $('.stiky .news_inner,.stiky ul.left_list li').toggleClass('open');
 });
});


//news sp
$(function() {
 $('div.oc_btn p.news_btn,.news_inner p.close').on('click', function () {
  $('div.oc_btn div.news_inner').fadeToggle();
  $('div.oc_btn').toggleClass('z999');
 });
});


//OCページ・年間スケジュール
 $(function(){
       $(".experience_wrap #year_schedule dl dt").on("click", function() {
            $(this).next().slideToggle();
            $(this).toggleClass("active");
        });
    });


 $(function() {
        var showFlag = false;
        var topBtn = $('.oc_btn');    
        topBtn.css('bottom', '-100px');
        var showFlag = false;
        //スクロールが100に達したらボタン表示
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                if (showFlag == false) {
                    showFlag = true;
                    topBtn.stop().animate({'bottom' : '5px'}, 200); 
                }
            } else {
                if (showFlag) {
                    showFlag = false;
                    topBtn.stop().animate({'bottom' : '-100px'}, 200); 
                }
            }
        });
    });


 //消えるバナー
  $(function() {
        var showFlag = false;
        var topBtn = $('.foot_bnr_area');    
        topBtn.css('opacity', '1');
        var showFlag = false;
        //スクロールが100に達したらボタン表示
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                if (showFlag == false) {
                    showFlag = true;
                    topBtn.stop().animate({'opacity' : '0'}, 200); 
                    topBtn.css("visibility", "hidden");
                }
            } else {
                if (showFlag) {
                    showFlag = false;
                    topBtn.css("visibility", "unset");
                    topBtn.stop().animate({'opacity' : '1'}, 200); 
                }
            }
        });
    });




//レスポンシブイベント
  var windowWidth = $(window).width();
  var windowSp = 768;
  if (windowWidth <= windowSp) {
    //スマホ処理



  } else {
    //PC処理
        //スクロールでふわっと出す
$(function() {
    var topBtn = $('.top_wrap #bnr ,.stiky');    
    topBtn.hide();
    //スクロールが100に達したらボタン表示
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            topBtn.fadeIn();
        } else {
            topBtn.fadeOut();
        }
    });
});
  }




//スマホ
$(function(){
// 設定
var $interval = 6000; // 切り替わりの間隔（ミリ秒）
var $fade_speed = 4000; // フェード処理の早さ（ミリ秒）
$("#fade_sp ul li").css({"position":"relative","overflow":"hidden","width":"100vw","height":"100%"});
$("#fade_sp ul li").hide().css({"position":"absolute","top":0,"left":0});
$("#fade_sp ul li:first").addClass("active").show();
setInterval(function(){
var $active = $("#fade_sp ul li.active");
var $next = $active.next("li").length?$active.next("li"):$("#fade_sp ul li:first");
$active.fadeOut($fade_speed).removeClass("active");
$next.fadeIn($fade_speed).addClass("active");
},$interval);
});





//体験スライド


//ダンスパークフォームアコーディオン
$(function(){
    $(".dance_accordion").on("click", function() {
        $(this).next().slideToggle();
        $(this).toggleClass("active");
    });
});

//学科FAQアコーディオン
$(function(){
  $('.gakka_cont .ac_btn').on('click',function(){
    $(this).toggleClass("open");
    $(this).next('.gakka_cont .ac_content').slideToggle();
  });
});
