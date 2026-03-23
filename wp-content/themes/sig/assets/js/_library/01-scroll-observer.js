/*!
 * Scroll Observer
 * Version  : 1.0.00
 */
jQuery.noConflict();

(function () {	
	let $window = jQuery(window),
	$mobile = false,
    heroPlayPromise;
    
    
    //check mobile
    const userAgent = navigator.userAgent.toLowerCase();
    const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);    
	if(isTablet) {
		$mobile = true;	
	}
   
	
  ///INTERSECTION OBSERVER
	var $topoffset = -50,
	items = document.querySelectorAll('.fade-in, .move-left, .move-right, .move-up, .counter'),
	io,
	idCounter = 0,
	minId = null,
	maxId = null,
	debounceTimeout = null;
	
	function applyChanges() {
		//console.log(minId, maxId);
		
		items.forEach(entry => {
			let entryid = entry.getAttribute('data-animate');
			if (entryid >= minId && entryid <= maxId) {
				
				if(!entry.classList.contains('in-view')) {
					entry.classList.add('in-view');
					
					//moveup
					if(entry.classList.contains('move-up')) {
						
						setTimeout(function() {
							entry.classList.remove("move-up");
						}, 2000);
					}
					
					//stat
					if (entry.classList.contains('counter')) {
						
						var counterID = entry.id,
							startVal = entry.getAttribute('data-start'),
							endVal = entry.getAttribute('data-end'),
							countDelay = entry.getAttribute('data-delay'),
							decimals = entry.getAttribute('data-decimal'),				
							duration =  entry.getAttribute('data-speed'),
							prefix =  entry.getAttribute('data-prefix'),
							suffix =  entry.getAttribute('data-suffix'),
							separator = entry.getAttribute('data-separator');
						
							if($mobile) {countDelay = 0;}

							var options = {
							  useEasing : true,
							  useGrouping : true,
							  separator : separator,
							  decimal : '.',
							  prefix : prefix,
							  suffix : suffix
							};

							var $counter = new CountUp(counterID, startVal, endVal, decimals, duration, options);
						
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
	  debounceTimeout = setTimeout(applyChanges, 100);
	}


	window.onload = function() {		
		if ( $window.width() > 576 || $mobile === false ) {
			jQuery('#loading-screen').animate({'opacity':0},100,function(){ 
				jQuery('#loading-screen').css({'display':'none'});
				
				
			});
			
			//START OBSERVER
         	io = new IntersectionObserver(reportIntersection, {'rootMargin': '0px 0px '+$topoffset+'px 0px'});	
			
			items.forEach(item => {
			  item.setAttribute('data-animate', idCounter++);
			  io.observe(item)
			});
		}	
	}
    
	
	//MASTHEAD OBSERVER
	let $masthead = document.querySelector('.masthead');
	
	if (window.scrollY>49) {
		$masthead.classList.add('nav-collapse');		
	}
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


	
	//VIDEO OBSERVER	
	Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
        get: function(){
            return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
        }
    })
        
	function checkBtnPosition() {
		let $windowheight = $window.innerHeight(),
			$windowwidth = $window.innerWidth(),
			$heroheight = jQuery('.hero-wrap').height(),
			$btnY,
			$botdist,
			$checkrates = false;
		
		
		
		//console.log('window: '+$windowheight+', hero: '+$heroheight+ 'width: '+(0.02 * $window.innerWidth()));
		
		if($heroheight >= $windowheight) {
			//$btnY = $windowheight-(0.092 * $window.innerWidth());
			$btnY = $windowheight-100;
			jQuery('#hero-video-controls').css({
			   'top' : $btnY+'px',
			   'bottom' : 'auto',
			});
		} else {
			$botdist = '30px';
		
			jQuery('#hero-video-controls').css({
			   'top' : 'auto',
			   'bottom' : $botdist,
			});
		}
		
	}
    function videoObserver() {
        //HERO VIDEO
        let $herovideo = document.getElementById("hero-video");
        if($herovideo){
            const heroVideos = document.querySelectorAll('.hero-video'); 
            let $herovideosrc = document.getElementById("hero-video-src"),
                herowrap = document.querySelector('.hero-wrap'),
                herobg = document.getElementById('hero-bg-img'),
                //$loop = $herovideosrc.dataset.loop,
                //stop = document.getElementById('hero-stop')
                playpause = document.getElementById('hero-play-pause');
				//controls = document.getElementById('hero-video-controls');
			
			
			
			checkBtnPosition();
            window.addEventListener('resize', checkBtnPosition);
            
            let $init = true;
            
            herowrap.classList.add('in-view');
            if($mobile) {
                $herovideosrc.src = $herovideosrc.dataset.mobile;
            } else {
                $herovideosrc.src = $herovideosrc.dataset.src;
            }

			
			var changeButtonState = function(type) {
                //console.log('click');
                if (type == 'playpause') {
                    if ($herovideo.paused || $herovideo.ended) {
						$herovideo.classList.remove("video-paused");
                        playpause.setAttribute('data-state', 'play');
                        $herovideo.classList.remove("video-playing");
                    } else {
                        playpause.setAttribute('data-state', 'pause');
                        $herovideo.classList.add("video-playing");
                        herobg.classList.remove('active');
						herowrap.classList.add('video-is-playing');
                    }
                } else if (type == 'ended') {
					console.log('video has ended');
					$herovideo.classList.remove("video-paused");
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
				$herovideo.classList.add("video-paused");
            }, false);
            $herovideo.addEventListener('ended', function() {
				changeButtonState('ended');
            }, false);

            playpause.addEventListener('click', function(e) {
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
            });
            
            let herovideoobserver = new IntersectionObserver((entries, observer) => { 
                entries.forEach(entry => {
                    if (entry.intersectionRatio!=0) {
                        //herovideoobserver.unobserve(entry.target);
						//ON PAGE LOAD
                        if($init) {
                            $init = false;
                            $herovideo.load();
                            
                            //https://www.w3schools.com/tags/av_event_loadedmetadata.asp
                            $herovideo.onloadedmetadata = function() {
                                
                                if (!$herovideo.classList.contains("video-playing")) {
                                    heroPlayPromise = $herovideo.play();
                                    
									
									$herovideo.pause();
                                    /*playpause.setAttribute('data-state', 'play');
                                    if (document.body.classList.contains("logged-in")) {
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
                                    }*/
                                    
                                    
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
							
							
							
                        } else {
							
							//PLAY PAUSED VIDEO ONCE SCROLLED BACK INTO VIEW
							/*if ($herovideo.classList.contains("video-paused")) {
								$herovideo.classList.remove("video-paused");
								heroPlayPromise = $herovideo.play();
								playpause.setAttribute('data-state', 'pause');
                                $herovideo.classList.add("video-playing");
							}*/
						}

                    } else {
      
                        if (heroPlayPromise !== undefined) {
                            heroPlayPromise.then(_ => {
                                heroPlayPromise = $herovideo.pause();
                                playpause.setAttribute('data-state', 'play');
                                $herovideo.classList.remove("video-playing");
                               //$herovideo.currentTime = 0;
                            })
                            .catch(error => {
                                // Show paused UI.
                            });
                        } else {
                            $herovideo.pause();
                            playpause.setAttribute('data-state', 'play');
                            $herovideo.classList.remove("video-playing");
                            //$herovideo.currentTime = 0;
                        }
                        
                    }
                });
            });        
            heroVideos.forEach(image => {
              herovideoobserver.observe(image);
            });     
        }
    }   

	if (jQuery(".hero-video-wrap")[0]){
		videoObserver();
	}

    
})();