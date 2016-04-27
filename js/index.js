// JavaScript source code


(function($){
    $.fn.picSlide = function(options){
        var defaults = {
            speed: 1000,
        };
        var opts = $.extend({}, defaults, options);
        function picPosInit(obj){
            for(var i=0;i<obj.find('li').length;i++){
                obj.find('ul li').eq(i).css('left',i*100+'%');
            }
        }
        var index=0;
        function Move(obj){
            var prevBtn=obj.find('.prev');
            var nextBtn=obj.find('.next');
            var picLength=obj.find('ul li').length;
            var textHeight=obj.find('ul li').find('span').height();
            function prevMove(){
                if(index==0){
                    return 0;
                }
                index=(index>0 ? (index-1) : 0);
                for(var i=0;i<picLength;i++){
                    obj.find('ul li').eq(i).animate({left:(i-index)*100+'%'}, opts.speed, 'linear');
                }
            }
            function nextMove(){
                if(index==(picLength-1)){
                    return 0;
                }
                index=(index<(picLength-1) ? (index+1) : (picLength-1));
                for(var i=0;i<picLength;i++){
                    obj.find('ul li').eq(i).animate({left:(i-index)*100+'%'}, opts.speed, 'linear');
                }
            }
            prevBtn.click(function () {
                prevMove();
            });
            nextBtn.click(function () {
                nextMove();
            });
            
            var flagTimeOut=0;
            obj.on('mousewheel', function(event) {
                //console.log(event.deltaX, event.deltaY, event.deltaFactor);
                if((event.deltaY==1)&&(flagTimeOut==0)){
                    flagTimeOut=1;
                    prevMove();
                    setTimeout(function(){
                        flagTimeOut=0;
                    },500);
                }
                if((event.deltaY==-1)&&(flagTimeOut==0)){
                    flagTimeOut=1;
                    nextMove();
                    setTimeout(function(){
                        flagTimeOut=0;
                    },500);
                }
                
            });
            obj.bind('mousewheel', function(event) {
                event.preventDefault();
                var scrollTop = this.scrollTop;
                this.scrollTop = (scrollTop + ((event.deltaY * event.deltaFactor) * -1));
                //console.log(event.deltaY, event.deltaFactor, event.originalEvent.deltaMode, event.originalEvent.wheelDelta);
            }); 
            obj.mouseenter(function(event){
                obj.find('ul li').eq(index).find('span').animate({bottom:0+'%'}, 500, 'linear');
            }).mouseleave(function(event){
                    obj.find('ul li').eq(index).find('span').css('bottom',-20+'%');
            });

        }
        //背景图片缩放
        function Img_Zooming(obj){
            $('.web-enjoy').css('height', parseInt(document.body.clientWidth/2.0)+'px');
            $(window).resize(function () {
                //alert(document.body.clientWidth);
                $('.web-enjoy').css('height', parseInt(document.body.clientWidth/2.0)+'px');
            });
        }

        this.each(function(i){
            var _this = $(this);
            picPosInit(_this);
            Move(_this);
            Img_Zooming(_this);
        });
    }
})(jQuery);


$(document).ready(function () {
    "use strict";
    $('#webEnjoy').picSlide({
        speed: 500,
    });
});
