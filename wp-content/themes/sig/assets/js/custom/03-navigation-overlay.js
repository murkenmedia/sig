jQuery.noConflict();

(function () {
    
    let overlaybtn = document.querySelector('.overlay-toggle-btn'),
		overlaymenu = document.querySelector('.masthead__overlay'),
		overlaybg = document.querySelector('.masthead__overlay__nav'),
        overlaybg2 = document.querySelector('.masthead__overlay__inner'),
		overlaymenulinks = document.querySelectorAll('a.overlay-parent-link'),
		overlaysubmenulinks = document.querySelectorAll('a.overlay-sub-link'),
        currentsubmenu,
		overlayFocused = false, 
        overlayopen = false,
        overlaysubopen = false,
        overlaydisable = false;
		
		function closeOverlaySubnav() {
			currentsubmenu.parentElement.classList.remove('submenu-open');
			currentsubmenu.setAttribute("aria-expanded", "false");
			overlaysubopen = false;
		}

		function closeOverlay() {
            overlaydisable = true;
            overlayopen = false;
            document.body.classList.add('overlay-menu-closing');
            overlaymenu.classList.add('overlay-menu-closing');
            overlaybtn.classList.remove('overlay-menu-active');
            overlaybtn.focus();
            overlaybtn.setAttribute("aria-expanded", 'false');
            
            setTimeout(function() {
                document.body.classList.remove('overlay-menu-active', 'overlay-menu-closing');
                overlaymenu.classList.remove('overlay-menu-active','overlay-menu-closing');
                overlaydisable = false;
            }, 500);
        }

        function openOverlay(event) {
            overlaydisable = true;
            document.body.classList.add('overlay-menu-active');
            overlaymenu.classList.add('overlay-menu-active');
            overlaybtn.classList.add('overlay-menu-active');
            overlaybtn.setAttribute("aria-expanded", 'true');
            overlaymenu.focus();
            overlayopen = true;
            overlaydisable = false;
        }
		
		overlaybtn.addEventListener('click', (event) => {
           if(overlaydisable == false) {
				if(overlaybtn.classList.contains('overlay-menu-active')) {
					//CLOSE
					closeOverlay();
				} else {
					//OPEN
					openOverlay();
				}
			}

		});

		for (let item of overlaymenulinks) {
            item.addEventListener("keydown", function(event) {
                switch (event.key) {   
					case "Escape":
					   closeOverlay();
					   break;
              	}                
			});
			
			item.addEventListener('focusout', function(event) {				
				//console.log('next: '+event.relatedTarget+ '. old: '+event.currentTarget+'. old: '+event.target );				
				let next = event.relatedTarget;
				if(next == null) {
					//closeOverlay();
					overlaybtn.focus();
				} else if (next.classList.contains('overlay-link') || next.classList.contains('overlay-nav-arrow')) {
					//nothing
				} else {
					//closeOverlay();
					overlaybtn.focus();
				}
			});
                      
        }
		
		/////////overlay SUBNAV
		
		let overlaynavarrows = document.getElementsByClassName('overlay-nav-arrow');
		
		
		function openOverlaySubnav(event) {
			
			let arrowlink = document.activeElement.parentElement;
            let x = arrowlink.getAttribute("aria-expanded");

            if (x == "true") {
				x = "false"
				arrowlink.parentElement.classList.remove("submenu-open");
            } else {
				if(overlaysubopen == true) {
					closeOverlaySubnav();
				}
				x = "true"
				arrowlink.parentElement.classList.add("submenu-open");
            }
			
            arrowlink.setAttribute("aria-expanded", x);
            currentsubmenu = arrowlink;
            overlaysubopen = true;
        }
		
		
		
		for (let item of overlaynavarrows) {
			item.addEventListener("keydown", function(event) {
				switch (event.key) {   
					case "Enter":
						event.preventDefault();
						openOverlaySubnav(event);
					   //console.log(event);
					   break;
              	}                
			});
            item.addEventListener("click", function(event) {                
               
				event.preventDefault();
				openOverlaySubnav(event);
				//console.log(event);
			});
		}
		
		for (let item of overlaysubmenulinks) {
            item.addEventListener("keydown", function(event) {
                switch (event.key) {   
					case "Escape":
					   closeOverlaySubnav();
					   currentsubmenu.focus();
					   break;
              	}                
			});
			
			item.addEventListener('focusout', function(event) {				
				//console.log('next: '+event.relatedTarget+ '. old: '+event.currentTarget+'. old: '+event.target );		
				
				let next = event.relatedTarget;
				if(next == null) {
					//closeOverlay();
					//overlaybtn.focus();
				} else if (next.classList.contains('overlay-menu-parent-link')) {
					closeOverlaySubnav();
					//currentsubmenu.focus();
				} else if (next.classList.contains('overlay-link')) {
					//nothing
				} else {
					//closeOverlay();					
				}
			});
                      
        }
	
	
})();
