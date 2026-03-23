/* Lazy Video v1.4 */
( function() {
    
    /////////////////////////YOUTUBE
    let youtube = document.querySelectorAll( ".lazy-youtube" );    
    
    if(youtube.length > 0) {        
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);        
        
        let youtubevideos = [];
        let ytcount = 0;

        function createYoutube($youtubeid) {
            let wrapper = document.getElementById('video-'+$youtubeid),
                dynamicvideo = 'videowrap-'+$youtubeid;

            wrapper.innerHTML = "";        

            let dynamicdiv = document.createElement( "div" );            
                dynamicdiv.setAttribute( "id", dynamicvideo);
                wrapper.appendChild( dynamicdiv );


            youtubevideos[ytcount] = new YT.Player(dynamicvideo, {
                videoId: $youtubeid,
                playerVars: {
                    'playsinline': 0,
                    'showinfo=0': 0,
                },
                events: {
                    'onReady': e => e.target.playVideo()
                }
            });
            ytcount++;
        }

        for (var i = 0; i < youtube.length; i++) {

            youtube[i].addEventListener( "click", function() {

                //STOP ALL VIDEOS ON PAGE
                if (youtubevideos.length > 0) {
                    for (var i = 0; i < youtubevideos.length; i++) {
                        youtubevideos[i].stopVideo();
                    }
                }
                createYoutube(this.dataset.embed);
            } );    
        };        
    }
	
	/////////////////////////VIMEO
    ///ALREADY WILL STOP MULTIPLE VIDEOS FROM PLAYING AT ONCE
    
	let vimeo = document.querySelectorAll( ".lazy-vimeo" );
    
    if(vimeo.length > 0) {        
        var vimeoapi = document.createElement('script');
        vimeoapi.setAttribute('src','https://player.vimeo.com/api/player.js');
        document.head.appendChild(vimeoapi);        
        
        for (var i = 0; i < vimeo.length; i++) {        
        
            vimeo[i].addEventListener( "click", function() {
                
                this.innerHTML = "";
                
                let wrapper = this.id,
                    vimeoid = this.dataset.embed,
                    options = {
                      id: vimeoid
                    },
                    videoPlayer = new Vimeo.Player(wrapper, options);

                videoPlayer.setVolume(1);
                videoPlayer.play();

                videoPlayer.on('loaded', function() {
                    let vimeovideo = document.getElementById(wrapper);
                    let vimeoiframe = vimeovideo.getElementsByTagName("iframe")[0];
                    vimeoiframe.setAttribute( "data-video","vimeo");
                });

            } );    
        };
    }
    
} )();