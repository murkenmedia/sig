<?php

//THEME SETUP
add_theme_support( 'title-tag' );
// Add theme support for selective refresh for widgets.
add_theme_support( 'customize-selective-refresh-widgets' );


if ( ! function_exists( 'set_document_title_separator' ) ) {
	function set_document_title_separator( $sep ) {
		$sep = "|";
		return $sep;
	}	
}
add_filter( 'document_title_separator', 'set_document_title_separator' );

add_theme_support( 'responsive-embeds' );

add_theme_support( 'automatic-feed-links' );
$defaults = array(
    'default-image' => '',
    'random-default' => false,
    'width' => 0,
    'height' => 0,
    'flex-height' => false,
    'flex-width' => false,
    'default-text-color' => '',
    'header-text' => true,
    'uploads' => true,
    'wp-head-callback' => '',
    'admin-head-callback' => '',
    'admin-preview-callback' => '',
    'video' => false,
    'video-active-callback' => 'is_front_page',
);
add_theme_support( 'custom-header', $defaults );
add_theme_support( "post-thumbnails" );
// Set up the WordPress core custom background feature.
add_theme_support( 'custom-background', apply_filters( 'sig_custom_background_args', array(
	'default-color' => 'ffffff',
	'default-image' => '',
) ) );

//add Editor options
$role_object = get_role( 'editor' );
$role_object->add_cap( 'edit_theme_options' );



if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
	wp_enqueue_script( 'comment-reply' );
}

/*
 * Switch default core markup for search form, comment form, and comments
 * to output valid HTML5.
 */
add_theme_support( 'html5', array(
	'search-form',
	'comment-form',
	'comment-list',
	'gallery',
	'caption',
) );


/*
 * Make theme available for translation.
 * Translations can be filed in the /languages/ directory.
 * If you're building a theme based on sig, use a find and replace
 * to change 'sig' to the name of your theme in all the template files.
 */
load_theme_textdomain( 'sig', get_template_directory() . '/languages' );



?>