<?php

//DISABLE XMLRPC
add_filter('xmlrpc_enabled', '__return_false');

////ADD SETTINGS TO ADMIN BAR
add_action('admin_bar_menu', 'add_sig_admin_bar_button', 100);
if ( ! function_exists( 'sig_change_post_menu_label' ) ) {
    function add_sig_admin_bar_button($admin_bar) {
        $admin_bar->add_menu(array(
            'id'    => 'sig-settings',
            'title' => '<span class="ab-icon dashicon-before dashicons-admin-generic"></span>SIG Settings',
            'href'  => get_home_url().'/wp-admin/admin.php?page=sig-settings',
            'meta'  => array(
                'title'  => __('SIG Settings'),
                'target' => '_self',
            ),
        ));
    }
}

// Change POSTS to INSIGHTS
add_action( 'admin_menu', 'sig_change_post_menu_label' );
add_action( 'init', 'sig_change_post_object_label' );

if ( ! function_exists( 'sig_change_post_menu_label' ) ) {
    function sig_change_post_menu_label() {
        global $menu;
        global $submenu;
        $menu[5][0] = 'Insights';
        $submenu['edit.php'][5][0] = 'Insights';
        $submenu['edit.php'][10][0] = 'Add Insights post';
        //$submenu['edit.php'][16][0] = 'Insights Tags';
        echo '';
    }
}
if ( ! function_exists( 'sig_change_post_object_label' ) ) {
    function sig_change_post_object_label() {
        global $wp_post_types;
        $labels = &$wp_post_types['post']->labels;
        $labels->name = 'Insights';
        $labels->singular_name = 'Insight';
        $labels->add_new = 'Add Insights post';
        $labels->add_new_item = 'Add Insights post';
        $labels->edit_item = 'Edit Insights post';
        $labels->new_item = 'Insights';
        $labels->view_item = 'View Insights post';
        $labels->search_items = 'Search Insights';
        $labels->not_found = 'No Insights posts found';
        $labels->not_found_in_trash = 'No Insights posts found in Trash';
    }
}

if ( ! function_exists( 'exclude_listings_from_link_search' ) ) {
	
	//HIDE CPT FROM WYSIWYG LINK SEARCH	
	function exclude_listings_from_link_search($query){
		$key = false;

		$cpt_to_remove = array(
			'events',
		);

		foreach ($cpt_to_remove as $custom_post_type) {
			$key = array_search($custom_post_type, $query['post_type']);
			if($key){
				unset($query['post_type'][$key]);
			} 
		}
		return $query; 
	}
}
//add_filter( 'wp_link_query_args', 'exclude_listings_from_link_search' );



////////PAGE
add_filter( 'manage_page_posts_columns', 'set_custom_edit_page_columns' );
function set_custom_edit_page_columns($columns) {
    unset($columns['date']);
    $columns['date'] = __( 'Date', 'sig' );
    $columns['description'] = __( 'Excerpt', 'sig' );
    return $columns;
}
add_action( 'manage_page_posts_custom_column' , 'custom_page_column', 10, 2 );
function custom_page_column( $column, $post_id ) {	
    switch ( $column ) {
        case 'description' :
            $currpost = get_post($post_id);
            if(!empty( $currpost->post_excerpt )) {
                echo $currpost->post_excerpt;
            }
            break;		
    }
}


////////PRESS
add_filter( 'manage_press_posts_columns', 'set_custom_edit_press_columns' );
function set_custom_edit_press_columns($columns) {
    unset($columns['date']);
    $columns['date'] = __( 'Date', 'sig' );
    $columns['description'] = __( 'Excerpt', 'sig' );
    return $columns;
}
add_action( 'manage_press_posts_custom_column' , 'custom_press_column', 10, 2 );
function custom_press_column( $column, $post_id ) {	
    switch ( $column ) {
        case 'description' :
            $currpost = get_post($post_id);
            if(!empty( $currpost->post_excerpt )) {
                echo $currpost->post_excerpt;
            }
            break;		
    }
}




