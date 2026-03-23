<?php
/**
 * SIG functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package SIG
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

if ( ! function_exists( 'sig_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function sig_setup() {
        
        //SETUP		
        require_once locate_template('/func/setup.php');
        require_once locate_template('/func/head-cleanup.php');
        require_once locate_template('/func/enqueues.php');
        require_once locate_template('/func/admin.php');
        require locate_template('/func/template-tags.php');
        require locate_template('/func/template-functions.php');

        //OPTIONAL
        require_once locate_template('/func/widgets.php');
        require_once locate_template('/func/gutenberg.php');	
        require_once locate_template('/func/transients.php');

        //NAV
        require_once locate_template('/func/navigation.php');
        //require_once locate_template('/func/navwalker-desktop.php');
        require_once locate_template('/func/navwalker-mobile.php');
        require_once locate_template('/func/navwalker-megamenu.php');

        //CONTENT
        require_once locate_template('/func/helpers.php');
        require_once locate_template('/func/content.php');
        require_once locate_template('/func/content-blog.php');
        
        //PLUGINS
        require_once locate_template('/func/acf.php');			
        require_once locate_template('/func/wpseo-by-yoast.php');
        require_once locate_template('/func/gravity-forms.php');
        //require_once locate_template('/func/bugherd.php');
		
	}
endif;
add_action( 'after_setup_theme', 'sig_setup' );
