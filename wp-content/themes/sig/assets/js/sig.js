// ADA functions

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
function getNextSibling(elem, selector) {
  var sibling = elem.nextElementSibling;
  if (!selector) return sibling;
  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.nextElementSibling;
  }
}
function getPreviousSibling(elem, selector) {
  var sibling = elem.previousElementSibling;
  if (!selector) return sibling;
  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.previousElementSibling;
  }
}
function isDescendant(parent, child) {
  var node = child.parentNode;
  while (node != null) {
    if (node == parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}
///RETURNS AN ISO DATE YYYY-MM-DD
function isoDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}

/*function get_next_day(date) {
    let $nextday = new Date(date+'T00:00');
    return $nextday.setDate($nextday.getDate() + 1);
}*/

function clearAria($ele, checkInArray) {
  var calendar = document.getElementById($ele + '-calendar');
  //console.log(calendar);
  checkInArray.forEach(function (item, index) {
    //console.log(item);
    var selectbtn = calendar.querySelector('[data-btndate="' + item + '"]');
    if (selectbtn) {
      var formatdate = selectbtn.dataset.formatted;
      selectbtn.ariaLabel = "Choose " + formatdate;
    }
  });
}
function moveto(newrow, newcol, calendar) {
  var tgt = calendar.querySelector('[data-row="' + newrow + '"][data-col="' + newcol + '"]');
  if (tgt && tgt.getAttribute('role') === 'gridcell') {
    /*Array.prototype.forEach.call(document.querySelectorAll('[role=gridcell]'), function(el, i){
      el.setAttribute('tabindex', '-1');
    });*/
    tgt.setAttribute('tabindex', '0');
    tgt.focus();
    return true;
  } else {
    return false;
  }
}
function calendarNavigate(calendar) {
  var daycells = calendar.querySelectorAll('td.fc-day-today, td.fc-day-future').forEach(function (item, index) {
    item.setAttribute('role', 'gridcell');
    if (index == 0) {
      item.setAttribute('tabindex', 0);
    }
  });
  var trs = calendar.querySelectorAll('table tbody tr'),
    row = 0,
    col = 0,
    maxrow = trs.length - 1,
    maxcol = 0;
  Array.prototype.forEach.call(trs, function (gridrow, i) {
    Array.prototype.forEach.call(gridrow.querySelectorAll('td'), function (el, i) {
      el.dataset.row = row;
      el.dataset.col = col;
      col = col + 1;
    });
    if (col > maxcol) {
      maxcol = col - 1;
    }
    col = 0;
    row = row + 1;
  });
  function nextPrevButtons(event) {
    var focuselement = calendar.getElementsByClassName('fc-day-today');
    if (focuselement.length == 0) {
      focuselement = calendar.getElementsByClassName("fc-daygrid-day");
    }
    switch (event.key) {
      case "ArrowDown":
        ;
        focuselement[0].focus();
        event.preventDefault();
        break;
    }
  }

  //NEXT MONTH
  calendar.querySelector('.fc-next-button').addEventListener("keydown", function (event) {
    nextPrevButtons(event);
  });
  calendar.querySelector('.fc-prev-button').addEventListener("keydown", function (event) {
    nextPrevButtons(event);
  });

  /*let buttons = calendar.querySelectorAll('.dayButton');
          for (let button of buttons) {
              button.addEventListener('click', function(event) {
                  let date = button.dataset.btndate;                    
                  checkCalendarState(date, $ele);                    
              })
          }*/
}
/*!
 * HHV Scroll Observer
 * Version  : 1.0.00
 */
jQuery.noConflict();
(function () {
  var $window = jQuery(window),
    $mobile = false,
    heroPlayPromise,
    $masthead = document.querySelector('.masthead');

  //check mobile
  var userAgent = navigator.userAgent.toLowerCase();
  var isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
  if (isTablet) {
    $mobile = true;
  }
  if (window.orientation > 1) {
    $mobile = true;
  }
  function fadeOutAndRemove(element) {
    element = document.getElementById(element);
    if (!element) return;
    element.classList.add('fade-out');
    element.addEventListener('transitionend', function handler() {
      element.remove();
      element.removeEventListener('transitionend', handler);
    }, {
      once: true
    });
  }

  ///INTERSECTION OBSERVER
  var $topoffset = -50,
    items = document.querySelectorAll('.fade-in, .animation-chain'),
    io,
    idCounter = 0,
    minId = null,
    maxId = null,
    debounceTimeout = null;
  function applyChanges() {
    items.forEach(function (entry) {
      var entryid = entry.getAttribute('data-animate');
      if (entryid >= minId && entryid <= maxId) {
        if (!entry.classList.contains('in-view')) {
          entry.classList.add('in-view');

          //remove class
          if (entry.classList.contains('animation-chain')) {
            setTimeout(function () {
              entry.classList.remove('animation-chain');
            }, 2000);
          }
        }
      }
    });
    minId = null;
    maxId = null;
  }
  function reportIntersection(entries) {
    clearTimeout(debounceTimeout);
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var entryId = parseInt(entry.target.getAttribute('data-animate'));
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
  document.addEventListener('DOMContentLoaded', function () {
    fadeOutAndRemove("loading-screen");
    /* setTimeout(() => {
       fadeOutAndRemove("loading-screen");
     }, 100);*/

    //START OBSERVER
    io = new IntersectionObserver(reportIntersection, {
      'rootMargin': '0px 0px ' + $topoffset + 'px 0px'
    });
    items.forEach(function (item) {
      item.setAttribute('data-animate', idCounter++);
      io.observe(item);
    });
    if (window.scrollY > 49) {
      $masthead.classList.add('nav-collapse');
    }
    if (document.querySelector('.hero__video')) {
      videoObserver();
    }
  });
  function mastheadObserver() {
    if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) {
      $masthead = document.querySelector('.masthead');
      var headerobserver = new IntersectionObserver(function (entries) {
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
    get: function get() {
      return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
  });
  function checkBtnPosition() {
    var $windowheight = $window.innerHeight(),
      $windowwidth = $window.innerWidth(),
      $heroheight = jQuery('.hero').height(),
      $btnY,
      $botdist,
      $checkrates = false;
    if (document.querySelector('.has-inset-hero-video.check-rates-hero')) {
      $checkrates = true;
    }

    //console.log('window: '+$windowheight+', hero: '+$heroheight+ 'width: '+(0.02 * $window.innerWidth()));

    if ($heroheight >= $windowheight) {
      //$btnY = $windowheight-(0.092 * $window.innerWidth());
      $btnY = $windowheight - 100;
      jQuery('#hero__controls').css({
        'top': $btnY + 'px',
        'bottom': 'auto'
      });
    } else {
      $botdist = '2.083vw';
      if ($windowwidth < 1024 && $checkrates) {
        if ($windowwidth >= 768) {
          $botdist = '60px';
        } else {
          $botdist = '100px';
        }
      }
      jQuery('#hero__controls').css({
        'top': 'auto',
        'bottom': $botdist
      });
    }
  }
  function videoObserver() {
    //HERO VIDEO
    var $herovideo = document.getElementById("hero__video");
    if ($herovideo) {
      var heroVideos = document.querySelectorAll('.hero__video');
      var $herovideosrc = document.getElementById("hero__video__src"),
        herowrap = document.querySelector('.hero'),
        herobg = document.getElementById('hero__image'),
        playpause = document.getElementById('hero__controls__playpause'),
        $videosrc = '';
      checkBtnPosition();
      window.addEventListener('resize', checkBtnPosition);
      var $init = true,
        $reset = false,
        $loggedin = false;
      if (document.body.classList.contains("logged-in")) {
        $loggedin = true;
      }
      herowrap.classList.add('in-view');
      if ($mobile || document.querySelector('.mobile-video')) {
        //console.log('mobile');
        $videosrc = $herovideosrc.dataset.mobile;
      } else {
        $videosrc = $herovideosrc.dataset.src;
      }
      $herovideosrc.src = $videosrc;
      var changeButtonState = function changeButtonState(type) {
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
      };
      $herovideo.addEventListener('play', function () {
        changeButtonState('playpause');
      }, false);
      $herovideo.addEventListener('pause', function () {
        changeButtonState('playpause');
      }, false);
      $herovideo.addEventListener('ended', function () {
        changeButtonState('ended');
        //playpause.setAttribute('data-state', 'play');
        //$herovideo.classList.remove("video-playing");
      }, false);
      playpause.addEventListener('click', function (e) {
        if ($reset == false) {
          if ($herovideo.paused) {
            //heroPlayPromise = $herovideo.play();
            herobg.classList.remove('active');
            heroPlayPromise = $herovideo.play();
          } else if ($herovideo.ended) {
            $herovideo.load();
            heroPlayPromise = $herovideo.play();
          } else {
            heroPlayPromise = $herovideo.pause();
          }
        } else {
          $herovideosrc.src = $videosrc;
          $herovideo.load();
          $herovideo.onloadedmetadata = function () {
            heroPlayPromise = $herovideo.play();
            $herovideo.classList.add('video-playing');
            herowrap.classList.add('video-is-playing');
            if ($herovideo.playing) {
              herobg.classList.remove('active');
            }
            playpause.classList.add('active');
            $reset = false;
          };
        }
      });
      var herovideoobserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio != 0) {
            //herovideoobserver.unobserve(entry.target);
            if ($init) {
              $init = false;
              if (!$loggedin) {
                $herovideo.load();
              } else {
                playpause.setAttribute('data-state', 'play');
                playpause.classList.add('active');
              }

              //https://www.w3schools.com/tags/av_event_loadedmetadata.asp
              $herovideo.onloadedmetadata = function () {
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
                    if ($herovideo.playing) {
                      //console.log('video playing');
                      herobg.classList.remove('active');
                    }
                  }
                  playpause.classList.add('active');
                  if (heroPlayPromise !== undefined) {
                    heroPlayPromise.then(function (_) {}).catch(function (error) {
                      // Show paused UI.
                    });
                  }
                }
              };
            }
          } else {
            //herowrap.classList.remove('in-view');

            if (heroPlayPromise !== undefined) {
              heroPlayPromise.then(function (_) {
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
              }).catch(function (error) {
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

      heroVideos.forEach(function (image) {
        herovideoobserver.observe(image);
      });
    }
  }

  /*window.onload = function() {
      console.log('onload');
      startTransitions();
  }*/
})();
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
jQuery.noConflict();
(function () {
  //document.addEventListener( 'DOMContentLoaded', function () {

  ///////////////////MAIN MENU

  var mainmenu = document.querySelectorAll('a.mega-parent-link'),
    sublinks = document.querySelectorAll('a.mega-sub-link'),
    menuFocused = false,
    submenuopen = false,
    currentmenu = '',
    menuopen = false,
    header = document.getElementById("header");
  function openMenu(event) {
    var x = event.target.getAttribute("aria-expanded");
    var menu = event.target.nextElementSibling;
    //let itemparent = event.target.parentElement;
    //loadNavImages(itemparent);

    if (x == "true") {
      x = "false";
      menu.classList.remove("open");
    } else {
      x = "true";
      menu.classList.add("open");
    }
    event.target.setAttribute("aria-expanded", x);
    currentmenu = event.target;
    submenuopen = true;
  }
  function closeMenu() {
    jQuery('a.mega-parent-link').attr("aria-expanded", "false");
    jQuery('.dropdown-container').removeClass("open");
    submenuopen = false;
  }
  var _loop = function _loop() {
    var item = _step.value;
    var itemparent = item.parentElement;
    itemparent.addEventListener('mouseover', function (event) {
      menuopen = true;
      item.setAttribute("aria-expanded", menuopen);
    });
    if (itemparent.matches(':hover')) {
      menuopen = true;
      item.setAttribute("aria-expanded", menuopen);
    }
    item.addEventListener("keydown", function (event) {
      var parent, next, child;
      switch (event.key) {
        case "ArrowRight":
          parent = item.parentElement;
          next = getNextSibling(parent);
          if (next != null) {
            child = next.childNodes;
            child[0].focus();
          }
          event.preventDefault();
          break;
        case "ArrowLeft":
          parent = item.parentElement;
          next = getPreviousSibling(parent);
          if (next != null) {
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
          if (menuFocused == true) {
            closeMenu();
            openMenu(event);
          }
          event.preventDefault();
          break;
        case "Escape":
          if (submenuopen == true) {
            currentmenu.focus();
            closeMenu();
          }
          break;
      }
    });
    item.addEventListener('mouseover', function (event) {
      menuopen = true;
      item.setAttribute("aria-expanded", menuopen);
    });
    item.addEventListener('mouseleave', function (event) {
      menuopen = false;
      item.setAttribute("aria-expanded", menuopen);
    });
    item.addEventListener('focusin', function (event) {
      var what = whatInput.ask();
      closeMenu();
      if (what == 'keyboard') {
        //console.log( menuFocused);
        menuFocused = true;
      }
    });
    item.addEventListener('click', function (event) {
      if (menuFocused == true) {
        event.preventDefault();
      }
    });
    item.addEventListener('focusout', function (event) {
      menuFocused = false;
      var next = event.relatedTarget;
      if (next == null) {
        closeMenu();
      }
    });
  };
  for (var _iterator = _createForOfIteratorHelperLoose(mainmenu), _step; !(_step = _iterator()).done;) {
    _loop();
  }
  for (var _iterator2 = _createForOfIteratorHelperLoose(sublinks), _step2; !(_step2 = _iterator2()).done;) {
    var item = _step2.value;
    item.addEventListener('focusout', function (event) {
      console.log('next: ' + event.relatedTarget + '. old: ' + event.currentTarget + '. old: ' + event.target);
      var next = event.relatedTarget;
      if (next == null) {
        closeMenu();
      } else if (next.classList.contains('mega-sub-link')) {
        var menu = event.target.closest(".dropdown-container");
        if (!isDescendant(menu, event.relatedTarget)) {
          closeMenu();
        }
      } else {
        closeMenu();
      }
    });
    item.addEventListener("keydown", function (event) {
      switch (event.key) {
        case "Escape":
          if (submenuopen == true) {
            currentmenu.focus();
            closeMenu();
          }
          break;
      }
    });
  }

  //////////////MAIN NAV HOVER IMG  

  if (jQuery(".fixed-header")[0]) {
    jQuery(".mega-menu").hover(function (e) {
      e.stopPropagation();
      jQuery('.masthead').addClass('nav-hover');
    }, function () {
      jQuery('.masthead').removeClass('nav-hover');
    });
    jQuery(".main-nav li.menu-item").hover(function (e) {
      e.stopPropagation();
      if (jQuery(this).hasClass('nav-logo')) {
        jQuery('.masthead').removeClass('nav-hover');
      } else {
        jQuery('.masthead').addClass('nav-hover');
      }
    }, function () {
      jQuery('.masthead').removeClass('nav-hover');
    });
  }
  jQuery(".main-nav li.menu-item").hover(function (e) {
    e.stopPropagation();
  }, function (e) {
    e.stopPropagation();
  });

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

  jQuery('a.mega-parent-link').on('touchend', function (event) {
    event.preventDefault();
    if (jQuery(this).parent().hasClass('menu-hover')) {
      jQuery(this).parent().removeClass('menu-hover');
    } else {
      jQuery('.mega-menu-parent').removeClass('menu-hover');
      jQuery(this).parent().addClass('menu-hover');
    }
  });

  //});	
})();
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
jQuery.noConflict();
(function () {
  var overlaybtn = document.querySelector('.overlay-toggle-btn'),
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
    setTimeout(function () {
      document.body.classList.remove('overlay-menu-active', 'overlay-menu-closing');
      overlaymenu.classList.remove('overlay-menu-active', 'overlay-menu-closing');
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
  overlaybtn.addEventListener('click', function (event) {
    if (overlaydisable == false) {
      if (overlaybtn.classList.contains('overlay-menu-active')) {
        //CLOSE
        closeOverlay();
      } else {
        //OPEN
        openOverlay();
      }
    }
  });
  for (var _iterator = _createForOfIteratorHelperLoose(overlaymenulinks), _step; !(_step = _iterator()).done;) {
    var item = _step.value;
    item.addEventListener("keydown", function (event) {
      switch (event.key) {
        case "Escape":
          closeOverlay();
          break;
      }
    });
    item.addEventListener('focusout', function (event) {
      //console.log('next: '+event.relatedTarget+ '. old: '+event.currentTarget+'. old: '+event.target );				
      var next = event.relatedTarget;
      if (next == null) {
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

  var overlaynavarrows = document.getElementsByClassName('overlay-nav-arrow');
  function openOverlaySubnav(event) {
    var arrowlink = document.activeElement.parentElement;
    var x = arrowlink.getAttribute("aria-expanded");
    if (x == "true") {
      x = "false";
      arrowlink.parentElement.classList.remove("submenu-open");
    } else {
      if (overlaysubopen == true) {
        closeOverlaySubnav();
      }
      x = "true";
      arrowlink.parentElement.classList.add("submenu-open");
    }
    arrowlink.setAttribute("aria-expanded", x);
    currentsubmenu = arrowlink;
    overlaysubopen = true;
  }
  for (var _iterator2 = _createForOfIteratorHelperLoose(overlaynavarrows), _step2; !(_step2 = _iterator2()).done;) {
    var _item = _step2.value;
    _item.addEventListener("keydown", function (event) {
      switch (event.key) {
        case "Enter":
          event.preventDefault();
          openOverlaySubnav(event);
          //console.log(event);
          break;
      }
    });
    _item.addEventListener("click", function (event) {
      event.preventDefault();
      openOverlaySubnav(event);
      //console.log(event);
    });
  }

  for (var _iterator3 = _createForOfIteratorHelperLoose(overlaysubmenulinks), _step3; !(_step3 = _iterator3()).done;) {
    var _item2 = _step3.value;
    _item2.addEventListener("keydown", function (event) {
      switch (event.key) {
        case "Escape":
          closeOverlaySubnav();
          currentsubmenu.focus();
          break;
      }
    });
    _item2.addEventListener('focusout', function (event) {
      //console.log('next: '+event.relatedTarget+ '. old: '+event.currentTarget+'. old: '+event.target );		

      var next = event.relatedTarget;
      if (next == null) {
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
/*!
 * HHV Carousels
 * Version  : 1.0.00
 */
jQuery.noConflict();
(function () {
  var $window = jQuery(window),
    $colnum = 2.083;
  document.addEventListener('DOMContentLoaded', function () {
    //CONTENT CAROUSEL        
    var $throttlenum = 50;
    if (jQuery(".content-carousel")[0]) {
      var exppad10 = $colnum * 10 + 'vw',
        exppad6 = $colnum * 6 + 'vw';
      var $expcarousel = [];
      jQuery('.content-carousel').each(function (index) {
        var $expid = jQuery(this).attr("id");
        $expcarousel[index] = new Splide('#' + $expid, {
          type: 'loop',
          focus: 'center',
          throttle: $throttlenum,
          updateOnMove: true,
          arrows: true,
          width: '100vw',
          speed: 600,
          keyboard: 'focused',
          //keyboard: false,
          slideFocus: false,
          //accessibility:false,
          i18n: {
            first: 'Next slide',
            last: 'Previous slide'
          },
          padding: {
            right: exppad10,
            left: exppad10
          },
          breakpoints: {
            767: {
              padding: {
                right: exppad6,
                left: exppad6
              }
            },
            1023: {
              padding: {
                right: exppad6,
                left: exppad6
              }
            }
          }
        });
        $expcarousel[index].on('mounted', function () {
          jQuery('#' + $expid + '-list li.is-active').addClass('zoom-in');
          var $nextslide = jQuery('#' + $expid + ' .splide__slide.is-active').next('.splide__slide');

          //ADA
          jQuery('#' + $expid + '-list li.is-active .slide-link').attr('tabindex', 0);
          setTimeout(function () {
            jQuery('#' + $expid).attr('tabindex', -1);

            //ARIA HIDDEN
            jQuery('#' + $expid + ' .splide__slide').attr('aria-hidden', "true");
            jQuery('#' + $expid + ' .splide__slide.is-active').attr('aria-hidden', "false");

            //set ada label on carousel dots
            //PAGINATION
            var btns = jQuery('#' + $expid + ' .splide__pagination__page');
            btns.each(function (i) {
              var slidenum = i + 1,
                $slideinc = slidenum;
              slidenum = ('0' + slidenum).slice(-2);
              var btnlabel = jQuery('#' + $expid + '-slide' + slidenum).data('label');
              jQuery(this).attr("aria-label", "Go to " + btnlabel + ". Slide " + $slideinc);
            });
          }, 200);
        });
        $expcarousel[index].on('move', function (newIndex, destIndex) {
          jQuery('#' + $expid + '-list li').removeClass('zoom-in');

          //ADA
          jQuery('#' + $expid + '-list .slide-link').attr('tabindex', -1);
        });
        $expcarousel[index].on('moved', function () {
          setTimeout(function () {
            jQuery('#' + $expid + '-list li.is-active').addClass('zoom-in');
            var $nextslide = jQuery('#' + $expid + ' .splide__slide.is-active').next('.splide__slide');

            //ADA
            jQuery('#' + $expid + '-list .slide-link').attr('tabindex', -1);
            jQuery('#' + $expid + '-list li.is-active .slide-link').attr('tabindex', 0);

            //ARIA HIDDEN
            jQuery('#' + $expid + ' .splide__slide').attr('aria-hidden', "true");
            jQuery('#' + $expid + ' .splide__slide.is-active').attr('aria-hidden', "false");
          }, 200);
        });
        $expcarousel[index].mount();
        jQuery('body').on('click', '.exp_slide', function (e) {
          if (!jQuery(this).hasClass("is-active")) {
            e.preventDefault();
            var $items = jQuery('#' + $expid + '-list li'),
              $activeindex = $items.index(jQuery('#' + $expid + '-list li.is-active')),
              $index = $items.index(jQuery(this));
            if ($index > $activeindex) {
              $expcarousel[index].go('+');
            } else {
              $expcarousel[index].go('-');
            }
            //console.log( $expcarousel.index );                
          }
          ;
        });
      });
    }

    //TOWERS CAROUSEL  
    var towerpad7 = $colnum * 5 + 'vw',
      towerpad5 = $colnum * 5 + 'vw';
    if (jQuery(".towers-carousel")[0]) {
      var $towernavcarousel = new Splide('.towers-nav-carousel', {
        rewind: true,
        isNavigation: true,
        arrows: false,
        pagination: false,
        updateOnMove: true,
        drag: false,
        autoWidth: true,
        keyboard: 'focused'
      }).mount();
      var $towerid = jQuery('.towers-carousel').attr("id");
      var $towercarousel = new Splide('.towers-carousel', {
        throttle: $throttlenum,
        type: 'slide',
        focus: 'center',
        updateOnMove: true,
        arrows: true,
        trimSpace: false,
        speed: 600,
        pagination: false,
        keyboard: 'focused',
        slideFocus: false,
        //lazyLoad:'nearby',
        //preloadPages:2,
        padding: {
          right: towerpad7,
          left: towerpad7
        },
        breakpoints: {
          767: {
            padding: {
              right: '0',
              left: '0'
            }
          },
          1023: {
            padding: {
              right: towerpad5,
              left: towerpad5
            }
          }
        }
      });
      $towercarousel.on('mounted', function () {
        //ADA
        jQuery('.towers-carousel li.splide__slide:eq(0) .slide-link').attr('tabindex', 0);
        setTimeout(function () {
          jQuery('.towers-nav-carousel').attr('tabindex', -1);
          jQuery('.towers-carousel').attr('tabindex', -1);

          //ARIA HIDDEN
          jQuery('#' + $towerid + ' .splide__slide').attr('aria-hidden', "true");
          jQuery('#' + $towerid + ' .splide__slide.is-active').attr('aria-hidden', "false");
        }, 200);
        jQuery('.towers-nav-carousel__btn').each(function (i, obj) {
          var $label = jQuery(this).data('label');
          jQuery(this).attr('aria-label', $label);
        });
      });
      $towercarousel.on('move', function (newIndex, oldIndex, destIndex) {
        jQuery('li.towers_slide').each(function (index) {
          if (newIndex > index) {
            jQuery(this).addClass('fade-slide');
          } else {
            jQuery(this).removeClass('fade-slide');
          }
        });

        //ADA
        jQuery('.towers-carousel .slide-link').attr('tabindex', -1);
      });
      $towercarousel.on('moved', function (newIndex) {
        var $nextnum = parseInt(newIndex);

        //ADA
        jQuery('.towers-carousel .slide-link').attr('tabindex', -1);
        jQuery('.towers-carousel li.splide__slide:eq(' + $nextnum + ') .slide-link').attr('tabindex', 0);

        //ARIA HIDDEN
        jQuery('#' + $towerid + ' .splide__slide').attr('aria-hidden', "true");
        jQuery('#' + $towerid + ' .splide__slide.is-active').attr('aria-hidden', "false");
        //console.log(newIndex+$nextnum);                
      });

      $towercarousel.sync($towernavcarousel).mount();
      jQuery('body').on('click', '.towers_slide', function (e) {
        if (!jQuery(this).hasClass("is-active")) {
          e.preventDefault();
          var $items = jQuery('#' + $towerid + '-list li'),
            $activeindex = $items.index(jQuery('#' + $towerid + '-list li.is-active')),
            $index = $items.index(jQuery(this));
          if ($index > $activeindex) {
            $towercarousel.go('+');
          } else {
            $towercarousel.go('-');
          }
          //console.log( $towercarousel.index );                
        }
        ;
      });
      var towerTimer;
      $window.on('resize', function (e) {
        clearTimeout(towerTimer);
        towerTimer = setTimeout(function () {
          $towercarousel.refresh();
        }, 100);
      });
    }

    //OFFERS TILES CAROUSEL    
    var offerspad4 = $colnum * 4 + 'vw',
      offerspad2 = $colnum * 2 + 'vw';
    if (jQuery(".offers-events-carousel")[0]) {
      var $offerscarousel = [];
      jQuery(".offers-events-carousel").each(function (index) {
        var $offersid = jQuery(this).attr("id");
        $offerscarousel[index] = new Splide('#' + $offersid, {
          throttle: $throttlenum,
          type: 'slide',
          focus: 'center',
          updateOnMove: true,
          gap: '16.664vw',
          trimSpace: false,
          speed: 600,
          arrows: true,
          keyboard: 'focused',
          slideFocus: false,
          i18n: {
            first: 'Next slide',
            last: 'Previous slide'
          },
          padding: {
            right: offerspad4,
            left: offerspad4
          },
          breakpoints: {
            1023: {
              padding: {
                right: offerspad2,
                left: offerspad2
              }
            }
          }
        });
        $offerscarousel[index].on('mounted', function () {
          var $nextslide = jQuery('#' + $offersid + ' .splide__slide.is-active').next('.splide__slide');

          //ADA
          setTimeout(function () {
            jQuery('#' + $offersid + ' .splide__slide .offers-link').attr('tabindex', -1);
            jQuery('#' + $offersid + ' .splide__slide.is-active .offers-link').attr('tabindex', 0);
            jQuery('#' + $offersid).attr('tabindex', -1);

            //ARIA HIDDEN
            jQuery('#' + $offersid + ' .splide__slide').attr('aria-hidden', "true");
            jQuery('#' + $offersid + ' .splide__slide.is-active').attr('aria-hidden', "false");

            //set ada label on carousel dots
            var btns = jQuery('#' + $offersid + ' .splide__pagination__page');
            btns.each(function (i) {
              var slidenum = i + 1,
                $slideinc = slidenum;
              slidenum = ('0' + slidenum).slice(-2);
              var btnlabel = jQuery('#' + $offersid + '-slide' + slidenum).data('label');
              jQuery(this).attr("aria-label", "Go to " + btnlabel + ". Slide " + $slideinc);
            });
          }, 200);
        });
        $offerscarousel[index].on('move', function () {
          jQuery('#' + $offersid + ' .offers-link').attr('tabindex', -1);
        });
        $offerscarousel[index].on('moved', function () {
          //ADA
          jQuery('#' + $offersid + ' .offers-link').attr('tabindex', -1);
          jQuery('#' + $offersid + ' .splide__slide.is-active .offers-link').attr('tabindex', 0);

          //ARIA HIDDEN
          jQuery('#' + $offersid + ' .splide__slide').attr('aria-hidden', "true");
          jQuery('#' + $offersid + ' .splide__slide.is-active').attr('aria-hidden', "false");
        });
        $offerscarousel[index].mount();
        var offersTimer;
        $window.on('resize', function (e) {
          clearTimeout(offersTimer);
          offersTimer = setTimeout(function () {
            $offerscarousel[index].refresh();
          }, 100);
        });
      });
    }

    //IMAGE CAROUSEL
    if (jQuery(".image-carousel")[0]) {
      var imgpad4 = $colnum * 4 + 'vw',
        imgpad6 = $colnum * 6 + 'vw',
        imgpad8 = $colnum * 8 + 'vw',
        imgpad11 = $colnum * 11 + 'vw',
        imgpad10 = $colnum * 10 + 'vw';
      var $imgcarousel = [];
      jQuery(".image-carousel").each(function (index) {
        var $imgid = jQuery(this).attr("id");
        $imgcarousel[index] = new Splide('#' + $imgid, {
          throttle: $throttlenum,
          type: 'loop',
          focus: 'center',
          //gap : '2.083vw',
          updateOnMove: true,
          arrows: true,
          speed: 600,
          keyboard: 'focused',
          slideFocus: false,
          //autoHeight:true,
          i18n: {
            first: 'Next slide',
            last: 'Previous slide'
          },
          padding: {
            right: imgpad10,
            left: imgpad10
          },
          breakpoints: {
            767: {
              padding: {
                right: imgpad6,
                left: imgpad6
              }
            },
            1023: {
              padding: {
                right: imgpad6,
                left: imgpad6
              }
            }
          }
        });
        $imgcarousel[index].on('mounted', function () {
          //ADA
          setTimeout(function () {
            //jQuery('#'+$offersid+ ' .splide__slide.is-active .offers-link').attr('tabindex', 0);
            jQuery('#' + $imgid).attr('tabindex', -1);

            //ARIA HIDDEN
            jQuery('#' + $imgid + ' .splide__slide').attr('aria-hidden', "true");
            jQuery('#' + $imgid + ' .splide__slide.is-active').attr('aria-hidden', "false");

            ///PAGINATION
            var btns = jQuery('#' + $imgid + ' .splide__pagination__page');
            btns.each(function (i) {
              var slidenum = i + 1,
                $slideinc = slidenum;
              slidenum = ('0' + slidenum).slice(-2);
              var btnlabel = jQuery('#' + $imgid + '-slide' + slidenum).data('label');
              jQuery(this).attr("aria-label", "Go to slide " + $slideinc);
            });
          }, 200);
        });
        $imgcarousel[index].on('moved', function () {
          //ARIA HIDDEN
          jQuery('#' + $imgid + ' .splide__slide').attr('aria-hidden', "true");
          jQuery('#' + $imgid + ' .splide__slide.is-active').attr('aria-hidden', "false");
        });
        $imgcarousel[index].mount();

        //ADJACENT IMAGE CLICK
        jQuery('body').on('click', '.image_slide', function (e) {
          if (!jQuery(this).hasClass("is-active")) {
            e.preventDefault();
            var $items = jQuery('#' + $imgid + '-list li'),
              $activeindex = $items.index(jQuery('#' + $imgid + '-list li.is-active')),
              $index = $items.index(jQuery(this));
            if ($index > $activeindex) {
              $imgcarousel[index].go('+');
            } else {
              $imgcarousel[index].go('-');
            }
            //console.log( $imgcarousel.index );   
            //console.log('#image-carousel-'+$imgid +'-list li');
          }
          ;
        });
      });
    }
    ///EVENTS CAROUSEL        
    /*if (jQuery(".events-carousel")[0]){            
        let $eventcarousel = [];            
        jQuery( ".events-carousel" ).each(function(index) {                
            let $eventid = jQuery(this).attr("id");                
            $eventcarousel[index] = new Splide( '#'+$eventid, {
                throttle: $throttlenum,
                type : 'slide',
                focus : 'center',
                updateOnMove : true,
                trimSpace: false,
                speed:600,
                arrows: true,
                arrowPath:'',
                keyboard:'focused',
                slideFocus:false,
            } );
            $eventcarousel[index].on( 'mounted', function () {                    
                //ADA
                setTimeout(function(){
                    jQuery('#'+$eventid+ ' .splide__slide.is-active .event-link').attr('tabindex', 0);
                    jQuery('#'+$eventid).attr('tabindex',-1);
    					//ARIA HIDDEN
    jQuery('#'+$eventid+ ' .splide__slide').attr('aria-hidden', "true");					
    jQuery('#'+$eventid+ ' .splide__slide.is-active').attr('aria-hidden', "false");
                    
                    //set ada label on carousel dots
                    let btns = jQuery('#'+$eventid+ ' .splide__pagination__page');
                    btns.each(function( i ) {
                        let slidenum = i+1;
                        slidenum = ('0' + slidenum).slice(-2);
                        let btnlabel = jQuery('#'+$eventid+'-slide'+slidenum).data('label');
                        jQuery(this).attr("aria-label","Go to "+btnlabel+" slide");
                    });
                    
                    
                }, 200);
                
            } );
            $eventcarousel[index].on( 'move', function() {
                jQuery('#'+$eventid+' .event-link').attr('tabindex',-1);
            });
            
            $eventcarousel[index].on( 'moved', function() {
                //ADA
                setTimeout(function(){
                    jQuery('#'+$eventid+' .event-link').attr('tabindex', -1);
                    jQuery('#'+$eventid+ ' .splide__slide.is-active .event-link').attr('tabindex', 0);
    					//ARIA HIDDEN
    jQuery('#'+$eventid+ ' .splide__slide').attr('aria-hidden', "true");					
    jQuery('#'+$eventid+ ' .splide__slide.is-active').attr('aria-hidden', "false");
                       }, 200);
            } );
            $eventcarousel[index].mount();
            let eventTimer;
            $window.on('resize', function(e) {
                clearTimeout(eventTimer);
                eventTimer = setTimeout(function() {
                    $eventcarousel[index].refresh();            
                }, 100);
            });
        });
    }*/

    ///ROOM TAB CAROUSEL        
    if (jQuery(".room-tabs-carousel")[0]) {
      var $roomcarousel = [];
      jQuery(".room-tabs-carousel").each(function (index) {
        var $imgid = jQuery(this).attr("id");
        $roomcarousel[index] = new Splide('#' + $imgid, {
          throttle: $throttlenum,
          type: 'loop',
          focus: 'center',
          //gap : '2.083vw',
          updateOnMove: true,
          arrows: true,
          pagination: false,
          speed: 600,
          keyboard: 'focused',
          slideFocus: false,
          //autoHeight:true,
          i18n: {
            first: 'Next photo',
            last: 'Previous photo'
          }
        });
        $roomcarousel[index].on('mounted', function () {
          //ADA
          setTimeout(function () {
            jQuery('#' + $imgid).attr('tabindex', -1);

            //ARIA HIDDEN
            jQuery('#' + $imgid + ' .splide__slide').attr('aria-hidden', "true");
            jQuery('#' + $imgid + ' .splide__slide.is-active').attr('aria-hidden', "false");

            ///PAGINATION
            /*let btns = jQuery('#'+$imgid+ ' .splide__pagination__page');
            btns.each(function( i ) {
                let slidenum = i+1,
                    $slideinc = slidenum;
                slidenum = ('0' + slidenum).slice(-2);
                let btnlabel = jQuery('#'+$imgid+'-slide'+slidenum).data('label');
                jQuery(this).attr("aria-label","Go to slide "+$slideinc);
                 
            });*/
          }, 200);
        });
        $roomcarousel[index].on('moved', function () {
          //ARIA HIDDEN
          jQuery('#' + $imgid + ' .splide__slide').attr('aria-hidden', "true");
          jQuery('#' + $imgid + ' .splide__slide.is-active').attr('aria-hidden', "false");

          //console.log( $roomcarousel[index].index );   
        });

        $roomcarousel[index].mount();
        jQuery('.room-tabs a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
          e.target;
          $roomcarousel[index].refresh();
        });

        ///ADJACENT SLIDES CLICK
        /*jQuery('body').on('click', '.image_slide', function(e) {                
            if( ! jQuery(this).hasClass("is-active") ) {
                e.preventDefault();                    
                let $items = jQuery('#'+$imgid +'-list li'),        
                    $activeindex = $items.index(jQuery('#'+$imgid +'-list li.is-active')),
                    $index = $items.index(jQuery(this));
                 if($index > $activeindex) {
                    $roomcarousel[index].go( '+' );
                } else {
                    $roomcarousel[index].go( '-' );
                }
             };
        });*/
      });
    }

    ///HISTORY CAROUSEL
    if (jQuery(".history-carousel")[0]) {
      var $historycarousel = [];
      jQuery(".history-carousel").each(function (index) {
        var $imgid = jQuery(this).attr("id");
        $historycarousel[index] = new Splide('#' + $imgid, {
          throttle: $throttlenum,
          type: 'loop',
          focus: 'center',
          //gap : '2.083vw',
          updateOnMove: true,
          arrows: true,
          pagination: false,
          speed: 600,
          keyboard: 'focused',
          slideFocus: false,
          //autoHeight:true,
          i18n: {
            first: 'Next photo',
            last: 'Previous photo'
          }
        });
        $historycarousel[index].on('mounted', function () {
          //ADA
          setTimeout(function () {
            jQuery('#' + $imgid).attr('tabindex', -1);

            //ARIA HIDDEN
            jQuery('#' + $imgid + ' .splide__slide').attr('aria-hidden', "true");
            jQuery('#' + $imgid + ' .splide__slide.is-active').attr('aria-hidden', "false");

            ///PAGINATION
            /*let btns = jQuery('#'+$imgid+ ' .splide__pagination__page');
            btns.each(function( i ) {
                let slidenum = i+1,
                    $slideinc = slidenum;
                slidenum = ('0' + slidenum).slice(-2);
                let btnlabel = jQuery('#'+$imgid+'-slide'+slidenum).data('label');
                jQuery(this).attr("aria-label","Go to slide "+$slideinc);
                 
            });*/
          }, 200);
        });
        $historycarousel[index].on('moved', function () {
          //ARIA HIDDEN
          jQuery('#' + $imgid + ' .splide__slide').attr('aria-hidden', "true");
          jQuery('#' + $imgid + ' .splide__slide.is-active').attr('aria-hidden', "false");

          //console.log( $historycarousel[index].index );   
        });

        $historycarousel[index].mount();
      });
    }
  });
})();
jQuery.noConflict();
(function () {
  var $window = jQuery(window),
    $lazy,
    $lazynofade,
    $mobile = false;

  //check mobile
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    $mobile = true;
  }
  function easeInOutExpo(t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  }
  WebFont.load({
    google: {
      families: ['Space+Grotesk:400,500,600,700']
    },
    custom: {
      families: ['SIG', 'MaziusDisplay-Bold', 'MaziusDisplay-Regular', 'MaziusDisplay-Italic', 'DallasOutline']
    }
  });
  function fixWidows(selector) {
    var elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
      var text = element.innerHTML;
      text = text.replace(/(\S+)\s+(\S+)$/, '$1&nbsp;$2');
      element.innerHTML = text;
    });
  }
  function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
  }
  function offset(el) {
    var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    };
  }
  jQuery(document).ready(function () {
    if (jQuery(".info-slider-wrap")[0]) {
      jQuery('.info-slider-wrap').each(function (i) {
        var $sliderid = jQuery(this).data('id'),
          $imgslider = jQuery('#' + $sliderid + '-slider'),
          $num = jQuery('#' + $sliderid + '-num'),
          $next = jQuery('#' + $sliderid + '-next'),
          $prev = jQuery('#' + $sliderid + '-prev');
        $imgslider.owlCarousel({
          //animateIn: 'fadeIn',
          //animateOut: 'fadeOut',
          items: 1,
          smartSpeed: 1000,
          nav: false,
          autoplay: false,
          dots: false,
          loop: true,
          mouseDrag: true,
          touchDrag: true,
          responsiveRefreshRate: 50,
          margin: 20,
          responsive: {
            576: {
              items: 1,
              margin: 30
            },
            782: {
              items: 2,
              margin: 40
            },
            1200: {
              items: 3,
              margin: 50
            }
          }
        });
        $next.click(function () {
          $imgslider.trigger('next.owl.carousel');
        });
        $prev.click(function () {
          $imgslider.trigger('prev.owl.carousel');
        });
        $imgslider.on('changed.owl.carousel', function (e) {
          if (e.item) {
            var index = e.item.index - 1;
            var count = e.item.count;
            if (index > count) {
              index -= count;
            }
            if (index <= 0) {
              index += count;
            }
            $num.html(pad(index, 2));
          }
        });
      });
    }
  });

  ///ON READY	
  document.addEventListener('DOMContentLoaded', function () {
    //ADD BR SPACERS
    if (jQuery(".widow-fix")[0]) {
      var elements = document.querySelectorAll('.widow-fix');
      elements.forEach(function (element) {
        var text = element.innerHTML;
        text = text.replace(/(\S+)\s+(\S+)$/, '$1&nbsp;$2');
        element.innerHTML = text;
      });
    }
    ;

    //ADD BR SPACERS
    jQuery('.ignore-br-md, .ignore-br-lg').find('br').after('<span class="br-spacer"></span>');

    //HEADER SEARCH
    var $mastheadsearch = jQuery('.masthead__search');
    $mastheadsearch.find('.search-field').attr("tabindex", -1);
    $mastheadsearch.find('.search-submit').on('click', function (e) {
      var utilitywidth = jQuery('.masthead__utility').width(),
        mainwidth = jQuery('.masthead__nav').width(),
        searchwidth = 450;
      if (window.innerWidth > 1500) {
        searchwidth = utilitywidth + 220;
      } else if (window.innerWidth > 1023 && window.innerWidth < 1499) {
        searchwidth = utilitywidth + mainwidth;
      } else if (window.innerWidth > 576 && window.innerWidth < 1024) {
        searchwidth = utilitywidth;
      } else {
        searchwidth = utilitywidth - 110;
      }
      if ($mastheadsearch.hasClass('open')) {
        if (jQuery('.search-field').val() == '') {
          e.preventDefault();
          $mastheadsearch.find('.search-label').width(0);
          $mastheadsearch.toggleClass('open');
          $mastheadsearch.find('.search-field').attr("tabindex", -1);
        }
      } else {
        $mastheadsearch.find('.search-label').width(searchwidth);
        $mastheadsearch.find('.search-field').attr("tabindex", 0);
        $mastheadsearch.find('.search-field').focus();
        e.preventDefault();
        $mastheadsearch.toggleClass('open');
      }
    });

    //HOMEPOPUP
    if (jQuery("#home-popup")[0]) {
      var $cookie = jQuery("#home-popup").data("cookie");
      if (Cookies.get($cookie) == null) {
        var $time = jQuery("#home-popup").data("time"),
          $class = jQuery("#home-popup").data("class");
        if ($time != '0') {
          Cookies.set($cookie, '1', {
            expires: $time
          });
        }
        setTimeout(function () {
          jQuery.magnificPopup.open({
            items: {
              src: "#home-popup"
            },
            type: "inline",
            removalDelay: 400,
            mainClass: 'mfp-fade home-popup-wrap ' + $class,
            closeBtnInside: true,
            preloader: false,
            autoFocusLast: false,
            closeOnContentClick: false,
            midClick: true
          }, 0);
        }, 2000);
      }
    }

    ////////////////MAGNIFIC

    jQuery('.open-menu-popup a').magnificPopup({
      type: 'inline',
      closeOnContentClick: false,
      midClick: true,
      //removalDelay: 400,
      mainClass: 'mfp-fade menu-popup-wrap',
      preloader: false,
      autoFocusLast: false,
      fixedContentPos: false,
      callbacks: {
        open: function open() {
          jQuery('body').addClass('noscroll');
        },
        close: function close() {
          jQuery('body').removeClass('noscroll');
        }
      }
    });
    if (jQuery(".image-popup")[0]) {
      //Not used in any templates
      jQuery('.image-popup').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-fade hide-close',
        closeBtnInside: false,
        image: {
          verticalFit: true
        },
        callbacks: {
          open: function open() {
            jQuery('body').addClass('noscroll');
          },
          close: function close() {
            jQuery('body').removeClass('noscroll');
          }
        }
      });
    }
    if (jQuery(".open-popup-link")[0]) {
      //Not used in any templates
      jQuery('a.open-popup-link, .open-popup-link a').magnificPopup({
        type: 'inline',
        closeOnContentClick: false,
        midClick: true,
        removalDelay: 400,
        mainClass: 'mfp-fade',
        closeBtnInside: false,
        preloader: false,
        autoFocusLast: false,
        callbacks: {
          open: function open() {
            jQuery('body').addClass('noscroll');
          },
          close: function close() {
            jQuery('body').removeClass('noscroll');
          }
        }
      });
    }
    if (jQuery('.popup-youtube, .popup-vimeo')[0]) {
      //afc-blocks/hero.php
      jQuery('.popup-youtube, .popup-vimeo').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade hide-close',
        removalDelay: 400,
        fixedContentPos: false,
        preloader: false,
        closeBtnInside: false,
        callbacks: {
          open: function open() {
            jQuery('body').addClass('noscroll');
          },
          close: function close() {
            jQuery('body').removeClass('noscroll');
          }
        }
      });
    }
    if (jQuery('.popup-vimeo-btn, .is-style-popup-vimeo-btn, .is-style-popup-vimeo-arrow-btn')[0]) {
      jQuery('.popup-vimeo-btn, .is-style-popup-vimeo-btn, .is-style-popup-vimeo-arrow-btn').each(function () {
        jQuery(this).magnificPopup({
          delegate: 'a',
          type: 'iframe',
          mainClass: 'mfp-fade hide-close',
          removalDelay: 400,
          fixedContentPos: false,
          preloader: false,
          closeBtnInside: false,
          callbacks: {
            open: function open() {
              jQuery('body').addClass('noscroll');
            },
            close: function close() {
              jQuery('body').removeClass('noscroll');
            }
          }
        });
      });
    }
    if (jQuery('.popup-gallery')[0]) {
      //content-meeting-spaces.php
      jQuery('.popup-gallery').each(function () {
        jQuery(this).magnificPopup({
          delegate: 'a',
          type: 'image',
          tLoading: 'Loading image #%curr%...',
          mainClass: 'mfp-fade hide-close',
          closeBtnInside: false,
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
          },

          image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function titleSrc(item) {
              var $title = '';
              if (item.el.attr('title')) {
                $title = item.el.attr('title');
              } else {
                if (item.el.parent().find('figcaption').text() != '') {
                  $title = item.el.parent().find('figcaption').text();
                }
              }
              return $title;
            }
          },
          callbacks: {
            open: function open() {
              jQuery('body').addClass('noscroll');
            },
            close: function close() {
              jQuery('body').removeClass('noscroll');
            }
          }
        });
      });
    }
  });
})();