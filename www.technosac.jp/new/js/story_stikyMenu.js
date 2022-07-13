
window.onload=function() {

  var contentHeight = $(".content").height();
  var sidebarHeight = $(".subBlock dl").height();
  var w = $(window);

  if(sidebarHeight < contentHeight) {

    $(".subBlock").css("height", contentHeight);

    var sidebarSub = $(".subBlock dl");
    var sidebarScrollStop
    = $("header").height() + $(".ttlBox").height() + $(".menu.inner").height() +100;
    var sidebarScrollStart
    = $("header").height() + $(".content").height() +1000
    - w.height();

    w.scroll(function() {

      if(sidebarScrollStop < w.scrollTop()
      && w.scrollTop() < sidebarScrollStart) {

        sidebarSub.css({"position": "fixed", "top": "100px"});

      } else if(w.scrollTop() >= sidebarScrollStart) {

        sidebarSub.css({"position": "absolute", "bottom": "0" , "top":"auto"});

      } else {

        sidebarSub.css("position", "static");

      }

    });

  } 

}