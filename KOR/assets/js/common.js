$(function () {
    //aos 플러그인
    AOS.init({
        duration: 1200,
        // once: true
    });

    //메인 비주얼
    var mainslider = new Swiper('.main-visual', {
        speed: 1000,
        autoplay: {
            delay: 7000,
            disableOnInteraction: false,
        },
        effect: "fade",
        allowTouchMove: true,
        slidesPerView: 1,
        loop: true,

        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            renderBullet: function (index, dot) {
                return '<span class="' + dot + '">' + '0' + (index + 1) + '</span>';
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Play/Stop
    $('.swiper-play-pause').on("click", function () {
        var $this = $(this);
        if ($this.hasClass('pause')) {
            $this.removeClass('pause').addClass('play').text('Play');
            mainslider.autoplay.start();
            mainslider.slideNext();
            $(".slider-main .swiper-scrollbar .swiper-pagination").eq(0).addClass("animate");

        } else {
            $this.addClass('pause').removeClass('play').text('Pause');
            mainslider.autoplay.stop();
            $(".slider-main .swiper-scrollbar .swiper-pagination").removeClass("animate");
        }
    });
});

$(function(){
    function openPop(href){
        $('.pop_wrap' + href).addClass('on');
    }
    
    $('.btn_pop').on('click',function(){
        var href = $(this).attr("href");
        openPop(href);
        $('body').css({'height':$(window).height(), 'overflow':'hidden'});
    });
    
    function closePop() {
        $('.pop_wrap').removeClass('on');
        $('body').css({'height':'auto', 'overflow':'auto'});
    }
    
    $('.pop_wrap .pop_close').on('click', function(e){
        e.preventDefault();
        closePop();
    });
    
    // 빈영역 클릭 닫기
    $('.pop_wrap').on('click', function (e) {
        if ($(e.target).is('.pop_inner') == true) {
            closePop();
        }
    });    
});

function gnbMenu(depth1, depth2, depth3) {
    // PC 네비게이션
    var $gnb = $('.gnb');
    var $gnbDep1 = $('.gnbDep1', $gnb);
    var $lnbDep1 = $(".lnb .lnbDep1 > li");    

    $gnb.on('focusin mouseenter', function () {
        $(this).children().find('.gnbDep2').stop().slideDown('200');
        $(this).parent().find('.gnbBg').stop().animate({ 'height': '170px' });
    });

    $gnb.on('focusout mouseleave', function () {
        $(this).children('.gnbDep1').find('.gnbDep2').stop().slideUp('0');
        $(this).parent().find('.gnbBg').stop().animate({ 'height': '0' });
    });

    $gnbDep1.hover(function () {
        $(this).children('a').addClass('on');
    }, function () {
        $(this).children('a').removeClass('on');
        $gnbDep1.eq(depth1 - 1).find('> a').addClass('on');
    });

    //gnb - 페이지 인식
    if ($gnbDep1.length > depth1 - 1) {
        $gnbDep1.eq(depth1 - 1).find('> a').addClass('on');
        $gnbDep1.eq(depth1 - 1).find('.gnbDep2 > li').eq(depth2 - 1).find('> a').addClass('on');
    }

    //lnb - 페이지 인식
    if ($lnbDep1.length > depth2 - 1) {
        $lnbDep1.eq(depth2 - 1).find("a").addClass("on");
    }

    // 모바일 전체 네비게이션
    var $moGnbWrap = $('.mo_gnb_wrap'),
        $moGnb = $('.mo_gnb', $moGnbWrap),
        $moGnbLi = $('.mo_gnb > li', $moGnbWrap),
        $moBtnOpen = $('.mo_btn_open'),
        $moBtnClose = $('.mo_btn_close'),
        $moGnbBg = $('.mo_gnb_bg');

    // 모바일 - 전체내용 오픈
    // $moGnbWrap.hide();
    $moBtnOpen.on('click', function (e) {
        e.preventDefault();
        // $(this).hide();
        //$('body').addClass('fixed');
        $moGnbWrap.fadeIn(200);
        $moGnbWrap.find('.scroll').stop().animate({ right: 0 }, 300);
        $moGnbBg.fadeIn();
        // $('body').css({'height':$(window).height(), 'overflow':'hidden'});
    });

    $moBtnClose.on('click', function (e) {
        e.preventDefault();
        //$('body').removeClass('fixed');
        $moBtnOpen.show();
        $moGnbWrap.fadeOut(200);
        $moGnbWrap.find('.scroll').stop().animate({ right: -100 }, 300);
        $moGnbBg.hide();
        // $('body').css({'height':'auto', 'overflow':'auto'});
    });

    $moGnbBg.on('click', function (e) {
        e.preventDefault();
        $moGnbWrap.stop().fadeOut(200);
        $moGnbWrap.find('.scroll').animate({ right: 0 }, 300);
        $moBtnOpen.show();
    });

    // 모바일 - 1,2DEPTH 오픈
    $moGnbLi.children('a').on('click', function (e) {
        // e.preventDefault();

        var $depth = $(this).next('ul');
        if ($depth.is(':visible')) {
            $(this).removeClass('on');
            $depth.slideUp(300);
        } else {
            $moGnbLi.children('a').removeClass('on');
            $(this).parent().siblings().find('ul').slideUp(300);
            $(this).addClass('on');
            $depth.slideDown(300);
        }
        $('html, body').animate({ scrollTop: top_pos }); //강제닫힘현상 해결
    });

    $('.mo_gnb .depth1 > li').children('a').on('click', function () {
        var $depth = $(this).next('ul');
        if ($depth.is(':visible')) {
            $(this).removeClass('on');
            $depth.slideUp(300);
        } else {
            $('.mo_gnb .depth1 > li').children('a').removeClass('on');
            $(this).parent().siblings().find('ul').slideUp(300);
            $(this).addClass('on');
            $depth.slideDown(300);
        }
        $('html, body').animate({ scrollTop: top_pos }); //강제닫힘현상 해결
    });

    //모바일 - 페이지 인식
    if ($moGnbLi.length > depth1 - 1) {
        $moGnbLi.eq(depth1 - 1).find('> a').addClass('on');
        $moGnbLi.eq(depth1 - 1).find('.depth1 > li').eq(depth2 - 1).find('> a').addClass('on');
        $moGnbLi.eq(depth1 - 1).find('.depth1 > li').eq(depth2 - 1).find('.depth2 > li').eq(depth3 - 1).find('> a').addClass('on');
    }

    //모바일 - 2depth 오픈
    if (depth1 >= 0 && depth2 >= 0) {
        $moGnbLi.eq(depth1 - 1).addClass('on').children('.depth1').show().children('li').eq(depth2 - 1).addClass('on').children('.depth2').show();
    }
}