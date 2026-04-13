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
    items = document.querySelectorAll('.fade-in, .move-left, .move-right, .move-up, .move-down, .animation-chain, .animate, .counter, .scale-center, .scale-right'),
    io,
    idCounter = 0,
    minId = null,
    maxId = null,
    debounceTimeout = null,
    nodelayclasses = ['move-left', 'move-right', 'move-down', 'move-up', 'scale-center', 'scale-right'];
  function applyChanges() {
    //console.log(minId, maxId);

    items.forEach(function (entry) {
      var entryid = entry.getAttribute('data-animate');
      if (entryid >= minId && entryid <= maxId) {
        if (!entry.classList.contains('in-view')) {
          entry.classList.add('in-view');

          //remove class
          var hasMatch = nodelayclasses.some(function (className) {
            return entry.classList.contains(className);
          });
          if (hasMatch) {
            setTimeout(function () {
              entry.classList.add("no-delay");
            }, 2000);
          }
          ;
          if (entry.classList.contains('animation-chain')) {
            setTimeout(function () {
              entry.classList.remove('animation-chain');
            }, 2000);
          }

          /////////STAT
          if (entry.classList.contains('counter')) {
            var counterID = entry.id,
              startVal = entry.getAttribute('data-start'),
              endVal = entry.getAttribute('data-end'),
              countDelay = entry.getAttribute('data-delay'),
              decimals = entry.getAttribute('data-decimal'),
              duration = entry.getAttribute('data-speed'),
              prefix = entry.getAttribute('data-prefix'),
              suffix = entry.getAttribute('data-suffix'),
              separator = entry.getAttribute('data-separator');
            if ($mobile) {
              countDelay = 0;
            }
            var options = {
              useEasing: true,
              useGrouping: true,
              separator: separator,
              decimal: '.',
              prefix: prefix,
              suffix: suffix
            };
            var $counter = new CountUp(counterID, startVal, endVal, decimals, duration, options);
            setTimeout(function () {
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
    setTimeout(function () {
      fadeOutAndRemove("loading-screen");
    }, 100);

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
 * SIG Post Grid
 * Version  : 1.0.00
 */

jQuery.noConflict();
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    if (jQuery(".post-grid__filter")[0]) {
      var updateFilter = function updateFilter() {
        jQuery('.post-grid__load-btn').hide();
        // Get all checked values
        var activeFilters = Array.from(filters).filter(function (i) {
          return i.checked;
        }).map(function (i) {
          return i.value;
        });

        //console.log(activeFilters);

        items.forEach(function (item) {
          var classes = item.classList;

          // Show item if its category is checked, or if NO filters are checked (show all)
          if (activeFilters.length === 0 || activeFilters.every(function (cls) {
            return item.classList.contains(cls);
          })) {
            item.classList.add('filter-active');
          } else {
            item.classList.remove('filter-active');
          }
        });
      };
      var filters = document.querySelectorAll('.post-grid__filter');
      var items = document.querySelectorAll('.post-grid__tile');
      filters.forEach(function (f) {
        return f.addEventListener('change', updateFilter);
      });
      if (document.location.hash) {
        var hashValue = window.location.hash.slice(1);

        //console.log(hashValue);

        var values = jQuery('.post-grid__filter').map(function () {
          return jQuery(this).val();
        }).get();
        console.log(values);
        if (values.includes(hashValue)) {
          window.scrollTo(0, 0);
          jQuery('#' + hashValue + '-filter').prop("checked", true);
          updateFilter();
        }
      }
      jQuery('.post-grid__load-btn').on('click', function () {
        jQuery('.post-grid__tile:not(.filter-active)').slice(0, 9).addClass('filter-active');
      });
      document.querySelectorAll('input[type="radio"]').forEach(function (radio) {
        radio.addEventListener('click', function (e) {
          if (radio.dataset.wasChecked === 'true') {
            radio.checked = false;
            radio.dataset.wasChecked = 'false';
          } else {
            // Mark the clicked one as checked and clear others in the same group
            document.querySelectorAll("input[name=\"" + radio.name + "\"]").forEach(function (r) {
              return r.dataset.wasChecked = 'false';
            });
            radio.dataset.wasChecked = 'true';
          }
          updateFilter();
        });
      });
    }

    /* ///POST GRID FILTERS GRID
    if(jQuery('.post-grid__filters')[0]){            
        //https://codepen.io/desandro/pen/GFbAs
        let $container = jQuery('.post-grid__posts').isotope({
            itemSelector: '.post-grid__item',
            layoutMode: 'fitRows', 
            fitRows: {
                equalheight: true
            }
        });
         
        let  $checkboxes = jQuery('.post-grid__filters input');
        //$selects = jQuery('.meeting-filters-wrap select'),
           
            $checkboxes.change( function() {
                let exclusives = [];
                let inclusives = [];
                
                console.log('change');
                
                $checkboxes.each( function( i, elem ) {
                    if ( elem.checked ) {
                        inclusives.push( elem.value );
                        jQuery(elem).parent().addClass('active');
                    } else {
                        jQuery(elem).parent().removeClass('active');
                    }
                });
                
                exclusives = exclusives.join('');
                
                let filterValue;
                
                if ( inclusives.length ) {
                    filterValue = jQuery.map( inclusives, function( value ) {
                        return value + exclusives;
                    });                        
                    filterValue = filterValue.join('');
                } else {
                    filterValue = exclusives;
                }
                
                //$output.text( filterValue );
                $container.isotope({ filter: filterValue });
                //$spaces.isotope({ filter: filterValue });
                //$floorplans.isotope({ filter: filterValue });
                
                if ( !$container.data('isotope').filteredItems.length ) {
                    jQuery('#empty-results').addClass('active');
                    jQuery('#reset-filters').addClass('active');
                } else {
                    jQuery('#empty-results').removeClass('active');
                    jQuery('#reset-filters').addClass('active');
                }
                 //jQuery('.lazy').trigger('scroll');
            
        });
        
        
        jQuery("#reset-filters").click(function(e){
            e.preventDefault();
            jQuery('input[type=checkbox]').prop('checked',false);
            jQuery('input[type=checkbox]').parent().removeClass('active');
            jQuery(this).removeClass('active');
            $container.isotope({ filter: '*' });
        });
        
    } */
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
    if (jQuery(".circle-slider-wrap")[0]) {
      jQuery('.circle-slider-wrap').each(function (i) {
        var $sliderid = jQuery(this).data('id'),
          $circleslider = jQuery('#' + $sliderid + '-slider'),
          $next = jQuery('#' + $sliderid + '-next'),
          $prev = jQuery('#' + $sliderid + '-prev');
        $circleslider.owlCarousel({
          smartSpeed: 1000,
          nav: false,
          autoplay: false,
          dots: false,
          loop: false,
          mouseDrag: true,
          touchDrag: true,
          //responsiveRefreshRate:50,
          margin: 0,
          //autoWidth:true,
          center: true,
          startPosition: 0,
          items: 1,
          responsive: {
            576: {
              items: 2
            },
            1024: {
              items: 3,
              startPosition: 1
            },
            1500: {
              items: 4,
              startPosition: 1
            }
          },
          onChanged: function onChanged(e) {
            if (e.item) {
              var index = e.item.index,
                count = e.item.count,
                visibleslides = 1;

              //console.log('index: '+index+', total: '+ count);

              if (index == 0) {
                $prev.prop("disabled", true);
              } else if (index == count - visibleslides) {
                $next.prop("disabled", true);
              } else {
                $prev.prop("disabled", false);
                $next.prop("disabled", false);
              }
              setTimeout(function () {
                $circleslider.find('.owl-item').each(function () {
                  if (jQuery(this).hasClass('center')) {
                    jQuery(this).find('a.circle-slide__link').attr('tabindex', 0);
                  } else {
                    jQuery(this).find('a.circle-slide__link').attr('tabindex', -1);
                  }
                });
              }, 100);
            }
          },
          onInitialized: function onInitialized(e) {
            setTimeout(function () {
              $circleslider.addClass('active');
            }, 500);
          }
        });
        $next.click(function () {
          $circleslider.trigger('next.owl.carousel');
        });
        $prev.click(function () {
          $circleslider.trigger('prev.owl.carousel');
        });
        $circleslider.on('click', '.owl-item', function (e) {
          if (!jQuery(this).hasClass('center')) {
            e.preventDefault();
            var index = jQuery(this).index();
            $circleslider.trigger('to.owl.carousel', [index, 1000, true]);
          }
        });
      });
    }
    if (jQuery(".content-slider-wrap")[0]) {
      jQuery('.content-slider-wrap').each(function (i) {
        var $sliderid = jQuery(this).data('id'),
          $contentslider = jQuery('#' + $sliderid + '-slider'),
          $next = jQuery('#' + $sliderid + '-next'),
          $prev = jQuery('#' + $sliderid + '-prev');
        $contentslider.owlCarousel({
          items: 1,
          smartSpeed: 1000,
          nav: false,
          autoplay: false,
          dots: true,
          loop: true,
          mouseDrag: true,
          touchDrag: true,
          responsiveRefreshRate: 50,
          autoWidth: true,
          margin: 30,
          /* stagePadding:0,
          responsive: {
              782: {stagePadding: 100}, 
              1200: {stagePadding: 150},
              1500: {stagePadding: 220},
          }, */
          onChanged: function onChanged(e) {
            if (e.item) {
              setTimeout(function () {
                $contentslider.find('.owl-item').each(function () {
                  if (jQuery(this).hasClass('active')) {
                    jQuery(this).find('a.content-slider__slide__link').attr('tabindex', 0);
                  } else {
                    jQuery(this).find('a.content-slider__slide__link').attr('tabindex', -1);
                  }
                });
              }, 100);
            }
          }
        });
        $next.click(function () {
          $contentslider.trigger('next.owl.carousel');
        });
        $prev.click(function () {
          $contentslider.trigger('prev.owl.carousel');
        });
      });
    }
  });

  ///ON READY	
  document.addEventListener('DOMContentLoaded', function () {
    //ADD BR SPACERS
    if (jQuery(".widow-fix, .is-style-intro-headline, h2.wp-block-heading")[0]) {
      var elements = document.querySelectorAll('.widow-fix, .is-style-intro-headline, h2.wp-block-heading');
      elements.forEach(function (element) {
        var text = element.innerHTML;
        text = text.replace(/(\S+)\s+(\S+)$/, '$1&nbsp;$2');
        element.innerHTML = text;
      });
    }
    ;

    //LONG LINKS
    jQuery('.insights-single__content a').each(function () {
      if (jQuery(this).text().length > 60) {
        jQuery(this).addClass('break-link');
      }
    });

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
        searchwidth = utilitywidth + 180;
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

    // SCROLL TO ANCHOR
    jQuery('a.scroll-link[href*="#"]:not([href="#"]), p.scroll-link a[href*="#"]:not([href="#"]), li.scroll-link a[href*="#"]:not([href="#"]), ul.scroll-link a[href*="#"]:not([href="#"])').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var $speed = 1000,
          //$top = 148;
          $top = 50;
        if (jQuery(this).data('speed')) {
          $speed = jQuery(this).data('speed');
          //console.log($speed);
        }

        if (jQuery(this).data('top')) {
          $top = jQuery(this).data('top');
          //console.log($top);
        }

        var target = jQuery(this.hash);
        target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          jQuery('html, body').animate({
            scrollTop: target.offset().top - $top
          }, $speed, "easeInOutExpo");
          return false;
        }
      }
    });

    ////////////////MAGNIFIC        

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
        mainClass: 'mfp-fade content-popup',
        closeBtnInside: true,
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