<?php

//CUSTOM POST TYPES
function sig_create_post_type() {
    
    
    register_post_type( 'solutions', array(
		'labels' => array(
			'name' => __( 'Solutions', 'post type general name', 'sig'),
			'singular_name' => __( 'Solution', 'post type singular name', 'sig'),
			'add_new'            => __( 'Add New', 'Solutions', 'sig'),
            'add_new_item'       => __( 'Add New Solutions', 'sig'),
            'edit_item'          => __( 'Edit Solutions', 'sig'),
            'new_item'           => __( 'New Solutions', 'sig'),
            'view_item'             => __( 'View Solution', 'sig' ),
		  ),
		'public'            => true,
        'query_var'           => true,
		'hierarchical'      => true,
		'has_archive'       => false,
		'capability_type'   => 'page',
		'menu_position'       => 23,
		'show_in_rest' => true,
        'rewrite' => array( 'slug' => 'solutions', 'with_front' => false ),
		'menu_icon'   => plugin_dir_url( __DIR__ ).'icons/solutions.svg',
		'supports'   => array('title', 'editor', 'thumbnail', 'revisions', 'page-attributes', 'excerpt')
		)
	);
    
    register_post_type( 'technologies', array(
		'labels' => array(
			'name' => __( 'Technologies', 'post type general name', 'sig'),
			'singular_name' => __( 'Technology', 'post type singular name', 'sig'),
			'add_new'            => __( 'Add New', 'Technologies', 'sig'),
            'add_new_item'       => __( 'Add New Technologies', 'sig'),
            'edit_item'          => __( 'Edit Technologies', 'sig'),
            'new_item'           => __( 'New Technologies', 'sig'),
            'view_item'             => __( 'View Technologies', 'sig' ),
		  ),
		'public'            => true,
        'query_var'           => true,
		'hierarchical'      => true,
		'has_archive'       => false,		
		'capability_type'   => 'page',
		'menu_position'       => 24,
		'show_in_rest' => true,
        'rewrite' => array( 'slug' => 'technologies', 'with_front' => false ),
		'menu_icon'   => plugin_dir_url( __DIR__ ).'icons/technologies.svg',
		'supports'   => array('title', 'editor', 'thumbnail', 'excerpt', 'revisions', 'page-attributes')
		)
	);
    
    
    register_post_type( 'team', array(
        'labels' => array(
            'name' => __( 'Team', 'post type general name', 'sig'),
            'singular_name' => __( 'Team', 'post type singular name', 'sig'),
            'add_new'            => __( 'Add New', 'Team', 'sig'),
            'add_new_item'       => __( 'Add New Team', 'sig'),
            'edit_item'          => __( 'Edit Team', 'sig'),
            'new_item'           => __( 'New Team', 'sig'),
            'view_item'             => __( 'View Team', 'sig' ),
          ),
        'public'            => false,
        'publicly_queryable' => false,
        'query_var'           => true,
        'show_ui'           => true,
        'show_in_nav_menus' => false,
        'hierarchical'      => false,
        'has_archive'       => false,		
        'capability_type'   => 'post',
        'menu_position'       => 29,
        'show_in_rest' => true,
        'rewrite' => array('with_front' => false),
        'menu_icon'   => 'dashicons-groups',
        'supports'   => array('title', 'editor', 'thumbnail', 'excerpt', 'revisions', 'page-attributes'),
        )
    );
    
    
    register_post_type( 'events', array(
        'labels' => array(
            'name' => __( 'Events', 'post type general name', 'sig'),
            'singular_name' => __( 'Event', 'post type singular name', 'sig'),
            'add_new'            => __( 'Add New', 'Event', 'sig'),
            'add_new_item'       => __( 'Add New Event', 'sig'),
            'edit_item'          => __( 'Edit Event', 'sig'),
            'new_item'           => __( 'New Event', 'sig'),
            'view_item'             => __( 'View Event', 'sig' ),
          ),
        'public'            => true,
        'query_var'           => true,
        'show_ui'           => true,
        'show_in_nav_menus' => false,
        'hierarchical'      => false,
        'has_archive'       => false,		
        'capability_type'   => 'post',
        'menu_position'       => 28,
        'show_in_rest' => true,
        "rewrite" => [ "slug" => "events", "with_front" => false ],
        'menu_icon'   => 'dashicons-calendar-alt',		
        'supports'   => array("title", "editor", "thumbnail", "excerpt"),

        )
    );
    
    
    register_post_type( 'news', array(
        'labels' => array(
            'name' => __( 'News', 'post type general name', 'sig'),
            'singular_name' => __( 'News', 'post type singular name', 'sig'),
            'add_new'            => __( 'Add New', 'News', 'sig'),
            'add_new_item'       => __( 'Add New News', 'sig'),
            'edit_item'          => __( 'Edit News', 'sig'),
            'new_item'           => __( 'New News', 'sig'),
            'view_item'             => __( 'View News', 'sig' ),
          ),
        'public'            => true,
        'query_var'           => true,
        'hierarchical'      => false,
        'has_archive'       => true,		
        'capability_type'   => 'post',
        'menu_position'       => 29,
        'show_in_rest' => true,
        'rewrite' => array( 'slug' => 'news', 'with_front' => false ),
        //'taxonomies'  => array('news_tag', 'news_category'),
        'menu_icon'   => 'dashicons-admin-site',		
        'supports'   => array('title', 'editor', 'thumbnail', 'excerpt', 'page-attributes'),
        )
    );


    register_post_type( 'webinar', array(
        'labels' => array(
            'name' => __( 'Webinars', 'post type general name', 'sig'),
            'singular_name' => __( 'Webinar', 'post type singular name', 'sig'),
            'add_new'            => __( 'Add New', 'Webinar', 'sig'),
            'add_new_item'       => __( 'Add New Webinar', 'sig'),
            'edit_item'          => __( 'Edit Webinar', 'sig'),
            'new_item'           => __( 'New Webinar', 'sig'),
            'view_item'             => __( 'View Webinar', 'sig' ),
          ),
        'public'            => true,
        'query_var'           => true,
        'hierarchical'      => false,
        'has_archive'       => true,		
        'capability_type'   => 'post',
        'menu_position'       => 29,
        'show_in_rest' => true,
        'rewrite' => array( 'slug' => 'webinars', 'with_front' => false ),
        'menu_icon'   => 'dashicons-cover-image',		
        'supports'   => array('title', 'editor', 'thumbnail', 'excerpt', 'page-attributes'),
        )
    );

    register_post_type( 'case-study', array(
        'labels' => array(
            'name' => __( 'Case Studies', 'post type general name', 'sig'),
            'singular_name' => __( 'Case Study', 'post type singular name', 'sig'),
            'add_new'            => __( 'Add New', 'Case Study', 'sig'),
            'add_new_item'       => __( 'Add New Case Study', 'sig'),
            'edit_item'          => __( 'Edit Case Study', 'sig'),
            'new_item'           => __( 'New Case Study', 'sig'),
            'view_item'             => __( 'View Case Study', 'sig' ),
          ),
        'public'            => true,
        'query_var'           => true,
        'hierarchical'      => false,
        'has_archive'       => true,		
        'capability_type'   => 'post',
        'menu_position'       => 29,
        'show_in_rest' => true,
        'rewrite' => array( 'slug' => 'case-studies', 'with_front' => false ),
        'menu_icon'   => 'dashicons-search',		
        'supports'   => array('title', 'editor', 'thumbnail', 'excerpt', 'page-attributes'),
        )
    );
}

add_action( 'init', 'sig_create_post_type' ); 


/*
'template' => array(
    array( 'acf/hero', array(
        'data' => array(
            'field_5fc59ede88307' => array(
                'hide-title',
            )
        )
    )),
    array( 'core/spacer',array(
        'height' => '70px',
        'className' => 'is-style-responsive-large',
    ) ),
    array( 'core/group', array(
        'className' => 'is-style-max-lg',
        ), array(
            array( 'core/heading', array(
                'content' => 'Headline Goes Here',
                'textAlign' => 'center',
                'className' => 'mb-4'
            ) ),
            array( 'core/paragraph', array(
                'placeholder' => 'Add content here...',
                'align' => 'center',
            ) ),		
    ) ),
    array( 'core/spacer',array(
        'height' => '70px',
        'className' => 'is-style-responsive-large',
    ) ),
  )
  */

?>