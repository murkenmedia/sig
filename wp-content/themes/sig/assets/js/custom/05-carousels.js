/*!
 * HHV Carousels
 * Version  : 1.0.00
 */
jQuery.noConflict();

(function () {	
	let $window = jQuery(window),
    $colnum = 2.083;

    document.addEventListener( 'DOMContentLoaded', function () {

        
        //CONTENT CAROUSEL        
        let $throttlenum = 50;        
        if (jQuery(".content-carousel")[0]){
            let exppad10 = ($colnum*10)+'vw',
                exppad6 = ($colnum*6)+'vw';
            
             let $expcarousel = [];            
            jQuery( '.content-carousel' ).each(function(index) {
                
                let $expid = jQuery(this).attr("id");
                
                $expcarousel[index] = new Splide( '#'+$expid, {
                    type : 'loop',
                    focus : 'center',
                    throttle: $throttlenum,
                    updateOnMove : true,
                    arrows: true,
                    width:'100vw',
                    speed:600,
                    keyboard:'focused',
                    //keyboard: false,
                    slideFocus:false,
                    //accessibility:false,
                    i18n: {
                        first: 'Next slide',
                        last: 'Previous slide',
                    },
                    
                    padding: {
                        right: exppad10,
                        left : exppad10,
                    },
                    breakpoints: {
                        767: {
                             padding: {
                                right:exppad6,
                                left :exppad6,
                            },
                        },
                        1023: {
                             padding: {
                                right:exppad6,
                                left :exppad6,
                            },
                        },
                    }
                } );

                $expcarousel[index].on( 'mounted', function () {

                    jQuery('#'+$expid +'-list li.is-active').addClass('zoom-in');
                    
                    
                    let $nextslide = jQuery('#'+$expid+ ' .splide__slide.is-active').next('.splide__slide');
                    
                    //ADA
                    jQuery('#'+$expid +'-list li.is-active .slide-link').attr('tabindex', 0);
                    
                    setTimeout(function(){
                        jQuery('#'+$expid).attr('tabindex',-1);
						
						
						//ARIA HIDDEN
						jQuery('#'+$expid+ ' .splide__slide').attr('aria-hidden', "true");
						jQuery('#'+$expid+ ' .splide__slide.is-active').attr('aria-hidden', "false");
                        
                        //set ada label on carousel dots
                        //PAGINATION
                        let btns = jQuery('#'+$expid+' .splide__pagination__page');
                        btns.each(function( i ) {
                            let slidenum = i+1,
                                $slideinc = slidenum;
                            slidenum = ('0' + slidenum).slice(-2);
                            let btnlabel = jQuery('#'+$expid+'-slide'+slidenum).data('label');
                            jQuery(this).attr("aria-label","Go to "+btnlabel+". Slide "+$slideinc);
                        });
                         
                    }, 200);
                    
                     
                    
                } );
                $expcarousel[index].on( 'move', function(newIndex, destIndex) {
        
                    jQuery('#'+$expid +'-list li').removeClass('zoom-in'); 
                    
                    //ADA
                    jQuery('#'+$expid +'-list .slide-link').attr('tabindex', -1);
                } );
                 $expcarousel[index].on( 'moved', function() {

                     setTimeout(function(){
                        jQuery('#'+$expid +'-list li.is-active').addClass('zoom-in');
                        let $nextslide = jQuery('#'+$expid+ ' .splide__slide.is-active').next('.splide__slide');                      
                         
                        //ADA
                        jQuery('#'+$expid +'-list .slide-link').attr('tabindex', -1);
                        jQuery('#'+$expid +'-list li.is-active .slide-link').attr('tabindex', 0);
						 
						 //ARIA HIDDEN
						jQuery('#'+$expid+ ' .splide__slide').attr('aria-hidden', "true");
						jQuery('#'+$expid+ ' .splide__slide.is-active').attr('aria-hidden', "false");
                         
                    }, 200);
                     
                    
                } );

                $expcarousel[index].mount();

                jQuery('body').on('click', '.exp_slide', function(e) {                
                    if( ! jQuery(this).hasClass("is-active") ) {
                        e.preventDefault();                    
                        let $items = jQuery('#'+$expid +'-list li'),        
                            $activeindex = $items.index(jQuery('#'+$expid +'-list li.is-active')),
                            $index = $items.index(jQuery(this));

                        if($index > $activeindex) {
                            $expcarousel[index].go( '+' );
                        } else {
                            $expcarousel[index].go( '-' );
                        }
                        //console.log( $expcarousel.index );                
                    };
                });
            });
        }
        
        
        //TOWERS CAROUSEL  
        let towerpad7 = ($colnum*5)+'vw',
            towerpad5 = ($colnum*5)+'vw';        
        if (jQuery(".towers-carousel")[0]){
            let $towernavcarousel = new Splide( '.towers-nav-carousel', {
                rewind : true,
                isNavigation: true,
                arrows: false,
                pagination  : false,
                updateOnMove : true,
                drag:false,
                autoWidth:true,
                keyboard:'focused',
            } ).mount();            
            let $towerid = jQuery('.towers-carousel').attr("id");            
            let $towercarousel = new Splide( '.towers-carousel', {
                throttle: $throttlenum,
                type : 'slide',
                focus : 'center',
                updateOnMove : true,
                arrows: true,
                trimSpace: false,
                speed:600,
                pagination:false,
                keyboard:'focused',
                slideFocus:false,
                //lazyLoad:'nearby',
                //preloadPages:2,
                padding: {
                    right: towerpad7,
                    left : towerpad7,
                },
                breakpoints: {                   
                    767: {
                         padding: {
                            right: '0',
                            left : '0',
                        },
                    },
                    1023: {
                         padding: {
                            right: towerpad5,
                            left : towerpad5,
                        },
                    },
                }
            } );

            
            $towercarousel.on( 'mounted', function() {
                
                //ADA
                jQuery('.towers-carousel li.splide__slide:eq(0) .slide-link').attr('tabindex', 0);
                setTimeout(function(){
                    jQuery('.towers-nav-carousel').attr('tabindex',-1);
                    jQuery('.towers-carousel').attr('tabindex',-1);  
					
					
					//ARIA HIDDEN
					jQuery('#'+$towerid+ ' .splide__slide').attr('aria-hidden', "true");
					jQuery('#'+$towerid+ ' .splide__slide.is-active').attr('aria-hidden', "false");
					
                }, 200);
                
                jQuery('.towers-nav-carousel__btn').each(function(i, obj) {
                    var $label = jQuery(this).data('label');
                    jQuery(this).attr('aria-label', $label);
                });
                
            });
            
            $towercarousel.on( 'move', function(newIndex, oldIndex, destIndex) {
                
                jQuery( 'li.towers_slide' ).each(function( index ) {                   
                    if (newIndex > index) {
                        jQuery(this).addClass('fade-slide');
                    } else {
                        jQuery(this).removeClass('fade-slide');
                    }                    
                });
                
                //ADA
                jQuery('.towers-carousel .slide-link').attr('tabindex', -1);
            } );            
            $towercarousel.on( 'moved', function(newIndex) {
                
                let $nextnum = parseInt(newIndex);
                
                //ADA
                jQuery('.towers-carousel .slide-link').attr('tabindex', -1);
                jQuery('.towers-carousel li.splide__slide:eq('+$nextnum+') .slide-link').attr('tabindex', 0);
				
				//ARIA HIDDEN
				jQuery('#'+$towerid+ ' .splide__slide').attr('aria-hidden', "true");
				jQuery('#'+$towerid+ ' .splide__slide.is-active').attr('aria-hidden', "false");
                //console.log(newIndex+$nextnum);                
              } ); 
            $towercarousel.sync( $towernavcarousel ).mount();            
            jQuery('body').on('click', '.towers_slide', function(e) {                
                if( ! jQuery(this).hasClass("is-active") ) {
                    e.preventDefault();                    
                    let $items = jQuery('#'+$towerid +'-list li'),        
                        $activeindex = $items.index(jQuery('#'+$towerid +'-list li.is-active')),
                        $index = $items.index(jQuery(this));

                    if($index > $activeindex) {
                        $towercarousel.go( '+' );
                    } else {
                        $towercarousel.go( '-' );
                    }
                    //console.log( $towercarousel.index );                
                };
            });
            let towerTimer;
            $window.on('resize', function(e) {
                clearTimeout(towerTimer);
                towerTimer = setTimeout(function() {
                    $towercarousel.refresh();                    
                }, 100);
            });
        }   
		
		
        //OFFERS TILES CAROUSEL    
        let offerspad4 = ($colnum*4)+'vw',   
            offerspad2 = ($colnum*2)+'vw';        
        if (jQuery(".offers-events-carousel")[0]){  
            let $offerscarousel = [];            
            jQuery( ".offers-events-carousel" ).each(function(index) {                
                let $offersid = jQuery(this).attr("id");
                $offerscarousel[index] = new Splide( '#'+$offersid, {
                    throttle: $throttlenum,
                    type : 'slide',
                    focus : 'center',
                    updateOnMove : true,
                    gap : '16.664vw',
                    trimSpace: false,
                    speed:600,
                    arrows: true,
                    keyboard:'focused',
                    slideFocus:false,
                    i18n: {
                        first: 'Next slide',
                        last: 'Previous slide',
                    },
                    padding: {
                        right: offerspad4,
                        left : offerspad4,
                    },
                    breakpoints: {                   
                        1023: {
                             padding: {
                                right: offerspad2,
                                left : offerspad2,
                            },
                        },
                    }
                } );
                $offerscarousel[index].on( 'mounted', function () {
                    
                    let $nextslide = jQuery('#'+$offersid+ ' .splide__slide.is-active').next('.splide__slide');
                    
                    //ADA
                    setTimeout(function(){
						jQuery('#'+$offersid+ ' .splide__slide .offers-link').attr('tabindex', -1);
                        jQuery('#'+$offersid+ ' .splide__slide.is-active .offers-link').attr('tabindex', 0);
                        jQuery('#'+$offersid).attr('tabindex',-1);
						
						//ARIA HIDDEN
						jQuery('#'+$offersid+ ' .splide__slide').attr('aria-hidden', "true");
						jQuery('#'+$offersid+ ' .splide__slide.is-active').attr('aria-hidden', "false");
                        
                        //set ada label on carousel dots
                        let btns = jQuery('#'+$offersid+ ' .splide__pagination__page');
                        btns.each(function( i ) {
                            let slidenum = i+1,
                                $slideinc = slidenum;
                            slidenum = ('0' + slidenum).slice(-2);
                            let btnlabel = jQuery('#'+$offersid+'-slide'+slidenum).data('label');
                            jQuery(this).attr("aria-label","Go to "+btnlabel+". Slide "+$slideinc);
                             
                        });
                        
                    }, 200);
                    
                    
                    
                    
                } );
                $offerscarousel[index].on( 'move', function() {
                    jQuery('#'+$offersid+ ' .offers-link').attr('tabindex', -1);
                });
                $offerscarousel[index].on( 'moved', function() {
                     
                    //ADA
                    jQuery('#'+$offersid+ ' .offers-link').attr('tabindex', -1);
                    jQuery('#'+$offersid+ ' .splide__slide.is-active .offers-link').attr('tabindex', 0);
					
					//ARIA HIDDEN
					jQuery('#'+$offersid+ ' .splide__slide').attr('aria-hidden', "true");					
					jQuery('#'+$offersid+ ' .splide__slide.is-active').attr('aria-hidden', "false");

                    
                } );
                $offerscarousel[index].mount();
                let offersTimer;
                $window.on('resize', function(e) {
                    clearTimeout(offersTimer);
                    offersTimer = setTimeout(function() {
                        $offerscarousel[index].refresh();            
                    }, 100);
                });
            });
        }                                             
        
        //IMAGE CAROUSEL
        if (jQuery(".image-carousel")[0]){
            let imgpad4 = ($colnum*4)+'vw',
                imgpad6 = ($colnum*6)+'vw',
                imgpad8 = ($colnum*8)+'vw',
                imgpad11 = ($colnum*11)+'vw',
                imgpad10 = ($colnum*10)+'vw';
            
            let $imgcarousel = [];            
            jQuery( ".image-carousel" ).each(function(index) {                
                let $imgid = jQuery(this).attr("id");                
                $imgcarousel[index] = new Splide( '#'+$imgid, {
                    throttle: $throttlenum,
                    type : 'loop',
                    focus : 'center',
                    //gap : '2.083vw',
                    updateOnMove : true,
                    arrows: true,
                    speed:600,
                    keyboard:'focused',
                    slideFocus:false,
					//autoHeight:true,
                    i18n: {
                        first: 'Next slide',
                        last: 'Previous slide',
                    },
                    padding: {
                        right: imgpad10,
                        left : imgpad10,
                    },
                    breakpoints: {
                        767: {
                             padding: {
                                right: imgpad6,
                                left : imgpad6,
                            },
                        },
                        1023: {
                             padding: {
                                right: imgpad6,
                                left : imgpad6,
                            },
                        },
                    }
                } );
                $imgcarousel[index].on( 'mounted', function () {

                    //ADA
                    setTimeout(function(){
                        //jQuery('#'+$offersid+ ' .splide__slide.is-active .offers-link').attr('tabindex', 0);
                        jQuery('#'+$imgid).attr('tabindex',-1);
						
						//ARIA HIDDEN
						jQuery('#'+$imgid+ ' .splide__slide').attr('aria-hidden', "true");					
						jQuery('#'+$imgid+ ' .splide__slide.is-active').attr('aria-hidden', "false");
					
                        ///PAGINATION
                        let btns = jQuery('#'+$imgid+ ' .splide__pagination__page');
                        btns.each(function( i ) {
                            let slidenum = i+1,
                                $slideinc = slidenum;
                            slidenum = ('0' + slidenum).slice(-2);
                            let btnlabel = jQuery('#'+$imgid+'-slide'+slidenum).data('label');
                            jQuery(this).attr("aria-label","Go to slide "+$slideinc);
                             
                        });
                        
                    }, 200);
                    
                } );
                $imgcarousel[index].on( 'moved', function() {
					
					//ARIA HIDDEN
					jQuery('#'+$imgid+ ' .splide__slide').attr('aria-hidden', "true");					
					jQuery('#'+$imgid+ ' .splide__slide.is-active').attr('aria-hidden', "false");
					
                } );
                $imgcarousel[index].mount();
                
                //ADJACENT IMAGE CLICK
                jQuery('body').on('click', '.image_slide', function(e) {                
                    if( ! jQuery(this).hasClass("is-active") ) {
                        e.preventDefault();                    
                        let $items = jQuery('#'+$imgid +'-list li'),        
                            $activeindex = $items.index(jQuery('#'+$imgid +'-list li.is-active')),
                            $index = $items.index(jQuery(this));

                        if($index > $activeindex) {
                            $imgcarousel[index].go( '+' );
                        } else {
                            $imgcarousel[index].go( '-' );
                        }
                        //console.log( $imgcarousel.index );   
                        //console.log('#image-carousel-'+$imgid +'-list li');
                    };
                });
            });
        }
        ///EVENTS CAROUSEL        
        /*if (jQuery(".events-carousel")[0]){            
            let $eventcarousel = [];            
            jQuery( ".events-carousel" ).each(function(index) {                
                let $eventid = jQuery(this).attr("id");                
                $eventcarousel[index] = new Splide( '#'+$eventid, {
                    throttle: $throttlenum,
                    type : 'slide',
                    focus : 'center',
                    updateOnMove : true,
                    trimSpace: false,
                    speed:600,
                    arrows: true,
                    arrowPath:'',
                    keyboard:'focused',
                    slideFocus:false,
                } );
                $eventcarousel[index].on( 'mounted', function () {                    
                    //ADA
                    setTimeout(function(){
                        jQuery('#'+$eventid+ ' .splide__slide.is-active .event-link').attr('tabindex', 0);
                        jQuery('#'+$eventid).attr('tabindex',-1);
						
						//ARIA HIDDEN
						jQuery('#'+$eventid+ ' .splide__slide').attr('aria-hidden', "true");					
						jQuery('#'+$eventid+ ' .splide__slide.is-active').attr('aria-hidden', "false");
                        
                        //set ada label on carousel dots
                        let btns = jQuery('#'+$eventid+ ' .splide__pagination__page');
                        btns.each(function( i ) {
                            let slidenum = i+1;
                            slidenum = ('0' + slidenum).slice(-2);
                            let btnlabel = jQuery('#'+$eventid+'-slide'+slidenum).data('label');
                            jQuery(this).attr("aria-label","Go to "+btnlabel+" slide");
                        });
                        
                        
                    }, 200);
                    
                } );
                $eventcarousel[index].on( 'move', function() {
                    jQuery('#'+$eventid+' .event-link').attr('tabindex',-1);
                });
                
                $eventcarousel[index].on( 'moved', function() {
                    //ADA
                    setTimeout(function(){
                        jQuery('#'+$eventid+' .event-link').attr('tabindex', -1);
                        jQuery('#'+$eventid+ ' .splide__slide.is-active .event-link').attr('tabindex', 0);
						
						//ARIA HIDDEN
						jQuery('#'+$eventid+ ' .splide__slide').attr('aria-hidden', "true");					
						jQuery('#'+$eventid+ ' .splide__slide.is-active').attr('aria-hidden', "false");
						
                    }, 200);
                } );
                $eventcarousel[index].mount();
                let eventTimer;
                $window.on('resize', function(e) {
                    clearTimeout(eventTimer);
                    eventTimer = setTimeout(function() {
                        $eventcarousel[index].refresh();            
                    }, 100);
                });
            });
        }*/
        
        ///ROOM TAB CAROUSEL        
        if (jQuery(".room-tabs-carousel")[0]){                
            let $roomcarousel = [];            
            jQuery( ".room-tabs-carousel" ).each(function(index) {                
                let $imgid = jQuery(this).attr("id");                
                $roomcarousel[index] = new Splide( '#'+$imgid, {
                    throttle: $throttlenum,
                    type : 'loop',
                    focus : 'center',
                    //gap : '2.083vw',
                    updateOnMove : true,
                    arrows: true,
                    pagination:false,
                    speed:600,
                    keyboard:'focused',
                    slideFocus:false,
					//autoHeight:true,
                    i18n: {
                        first: 'Next photo',
                        last: 'Previous photo',
                    }
                } );
                
                
                $roomcarousel[index].on( 'mounted', function () {
  
                    //ADA
                    setTimeout(function(){
                        jQuery('#'+$imgid).attr('tabindex',-1);
						
						//ARIA HIDDEN
						jQuery('#'+$imgid+ ' .splide__slide').attr('aria-hidden', "true");					
						jQuery('#'+$imgid+ ' .splide__slide.is-active').attr('aria-hidden', "false");
					
                        ///PAGINATION
                        /*let btns = jQuery('#'+$imgid+ ' .splide__pagination__page');
                        btns.each(function( i ) {
                            let slidenum = i+1,
                                $slideinc = slidenum;
                            slidenum = ('0' + slidenum).slice(-2);
                            let btnlabel = jQuery('#'+$imgid+'-slide'+slidenum).data('label');
                            jQuery(this).attr("aria-label","Go to slide "+$slideinc);
                             
                        });*/
                        
                    }, 200);
                    
                } );
                $roomcarousel[index].on( 'moved', function() {
					
					//ARIA HIDDEN
					jQuery('#'+$imgid+ ' .splide__slide').attr('aria-hidden', "true");					
					jQuery('#'+$imgid+ ' .splide__slide.is-active').attr('aria-hidden', "false");
                    
                    //console.log( $roomcarousel[index].index );   
					
                } );
                $roomcarousel[index].mount();
                
                
                jQuery('.room-tabs a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                    e.target;
                   $roomcarousel[index].refresh();
                })
                
                ///ADJACENT SLIDES CLICK
                /*jQuery('body').on('click', '.image_slide', function(e) {                
                    if( ! jQuery(this).hasClass("is-active") ) {
                        e.preventDefault();                    
                        let $items = jQuery('#'+$imgid +'-list li'),        
                            $activeindex = $items.index(jQuery('#'+$imgid +'-list li.is-active')),
                            $index = $items.index(jQuery(this));

                        if($index > $activeindex) {
                            $roomcarousel[index].go( '+' );
                        } else {
                            $roomcarousel[index].go( '-' );
                        }

                    };
                });*/
            })       
            
        }
        
        
        ///HISTORY CAROUSEL
        if (jQuery(".history-carousel")[0]){                
            let $historycarousel = [];            
            jQuery( ".history-carousel" ).each(function(index) {                
                let $imgid = jQuery(this).attr("id");                
                $historycarousel[index] = new Splide( '#'+$imgid, {
                    throttle: $throttlenum,
                    type : 'loop',
                    focus : 'center',
                    //gap : '2.083vw',
                    updateOnMove : true,
                    arrows: true,
                    pagination:false,
                    speed:600,
                    keyboard:'focused',
                    slideFocus:false,
					//autoHeight:true,
                    i18n: {
                        first: 'Next photo',
                        last: 'Previous photo',
                    }
                } );
                
                
                $historycarousel[index].on( 'mounted', function () {
  
                    //ADA
                    setTimeout(function(){
                        jQuery('#'+$imgid).attr('tabindex',-1);
						
						//ARIA HIDDEN
						jQuery('#'+$imgid+ ' .splide__slide').attr('aria-hidden', "true");					
						jQuery('#'+$imgid+ ' .splide__slide.is-active').attr('aria-hidden', "false");
					
                        ///PAGINATION
                        /*let btns = jQuery('#'+$imgid+ ' .splide__pagination__page');
                        btns.each(function( i ) {
                            let slidenum = i+1,
                                $slideinc = slidenum;
                            slidenum = ('0' + slidenum).slice(-2);
                            let btnlabel = jQuery('#'+$imgid+'-slide'+slidenum).data('label');
                            jQuery(this).attr("aria-label","Go to slide "+$slideinc);
                             
                        });*/
                        
                    }, 200);
                    
                } );
                $historycarousel[index].on( 'moved', function() {
					
					//ARIA HIDDEN
					jQuery('#'+$imgid+ ' .splide__slide').attr('aria-hidden', "true");					
					jQuery('#'+$imgid+ ' .splide__slide.is-active').attr('aria-hidden', "false");
                    
                    //console.log( $historycarousel[index].index );   
					
                } );
                $historycarousel[index].mount();
                
              
            })       
            
        } 
        
        
        
	} );
    
    
})();