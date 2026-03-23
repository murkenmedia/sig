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
            families: ['Open+Sans:400,400i,600,700', 'Lato:400,700,900']
        },
        custom: {
            families: ['SIG']
        }
    });
    
	
	function offset(el) {
        var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    
	
	jQuery( document ).ready(function() {
		
		//AGENDA		
		if (jQuery("#agenda-tabs")[0]){
			  let url = location.href.replace(/\/$/, "");

			  if (location.hash) {
				const hash = url.split("#");
				jQuery('#agenda-tabs a[href="#'+hash[1]+'"]').tab("show");
				//url = location.href.replace(/\/#/, "#");
				url = location.href;
				history.replaceState(null, null, url);
				/*setTimeout(() => {
				  $window.scrollTop(0);
				}, 400);*/
			  }

			  jQuery('a[data-toggle="tab"]').on("click", function() {
				let newUrl;
				const hash = jQuery(this).attr("href");
				if(hash == "#home") {
				  newUrl = url.split("#")[0];
				} else {
				  newUrl = url.split("#")[0] + hash;
				}
				//newUrl += "/";
				history.replaceState(null, null, newUrl);
			  });
			
		}
		
		//ISOTOPE
		if (jQuery(".filter-grid")[0]){
			
			var hashFilter  = '';
				
			if (window.location.hash.substring(1) != '') {
				hashFilter = "." + window.location.hash.substring(1);
			}
				
			var $grid = jQuery('.filter-grid').isotope({
				itemSelector: '.grid-item',
				filter: hashFilter,
				//resizable: false, 
				//layoutMode: 'fitRows',
			});

			
			if (window.location.hash.substring(1) != '') {
				$grid.isotope({ filter: hashFilter });
				jQuery('button.is-checked').removeClass('is-checked');
			    jQuery( 'button'+hashFilter ).addClass('is-checked');
			}
			
			
			jQuery('.filter-link').on( 'click', function(e) {
				e.preventDefault();

				var filterValue = jQuery( this ).attr('data-cat');
				filterValue = filterValue.replace(/\s/g, '');
				jQuery('.filter-button[data-filter="'+filterValue+'"]').click();

				let winwidth = jQuery( window ).width();
				let offset = 150;

				if(winwidth > 1700) {
					offset = 190;
				}
				var top = jQuery('#filters').offset().top-offset;
				/*setTimeout(function(){ 
					jQuery('html,body').animate({scrollTop: top}, 600);
				}, 10);*/

			});
			
			
			jQuery('#filters').on( 'click', 'button', function() {
				var filterValue = jQuery( this ).attr('data-filter');
				$grid.isotope({ filter: filterValue });
				jQuery('.lazy').trigger('scroll');
				
				//change hash
				var url_ob = new URL(document.URL),
					newhash='';
				if(filterValue == '*') {
					history.pushState("", document.title, window.location.pathname);
				} else {
					newhash = filterValue.replace('.', '');
					url_ob.hash = '#'+newhash;
					var new_url = url_ob.href;
					document.location.href = new_url;
				}
			});
			
			jQuery('.button-group').each( function( i, buttonGroup ) {
				var $buttonGroup = jQuery( buttonGroup );
				$buttonGroup.on( 'click', 'button', function() {
					$buttonGroup.find('.is-checked').removeClass('is-checked');
					jQuery( this ).addClass('is-checked');
					jQuery('.lazy').trigger('scroll');
					
					
				});
			});

			window.onhashchange = function() {				
				if(window.location.hash == '') {
					//SHOW ALL
					hashFilter = "*";
					$grid.isotope({ filter: hashFilter });
					
					jQuery('.button-group').each( function( i, buttonGroup ) {
						var $buttonGroup = jQuery( buttonGroup );
						$buttonGroup.find('.is-checked').removeClass('is-checked');
						$buttonGroup.find('[data-filter="*"]').addClass('is-checked');
						jQuery('.lazy').trigger('scroll');
					});
					
				} else if(window.location.hash.substring(1) != '') {
					//SHOW FILTER
					hashFilter = "." + window.location.hash.substring(1);
					$grid.isotope({ filter: hashFilter });
					
					jQuery('.button-group').each( function( i, buttonGroup ) {
						var $buttonGroup = jQuery( buttonGroup );
						$buttonGroup.find('.is-checked').removeClass('is-checked');
						$buttonGroup.find('.'+ window.location.hash.substring(1)).addClass('is-checked');
						jQuery('.lazy').trigger('scroll');
					});
				}
			}
			
			$grid.isotope('layout');
			//$grid.isotope('shuffle');
			
		}
		
		//CONSTANT CONTACT
		var updateForm;
		function updateHeadline() {
			console.log('updateheadline');
			updateForm = setInterval(checkForm, 100);
		}

		function checkForm() {
			var $headline = jQuery('#list_memberships_label_0').text();
			if ($headline == 'Email Lists') {
				jQuery('#list_memberships_label_0').html("Interests");
				jQuery(".ctct-inline-form").addClass('in-view');
				clearInterval(updateForm);
			}
		}		
		
		if (jQuery(".ctct-inline-form")[0]){
			jQuery('.ctct-inline-form').change(function() {
				jQuery('#list_memberships_label_0').html("Interests");
				jQuery(".ctct-inline-form").addClass('in-view');
			});
			
			updateHeadline();
			
		}
		
		///TRACK LINK
		jQuery('p.track-external a').click(function() {
			jQuery(this).attr('target', '_blank');
		});
		
		
		if (jQuery(".heroslider")[0]){
            let $firstimg = jQuery('.first-img').data('src');            
            jQuery('<img/>').attr('src', $firstimg).on('load', function() {
               jQuery(this).remove();                
               jQuery('.first-img').css('background-image', 'url('+$firstimg+')').addClass('in-view');
                setTimeout(function(){ 
                    jQuery(".hero-content").addClass("show");    

                   jQuery('.lazy-slider-img').lazy({
                        name:"lazy-slider-img",
                        threshold:400,
                        autoDestroy:false,
                        chainable:false,
                        bind:"event",
                        visibleOnly:false,
                        //scrollDirection: 'both',
                        removeAttribute: true,

                    });


                }, 200);
                //jQuery(".loading").removeClass("active");
            });
        }
		
		//WEBINAR REGISTER CHECK - SHOW THE REGISTRATION FORM UNTIL REGISTERED   
        jQuery(document).on('gform_confirmation_loaded', function(event, formId){
            if(formId == 10) {
                Cookies.set('sig_registered', '-1', { expires: 365 });
            }   
        });
        
        ///GET THE LINK
        function getWebinarLink(webinarbtn) {
            var link, link1, link2, link3 = '';
            link1 = jQuery(webinarbtn).data('control');
            link2 = jQuery(webinarbtn).data('title');
            link3 = jQuery(webinarbtn).data('img');
            
            link = 'https://'+link1+link2+link3;
            link = link.replace('[g2s]', 'www.gotostage.com/channel/');
            link = link.replace('[g2sr]', '/recording/');
            link = link.replace('[g2sa]', 'attendee.gotowebinar.com/recording/');
            
            //console.log(link);
            
            return link;
        }
        
        function registerCheck(e) {
            e.preventDefault();
            var webinarbtn = e.target;
            
            var $webinar = getWebinarLink(webinarbtn);
            
            
            if (Cookies.get('sig_registered') == undefined) {
                
                var id = jQuery(webinarbtn).data('id');
                var name = jQuery(webinarbtn).data('name');
                
                jQuery('#input_10_4').val(id);
                jQuery('#input_10_6').val(name);
                
                jQuery.magnificPopup.open({
                      items: {
                        src: '#webinar-registration-modal'
                      },
                    type: 'inline',
                    closeOnContentClick: false,
                    midClick: true,
                    removalDelay: 400,
                    mainClass: 'mfp-fade mfp-middle',
                    preloader: false,                    
                });                
            
            } else {    
                window.open($webinar);                
            }
        }
        
        jQuery('.register-popup-btn' ).on( "click", registerCheck);
		
		
		///////////SLIDERS        
        if (jQuery(".heroslider")[0]){
            
            let sliderlinks = document.querySelectorAll('a.carousel-control');

            for (let item of sliderlinks) {
                item.addEventListener("keydown", function(event) {                    
                    let parent = jQuery(this).parent().attr('id');
                    switch (event.key) {
                    case "ArrowRight":                            
                        if(jQuery(this).hasClass('carousel-control-next')) {
                            jQuery('#'+parent).carousel('next');
                        } else {
                            jQuery('#'+parent).carousel('prev');
                        }
                        event.preventDefault();
                      break;
                    case "ArrowLeft":
                        if(jQuery(this).hasClass('carousel-control-next')) {
                            jQuery('#'+parent).carousel('next');
                        } else {
                            jQuery('#'+parent).carousel('prev');
                        }                       
                        event.preventDefault();
                      break;
                    case "Enter":                            
                      if(jQuery(this).hasClass('carousel-control-next')) {
                            jQuery('#'+parent).carousel('next');
                        } else {
                            jQuery('#'+parent).carousel('prev');
                        }                       
                      event.preventDefault();
                      break;
                  }
                });                
            }            
        }
		
		//animate-height		
		jQuery('.carousel.animate-height').carousel().on('slide.bs.carousel', function (e) {
			var nextH = jQuery(e.relatedTarget).height();
			jQuery(this).find('div.active').parent().animate({
				height: nextH
			}, 500);
		});
		
		
        
        
		

		// SCROLL TO ANCHOR
		jQuery('a.scroll-link[href*="#"]:not([href="#"]), p.scroll-link a[href*="#"]:not([href="#"]), li.scroll-link a[href*="#"]:not([href="#"])').click(function() {
			 if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				 let $speed = 1000,
					 //$top = 148;
					 $top = 80;
				 if (jQuery(this).data('speed')) {
					 $speed = jQuery(this).data('speed');
					 //console.log($speed);
				 }
				 if (jQuery(this).data('top')) {
					 $top = jQuery(this).data('top');
					 //console.log($top);
				 }
				 let target = jQuery(this.hash);
				 target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
				 
				 if (target.length) {
					jQuery('html, body').animate({
						scrollTop: (target.offset().top-$top)
					}, $speed, "easeInOutExpo");
					return false;
				 }
			 }
		});
		
        
        jQuery('.toggle-button').bind('click tap', toggleClick);
		
		function toggleClick(e) {
			e.preventDefault();
            if(jQuery('body').hasClass('mobile-nav-open')) {
                jQuery('body').removeClass('mobile-nav-open');
            } else {
                jQuery('body').addClass('mobile-nav-open');
            }			
		}
		
		//GPPR
		if (Cookies.get('CookieConsent') == undefined) {
			//jQuery("html").addClass("has-cookie-consent");
			Cookies.set('CookieConsent', '-1', { expires: 365 });
		}
        
		
		/*function acceptCookie() {
			Cookies.set('CookieConsent', 'accepted', { expires: 365 });
			var $cookieheight = jQuery('#cookie-consent').height()+50;
			jQuery('#cookie-consent').css({"bottom":"-"+$cookieheight+"px"});
		}
		
		jQuery('#cookie-button').bind('click', acceptCookie);*/
		
		
        //MAGNIFIC
        
        //HOMEPOPUP
		if (jQuery("#home-popup")[0]){
			if (Cookies.get('home_popup') == null) {
                
				let $time = jQuery("#home-popup").data( "time" ),
                    $class = jQuery("#home-popup").data( "class" );
                
				if ($time !== '0') {
					Cookies.set('home_popup', '1', { expires: $time });
				}				
				setTimeout(function() {
					jQuery.magnificPopup.open({
						items: {
							src: "#home-popup",
						},
                        type: "inline",
                        removalDelay:300,
                        mainClass: 'mfp-fade home-popup-wrap '+$class,
                        preloader: false,
                        autoFocusLast:false,
                        callbacks: {
                            open: function() {
                                jQuery('.lazy-popup').Lazy({
                                    removeAttribute: false,
                                    effect: "fadeIn",
                                    effectTime: 700,
                                    threshold: 200,
                                    chainable: false,
                                    visibleOnly: true,
                                });
                                jQuery('.lazy-popup').trigger('scroll');

                            },
                        }

					}, 0);
				}, 2000);
			}
		}  
		
		if (jQuery(".open-popup-link")[0]){
            jQuery('a.open-popup-link').magnificPopup({
                type:'inline',
                closeOnContentClick: false,
                midClick: true,
                removalDelay: 400,
                mainClass: 'mfp-fade',
                preloader: false,
                //autoFocusLast:false,
            });
        }
		
		if (jQuery(".image-popup")[0]){
			jQuery('.image-popup').magnificPopup({
				type: 'image',
				closeOnContentClick: true,
				mainClass: 'mfp-img-mobile',
				image: {
					verticalFit: true
				}

			});
		}
		
		if (jQuery(".is-style-image-popup")[0]){
			jQuery('.is-style-image-popup').magnificPopup({
				type: 'image',
				delegate: 'a',
				closeOnContentClick: true,
				mainClass: 'mfp-img-mobile',
				image: {
					verticalFit: true
				}

			});
		}	
        
        if (jQuery(".open-popup")[0]){
            //Not used in any templates
            jQuery('a.open-popup').magnificPopup({
                type:'inline',
                closeOnContentClick: false,
                midClick: true,
                removalDelay: 400,
                mainClass: 'mfp-fade',
                preloader: false,
                autoFocusLast:false,
            });
        }       
        
        if (jQuery(".open-iframe")[0]){
            //Not used in any templates
            jQuery('a.open-iframe').magnificPopup({
                type:'iframe',
                closeOnContentClick: false,
                midClick: true,
                removalDelay: 400,
                mainClass: 'mfp-fade',
                preloader: false,
                autoFocusLast:false,
                iframe: {
                  markup: '<div class="mfp-iframe-scaler">'+
                            '<div class="mfp-close"></div>'+
                            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                          '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

                  patterns: {
                    youtube: {
                      index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

                      id: 'v=', // String that splits URL in a two parts, second part should be %id%
                      // Or null - full URL will be returned
                      // Or a function that should return %id%, for example:
                      // id: function(url) { return 'parsed id'; }

                      src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
                    },
                    vimeo: {
                      index: 'vimeo.com/',
                      id: '/',
                      src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                      index: '//maps.google.',
                      src: '%id%&output=embed'
                    },
                 
                  },

                  srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
                }
            });
        }
        
    
		////////LAZY
		
		if (jQuery(".lazy")[0]){
			jQuery('.lazy').Lazy({
				removeAttribute: false,
				effect: "fadeIn",
				effectTime: 700,
				threshold: 600,
				chainable: false,
				//visibleOnly: true,
			});
			jQuery('.lazy').trigger('scroll');
		}
		
		if (jQuery(".lazy-frame")[0]){
			jQuery('.lazy-frame').Lazy({
				removeAttribute: false,
				effect: "fadeIn",
				effectTime: 700,
				threshold: 600,
				chainable: false,
			});
		}
		
		if (jQuery(".lazy-nofade")[0]){
			jQuery('.lazy-nofade').Lazy({ 
				removeAttribute: false,
				threshold :600,
				chainable: false,
				visibleOnly: true,
				afterLoad: function(element) {
					element.addClass("in-view");
				}
			});
			jQuery('.lazy-nofade').trigger('scroll');
		}
	

		
		//PARALLAX
		if(jQuery('.parallax, .is-style-parallax')[0]){
			if ($window.width() > 768 || $mobile === false ) {
				jQuery('.parallax').each(function() {
					var parallaxElement = jQuery(this);
					parallaxElement.parallax("50%", 0.1);
				});
				
				jQuery('.is-style-parallax').each(function() {
					var parallaxElement = jQuery(this);
					parallaxElement.parallax("50%", 0.1);
				});
			}
    	}

	});	
	
	
})();
