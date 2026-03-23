jQuery.noConflict();

(function () {
	let $window = jQuery(window);

	///ON READY	
	document.addEventListener( 'DOMContentLoaded', function () {
		
		 ///CONSOLE FOCUS ELEMENTS
        /*document.addEventListener('focusin', function() {
            console.log('focused: ', document.activeElement)
        }, true);*/

        		
		
		/////////////MOBILE MENU
		
		let mobilebtn = document.querySelector('.mobile-menu-btn'),
			mobilemenu = document.querySelector('.mobile-menu-overlay'),
			mobilemenulinks = document.getElementsByClassName('mobile-menu-link'),
			mobilesubmenulinks = document.getElementsByClassName('mobile-submenu-link'),
			currentsubmenu,
			mobileFocused = false, 
			mobileOpen = false,
			mobileSubOpen = false,
			mobileDisable = false;
		
		function closeMobileSubnav() {
			currentsubmenu.parentElement.classList.remove('submenu-open');
			currentsubmenu.setAttribute("aria-expanded", "false");
			mobileSubOpen = false;
		}

		function closeMobileNav() {
			mobileDisable = true;
			mobileOpen = false;
			mobilemenu.classList.add('main-menu-closing');
			mobilebtn.classList.remove('mobile-menu-active');
			mobilebtn.focus();
			mobilebtn.setAttribute("aria-expanded", 'false');
			setTimeout(function() {
				document.body.classList.remove('mobile-menu-active');
				mobilemenu.classList.remove('mobile-menu-active','main-menu-closing');	
				mobileDisable = false;
				if(mobileSubOpen == true) {
					closeMobileSubnav();
				}
			}, 500);
		}

		function openMobileNav(event) {
			mobileDisable = true;
			document.body.classList.add('mobile-menu-active');
			mobilemenu.classList.add('mobile-menu-active');
			mobilebtn.classList.add('mobile-menu-active');
			mobilebtn.setAttribute("aria-expanded", 'true');
			mobilemenu.focus();
			mobileOpen = true;
			mobileDisable = false;
		}
		
		mobilebtn.addEventListener('click', (event) => {
			if(mobileDisable == false) {
				if(mobilebtn.classList.contains('mobile-menu-active')) {
					//CLOSE
					closeMobileNav();
				} else {
					//OPEN
					openMobileNav();
				}
			}

		});

		for (let item of mobilemenulinks) {
            item.addEventListener("keydown", function(event) {
                switch (event.key) {   
					case "Escape":
					   closeMobileNav();
					   break;
              	}                
			});
			
			item.addEventListener('focusout', function(event) {				
				//console.log('next: '+event.relatedTarget+ '. old: '+event.currentTarget+'. old: '+event.target );				
				let next = event.relatedTarget;
				if(next == null) {
					//closeMobileNav();
					mobilebtn.focus();
				} else if (next.classList.contains('mobile-menu-link') || next.classList.contains('mobile-nav-arrow')) {
					//nothing
				} else {
					//closeMobileNav();
					mobilebtn.focus();
				}
			});
                      
        }
		
		/////////MOBILE SUBNAV
		
		let mobilenavarrows = document.getElementsByClassName('mobile-nav-arrow');
		
		
		function openMobileSubnav(event) {
			
			let arrowlink = document.activeElement.parentElement;
            let x = arrowlink.getAttribute("aria-expanded");

            if (x == "true") {
				x = "false"
				arrowlink.parentElement.classList.remove("submenu-open");
            } else {
				if(mobileSubOpen == true) {
					closeMobileSubnav();
				}
				x = "true"
				arrowlink.parentElement.classList.add("submenu-open");
            }
			
            arrowlink.setAttribute("aria-expanded", x);
            currentsubmenu = arrowlink;
            mobileSubOpen = true;
        }
		
		
		
		for (let item of mobilenavarrows) {
			item.addEventListener("keydown", function(event) {
				switch (event.key) {   
					case "Enter":
						event.preventDefault();
						openMobileSubnav(event);
					   //console.log(event);
					   break;
              	}                
			});
            item.addEventListener("click", function(event) {                
               
				event.preventDefault();
				openMobileSubnav(event);
				//console.log(event);
			});
		}
		
		for (let item of mobilesubmenulinks) {
            item.addEventListener("keydown", function(event) {
                switch (event.key) {   
					case "Escape":
					   closeMobileSubnav();
					   currentsubmenu.focus();
					   break;
              	}                
			});
			
			item.addEventListener('focusout', function(event) {				
				//console.log('next: '+event.relatedTarget+ '. old: '+event.currentTarget+'. old: '+event.target );		
				
				let next = event.relatedTarget;
				if(next == null) {
					//closeMobileNav();
					//mobilebtn.focus();
				} else if (next.classList.contains('mobile-menu-parent-link')) {
					closeMobileSubnav();
					//currentsubmenu.focus();
				} else if (next.classList.contains('mobile-menu-link')) {
					//nothing
				} else {
					//closeMobileNav();					
				}
			});
                      
        }
		
	});	
	
})();