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
        
        
        ///////////////////MAIN MENU
		
        let mainmenu = document.querySelectorAll('a.mega-parent-link'),
            sublinks = document.querySelectorAll('a.mega-sub-link'),
            logolink = document.querySelector('a.logo-link'),
            menuFocused = false, 
            submenuopen = false,
            currentmenu = '',
            menuopen = false,
            header = document.getElementById("header");
        
        function loadNavImages(item) {
            
            var navimages = item.getElementsByClassName("nav-img");
            for (var i = 0; i < navimages.length; i++) {
                var $src, $srcset;
                $src = navimages.item(i).getAttribute('data-src');
                $srcset = navimages.item(i).getAttribute('data-srcset');
                navimages.item(i).src = $src;
                navimages.item(i).srcset = $srcset;
            }

        }

        
        function openMenu(event) {
            let x = event.target.getAttribute("aria-expanded");
            let menu = event.target.nextElementSibling;
            //let itemparent = event.target.parentElement;
            //loadNavImages(itemparent);
            
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
            jQuery('a.mega-parent-link').attr("aria-expanded","false");
            jQuery('.mega-menu').removeClass("open");
            submenuopen = false;
        }
        
        for (let item of mainmenu) {
            let itemparent = item.parentElement;
            
            itemparent.addEventListener('mouseover', function(event) {
                menuopen = true;
                item.setAttribute("aria-expanded", menuopen);                
                loadNavImages(itemparent);
            });
            
            if (itemparent.matches(':hover')) {
                menuopen = true;
                item.setAttribute("aria-expanded", menuopen);                
                loadNavImages(itemparent);
            }
            
            item.addEventListener("keydown", function(event) {
                let parent,
                    next,
                    child;
                
                switch (event.key) {
                case "ArrowRight":
                    parent = item.parentElement;
                    next = getNextSibling(parent);  
                    if(next != null) {
                        child = next.childNodes;
                        child[0].focus();
                    }
                    
                    event.preventDefault();
                  break;
                case "ArrowLeft":
                    parent = item.parentElement;
                    next = getPreviousSibling(parent); 
                    if(next != null) {
                        child = next.childNodes;
                        child[0].focus();
                    }
                    event.preventDefault();
                  break;
               /* case "ArrowDown":
                    openMenu(event);
                    parent = item.parentElement;
                    let sublink = parent.querySelector('.mega-sub-link');
                    sublink.focus();
                    event.preventDefault();        
                    break;*/  
                case "Enter":
                    if(menuFocused == true) {
                        closeMenu();
                        openMenu(event);
                    }
                    loadNavImages(itemparent);
                    event.preventDefault();
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
                loadNavImages(itemparent);
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
                loadNavImages(itemparent);
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
                } else if (next.classList.contains('mega-sub-link')) {
                    let menu = event.target.closest(".mega-menu");              
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
        
        logolink.addEventListener('keydown', function(event) {
            let parent,
                next,
                child;
                //console.log($focus);
                
                switch (event.key) {
                case "ArrowRight":
                    parent = logolink.parentElement;
                    next = getNextSibling(parent);  
                    if(next != null) {
                        child = next.childNodes;
                        child[0].focus();
                    }
                    
                    event.preventDefault();
                  break;
                case "ArrowLeft":
                    parent = logolink.parentElement;
                    next = getPreviousSibling(parent); 
                    if(next != null) {
                        child = next.childNodes;
                        child[0].focus();
                    }
                    event.preventDefault();
                  break;
            }
        });
		
		
		
		//////////////MAIN NAV HOVER IMG  

        function setMenuImg($ele) {
            let $parent = $ele.closest('.mega-menu-parent'),
                $navwrap = $parent.find('.mega-menu__img');

            if($ele.hasClass('has-image')) {
                let $imgid = $ele.data('id');
                $navwrap.find('.active').removeClass('active');
                jQuery('.menu-img-'+$imgid).addClass('active');
            }
        }
        function clearMenuImg($ele) {
            let $parent = $ele.closest('.mega-menu-parent'),
                $navwrap = $parent.find('.mega-menu__img');

            if($ele.hasClass('has-image')) {
                $navwrap.find('.mega-menu-img').removeClass('active');
                $navwrap.find('.default-img').addClass('active');
            }
        }
        
        
        
        if (jQuery(".fixed-header")[0]){
            
            jQuery( ".mega-menu" ).hover(
                function(e) {
                    e.stopPropagation();
                    jQuery('.masthead').addClass('nav-hover');

                }, function() {
                    jQuery('.masthead').removeClass('nav-hover');
                }
            );            
             jQuery( ".main-nav li.menu-item" ).hover(
                 function(e) {
                    e.stopPropagation();
                    if(jQuery(this).hasClass('nav-logo')) {
                        jQuery('.masthead').removeClass('nav-hover');
                    } else {
                        jQuery('.masthead').addClass('nav-hover');
                    }
                }, function() {
                    jQuery('.masthead').removeClass('nav-hover');
                }                
            );  
        } 
        
        jQuery( ".main-nav li.menu-item" ).hover(
            function(e) {
                e.stopPropagation();
                let $el = jQuery(this);
                setMenuImg($el);
                    
            }, function(e) {
                e.stopPropagation();
                let $el = jQuery(this);
                clearMenuImg($el);
            }
        );
        
		
        ////////////////TABLET OPEN MEGA MENU
        /*function tabletMenu(event) {
            
            let menu = event.target.parentElement;
            if (menu.classList.contains('menu-hover')) {
                event.preventDefault();
                jQuery('.mega-menu-parent').removeClass('menu-hover');
            } else {
                event.preventDefault();
                jQuery('.mega-menu-parent').removeClass('menu-hover');
                menu.classList.add('menu-hover');
            }            
        }
        if($mobile) {
             jQuery('a.mega-parent-link').on('touchstart', tabletMenu);
        }*/
        
        jQuery('a.mega-parent-link').on('touchend', function(event) {
            event.preventDefault();
            if (jQuery(this).parent().hasClass('menu-hover')) {
                jQuery(this).parent().removeClass('menu-hover');
            } else {
                jQuery('.mega-menu-parent').removeClass('menu-hover');
                jQuery(this).parent().addClass('menu-hover')
            }
            
        });
		
	});	
	
})();