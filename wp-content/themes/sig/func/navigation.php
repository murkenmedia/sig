<?php

//MENUS
register_nav_menus( array(
	'primary' => 'Main Menu',
    'utility' => 'Utility Menu',
	'mobile' => 'Mobile Menu',
	'social' => 'Social Menu',
	'footer' => 'Footer Menu',
	'footer-legal' => 'Footer Legal Menu',
    'solutions' => 'Solutions Menu',
    'technologies' => 'Technologies Menu',
    'about' => 'About Menu',
    
) );


if ( ! function_exists( 'megamenu_widgets_init' ) ) {
	/**
	 * SETUP WIDGET
	 *
	 * @since 1.0.0
	 */
	function megamenu_widgets_init() {        
        
        //NEEDED FOR MEGA MENU
        $location = 'primary';
        $css_class = 'mega-menu-parent';
        $locations = get_nav_menu_locations();
        if ( isset( $locations[ $location ] ) ) {
          $menu = get_term( $locations[ $location ], 'nav_menu' );
          if ( $items = wp_get_nav_menu_items( $menu->name ) ) {
            foreach ( $items as $item ) {
              if ( in_array( $css_class, $item->classes ) ) {
                register_sidebar( array(
                  'id'   => 'mega-menu-item-' . $item->ID,
                  'description' => 'Mega Menu items',
                  'name' => $item->title . ' - Mega Menu',
                  'before_widget' => '<li id="%1$s" class="mega-menu-item">',
                  'after_widget' => '</li>', 

                ));
              }
            }
          }
        }

		
	}
}
add_action( 'widgets_init', 'megamenu_widgets_init' );


?>