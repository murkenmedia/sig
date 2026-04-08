/*!
 * HHV Scroll Observer
 * Version  : 1.0.00
 */
jQuery.noConflict();

(function () {	
	let $window = jQuery(window),
	$mobile = false,
    heroPlayPromise,
    $masthead = document.querySelector('.masthead');

    //check mobile
    const userAgent = navigator.userAgent.toLowerCase();
    const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);    
	if(isTablet) {
		$mobile = true;	
	}
    
    if(window.orientation > 1) {
		$mobile = true;	
	}
    
    
    function fadeOutAndRemove(element) {
        element = document.getElementById(element);
        if (!element) return;

        element.classList.add('fade-out');
        element.addEventListener('transitionend', function handler() {
            element.remove();
            element.removeEventListener('transitionend', handler);
        }, { once: true });
    }

	
  ///INTERSECTION OBSERVER
    var $topoffset = -50,
	items = document.querySelectorAll('.fade-in, .move-left, .move-right, .move-up, .move-down, .animation-chain, .animate, .counter, .scale-center, .scale-right'),
	io,
	idCounter = 0,
	minId = null,
	maxId = null,
	debounceTimeout = null,
    nodelayclasses = ['move-left', 'move-right', 'move-down', 'move-up', 'scale-center', 'scale-right'];


    function applyChanges() {
		//console.log(minId, maxId);
		
		items.forEach(entry => {
			let entryid = entry.getAttribute('data-animate');
			if (entryid >= minId && entryid <= maxId) {
				
				if(!entry.classList.contains('in-view')) {
					entry.classList.add('in-view');
                    
					//remove class
                    let hasMatch = nodelayclasses.some(className => entry.classList.contains(className));
                    if (hasMatch) {
                        setTimeout(function() {
							entry.classList.add("no-delay");
						}, 2000);
                    };
                    
                    if(entry.classList.contains('animation-chain')) {						
						setTimeout(function() {
							entry.classList.remove('animation-chain');
						}, 2000);
					}
                    
                    /////////STAT
                    if (entry.classList.contains('counter')) {

                        let counterID = entry.id,
                            startVal = entry.getAttribute('data-start'),
                            endVal = entry.getAttribute('data-end'),
                            countDelay = entry.getAttribute('data-delay'),
                            decimals = entry.getAttribute('data-decimal'),				
                            duration =  entry.getAttribute('data-speed'),
                            prefix =  entry.getAttribute('data-prefix'),
                            suffix =  entry.getAttribute('data-suffix'),
                            separator = entry.getAttribute('data-separator');

                        if($mobile) {countDelay = 0;}

                        let options = {
                          useEasing : true,
                          useGrouping : true,
                          separator : separator,
                          decimal : '.',
                          prefix : prefix,
                          suffix : suffix
                        };

                        let $counter = new CountUp(counterID, startVal, endVal, decimals, duration, options);

                        setTimeout(function() {
                            entry.parentElement.classList.add('animating');
                            $counter.reset();
                            $counter.start();
                         }, countDelay);

                    }
				}
                
                
			}
		});
		minId = null;
		maxId = null;
	}

	function reportIntersection(entries) {
	  clearTimeout(debounceTimeout);
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		  const entryId = parseInt(entry.target.getAttribute('data-animate'));
		  if (minId === null || maxId === null) {
			minId = entryId;
			maxId = entryId;
		  } else {
			minId = Math.min(minId, entryId);
			maxId = Math.max(maxId, entryId);
		  }
		}
	  });
	  debounceTimeout = setTimeout(applyChanges, 50);
	}
    
    
    //WINDOW LOAD
	document.addEventListener( 'DOMContentLoaded', function () {
        
        setTimeout(() => {
          fadeOutAndRemove("loading-screen");
        }, 100);

        //START OBSERVER
        io = new IntersectionObserver(reportIntersection, {'rootMargin': '0px 0px '+$topoffset+'px 0px'});	

        items.forEach(item => {
          item.setAttribute('data-animate', idCounter++);
          io.observe(item)
        });

		
		if (window.scrollY>49) {
			$masthead.classList.add('nav-collapse');		
		}
		
        if (document.querySelector('.hero__video')) {
            videoObserver();
		}
		
	});
    
    function mastheadObserver() {
       if (
          "IntersectionObserver" in window &&
          "IntersectionObserverEntry" in window &&
          "intersectionRatio" in window.IntersectionObserverEntry.prototype
        ) {
        $masthead = document.querySelector('.masthead');
        let headerobserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                $masthead.classList.remove('nav-collapse');
            } else {
                $masthead.classList.add('nav-collapse');
                
            }
        });
        headerobserver.observe(document.querySelector(".header-pixel"));
           
       }
    }
	
    mastheadObserver();

    
    
    Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
        get: function(){
            return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
        }
    })
        
	function checkBtnPosition() {
		let $windowheight = $window.innerHeight(),
			$windowwidth = $window.innerWidth(),
			$heroheight = jQuery('.hero').height(),
			$btnY,
			$botdist,
			$checkrates = false;
		
        if (document.querySelector('.has-inset-hero-video.check-rates-hero')) {
			$checkrates = true;
		}
		
		//console.log('window: '+$windowheight+', hero: '+$heroheight+ 'width: '+(0.02 * $window.innerWidth()));
		
		if($heroheight >= $windowheight) {
			//$btnY = $windowheight-(0.092 * $window.innerWidth());
			$btnY = $windowheight-100;
			jQuery('#hero__controls').css({
			   'top' : $btnY+'px',
			   'bottom' : 'auto',
			});
		} else {
			$botdist = '2.083vw';
			if($windowwidth < 1024 && $checkrates) {				
				if($windowwidth >=768) {
					$botdist = '60px';
				} else {
					$botdist = '100px';
				}					
			} 
			jQuery('#hero__controls').css({
			   'top' : 'auto',
			   'bottom' : $botdist,
			});
		}
		
	}	
	
	function videoObserver() {
        //HERO VIDEO
        let $herovideo = document.getElementById("hero__video");
        if($herovideo){
            const heroVideos = document.querySelectorAll('.hero__video'); 
            let $herovideosrc = document.getElementById("hero__video__src"),
                herowrap = document.querySelector('.hero'),
                herobg = document.getElementById('hero__image'),
                playpause = document.getElementById('hero__controls__playpause'),
				$videosrc = '';
            
            
			
			
			checkBtnPosition();
            window.addEventListener('resize', checkBtnPosition);
            
            let $init = true,
				$reset = false,
                $loggedin = false;
            
            
            if (document.body.classList.contains("logged-in")) {
                $loggedin = true;
            }
            
            herowrap.classList.add('in-view');
           if($mobile || document.querySelector('.mobile-video')) {
				//console.log('mobile');
				$videosrc = $herovideosrc.dataset.mobile;
			} else {
				$videosrc = $herovideosrc.dataset.src;
			}
			$herovideosrc.src = $videosrc;
			
            var changeButtonState = function(type) {
                //console.log('click');
                if (type == 'playpause') {
                    if ($herovideo.paused || $herovideo.ended) {
                        playpause.setAttribute('data-state', 'play');
                        $herovideo.classList.remove("video-playing");
                    } else {
                        playpause.setAttribute('data-state', 'pause');
                        $herovideo.classList.add("video-playing");
                        herobg.classList.remove('active');
						herowrap.classList.add('video-is-playing');
                    }
                } else if (type == 'ended') {
                    playpause.setAttribute('data-state', 'play');
                    $herovideo.classList.remove("video-playing");
                    herobg.classList.add('active');
					herowrap.classList.remove('video-is-playing');
                }
            }

        
            
            $herovideo.addEventListener('play', function() {
               changeButtonState('playpause');
            }, false);
            $herovideo.addEventListener('pause', function() {
               changeButtonState('playpause');
            }, false);
            $herovideo.addEventListener('ended', function() {
                changeButtonState('ended');                            
                //playpause.setAttribute('data-state', 'play');
                //$herovideo.classList.remove("video-playing");
            }, false);

            playpause.addEventListener('click', function(e) {
				
				if ($reset == false) {

					if ($herovideo.paused) {
					   //heroPlayPromise = $herovideo.play();
					   herobg.classList.remove('active');
					   heroPlayPromise = $herovideo.play();
					} else if($herovideo.ended) {
						$herovideo.load();
						heroPlayPromise = $herovideo.play();
				   } else {
						heroPlayPromise = $herovideo.pause();
				   }
					
				} else {
					$herovideosrc.src = $videosrc;
					$herovideo.load();
					$herovideo.onloadedmetadata = function() {
						heroPlayPromise = $herovideo.play();
						$herovideo.classList.add('video-playing');
						herowrap.classList.add('video-is-playing');

						if($herovideo.playing){
							herobg.classList.remove('active');
						}
						playpause.classList.add('active');
						$reset = false;
					}
					
				}
               
            });
            
            let herovideoobserver = new IntersectionObserver((entries, observer) => { 
                entries.forEach(entry => {
                    if (entry.intersectionRatio!=0) {
                        //herovideoobserver.unobserve(entry.target);
                        if($init) {
                            $init = false;
                            
                           if (!$loggedin) {
                                $herovideo.load();
                            } else {
                                playpause.setAttribute('data-state', 'play');
                                playpause.classList.add('active');
                            }
                            
                            //https://www.w3schools.com/tags/av_event_loadedmetadata.asp
                            $herovideo.onloadedmetadata = function() {
                                
                                if (!$herovideo.classList.contains("video-playing")) {
                                    heroPlayPromise = $herovideo.play();
                                    
                                    if ($loggedin) {
                                        //heroPlayPromise = $herovideo.play();
                                        $herovideo.pause();
                                        playpause.setAttribute('data-state', 'play');
                                    } else {
                                        heroPlayPromise = $herovideo.play();
                                        $herovideo.classList.add('video-playing');
										herowrap.classList.add('video-is-playing');
                                        
                                        if($herovideo.playing){
                                            //console.log('video playing');
                                            herobg.classList.remove('active');
                                        }
                                    }
                                    
                                    
                                    playpause.classList.add('active');

                                    if (heroPlayPromise !== undefined) {
                                        heroPlayPromise.then(_ => {

                                        })
                                        .catch(error => {
                                            // Show paused UI.
                                        });
                                    }

                                }

                            };
                        }

                    } else {
                        //herowrap.classList.remove('in-view');

                        if (heroPlayPromise !== undefined) {
                            heroPlayPromise.then(_ => {
                                heroPlayPromise = $herovideo.pause();
                                /*playpause.setAttribute('data-state', 'play');
                                $herovideo.classList.remove("video-playing");*/
								
								$herovideosrc.src = '';
								//$herovideo.removeAttribute('src');
								$herovideo.load();
								
								playpause.setAttribute('data-state', 'play');
								$herovideo.classList.remove("video-playing");
								herobg.classList.add('active');
								herowrap.classList.remove('video-is-playing');
								$reset = true;
								
                               //$herovideo.currentTime = 0;
                            })
                            .catch(error => {
                                // Show paused UI.
                            });
                        } else {
                            $herovideo.pause();
                            playpause.setAttribute('data-state', 'play');
                            $herovideo.classList.remove("video-playing");
							
							
							$herovideosrc.src = '';
							//$herovideo.removeAttribute('src');
							$herovideo.load();

							playpause.setAttribute('data-state', 'play');
							$herovideo.classList.remove("video-playing");
							herobg.classList.add('active');
							herowrap.classList.remove('video-is-playing');
							$reset = true;
							
                            //$herovideo.currentTime = 0;
                        }
                        //herobg.classList.add('active');
                    }
                });
            });        
            heroVideos.forEach(image => {
              herovideoobserver.observe(image);
            });     
        }
    } 
    
    
    /*window.onload = function() {
        console.log('onload');
        startTransitions();
	}*/
    
    
})();