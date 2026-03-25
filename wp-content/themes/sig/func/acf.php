<?php

/**
 * Set of functions related to Advanced Custom Fields
 *
 * @package SIG
 * @since   1.0.0
 */

if ( function_exists( 'acf_register_block' ) ) {
	/**
	 * Register Custom Block Category
	 *
	 * @since 1.0.0
	 * @param array   $categories Array of current block categories.
	 * @param WP_Post $post The current post object.
	 * @return array
	 */
    
    function custom_block_categories( $block_categories, $block_editor_context ) {        
        return array_merge(
            $block_categories,
            array(
                array(
                    'slug'  => 'sig-blocks',
                    'title' => esc_html__( 'SIG Blocks', 'sig' ),
                ),
            )
        );
    }
  
    add_filter( 'block_categories_all', 'custom_block_categories', 10, 2 );
    

	/**
	 * ACF callback function that loads the proper partial based on the block type.
	 *
	 * @since 1.0.0
	 * @param string $block The name of the block.
	 * @return void
	 */
	function sig_acf_block_render_callback( $block ) {
		// Convert name ("acf/testimonial") into path friendly slug ("testimonial").
		$slug = str_replace( 'acf/', '', $block['name'] );

		// Include a template part from within the "template-parts/block" folder.
		if ( file_exists( get_theme_file_path( "/template-parts/acf-blocks/{$slug}.php" ) ) ) {
			include get_theme_file_path( "/template-parts/acf-blocks/{$slug}.php" );
		}
	}
    
    //REMOVE WPAUTOP
    add_filter( 'render_block', function ( $block_content, $block ) {

		if($block['blockName'] !== null) {
			if(strpos($block['blockName'], 'acf') !== false) {
				remove_filter( 'the_content', 'wpautop' );
			} 
		}

        return $block_content;
    }, 10, 2 );
    
    
	/**
	 * Register ACF Blocks
	 *
	 * @since 1.0.0
	 * @return void
	 */
	function sig_acf_register_blocks() {
		$blocks = array(
            
            array(
				'name'        => 'animated-stat',
				'title'       => __( 'Animated Stat', 'sig' ),
				'description' => __( 'Animated stat.', 'sig' ),
                'icon'        => 'chart-line',
				'keywords'    => array( 'stats', 'animated' ),
			),
            
            
            array(
				'name'        => 'circle-slider',
				'title'       => __( 'Circle Slider', 'sig' ),
				'description' => __( 'Circle Slider', 'sig' ),
                'icon' => 'format-image',
				'keywords'    => array( 'slider', 'circle', 'sig' ),
				'supports'    => array(
					'align'    => array('full' ),
				),
			),


			array(
				'name'        => 'content-slider',
				'title'       => __( 'Content Slider', 'sig' ),
				'description' => __( 'Content Slider', 'sig' ),
                'icon' => 'format-image',
				'keywords'    => array( 'slider', 'content', 'sig' ),
				'supports'    => array(
					'align'    => array('full' ),
				),
			),
            
            array(
				'name'        => 'collapsable',
				'title'       => __( 'Collapsable Content', 'sig' ),
				'description' => __( 'Collapsable Content', 'sig' ),
                'icon' => 'align-center',
				'keywords'    => array( 'collapsable', 'content' ),
                'align'       => 'full',                
                'mode'			=> 'preview',
                'supports'		=> [
                    'align'			=> false,
                    'anchor'		=> true,
                    'customClassName'	=> true,
                    'jsx' 			=> true,
                ]
			),
            
            array(
				'name'        => 'content-tabs',
				'title'       => __( 'Content Tabs', 'sig' ),
				'description' => __( 'Content Tabs', 'sig' ),
                'icon' => 'table-col-before',
				'keywords'    => array( 'content', 'tabs', 'insights', 'case study', 'sig' ),
				'supports'    => array(
					'align'    => array('full' ),
				),
			),
            

           array(
				'name'        => 'hero',
				'title'       => __( 'Hero', 'sig' ),
				'description' => __( 'Hero.', 'sig' ),
				'icon'        => 'format-gallery',
				'keywords'    => array( 'hero' ),
				'align'       => 'full', 
                'supports'    => array(
					'align'    => array('full' ),
                    'jsx' 			=> true,
				),
			),
            
           
            array(
				'name'        => 'lazy-video',
				'title'       => __( 'Lazy Load Video', 'sig' ),
				'description' => __( 'Lazy Load a YouTube or Vimeo video.', 'sig' ),
				'icon'        => 'video-alt3',
				'keywords'    => array( 'youtube', 'vimeo', 'video' ),
			),
            
           
            array(
				'name'        => 'tile',
				'title'       => __( 'Tile - Single', 'sig' ),
				'description' => __( 'Single Tile', 'sig' ),
                'icon' => 'cover-image',
				'keywords'    => array( 'tiles', 'tile' ),
                'supports'		=> [
                    'align'			=> false,
                    'anchor'		=> false,
                    'customClassName'	=> true,
                    'jsx' 			=> true,
                ]
			),
            
            array(
				'name'        => 'tiles-grid',
				'title'       => __( 'Tiles Grid', 'sig' ),
				'description' => __( 'Wrapper for Single Tiles', 'sig' ),
                'icon' => 'cover-image',
				'keywords'    => array( 'tiles', 'tile', 'grid' ),
                'supports'		=> [
                    'align'			=> false,
                    'anchor'		=> true,
                    'customClassName'	=> true,
                    'jsx' 			=> true,
                ]
			),
            
            array(
				'name'        => 'video-bg-with-content',
				'title'       => __( 'Video BG with Content', 'sig' ),
				'description' => __( 'Video BG with Content.', 'sig' ),
				'icon'        => 'video-alt3',
				'keywords'    => array( 'video', 'content' ),
                'supports'		=> [
                    'align'			=> true,
                    'anchor'		=> false,
                    'customClassName'	=> true,
                    'jsx' 			=> true,
                ]
			),
            
		);

		foreach ( $blocks as $args ) {
			$args['category']        = 'sig-blocks';
			$args['render_callback'] = 'sig_acf_block_render_callback';
			acf_register_block( $args );
		}
	}
	add_action( 'acf/init', 'sig_acf_register_blocks' );
}


