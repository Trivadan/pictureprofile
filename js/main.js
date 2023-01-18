(function($) {
    "use strict";

    if ($.fn.classyNav) {
        $('#picturenav').classyNav();
    }
    
    // nav scroll   
    var myoffset = $('#dtr-header-global').height();
    $('.navbar a[href^="#"]').click(function(){  
        event.preventDefault();  
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - myoffset
        }, "slow","easeInSine");
    });

    //stickyatTop
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 670) {
            $(".scrollheader").addClass("is-sticky");
            $('.scrollheader').css('position', 'fixed');
        } else {
            $(".scrollheader").removeClass("is-sticky");
            $(".scrollheader").css('position', 'absolute');
        }
    });


class FilterGallery {
    
    constructor(){
        this.$filtermenuList = $('.filtermenu li');
        this.$container      = $('.filtercontainer');
        
        this.updateMenu('all');
        this.$filtermenuList.on('click', $.proxy(this.onClickFilterMenu, this));
    }
    
    onClickFilterMenu(event){
        const $target      = $(event.target);
        const targetFilter = $target.data('filter');

        this.updateMenu(targetFilter);
        this.updateGallery(targetFilter);
    }
    
    updateMenu(targetFilter){
        this.$filtermenuList.removeClass('active');
        this.$filtermenuList.each((index, element)=>{
            const targetData = $(element).data('filter');

            if(targetData === targetFilter){
                $(element).addClass('active');
            }
        })
    }
    
    updateGallery(targetFilter){

        if(targetFilter === 'all'){
            this.$container.fadeOut(300, ()=>{
                $('.post').show();
                this.$container.fadeIn();
            });
        }else {
            this.$container.find('.post').each((index, element)=>{
                this.$container.fadeOut(300, ()=>{
                    if($(element).hasClass(targetFilter)) {
                        $(element).show();
                    }else {
                        $(element).hide();
                    }
                    this.$container.fadeIn();
                })
            });
        }
    }
}

const fliterGallery = new FilterGallery();

})(window.jQuery);