//EVENT COLUMNS
/*add_filter( 'manage_events_posts_columns', 'set_custom_edit_events_columns' );
function set_custom_edit_events_columns($columns) {
    $columns['start_date'] = __( 'Start Date', 'sig' );
	$columns['end_date'] = __( 'End Date', 'sig' );
	$columns['start_time'] = __( 'Start Time', 'sig' );
	$columns['event_type'] = __( 'Event Type', 'sig' );
	$columns['feat_img'] = __('Featured Image');
	$columns['description'] = __( 'Excerpt', 'sig' );
	unset($columns['date']);
    return $columns;
}
add_action( 'manage_events_posts_custom_column' , 'custom_events_column', 10, 2 );
function custom_events_column( $column, $post_id ) {
	
    switch ( $column ) {

        case 'start_date' :
            if(get_post_meta( $post_id, 'event_type', true )) {
                $eventtype = get_post_meta( $post_id, 'event_type', true );                
                if($eventtype == 'Weekly Select' || $eventtype == 'Daily') {
                    //echo get_post_meta( $post_id, 'event_type', true );
                    echo '∞';
                } else {
                    $date = get_post_meta( $post_id, 'start_date', true );
                    echo date("F j, Y", strtotime($date));
                }                
            } else {
				echo '';
			}
            break;
			
		case 'end_date' :
            if(get_post_meta( $post_id, 'event_type', true )) {
                $eventtype = get_post_meta( $post_id, 'event_type', true );                
                if($eventtype == 'Weekly Select' || $eventtype == 'Daily') {
                    //echo get_post_meta( $post_id, 'event_type', true );
                    echo '∞';
                } else {
                    $date = get_post_meta( $post_id, 'end_date', true );
                    echo date("F j, Y", strtotime($date));
                }                
            } else {
				echo '';
			}
            break;
			
		case 'start_time' :
            if(get_post_meta( $post_id, 'start_time', true )) {
				$date = get_post_meta( $post_id, 'start_time', true );
				echo date("g:i a", strtotime($date));
			} else {
				echo '-';
			}
            break;
		case 'event_type' :
            if(get_post_meta( $post_id, 'event_type', true )) {
				$date = get_post_meta( $post_id, 'event_type', true );
				echo get_post_meta( $post_id, 'event_type', true );
			}
            break;
			
		case 'feat_img' :
            echo get_the_post_thumbnail( $post_id, array( 60, 60), array( 'class' => 'img-fluid' ) );
            break;
        case 'description' :
            $currpost = get_post($post_id);
            if(!empty( $currpost->post_excerpt )) {
                echo $currpost->post_excerpt;
            }
            break;
    }
}



add_filter( 'manage_edit-events_sortable_columns', 'set_events_sortable_columns');
function set_events_sortable_columns( $columns ) {
	$columns['event_type'] = 'event_type';
	$columns['start_date'] = 'start_date';
	return $columns;
}
*/


//ORDER BY EVENT DATE
function post_types_admin_order( $query ) {
	if( ! is_admin() || ! $query->is_main_query() ) {
		return;
	}

    $post_type = $query->query['post_type'];

    if ( $post_type == 'events' ) {
		
		$orderby = $query->get( 'orderby');
		
		switch( $orderby ){
			case 'event_type': 
				$query->set('meta_key','event_type');
				$query->set('orderby','meta_value');
				break;
			case 'start_date': 
				$query->set('meta_key', 'start_date');
				$query->set('orderby', 'meta_value_num');
				break;
			default: 	
				$query->set('meta_key', 'start_date');
				$query->set('orderby', 'meta_value_num');
				$query->set('order', 'DESC');				
				break;
		}
	}
	
	/*if ( $post_type == 'offers' || $post_type == 'carousels' ) {
		
		$query->set('orderby', 'menu_order');
		$query->set('order', 'ASC');				

		
		
	}*/
 }
 //add_filter('pre_get_posts', 'post_types_admin_order');





?>