if ( ! function_exists( 'get_acf_post_id' ) ) {
	/**
	 * Gets the post id inside of an ACF Gutenberg block
	 *
	 * @since 1.0.0
	 * @param array   $categories Array of current block categories.
	 * @param WP_Post $post The current post object.
	 * @return array
	 */
	function get_acf_post_id() {
		if ( is_admin() && function_exists( 'acf_maybe_get_POST' ) ) :
			return intval( acf_maybe_get_POST( 'post_id' ) );
		else :
			global $post;
			return $post->ID;
		endif;
	}
	
}

//ACF

if( function_exists('acf_add_options_page') ) {
    acf_add_options_page(array(
        'page_title' => "SIG Settings",
        'menu_title' => "SIG Settings",
        'menu_slug' => 'sig-settings',
        'capability' => 'edit_posts',
        'redirect' => false
    ));

    acf_add_options_sub_page(array(
        'page_title' => 'Homepage Popup Settings',
        'menu_title' => 'Homepage Popup',
        'parent_slug' => 'sig-settings',
    ));

}

/*
 * The following functions prevents Fatal Errors
 * when ACF is inactive.
 *
 * Intended for pages such as user activation notices, where
 * only network active plugins are loaded. If ACF is not loaded,
 * return false on any built-in ACF function calls to prevent
 * Fatal errors.
 */
if ( ! is_admin() && ! class_exists( 'acf' ) ) {
	/**
	 * ACF fallback function: get_field
	 *
	 * @since  1.0.0
	 *
	 * @param string $key  Fieldname.
	 * @param int    $post Post ID.
	 * @return false
	 */
	function get_field( $key = null, $post = null ) {
		return false;
	}

	/**
	 * ACF fallback function: get_sub_field
	 *
	 * @since  1.0.0
	 *
	 * @param string $key  Fieldname.
	 * @param int    $post Post ID.
	 * @return false
	 */
	function get_sub_field( $key = null, $post = null ) {
		return false;
	}

	/**
	 * ACF fallback function: the_field
	 *
	 * @since  1.0.0
	 *
	 * @param string $key  Fieldname.
	 * @param int    $post Post ID.
	 * @return false
	 */
	function the_field( $key = null, $post = null ) {
		return false;
	}

	/**
	 * ACF fallback function: have_rows
	 *
	 * @since  1.0.0
	 *
	 * @param string $key  Fieldname.
	 * @param int    $post Post ID.
	 * @return false
	 */
	function have_rows( $key = null, $post = null ) {
		return false;
	}

	/**
	 * ACF fallback function: acf_add_local_field_group
	 *
	 * @since  1.0.0
	 *
	 * @param string $key  Fieldname.
	 * @param int    $post Post ID.
	 * @return false
	 */
	function acf_add_local_field_group( $key = null, $post = null ) {
		return false;
	}
}


?>