jQuery.noConflict();

(function () {	
	var $window = jQuery(window),
	$lazy,
	$lazynofade,
	$mobile = false;	

	//check mobile
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
		$mobile = true;	
	}
	
	
	function easeInOutExpo (t, b, c, d) {
		if (t == 0) return b;
		if (t == d) return b + c;
		if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
		return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	}
    
    WebFont.load({
        google: {
            families: ['Space+Grotesk:400,500,600,700']
        },
        custom: {
            families: ['SIG','MaziusDisplay-Bold', 'MaziusDisplay-Regular','MaziusDisplay-Italic','DallasOutline']
        }
    });
    
    function fixWidows(selector) {
        let elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            let text = element.innerHTML;
            text = text.replace(/(\S+)\s+(\S+)$/, '$1&nbsp;$2');
            element.innerHTML = text;
        });
    }

    function pad (str, max) {
      str = str.toString();
      return str.length < max ? pad("0" + str, max) : str;
    }
	
	function offset(el) {
        var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    
    jQuery(document).ready(function(){
        
        if (jQuery(".circle-slider-wrap")[0]){            
            
            jQuery( '.circle-slider-wrap').each( function( i ) {
                let $sliderid = jQuery(this).data('id'),
                    $circleslider = jQuery('#'+$sliderid+'-slider'),
                    $next = jQuery('#'+$sliderid+'-next'),
                    $prev = jQuery('#'+$sliderid+'-prev');                
                
                $circleslider.owlCarousel({
                    smartSpeed: 1000,
                    nav: false,
                    autoplay: false, 
                    dots: false,
                    loop: false,
                    mouseDrag: true,
                    touchDrag: true,
                    //responsiveRefreshRate:50,
                    margin:0,
                    //autoWidth:true,
                    center:true,
                    startPosition: 0,                    
                    items:1,
                    responsive: {
                        576: {items: 2},
                        1024: {items: 3,startPosition: 1}, 
                        1500: {items: 4,startPosition: 1},
                    },
                    onChanged: function(e) {
                        if (e.item) {
                            let index = e.item.index,
                                count = e.item.count,
                                visibleslides = 1;

                            
                            //console.log('index: '+index+', total: '+ count);

                            if(index == 0) {
                                $prev.prop("disabled",true);
                            } else if(index == count-visibleslides) {
                                $next.prop("disabled",true);
                            } else {
                                $prev.prop("disabled",false);
                                $next.prop("disabled",false);                                
                            }
                            
                            setTimeout(function(){
                                $circleslider.find('.owl-item').each(function () {
                                    if(jQuery(this).hasClass('center')) {
                                       jQuery(this).find('a.circle-slide__link').attr('tabindex', 0);
                                    } else {
                                        jQuery(this).find('a.circle-slide__link').attr('tabindex', -1);
                                    }						
                                });                       
                            }, 100);
                        }
                    },
                    onInitialized: function(e) {
                        setTimeout(function(){
                            $circleslider.addClass('active');
                        }, 500);
                        
                    }
                });
                
                $next.click(function() {
                    $circleslider.trigger('next.owl.carousel');
                });
                
                $prev.click(function() {
                    $circleslider.trigger('prev.owl.carousel');
                });
                                
                
                $circleslider.on('click', '.owl-item', function(e) {
                    if(!jQuery(this).hasClass('center')) {
                        e.preventDefault(); 
                        var index = jQuery(this).index();
                        $circleslider.trigger('to.owl.carousel', [index, 1000, true]);                       
                    }
                    
              });
            
                
            });
        }


        if (jQuery(".content-slider-wrap")[0]){            
            
            jQuery( '.content-slider-wrap').each( function( i ) {
                let $sliderid = jQuery(this).data('id'),
                    $contentslider = jQuery('#'+$sliderid+'-slider'),
                    $next = jQuery('#'+$sliderid+'-next'),
                    $prev = jQuery('#'+$sliderid+'-prev');                
                
                $contentslider.owlCarousel({
                    items: 1,
                    smartSpeed: 1000,
                    nav: false,
                    autoplay: false, 
                    dots: true,
                    loop: true,
                    mouseDrag: true,
                    touchDrag: true,
                    responsiveRefreshRate:50,
                    margin:30,
                    stagePadding:0,
                    responsive: {
                        782: {stagePadding: 100}, 
                        1200: {stagePadding: 150},
                    }, 
                });
                
                $next.click(function() {
                    $contentslider.trigger('next.owl.carousel');
                });
                
                $prev.click(function() {
                    $contentslider.trigger('prev.owl.carousel');
                });
            });            
        }




        
    });
    
    ///ON READY	
	document.addEventListener( 'DOMContentLoaded', function () {
        
        //ADD BR SPACERS
        if (jQuery(".widow-fix")[0]){
            let elements = document.querySelectorAll('.widow-fix');
            elements.forEach(element => {
                let text = element.innerHTML;
                text = text.replace(/(\S+)\s+(\S+)$/, '$1&nbsp;$2');
                element.innerHTML = text;
            });
        };

		//ADD BR SPACERS
        jQuery('.ignore-br-md, .ignore-br-lg').find('br').after('<span class="br-spacer"></span>');
		
		//HEADER SEARCH
        let $mastheadsearch = jQuery('.masthead__search');
		$mastheadsearch.find('.search-field').attr("tabindex", -1);
		$mastheadsearch.find('.search-submit').on('click', function(e){
            let utilitywidth = jQuery('.masthead__utility').width(),
                mainwidth = jQuery('.masthead__nav').width(),
                searchwidth = 450;
            
            if(window.innerWidth > 1500) {
                searchwidth = utilitywidth+180;           
            } else if(window.innerWidth > 1023 && window.innerWidth < 1499) {
                searchwidth = utilitywidth+mainwidth;
            } else if(window.innerWidth > 576 && window.innerWidth < 1024) {
                searchwidth = utilitywidth;
            } else {
                searchwidth = utilitywidth-110;
            }
			
			if($mastheadsearch.hasClass('open')) {
				
				if( jQuery('.search-field').val() == '') {
					e.preventDefault();
					$mastheadsearch.find('.search-label').width(0);
					$mastheadsearch.toggleClass('open');
					$mastheadsearch.find('.search-field').attr("tabindex", -1);
				}
				
			} else {
				$mastheadsearch.find('.search-label').width(searchwidth);
				$mastheadsearch.find('.search-field').attr("tabindex", 0);
				$mastheadsearch.find('.search-field').focus();
				e.preventDefault();
				$mastheadsearch.toggleClass('open');				
			}			
		});
        
        

        //HOMEPOPUP
		if (jQuery("#home-popup")[0]){
			var $cookie = jQuery("#home-popup").data( "cookie" );
			
			if (Cookies.get($cookie) == null) {
                
				let $time = jQuery("#home-popup").data( "time" ),
                    $class = jQuery("#home-popup").data( "class" );
                
				if ($time != '0') {
					Cookies.set($cookie, '1', { expires: $time });
				}				
				setTimeout(function() {
					jQuery.magnificPopup.open({
						items: {
							src: "#home-popup",
						},
                        type: "inline",
                        removalDelay:400,
                        mainClass: 'mfp-fade home-popup-wrap '+$class,
                        closeBtnInside:true,
                        preloader: false,
                        autoFocusLast:false,
                        closeOnContentClick: false,
                        midClick: true,
					}, 0);
				}, 2000);
			}
		}
        
        
        ////////////////MAGNIFIC
        
        jQuery('.open-menu-popup a').magnificPopup({
			type:'inline',
			closeOnContentClick: false,
			midClick: true,
			//removalDelay: 400,
			mainClass: 'mfp-fade menu-popup-wrap',
			preloader: false,
			autoFocusLast:false,
			fixedContentPos: false,
			callbacks: {
				open: function() {
				  jQuery('body').addClass('noscroll');
				},
				close: function() {
				  jQuery('body').removeClass('noscroll');
				}
            }
		});	
        
        
        if (jQuery(".image-popup")[0]){
            //Not used in any templates
            jQuery('.image-popup').magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                mainClass: 'mfp-fade hide-close',
                closeBtnInside:false,
                image: {
                    verticalFit: true
                },
                callbacks: {
                    open: function() {
                      jQuery('body').addClass('noscroll');
                    },
                    close: function() {
                      jQuery('body').removeClass('noscroll');
                    }
                }
            });
        }
		
        if (jQuery(".open-popup-link")[0]){
            //Not used in any templates
            jQuery('a.open-popup-link, .open-popup-link a').magnificPopup({
                type:'inline',
                closeOnContentClick: false,
                midClick: true,
                removalDelay: 400,
                mainClass: 'mfp-fade',
                closeBtnInside:false,
                preloader: false,
                autoFocusLast:false,
                callbacks: {
                    open: function() {
                        jQuery('body').addClass('noscroll');
                    },
                    close: function() {
                        jQuery('body').removeClass('noscroll');
                    }
                }
            });
        }
        
        
        if (jQuery('.popup-youtube, .popup-vimeo')[0]){
            //afc-blocks/hero.php
            jQuery('.popup-youtube, .popup-vimeo').magnificPopup({
                type: 'iframe',
                mainClass: 'mfp-fade hide-close',
                removalDelay:400,
                fixedContentPos: false,
                preloader: false,
                closeBtnInside:false,
                callbacks: {
                    open: function() {
                        jQuery('body').addClass('noscroll');
                    },
                    close: function() {
                        jQuery('body').removeClass('noscroll');
                    }
                }
            });
        }
		
		if (jQuery('.popup-vimeo-btn, .is-style-popup-vimeo-btn, .is-style-popup-vimeo-arrow-btn')[0]){
			 jQuery('.popup-vimeo-btn, .is-style-popup-vimeo-btn, .is-style-popup-vimeo-arrow-btn').each(function() {
				  jQuery(this).magnificPopup({ 
					delegate: 'a',
					type: 'iframe',
					mainClass: 'mfp-fade hide-close',
					removalDelay:400,
					fixedContentPos: false,
					preloader: false,
					closeBtnInside:false,
                    callbacks: {
                        open: function() {
                            jQuery('body').addClass('noscroll');
                        },
                        close: function() {
                            jQuery('body').removeClass('noscroll');
                        }
                    }
				});
			});
        }
        
        if (jQuery('.popup-gallery')[0]){   
            //content-meeting-spaces.php
            jQuery('.popup-gallery').each(function() {
                jQuery(this).magnificPopup({
                    delegate: 'a',
                    type: 'image',
                    tLoading: 'Loading image #%curr%...',
                    mainClass: 'mfp-fade hide-close',
                    closeBtnInside:false,
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [0,1] // Will preload 0 - before current, and 1 after the current image
                    },
                    image: {
                        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                        titleSrc: function(item) {
                            let $title = '';
                            if (item.el.attr('title')){
                                $title = item.el.attr('title');
                            } else {
                                if(item.el.parent().find('figcaption').text() != '') {
                                    $title =  item.el.parent().find('figcaption').text();
                                }
                            }

                            return $title;
                        }
                    },
                    callbacks: {
                        open: function() {
                            jQuery('body').addClass('noscroll');
                        },
                        close: function() {
                            jQuery('body').removeClass('noscroll');
                        }
                    }
                });
            });
        }

		
	});	
	
})();
