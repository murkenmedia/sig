jQuery.noConflict();

(function () {


	//document.addEventListener( 'DOMContentLoaded', function () {
		

        ///////////////////MAIN MENU
		
        let mainmenu = document.querySelectorAll('a.mega-parent-link'),
            sublinks = document.querySelectorAll('a.mega-sub-link'),
            menuFocused = false, 
            submenuopen = false,
            currentmenu = '',
            menuopen = false,
            header = document.getElementById("header");
        
        
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
            jQuery('.dropdown-container').removeClass("open");
            submenuopen = false;
        }
        
        for (let item of mainmenu) {
            let itemparent = item.parentElement;
            
            itemparent.addEventListener('mouseover', function(event) {
                menuopen = true;
                item.setAttribute("aria-expanded", menuopen);
            });
            
            if (itemparent.matches(':hover')) {
                menuopen = true;
                item.setAttribute("aria-expanded", menuopen);
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
                console.log('next: '+event.relatedTarget+ '. old: '+event.currentTarget+'. old: '+event.target ) ;
                let next = event.relatedTarget;
                if(next == null) {
                    closeMenu();
                } else if (next.classList.contains('mega-sub-link')) {
                    let menu = event.target.closest(".dropdown-container");
                    if(!isDescendant(menu, event.relatedTarget))  {
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
		
		
		//////////////MAIN NAV HOVER IMG  
        
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
            }, function(e) {
                e.stopPropagation();
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
		
	//});	
	
})();