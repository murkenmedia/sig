/*!
 * WEBINAR
 * Version: 1.0.00
 */

jQuery.noConflict();


jQuery(document).on('gform_confirmation_loaded', function(event, formId) {
    // Your custom code here
    console.log('Confirmation loaded for Form ID: ' + formId);

});


document.addEventListener('gform/ajax/post_page_change', (event) => {
    console.log('form submitted');
    if(data.formId == 3) {
        console.log('form 3 submitted');

        let vimeo = document.querySelectorAll( ".lazy-vimeo" );

        if(vimeo.length > 0) {        
            var vimeoapi = document.createElement('script');
            vimeoapi.setAttribute('src','https://player.vimeo.com/api/player.js');
            document.head.appendChild(vimeoapi);

            console.log('has vimeos');
            
            for (var i = 0; i < vimeo.length; i++) {        
            
                document.addEventListener("click", function(e){
                    const target = e.target.closest(".lazy-vimeo");

                    if(target){
                        console.log('vimeo clicked');
                        
                        target.innerHTML = "";
                        
                        let wrapper = target.id,
                            vimeoid = target.dataset.embed,
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
                    }

                } );    
            };
        }


    } 
});
    
