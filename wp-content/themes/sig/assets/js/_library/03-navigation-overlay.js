jQuery.noConflict();

(function () {	
		
	///OVERLAY MENU
	let overlaybtn = document.querySelector('.masthead__toggle__btn'),
		overlaymenu = document.querySelector('.masthead__overlay'),
		overlaybg = document.querySelector('.masthead__overlay__nav'),
        overlaybg2 = document.querySelector('.masthead__overlay__inner'),
		overlayparent = document.querySelectorAll('a.overlay-parent-link'),
		overlaysublinks = document.querySelectorAll('a.overlay-sub-link'),
		overlayFocused = false, 
		overlayopen = false,
		overlaydisable = false,
        overlaySubOpen = false,
        currentsubmenu;
    
    
    function closeOverlaySubnav() {
        currentsubmenu.parentElement.classList.remove('submenu-open');
        currentsubmenu.setAttribute("aria-expanded", "false");
        overlaySubOpen = false;
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

	overlaybg.addEventListener('click', (event) => {
		closeOverlay();
	});
    
    overlaybg2.addEventListener('click', (event) => {
		closeOverlay();
	});
	
	
	overlaymenu.addEventListener('focusout', function(event) {
		overlayopen = false;                
		let next = event.relatedTarget;
		if(next == null ) {
			closeOverlay();
		}
	});    

	for (let item of overlayparent) {
		item.addEventListener("keydown", function(event) {
			let parent,
				next,
				child;

			switch (event.key) {
			case "ArrowRight":
				parent = item.parentElement;
				next = getNextSibling(parent);
				if(next != null) {
					child = next.getElementsByTagName('a');
					child[0].focus();
				}

				event.preventDefault();
			  break;
			case "ArrowLeft":
				parent = item.parentElement;
				next = getPreviousSibling(parent); 
				if(next != null) {
					child = next.getElementsByTagName('a');
					child[0].focus();
				}
				event.preventDefault();
			  break;
			case "Enter":
				parent = item.parentElement;
				let link = item.getAttribute("href");
				window.open(link,"_self");
			  break;
			case "Escape":
				if(overlayopen==true) {
					closeOverlay();
				 }                      
				break;
		  }

		});

		item.addEventListener('focusout', function(event) {
			overlayopen = false;
			let next = event.relatedTarget;
			if(next == null) {
                closeOverlay();
            } else if(!next.classList.contains("overlay-link")) {
                overlaybtn.focus();
            }
            
            
		});        
	}


	for (let item of overlaysublinks) {
		item.addEventListener('focusout', function(event) {
			//console.log('next: '+event.relatedTarget+ '. old: '+event.currentTarget+'. old: '+event.target ) ;
			let next = event.relatedTarget;
			if(next == null) {
				//closeOverlay();
			} else if (next.classList.contains('overlay-sub-link') || next.classList.contains('overlay-parent-link')) {
                closeOverlaySubnav();
				//nothing
			} else {
				//closeOverlay();
			}
		});

		item.addEventListener("keydown", function(event) {
			switch (event.key) {
			   case "Escape":
				if(submenuopen==true) {
					 //currentmenu.focus();
					 closeOverlay();
				 }                      
				break; 

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
            if(overlaySubOpen == true) {
                closeOverlaySubnav();
            }
            x = "true"
            arrowlink.parentElement.classList.add("submenu-open");
        }

        arrowlink.setAttribute("aria-expanded", x);
        currentsubmenu = arrowlink;
        overlaySubOpen = true;
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

    
	
	
	
	
})();
