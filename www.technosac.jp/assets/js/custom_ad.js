

$('#audi_01 ul').slick({
  //sp
  responsive: [{
    breakpoint: 768,
    settings: {
      slidesToShow: 1,
      variableWidth: true,
    }
  }]
});

    $('.block_01 div.box a').click(function() {
      var index = $('.block_01 div.box a').index(this);
      $('.sec > section').css('display','none');
      $('.sec > section').eq(index).fadeIn("slow");
      $('.block_01 div.box a').removeClass('active');
      $(this).addClass('active')
    });

    $('.entry__Tab div').click(function() {
      var index = $('.entry__Tab div').index(this);
      $('.entry__Cont > div').css('display','none');
      $('.entry__Cont > div').eq(index).fadeIn("slow");
      $('.entry__Tab div').removeClass('active');
      $(this).addClass('active')
    });
