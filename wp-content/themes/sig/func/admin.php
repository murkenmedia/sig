<?php


function remove_global_styles_admin() {
    wp_dequeue_style('global-styles');
    remove_action( 'admin_enqueue_scripts', 'wp_enqueue_global_styles' );
    remove_action( 'admin_footer', 'wp_enqueue_global_styles', 1 );
    remove_action( 'admin_body_open', 'wp_global_styles_render_svg_filters' );
}

//add_action('admin_init','remove_global_styles_admin');


function remove_global_styles_inline_css() {
    remove_action( 'wp_enqueue_scripts', 'wp_enqueue_global_styles' );
    remove_action( 'wp_footer', 'wp_enqueue_global_styles', 1 );
    remove_action( 'wp_body_open', 'wp_global_styles_render_svg_filters' );
}
add_action('init', 'remove_global_styles_inline_css');


/**
 * Reusable Blocks accessible in backend
 * @link https://www.billerickson.net/reusable-blocks-accessible-in-wordpress-admin-area
 *
 */
function mm_reusable_blocks_admin_menu() {
    add_menu_page( 'Reusable Blocks', 'Reusable Blocks', 'edit_posts', 'edit.php?post_type=wp_block', '', 'dashicons-editor-table', 22 );
}
add_action( 'admin_menu', 'mm_reusable_blocks_admin_menu' );


if ( ! function_exists( 'set_search_form_type' ) ) {
	/**
	 * HTML5 SEARCH FORM
	 *
	 * @since 1.0.0
	 */
	function set_search_form_type() {
		add_theme_support( 'html5', array( 'search-form' ) );
	}
}
add_action( 'after_setup_theme', 'set_search_form_type' );


if ( ! function_exists( 'set_mime_types' ) ) {
	/**
	 * MIME TYPES
	 *
	 * @since 1.0.0
	 */
	function set_mime_types($mimes) {
		$mimes['svg'] = 'image/svg+xml';
		$mimes['ogv'] = 'video/ogg';
		return $mimes;
	}
}
add_filter('upload_mimes', 'set_mime_types');



//EXCERPTS TO PAGES
add_post_type_support( 'page', 'excerpt' );



if ( ! function_exists( 'set_login_logo' ) ) {
	/**
	 * CUSTOM LOGIN
	 *
	 * @since 1.0.0
	 */
	function set_login_logo() { 
	   echo '<style type="text/css">
			#login h1 a, .login h1 a {background-image: url('.get_stylesheet_directory_uri().'/assets/img/sig.svg);width:300px;height:88px;background-size: 300px auto;background-repeat: no-repeat;padding-bottom:0;}
			body {background:#FFFFFF !important;}
		</style>';
	}
}
add_action( 'login_enqueue_scripts', 'set_login_logo' );

if ( ! function_exists( 'set_login_logo_url' ) ) {
	/**
	 * CUSTOM LOGIN LOGO LINK
	 *
	 * @since 1.0.0
	 */	
	function set_login_logo_url() {
		return home_url();
	}
}
add_filter( 'login_headerurl', 'set_login_logo_url' );

if ( ! function_exists( 'set_login_logo_url_title' ) ) {
	/**
	 * SET TITLE FOR CUSTOM LOGIN LOGO
	 *
	 * @since 1.0.0
	 */	
	function set_login_logo_url_title() {
		return get_bloginfo();
	}
}
add_filter( 'login_headertext', 'set_login_logo_url_title' );


if ( ! function_exists( 'remove_admin_login_header' ) ) {
	/**
	 * REMOVE HEADER MARGIN FOR FIXED LAYOUTS
	 *
	 * @since 1.0.0
	 */	
	function remove_admin_login_header() {
		remove_action('wp_head', '_admin_bar_bump_cb');
	}
}
add_action('get_header', 'remove_admin_login_header');



//REMOVE SIDEBAR SECTIONS
if ( ! function_exists( 'remove_menus' ) ) {
	/**
	 * REMOVE HEADER MARGIN FOR FIXED LAYOUTS
	 *
	 * @since 1.0.0
	 */	
	function remove_menus(){  
	 // remove_menu_page( 'index.php' );                  //Dashboard
	  //remove_menu_page( 'edit.php' );                   //Posts
	 // remove_menu_page( 'upload.php' );                 //Media
	 // remove_menu_page( 'edit.php?post_type=page' );    //Pages
	 remove_menu_page( 'edit-comments.php' );          //Comments
	  //remove_menu_page( 'themes.php' );                 //Appearance
	 // remove_menu_page( 'plugins.php' );                //Plugins
	  //remove_menu_page( 'users.php' );                  //Users
	  //remove_menu_page( 'tools.php' );                  //Tools
	  //remove_menu_page( 'options-general.php' );        //Settings

	}
}
add_action( 'admin_menu', 'remove_menus' );


?>