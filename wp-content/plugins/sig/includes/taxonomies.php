<?php

//TAXONOMIES
add_action( 'init', 'create_sig_taxonomies', 0 );

function create_sig_taxonomies() {

	register_taxonomy(
		'case_study_category',
		array('case-study'),
		array(
			'labels' =>  array(
				'name'              => _x( 'Case Study Categories', 'taxonomy general name', 'h4c' ),
				'singular_name'     => _x( 'Case Study Category', 'taxonomy singular name', 'h4c' ),
				'search_items'      => __( 'Search Case Study Categories', 'h4c' ),
				'all_items'         => __( 'All Case Study Categories', 'h4c' ),
				'parent_item'       => __( 'Parent Case Study Category', 'h4c' ),
				'parent_item_colon' => __( 'Parent Case Study Category:', 'h4c' ),
				'edit_item'         => __( 'Edit Case Study Category', 'h4c' ),
				'update_item'       => __( 'Update Case Study Category', 'h4c' ),
				'add_new_item'      => __( 'Add New Case Study Category', 'h4c' ),
				'new_item_name'     => __( 'New Case Study Category Name', 'h4c' ),
				'menu_name'         => __( 'Case Study Categories', 'h4c' ),
			),
			'public' => false,
			'has_archive' => false,
			'show_admin_column' => true,
			'show_ui' => true,
			'hierarchical' => true,
			'rewrite' => array('with_front' => false),
			//'publicly_queryable' => false,
			'show_in_nav_menus' => false,
			'show_in_rest' => true,
		)
	);

	register_taxonomy(
		'event_category',
		array('events'),
		array(
			'labels' =>  array(
				'name'              => _x( 'Event Categories', 'taxonomy general name', 'h4c' ),
				'singular_name'     => _x( 'Event Category', 'taxonomy singular name', 'h4c' ),
				'search_items'      => __( 'Search Event Categories', 'h4c' ),
				'all_items'         => __( 'All Event Categories', 'h4c' ),
				'parent_item'       => __( 'Parent Event Category', 'h4c' ),
				'parent_item_colon' => __( 'Parent Event Category:', 'h4c' ),
				'edit_item'         => __( 'Edit Event Category', 'h4c' ),
				'update_item'       => __( 'Update Event Category', 'h4c' ),
				'add_new_item'      => __( 'Add New Event Category', 'h4c' ),
				'new_item_name'     => __( 'New Event Category Name', 'h4c' ),
				'menu_name'         => __( 'Event Categories', 'h4c' ),
			),
			'public' => false,
			'has_archive' => false,
			'show_admin_column' => true,
			'show_ui' => true,
			'hierarchical' => true,
			'rewrite' => array('with_front' => false),
			//'publicly_queryable' => false,
			'show_in_nav_menus' => false,
			'show_in_rest' => true,
		)
	);


	register_taxonomy(
		'news_category',
		array('news'),
		array(
			'labels' =>  array(
				'name'              => _x( 'News Categories', 'taxonomy general name', 'h4c' ),
				'singular_name'     => _x( 'News Category', 'taxonomy singular name', 'h4c' ),
				'search_items'      => __( 'Search News Categories', 'h4c' ),
				'all_items'         => __( 'All News Categories', 'h4c' ),
				'parent_item'       => __( 'Parent News Category', 'h4c' ),
				'parent_item_colon' => __( 'Parent News Category:', 'h4c' ),
				'edit_item'         => __( 'Edit News Category', 'h4c' ),
				'update_item'       => __( 'Update News Category', 'h4c' ),
				'add_new_item'      => __( 'Add New News Category', 'h4c' ),
				'new_item_name'     => __( 'New News Category Name', 'h4c' ),
				'menu_name'         => __( 'News Categories', 'h4c' ),
			),
			'public' => false,
			'has_archive' => false,
			'show_admin_column' => true,
			'show_ui' => true,
			'hierarchical' => true,
			'rewrite' => array('with_front' => false),
			//'publicly_queryable' => false,
			'show_in_nav_menus' => false,
			'show_in_rest' => true,
		)
	);
	

	register_taxonomy(
		'testimonial_category',
		array('testimonial'),
		array(
			'labels' =>  array(
				'name'              => _x( 'Testimonial Categories', 'taxonomy general name', 'h4c' ),
				'singular_name'     => _x( 'Testimonial Category', 'taxonomy singular name', 'h4c' ),
				'search_items'      => __( 'Search Testimonial Categories', 'h4c' ),
				'all_items'         => __( 'All Testimonial Categories', 'h4c' ),
				'parent_item'       => __( 'Parent Testimonial Category', 'h4c' ),
				'parent_item_colon' => __( 'Parent Testimonial Category:', 'h4c' ),
				'edit_item'         => __( 'Edit Testimonial Category', 'h4c' ),
				'update_item'       => __( 'Update Testimonial Category', 'h4c' ),
				'add_new_item'      => __( 'Add New Testimonial Category', 'h4c' ),
				'new_item_name'     => __( 'New Testimonial Category Name', 'h4c' ),
				'menu_name'         => __( 'Testimonial Categories', 'h4c' ),
			),
			'public' => false,
			'has_archive' => false,
			'show_admin_column' => true,
			'show_ui' => true,
			'hierarchical' => true,
			'rewrite' => array('with_front' => false),
			//'publicly_queryable' => false,
			'show_in_nav_menus' => false,
			'show_in_rest' => true,
		)
	);
	

	register_taxonomy(
		'webinar_category',
		array('webinar'),
		array(
			'labels' =>  array(
				'name'              => _x( 'Webinar Categories', 'taxonomy general name', 'h4c' ),
				'singular_name'     => _x( 'Webinar Category', 'taxonomy singular name', 'h4c' ),
				'search_items'      => __( 'Search Webinar Categories', 'h4c' ),
				'all_items'         => __( 'All Webinar Categories', 'h4c' ),
				'parent_item'       => __( 'Parent Webinar Category', 'h4c' ),
				'parent_item_colon' => __( 'Parent Webinar Category:', 'h4c' ),
				'edit_item'         => __( 'Edit Webinar Category', 'h4c' ),
				'update_item'       => __( 'Update Webinar Category', 'h4c' ),
				'add_new_item'      => __( 'Add New Webinar Category', 'h4c' ),
				'new_item_name'     => __( 'New Webinar Category Name', 'h4c' ),
				'menu_name'         => __( 'Webinar Categories', 'h4c' ),
			),
			'public' => false,
			'has_archive' => false,
			'show_admin_column' => true,
			'show_ui' => true,
			'hierarchical' => true,
			'rewrite' => array('with_front' => false),
			//'publicly_queryable' => false,
			'show_in_nav_menus' => false,
			'show_in_rest' => true,
		)
	);

    
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
    );
    
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
	*/
}

?>