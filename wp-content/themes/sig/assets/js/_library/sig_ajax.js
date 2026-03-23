"use strict";

jQuery.noConflict();
jQuery(function () {
  var $window = jQuery(window),
      wto = 0,
      webinarbtn;

  function getWebinarLink(webinarid) {
    jQuery.ajax({
      url: registerlink.ajax_url,
      type: 'post',
      data: {
        action: 'register_link',
        nonce: registerlink.ajax_nonce,
        webinar: webinarid
      },
      success: function success(response) {
        //console.log(response.data);
        jQuery(webinarbtn).removeClass('loading');
        window.open(response.data, "_self");
      }
    });
  }

  jQuery(document).ready(function () {
    jQuery(document).on('gform_confirmation_loaded', function (event, formId) {
      if (formId == 10) {
        Cookies.set('sig_registered', '-1', {
          expires: 365
        });
      }
    });

    function registerCheck(e) {
      e.preventDefault();
      webinarbtn = e.target;
      var $webinar = jQuery(webinarbtn).data('webinar');

      if (Cookies.get('sig_registered') == undefined) {
        jQuery('#input_10_4').val($webinar);
        jQuery.magnificPopup.open({
          items: {
            src: '#webinar-registration-modal'
          },
          type: 'inline',
          closeOnContentClick: false,
          midClick: true,
          removalDelay: 400,
          mainClass: 'mfp-fade mfp-middle',
          preloader: false
        });
      } else {
        //console.log($webinar);
        jQuery(webinarbtn).addClass('loading');
        getWebinarLink($webinar);
        /*clearTimeout(wto);
        wto = setTimeout(function() {
            getWebinarLink($webinar);
        }, 10);*/
      }
    }

    jQuery('.register-popup-btn').on("click", registerCheck);
  });
});