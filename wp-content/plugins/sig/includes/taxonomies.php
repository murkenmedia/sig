<?php

//TAXONOMIES
add_action( 'init', 'create_sig_taxonomies', 0 );

function create_sig_taxonomies() {    
    
    /*register_taxonomy(
		'event_time',
        array('events'),
		array(
			'labels' =>  array(
				'name'              => _x( 'Event Time', 'taxonomy general name', 'sig' ),
				'singular_name'     => _x( 'Event Time', 'taxonomy singular name', 'sig' ),
				'search_items'      => __( 'Search Event Time', 'sig' ),
				'all_items'         => __( 'All Event Time', 'sig' ),
				'parent_item'       => __( 'Parent Event Time', 'sig' ),
				'parent_item_colon' => __( 'Parent Event Time:', 'sig' ),
				'edit_item'         => __( 'Edit Event Time', 'sig' ),
				'update_item'       => __( 'Update Event Time', 'sig' ),
				'add_new_item'      => __( 'Add New Event Time', 'sig' ),
				'new_item_name'     => __( 'New Event Time Name', 'sig' ),
				'menu_name'         => __( 'Event Time', 'sig' ),
			),
            'public' => false,
            'has_archive' => false,
            //'show_admin_column' => true,
            'show_ui' => true,
            'show_tagcloud' => true,
            'hierarchical' => true,
            'rewrite' => array('with_front' => false),
            //'publicly_queryable' => false,
            'show_in_nav_menus' => false,
            'show_in_rest' => true,
		)
    );*/
    
    //EVENT CATEGORY
    register_taxonomy(
		'event_category',
        array('events'),
		array(
			'labels' =>  array(
				'name'              => _x( 'Event Categories', 'taxonomy general name', 'sig' ),
				'singular_name'     => _x( 'Event Category', 'taxonomy singular name', 'sig' ),
				'search_items'      => __( 'Search Event Categories', 'sig' ),
				'all_items'         => __( 'All Event Categories', 'sig' ),
				'parent_item'       => __( 'Parent Event Category', 'sig' ),
				'parent_item_colon' => __( 'Parent Event Category:', 'sig' ),
				'edit_item'         => __( 'Edit Event Category', 'sig' ),
				'update_item'       => __( 'Update Event Category', 'sig' ),
				'add_new_item'      => __( 'Add New Event Category', 'sig' ),
				'new_item_name'     => __( 'New Event Category Name', 'sig' ),
				'menu_name'         => __( 'Event Category', 'sig' ),
			),
            'public' => false,
            'has_archive' => false,
            'show_admin_column' => true,
            'show_ui' => true,
            'show_tagcloud' => true,
            'hierarchical' => true,
            'rewrite' => array('with_front' => false),
            //'publicly_queryable' => false,
            'show_in_nav_menus' => false,
            'show_in_rest' => true,
		)
    );
}

?>