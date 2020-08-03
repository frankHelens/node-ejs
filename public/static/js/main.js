/**
 * JS基础处理框架
 *
 * @company: iqweb
 * @author: jack
 * @timer: 2019-05-016
 */


var IqwXiongJs = {
    Width: $(window).width(),
    Height: $(window).height(),
    //banner切换效果
    SwiperFadeIn: 'fade',
    EventKey: 'click',
    indexBanner: null,
    scrollTop: null,
    WowJsAnimation: null,
    HeaderTrue: false,
    //banner自动切换
    SwiperAuto: true,
    imgLoad: [],
    AllImgLoad: [],
    AllImgFalse: [],
    //动画时间和切换时间
    AnimateTime: 500,
    SwitchTime: 3000,
    //banner循环播放
    SwiperLoop: 'loop',
    //移动1.5,电脑3
    SwiperN: 3,
    //导航判断
    IfNav: false,
    //自由加入
    //移动端新闻swiper
    NewsTab: null,
    HonorSwiper: null,
    //头部高度
    headerH: 110,
    //EventKey: "ontouchstart" in document.documentElement ? "touchstart" : "click",
    Init: function () {
        var that = this;
        that.AddEventList();
    },
    //banner
    BannerSwiper: function () {
        this.indexBanner = new Swiper('.banner-box', {
            effect: this.SwiperFadeIn,
            // loop: this.SwiperLoop,
            fadeEffect: {
                crossFade: true,
            },
            pagination: {
                el: '.banner-box .swiper-pagination',
                clickable: true,
            },
            loopedSlides: document.querySelectorAll('.swiper-slide').length,
            on: {
                init: function () {
                    $('.swiper-text-box .swiper-animation').removeClass('fadeInUp2');
                    $('.swiper-text-box1 .swiper-animation').removeClass('fadeInUp2').addClass('fadeInUp2');
                    //附加
                    $('.swiper-text-bottom').removeClass('fadeInUp2').addClass('fadeInUp2');
                    setTimeout(function () {
                        $('.swiper-text-i').removeClass('sbDown').addClass('sbDown');
                    }, 1800)
                },
                slideChangeTransitionEnd: function () {

                    if (this.activeIndex == (this.loopedSlides - 1)) {
                        console.log(this.loopedSlides);
                        $('.swiper-slide .swiper-text-box .swiper-animation').removeClass('fadeInUp2');
                        $('.swiper-text-box' + this.loopedSlides + ' .swiper-animation').removeClass('fadeInUp2').addClass('fadeInUp2');
                    }
                    if (this.activeIndex == (this.loopedSlides * 2)) {
                        $('.swiper-slide .swiper-text-box .swiper-animation').removeClass('fadeInUp2');
                        $('.swiper-text-box1 .swiper-animation').removeClass('fadeInUp2').addClass('fadeInUp2');
                    }
                    for (var i = 0; i < this.loopedSlides; i++) {
                        if ((this.activeIndex - this.loopedSlides) == i) {
                            $('.swiper-slide .swiper-text-box .swiper-animation').removeClass('fadeInUp2');
                            $('.swiper-text-box' + (i + 1) + ' .swiper-animation').removeClass('fadeInUp2').addClass('fadeInUp2');
                            break;
                        }
                    }
                },
            },
        });
    },
    //获取TOP
    NavScroll: function () {
        var that = this;
        that.scrollTop = $(window).scrollTop();
        that.NavScrollTop();
        $(window).scroll(function () {
            that.NavScrollTop();
        });
    },
    //判断top值
    NavScrollTop: function () {
        var that = this;
        that.scrollTop = $(window).scrollTop();
        //大于导航的高度
        if (that.scrollTop > 110) {
            $('.header-wrap').addClass('header-wrap2');
        } else {
            $('.header-wrap').removeClass('header-wrap2');
        }
    },
    //获取底部top值
    footerTop: function () {

        //窗口滚动
        var FooterLogo = $('.footer-logo-wrap').offset().top;
        var windowH = $(window).height();
        var FooterTop = FooterLogo - windowH;
        var scrollTop = $(window).scrollTop();
        if (scrollTop >= FooterTop) {
            $('.footer-logo-wrap').removeClass('footer-animation').addClass('footer-animation');
        }
        $(window).scroll(function () {
            var FooterLogo = $('.footer-logo-wrap').offset().top;
            var windowH = $(window).height();
            var FooterTop = FooterLogo - windowH;
            var scrollTop = $(window).scrollTop();
            var scrollTop = $(window).scrollTop();
            if (scrollTop >= FooterTop) {
                $('.footer-logo-wrap').removeClass('footer-animation').addClass('footer-animation');
            }
        });
    },
    //移动端滑动 or PC端渐现
    ifWidth: function () {
        var that = this;
        if (that.Width < 1200) {
            that.SwiperFadeIn = '';
            that.headerH = 65;
        }
        that.BannerSwiper();
        that.footerTop();
    },
    //动画启动
    WowJs: function () {
        this.WowJsAnimation = new WOW({
            animateClass: 'animated',
            offset: 50
        });
        this.WowJsAnimation.init();
    },

    //事件
    AddEventList: function () {

        var that = this;

        function return_false() {
            return false;
        }

        // $('html,body,.black-box').on('mousewheel DOMMouseScroll wheel', return_false);

        for (var i = 0; i < $('.data1').length; i++) {
            that.imgLoad.push(
                $('.data1').eq(i).attr('data-src')
            )
        }
        for (var j = 0; j < $('.data2').length; j++) {
            that.AllImgLoad.push(
                $('.data2').eq(j).attr('data-src')
            )
        }
        for (var l = 0; l < $('.data3').length; l++) {
            that.AllImgFalse.push(
                $('.data3').eq(l).attr('data-src')
            )
        }
        if (that.imgLoad.length > 0) {
            that.indexImgLoad();
        }
        //导航遮罩出现
        $('.m-header-nav').on('click', function (e) {
            e.preventDefault();
            if (!that.IfNav) {
                $('html,body, .black-box').on('mousewheel DOMMouseScroll wheel', return_false);
                $('.m-header-nav span:first-child').removeClass('first-rotate2').addClass('first-rotate');
                $('.m-header-nav span:last-child').removeClass('last-rotate2').addClass('last-rotate');
                $('.m-header-nav span:nth-child(2)').removeClass('navOpacity2').addClass('navOpacity');
                $('.m-header-nav').addClass('header-click-nav');
                $('.header-nav ul li').removeClass('fadeInUp2').addClass('fadeInUp2');
                $('.black-box').stop();
                $('.black-box').fadeIn();
                that.IfNav = true;
            } else {
                $('html,body, .black-box').off('mousewheel DOMMouseScroll wheel', return_false);
                $('.m-header-nav span:first-child').removeClass('first-rotate').addClass('first-rotate2');
                $('.m-header-nav span:last-child').removeClass('last-rotate').addClass('last-rotate2');
                $('.m-header-nav span:nth-child(2)').removeClass('navOpacity').addClass('navOpacity2');
                $('.m-header-nav').removeClass('header-click-nav');
                $('.header-nav ul li').addClass('fadeInUp2').removeClass('fadeInUp2');
                $('.black-box').stop();
                $('.black-box').fadeOut();
                that.IfNav = false;
            }
        })

    },
    //预加载第一屏的图片
    indexImgLoad: function () {
        var that = this;
        var len = that.imgLoad.length;

        //图片预加载
        $.preload(that.imgLoad, {
            // 是否有序加载
            order: true,
            minTimer: 0,
            //每加载完一张执行的方法
            each: function (count) {
                var percent = Math.round((count + 1) / len * 100) + '%';
                $('.data1').eq(count).append('<img src="' + that.imgLoad[count] + '"/>');
            },
            // 加载完所有的图片执行的方法
            end: function () {
                console.log('加载首屏');
                $('html, body').show();
                that.imgDown();
                that.ifWidth();
                that.WowJs();
                that.lableList();
                that.NavScroll();
                // this.numberS();
                $('.video').trigger('play');
                //首屏图片太多按顺序加载，少于1张不加载
                if (that.AllImgLoad.length > 0) {
                    //加载首屏剩下的banner
                    that.indexImages();
                }
                if (that.AllImgLoad.length == 0) {
                    that.allImages();
                }
                // //修改标题
                // document.title = (index + 1) + '/' + len;
            }
        });
    },
    //加载首屏剩下的banner
    indexImages: function () {
        var that = this;
        //图片预加载
        $.preload(that.AllImgLoad, {
            // 是否有序加载
            order: true,
            minTimer: 0,
            //每加载完一张执行的方法
            each: function (count) {
                $('.data2').eq(count).append('<img src="' + that.AllImgLoad[count] + '"/>');
            },
            // 加载完首屏剩下的图片执行的方法
            end: function () {
                console.log('加载完了首屏');
                if (that.AllImgFalse.length > 0) {
                    //无序加载网站全部的图片，少于1张不加载
                    that.allImages();
                }
            }
        });
    },
    //网站全部图片无序加载
    allImages: function () {
        var that = this;

        //图片预加载
        $.preload(that.AllImgFalse, {
            // 是否有序加载
            order: false,
            minTimer: 0,
            //每加载完一张执行的方法
            each: function (count) {
                $('.data3').eq(count).append('<img src="' + that.AllImgFalse[count] + '"/>');
            },
            // 加载完首屏剩下的图片执行的方法
            end: function () {
                console.log('加载完了全部');
                if (that.Width < 1200) {
                    that.SwiperN = 1.5;
                    that.newsTab();
                }
                that.HonorTab();
            }
        });
    },
    newsTab: function () {
        var that = this;
        that.NewsTab = new Swiper('.news-swiper', {
            slidesPerView: 1.5,
            initialSlide: 0,
            centeredSlides: true,//居中
            loop: true,
            spaceBetween: 20,
            loopAdditionalSlides: 100,
            pagination: {
                el: '.news-pagination',
                clickable: true,
            },
        });
    },
    HonorTab: function () {
        var that = this;
        that.HonorSwiper = new Swiper('.honor-swiper', {
            slidesPerView: that.SwiperN,
            initialSlide: 0,
            centeredSlides: true,//居中
            loop: true,
            spaceBetween: 25,
            navigation: {
                nextEl: '.honor-button-next',
                prevEl: '.honor-button-prev',
            },
        });
    },
    //标签选择
    lableList: function () {
        var lableClick = $('.mbx-nav span'),tagsid=$('#tagsid');
        var cur_url=window.location.pathname;
        if(cur_url.indexOf('/tag/')){
            cur_url=cur_url.replace(/\/tag\/[0-9,]*/i,'');
        }
        var delimiter_pos=cur_url.lastIndexOf('/');
        var have_p=cur_url.indexOf('/p/');
        var cur_prefix='',cur_suffix='';
        if(have_p>=2){
            delimiter_pos=have_p;
        }else if(delimiter_pos==0){
            delimiter_pos=cur_url.lastIndexOf('.');
        }
        if(delimiter_pos>-1){
            cur_prefix=cur_url.slice(0,delimiter_pos);
            cur_suffix=cur_url.slice(delimiter_pos);
        }else{
            cur_prefix=cur_url;
        }
        var tagval=tagsid.val();
        var tagarr=[];
        if(tagval){
            tagarr=tagval.split(',');
        }
        $.each(tagarr,function(i,v){
            lableClick.filter('[data-id='+v+']').addClass('max-hover');
        });
        if(lableClick.filter('.max-hover').length==0){
            lableClick.filter('.all').addClass('max-hover');
        }
        lableClick.on('click', function () {
            if(tagsid.prop('disabled')){
                return false;
            }
            var lableThis = $(this);
            var _ids='';
            tagsid.prop('disabled',true);
            if(lableThis.hasClass('max-hover')){
                lableThis.removeClass('max-hover');
            }else{
                lableThis.addClass('max-hover');
            }

            if(!lableThis.hasClass('all')){
                lableClick.filter('.max-hover[data-id]').each(function(i,el){
                    var $el=$(el),_id=$el.attr('data-id');
                    if(i!=0){
                        _ids+=',';
                    }
                    _ids+=_id;
                });
            }
            if(_ids!=''){
                window.location.href=cur_prefix+'/tag/'+_ids+cur_suffix;
            }else{
                window.location.href=cur_prefix+_ids+cur_suffix;
            }



        });
    },
    //图文下拉
    imgDown: function () {
        var that = this;
        var imgName = $('.banner-img-down');
        var arr = [
            'easeInQuad',
            'easeOutQuad',
            'easeInOutQuad',
            'easeInCubic',
            'easeOutCubic',
            'easeInOutCubic',
            'easeInQuart',
            'easeOutQuart',
            'easeInOutQuart',
            'easeInQuint',
            'easeOutQuint',
            'easeInOutQuint',
            'easeInSine',
            'easeOutSine',
            'easeInOutSine',
            'easeInExpo',
            'easeOutExpo',
            'easeInOutExpo',
            'easeInCirc',
            'easeOutCirc',
            'easeInOutCirc',
            'easeInElastic',
            'easeOutElastic',
            'easeInOutElastic',
            'easeInBack',
            'easeOutBack',
            'easeInOutBack',
            'easeInBounce',
            'easeOutBounce',
            'easeInOutBounce'
        ];
        var Down = $(window).scrollTop();
        var Blur = $(window).scrollTop() - imgName.height();
        var Blur2 = imgName.height() + (Blur);
        var BlurPX = imgName.height() - Blur2;
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        var t;
        if (Down <= 0) {
            t = setTimeout(function () {
                $(document.body).animate({
                    'scrollTop': imgName.height() - that.headerH
                }, {duration: 1500, easing: arr[18]});
                $('html').animate({
                    'scrollTop': imgName.height() - that.headerH
                }, {duration: 1500, easing: arr[18]});
            }, 2000);
        }
        if (BlurPX > 100) {
            imgName.css({
                filter: 'blur(' + (Blur2 * 0.021) + 'px)'
            })
        }

        $(window).scroll(function () {
            clearTimeout(t);
            Blur = $(window).scrollTop() - imgName.height();
            Blur2 = imgName.height() + (Blur);
            BlurPX = imgName.height() - Blur2;
            if (BlurPX > 100) {
                imgName.css({
                    filter: 'blur(' + (Blur2 * 0.021) + 'px)'
                })
            }

        });
    },
   
};

$(function () {
    IqwXiongJs.Init();
});


