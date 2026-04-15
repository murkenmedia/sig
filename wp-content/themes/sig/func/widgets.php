<?php
/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */

if ( ! function_exists( 'sig_widgets_init' ) ) {
	/**
	 * SETUP WIDGET
	 *
	 * @since 1.0.0
	 */
	function sig_widgets_init() {        

        register_sidebar(array(
			'name'          => esc_html__('Footer - CTA', 'sig'),
			'id'            => 'footer-cta',
			'description'   => '',
			'before_widget' => '',
			'after_widget'  => '',
			'before_title'  => '',
			'after_title'   => '',
		));
        
        register_sidebar(array(
			'name'          => esc_html__('Footer - Column One', 'sig'),
			'id'            => 'footer-1',
			'description'   => '',
			'before_widget' => '',
			'after_widget'  => '',
			'before_title'  => '',
			'after_title'   => '',
		));
        
        register_sidebar(array(
			'name'          => esc_html__('Footer - Column Two', 'sig'),
			'id'            => 'footer-2',
			'description'   => '',
			'before_widget' => '',
			'after_widget'  => '',
			'before_title'  => '',
			'after_title'   => '',
		));
        
        register_sidebar(array(
			'name'          => esc_html__('Footer - Column Three', 'sig'),
			'id'            => 'footer-3',
			'description'   => '',
			'before_widget' => '',
			'after_widget'  => '',
			'before_title'  => '',
			'after_title'   => '',
		));

		register_sidebar(array(
			'name'          => esc_html__('404 Page Not Found', 'sig'),
			'id'            => 'page-not-found',
			'description'   => '',
			'before_widget' => '',
			'after_widget'  => '',
			'before_title'  => '',
			'after_title'   => '',
		));
        
    }
	

}
add_action( 'widgets_init', 'sig_widgets_init' );


?>