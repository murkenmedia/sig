jQuery.noConflict();

(function () {	
	
	//DROPDOWN NAV
	let mainmenu = document.querySelectorAll('a.main-parent-link'),
		sublinks = document.querySelectorAll('a.main-sub-link'),
		menuFocused = false, 
		submenuopen = false,
		currentmenu = '',
		menuopen = false;


	function openMenu(event) {
		let x = event.target.getAttribute("aria-expanded");
		let menu = event.target.nextElementSibling;

		if (x == "true") {
		x = "false"
		menu.classList.remove("open");
		} else {
		x = "true"
		menu.classList.add("open");
		}
		event.target.setAttribute("aria-expanded", x);
		currentmenu = event.target;
		submenuopen = true;
	}        

	function closeMenu() {
		jQuery('a.main-parent-link').attr("aria-expanded","false");
		jQuery('.dropdown-menu').removeClass("open");
		submenuopen = false;
	}

	for (let item of mainmenu) {
		item.addEventListener("keydown", function(event) {
			let parent,
				next,
				child;

			switch (event.key) {
			case "ArrowRight":
				parent = item.parentElement;
				/*if(parent.classList.contains('nav-logo')) {
					parent = item.parentElement.parentElement.parentElement;
				}*/
				next = getNextSibling(parent);
				if(next != null) {
					child = next.getElementsByTagName('a');
					child[0].focus();
				}

				event.preventDefault();
			  break;
			case "ArrowLeft":
				parent = item.parentElement;
				/*if(parent.classList.contains('nav-logo')) {
					parent = item.parentElement.parentElement.parentElement;
				}*/
				next = getPreviousSibling(parent); 
					
				
				if(next != null) {
					child = next.getElementsByTagName('a');
					child[0].focus();					
				}
				
				event.preventDefault();
			  break;
			case "Enter":
				parent = item.parentElement;
				if(parent.classList.contains('menu-item-has-children')) {
					closeMenu();
					openMenu(event);
					event.preventDefault();
				} else {
					let link = item.getAttribute("href");
					window.open(link,"_self");
				}
			  break;
			case "Escape":
				if(submenuopen==true) {
					 currentmenu.focus();
					 closeMenu();
				 }                      
				break;
		  }

		});            
		item.addEventListener('mouseover', function(event) {                
			menuopen = true;
			item.setAttribute("aria-expanded", menuopen);
		});

		item.addEventListener('mouseleave', function(event) {                
			menuopen = false;
			item.setAttribute("aria-expanded", menuopen);
		});

		item.addEventListener('focusin', function(event) {                
		   var what = whatInput.ask();
			closeMenu();                
			if(what == 'keyboard') {
				//console.log( menuFocused);
				menuFocused = true;
			}                
		});

		item.addEventListener('click', function(event) {                
			if(menuFocused == true) {
				event.preventDefault();
			}
		});

		item.addEventListener('focusout', function(event) {
			menuFocused = false;                
			let next = event.relatedTarget;
			if(next == null) {
				closeMenu();
			}
		});            
	}



	for (let item of sublinks) {
		item.addEventListener('focusout', function(event) {
			//console.log('next: '+event.relatedTarget+ '. old: '+event.currentTarget+'. old: '+event.target ) ;
			let next = event.relatedTarget;
			if(next == null) {
				closeMenu();
			} else if (next.classList.contains('main-sub-link')) {
				let menu = event.target.closest(".dropdown-menu");              
				if(!isDescendant(menu, event.relatedTarget)) {
				   closeMenu();
				}
			} else {
				closeMenu();
			}
		});

		item.addEventListener("keydown", function(event) {
			switch (event.key) {
			   case "Escape":
				if(submenuopen==true) {
					 currentmenu.focus();
					 closeMenu();
				 }                      
				break; 

			}

		 });


	}
	
	///OVERLAY MENU
	
	let overlaybtn = document.querySelector('.masthead__toggle__btn'),
		overlaymenu = document.querySelector('.masthead__overlay'),
		overlaybg = document.querySelector('.masthead__overlay__nav'),
        overlaybg2 = document.querySelector('.masthead__overlay__inner'),
		overlayparent = document.querySelectorAll('a.overlay-parent-link'),
		overlaysublinks = document.querySelectorAll('a.overlay-sub-link'),
		overlayFocused = false, 
		overlayopen = false,
		overlaydisable = false;

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
		

		/*item.addEventListener('focusin', function(event) {                
		   var what = whatInput.ask();              
			if(what == 'keyboard') {
				overlayopen = true;
			}                
		});*/

		/*item.addEventListener('click', function(event) {                
			if(overlayopen == true) {
				event.preventDefault();
			}
		});*/

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
				closeOverlay();
			} else if (next.classList.contains('overlay-sub-link') || next.classList.contains('overlay-parent-link')) {
				//nothing
			} else {
				closeOverlay();
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
	
	
	
	
	
})();
