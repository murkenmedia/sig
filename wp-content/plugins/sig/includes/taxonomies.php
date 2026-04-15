<?php

//TAXONOMIES
add_action( 'init', 'create_sig_taxonomies', 0 );

function create_sig_taxonomies() {

	/* register_taxonomy(
		'case_study_category',
		array('case-study'),
		array(
			'labels' =>  array(
				'name'              => _x( 'Case Study Categories', 'taxonomy general name', 'sig' ),
				'singular_name'     => _x( 'Case Study Category', 'taxonomy singular name', 'sig' ),
				'search_items'      => __( 'Search Case Study Categories', 'sig' ),
				'all_items'         => __( 'All Case Study Categories', 'sig' ),
				'parent_item'       => __( 'Parent Case Study Category', 'sig' ),
				'parent_item_colon' => __( 'Parent Case Study Category:', 'sig' ),
				'edit_item'         => __( 'Edit Case Study Category', 'sig' ),
				'update_item'       => __( 'Update Case Study Category', 'sig' ),
				'add_new_item'      => __( 'Add New Case Study Category', 'sig' ),
				'new_item_name'     => __( 'New Case Study Category Name', 'sig' ),
				'menu_name'         => __( 'Case Study Categories', 'sig' ),
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
	); */

	register_taxonomy(
		'insight_topic',
		array('post', 'webinar', 'case-study', 'testimonial'),
		array(
			'labels' =>  array(
				'name'              => _x( 'Insight Topics', 'taxonomy general name', 'sig' ),
				'singular_name'     => _x( 'Insight Topic', 'taxonomy singular name', 'sig' ),
				'search_items'      => __( 'Search Insight Topics', 'sig' ),
				'all_items'         => __( 'All Insight Topics', 'sig' ),
				'parent_item'       => __( 'Parent Insight Topics', 'sig' ),
				'parent_item_colon' => __( 'Parent Insight Topics:', 'sig' ),
				'edit_item'         => __( 'Edit Insight Topic', 'sig' ),
				'update_item'       => __( 'Update Insight Topic', 'sig' ),
				'add_new_item'      => __( 'Add New Insight Topic', 'sig' ),
				'new_item_name'     => __( 'New Insight Topic Name', 'sig' ),
				'menu_name'         => __( 'Insight Topics', 'sig' ), 
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

	/* register_taxonomy(
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
				'menu_name'         => __( 'Event Categories', 'sig' ),
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
	); */


	/* register_taxonomy(
		'news_category',
		array('news'),
		array(
			'labels' =>  array(
				'name'              => _x( 'News Categories', 'taxonomy general name', 'sig' ),
				'singular_name'     => _x( 'News Category', 'taxonomy singular name', 'sig' ),
				'search_items'      => __( 'Search News Categories', 'sig' ),
				'all_items'         => __( 'All News Categories', 'sig' ),
				'parent_item'       => __( 'Parent News Category', 'sig' ),
				'parent_item_colon' => __( 'Parent News Category:', 'sig' ),
				'edit_item'         => __( 'Edit News Category', 'sig' ),
				'update_item'       => __( 'Update News Category', 'sig' ),
				'add_new_item'      => __( 'Add New News Category', 'sig' ),
				'new_item_name'     => __( 'New News Category Name', 'sig' ),
				'menu_name'         => __( 'News Categories', 'sig' ),
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
				'name'              => _x( 'Testimonial Categories', 'taxonomy general name', 'sig' ),
				'singular_name'     => _x( 'Testimonial Category', 'taxonomy singular name', 'sig' ),
				'search_items'      => __( 'Search Testimonial Categories', 'sig' ),
				'all_items'         => __( 'All Testimonial Categories', 'sig' ),
				'parent_item'       => __( 'Parent Testimonial Category', 'sig' ),
				'parent_item_colon' => __( 'Parent Testimonial Category:', 'sig' ),
				'edit_item'         => __( 'Edit Testimonial Category', 'sig' ),
				'update_item'       => __( 'Update Testimonial Category', 'sig' ),
				'add_new_item'      => __( 'Add New Testimonial Category', 'sig' ),
				'new_item_name'     => __( 'New Testimonial Category Name', 'sig' ),
				'menu_name'         => __( 'Testimonial Categories', 'sig' ),
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
				'name'              => _x( 'Webinar Categories', 'taxonomy general name', 'sig' ),
				'singular_name'     => _x( 'Webinar Category', 'taxonomy singular name', 'sig' ),
				'search_items'      => __( 'Search Webinar Categories', 'sig' ),
				'all_items'         => __( 'All Webinar Categories', 'sig' ),
				'parent_item'       => __( 'Parent Webinar Category', 'sig' ),
				'parent_item_colon' => __( 'Parent Webinar Category:', 'sig' ),
				'edit_item'         => __( 'Edit Webinar Category', 'sig' ),
				'update_item'       => __( 'Update Webinar Category', 'sig' ),
				'add_new_item'      => __( 'Add New Webinar Category', 'sig' ),
				'new_item_name'     => __( 'New Webinar Category Name', 'sig' ),
				'menu_name'         => __( 'Webinar Categories', 'sig' ),
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
 */
    
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